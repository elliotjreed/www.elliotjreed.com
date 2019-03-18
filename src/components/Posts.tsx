import * as React from "react";
import { Link } from "react-router-dom";
import "./../assets/scss/App.scss";
import Loading from "./Loading";

interface PostsProps {
  match: { params: { category: string } }
}

interface PostsState {
  posts: Array<string>,
  loading: boolean
}

export default class Posts extends React.Component<PostsProps, PostsState> {
  private controller: AbortController;
  private readonly category: string;

  constructor(props: PostsProps) {
    super(props);
    this.controller = new AbortController();

    this.category = this.props.match.params.category;

    this.state = {
      posts: [],
      loading: true
    };
  }

  public componentDidMount(): void {
    fetch("http://127.0.0.1:5000/posts/" + this.category)
      .then(response => response.json())
      .then(posts => this.setState({ posts, loading: false }));
  }

  public componentWillUnmount(): void {
    this.controller.abort();
  }

  private listOfPostsInCategory(posts: Array<string>): React.ReactFragment {
    return <React.Fragment>
      {posts.map(post => (
        <li key={post}>
          <Link to={"/post/" + this.category.toLowerCase() + "/" + post.slice(0, -3).replace(/\s+/g, "_")}>{post.substr(11).slice(0, -3)}</Link>
        </li>
      ))}
    </React.Fragment>;
  }

  private capitalise(category: string): string {
    return category.charAt(0).toUpperCase() + category.slice(1)
  }

  public render(): React.ReactNode {
    return (
      <section className="container">
        <div className="articles">
          <div className="column is-8 is-offset-2">
            <div className="card article">
              <div className="card-content">
                <div className="media">
                  <div className="media-content has-text-centered">
                    <h2 className="title article-title">{this.capitalise(this.category)}</h2>
                  </div>
                </div>
                <div className="content article-body">
                {this.state.loading ? <Loading/>
                  : <ul>
                    {this.listOfPostsInCategory(this.state.posts[Object.keys(this.state.posts)[0]])}
                  </ul>
                }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
