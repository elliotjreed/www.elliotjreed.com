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
    fetch("https://api.elliotjreed.com/post/" + this.category + "/" + this.post)
      .then(response => response.text())
      .then(markdown => markdown.substring(markdown.indexOf("\n") + 1))
      .then(markdown => marked(markdown))
      .then(content => this.setState({ content: content.substring(this.state.content.indexOf("\n") + 1), loading: false }));
  }

  public componentWillUnmount(): void {
    this.controller.abort();
  }

  public render(): React.ReactNode {
    return (
      <main>
        <Helmet>
            <title>{this.title}</title>
        </Helmet>
        <section className="hero is-info is-small is-bold">
          <div className="hero-body"/>
        </section>
        <div className="container home">
        <article className="articles">
          <div className="column is-10 is-offset-1">
            <div className="card article">
              <div className="card-content">
                    <div className="has-text-centered">
                      <h3 className="title article-title">{this.title}</h3>
                      <div className="tags has-addons level-item">
                        <Link to={"/category/" + this.category} className="tag is-rounded tag-category">{this.category}</Link>
                        <time dateTime={this.date} className="tag is-rounded">{this.date}</time>
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
      </main>
    );
  }
}
