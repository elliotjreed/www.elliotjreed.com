import * as React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import * as marked from "marked";
import Spinner from "./Spinner";

interface PostProps {
  match: { params: { category: string, post: string } }
}

interface PostState {
  content: string,
  loading: boolean
}

export default class Post extends React.Component<PostProps, PostState> {
  private controller: AbortController;
  private readonly category: string;
  private readonly post: string;
  private readonly title: string;
  private readonly date: string;

  constructor(props: PostProps) {
    super(props);
    this.controller = new AbortController();

    let url = this.props.match.params.post;
    let postWithSpaces = url.replace(/_/g, " ");
    this.post = postWithSpaces + ".md";
    this.title = postWithSpaces.substr(11);
    this.date = url.substr(0, 10);
    this.category = this.props.match.params.category;

    this.state = {
      content: "",
      loading: true
    };
  }

  public componentDidMount(): void {
    fetch("http://127.0.0.1:5000/post/" + this.category + "/" + this.post)
      .then(response => response.text())
      .then(markdown => marked(markdown))
      .then(content => this.setState({ content: content.substring(this.state.content.indexOf("\n") + 1), loading: false }));
  }

  public componentWillUnmount(): void {
    this.controller.abort();
  }

  public render(): React.ReactNode {
    return (
      <div className="container">
        <Helmet>
            <title>{this.title}</title>
        </Helmet>
        <article className="articles">
          <div className="column is-8 is-offset-2">
            <div className="card article">
              <div className="card-content">
                <div className="media">
                    <div className="media-content has-text-centered">
                      <p className="title article-title">{this.title}</p>
                      <div className="tags has-addons level-item">
                        <Link to={"/category/" + this.category} className="tag is-rounded is-info">{this.category}</Link>
                          <time dateTime={this.date} className="tag is-rounded">{this.date}</time>
                      </div>
                    </div>
                </div>
                <div className="content article-body">
                  {this.state.loading ? <Spinner/> :
                    <div dangerouslySetInnerHTML={{ __html: this.state.content }}/>
                  }
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  }
}
