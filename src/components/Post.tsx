import * as React from "react";
import * as marked from "marked";
import Loading from "./Loading";
import { Link } from "react-router-dom";

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

  constructor(props: PostProps) {
    super(props);
    this.controller = new AbortController();

    this.post = this.props.match.params.post.replace(/_/g, " ") + ".md";
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
      .then(content => this.setState({ content, loading: false }));
  }

  public componentWillUnmount(): void {
    this.controller.abort();
  }

  public render(): React.ReactNode {
    return (
      <div className="container">
        <article className="articles">
          <div className="column is-8 is-offset-2">
            <div className="card article">
              {this.state.loading ? <Loading/>
                : <div className="card-content">
                  <div className="media">
                    <div className="media-content has-text-centered">
                      <p className="title article-title" dangerouslySetInnerHTML={{ __html: this.state.content.split('\n', 1)[0] }}/>
                      <div className="tags has-addons level-item">
                        <Link to={"/category/" + this.category} className="tag is-rounded is-info">{this.category}</Link>
                        <span className="tag is-rounded">{this.post.substr(0, 11)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="content article-body">
                    <div dangerouslySetInnerHTML={{ __html: this.state.content.substring(this.state.content.indexOf("\n") + 1) }}/>
                  </div>
                </div>
              }
            </div>
          </div>
        </article>
      </div>
    );
  }
}
