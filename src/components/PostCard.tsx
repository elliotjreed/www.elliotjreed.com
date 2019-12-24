import * as marked from "marked";
import * as React from "react";
import { Link } from "react-router-dom";

import { Loader } from "./Loader";

interface Props {
  category: string;
  post: string;
}

interface State {
  category: string;
  content: string;
  date: string;
  loading: boolean;
  post: string;
  title: string;
}

export class PostCard extends React.Component<Props, State> {
  private controller: AbortController;

  constructor(props: Props) {
    super(props);

    this.controller = new AbortController();

    this.state = {
      category: this.props.category,
      content: "",
      date: this.props.post.substr(0, 10),
      loading: true,
      post: this.props.post,
      title: this.props.post.substr(11).slice(0, -3)
    };
  }

  public componentDidMount(): void {
    this.fetchPostContent();
  }

  public componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>): void {
    if (this.state.post !== this.props.post) {
      this.setState(
        {
          category: this.props.category,
          date: this.props.post.substr(0, 10),
          post: this.props.post,
          title: this.props.post.substr(11).slice(0, -3)
        },
        this.fetchPostContent
      );
    }
  }

  public componentWillUnmount(): void {
    this.controller.abort();
  }

  public render(): React.ReactNode {
    return (
      <div className="card article">
        <div className="card-content">
          <div className="has-text-centered">
            <h3>
              <Link
                className="title article-title"
                to={"/post/" + this.state.category + "/" + this.state.post.slice(0, -3).replace(/\s+/g, "_")}
              >
                {this.state.title}
              </Link>
            </h3>
            <div className="tags has-addons level-item">
              <Link to={"/category/" + this.state.category} className="tag is-rounded tag-category">
                {this.state.category}
              </Link>
              <time dateTime={this.state.date} className="tag is-rounded">
                {this.state.date}
              </time>
            </div>
          </div>
          <div className="content article-body">
            {this.state.loading ? <Loader /> : <div dangerouslySetInnerHTML={{ __html: this.state.content }} />}
          </div>
        </div>
      </div>
    );
  }

  private fetchPostContent(): Promise<void> {
    if (!("caches" in self)) {
      return this.updateFromNetwork();
    }

    return caches
      .open("ejr")
      .then(cache => {
        cache
          .match("https://api.elliotjreed.com/post/" + this.state.category + "/" + this.state.post)
          .then(
            (response: Response | undefined): Promise<string> => {
              return new Promise((resolve, reject): void => {
                if (response) {
                  resolve(response.clone().text());
                } else {
                  reject();
                }
              });
            }
          )
          .then(markdown => markdown.substring(markdown.indexOf("\n") + 1))
          .then(markdown => marked(markdown))
          .then(content =>
            this.setState({
              content: content.substring(this.state.content),
              loading: false
            })
          )
          .catch((): Promise<void> => this.updateFromNetwork());
      })
      .catch((): Promise<void> => this.updateFromNetwork());
  }

  private updateFromNetwork(): Promise<void> {
    return fetch("https://api.elliotjreed.com/post/" + this.state.category + "/" + this.state.post)
      .then(
        (response: Response): Promise<string> => {
          return new Promise((resolve, reject): void => {
            const clonedResponse = response.clone();
            if (clonedResponse.ok) {
              if ("caches" in self) {
                caches
                  .open("ejr")
                  .then(cache =>
                    cache.put(
                      "https://api.elliotjreed.com/post/" + this.state.category + "/" + this.state.post,
                      clonedResponse.clone()
                    )
                  )
                  .catch();
              }
              resolve(clonedResponse.clone().text());
            } else {
              reject();
            }
          });
        }
      )
      .then(markdown => markdown.substring(markdown.indexOf("\n") + 1))
      .then(markdown => marked(markdown))
      .then(content =>
        this.setState({
          content: content.substring(this.state.content),
          loading: false
        })
      )
      .catch((): void => this.controller.abort());
  }
}
