import * as React from "react";
import { Link } from "react-router-dom";
import "./../assets/scss/App.scss";
import Spinner from "./Spinner";

interface PostsProps {
  match: { params: { category: string } }
}

interface PostsState {
  category: string,
  posts: Array<string>,
  loading: boolean
}

export default class Posts extends React.Component<PostsProps, PostsState> {
  private controller: AbortController;

  constructor(props: PostsProps) {
    super(props);
    this.controller = new AbortController();

    this.state = {
      category: props.match.params.category,
      posts: [],
      loading: true
    };

    this.listOfPostsInCategory = this.listOfPostsInCategory.bind(this);
  }

  public componentDidMount(): void {
    this.fetchPostsInCategory();
  }


  public componentDidUpdate(prevProps: Readonly<PostsProps>, prevState: Readonly<PostsState>): void {
    if (this.state.category !== this.props.match.params.category) {
      this.setState({category: this.props.match.params.category}, this.fetchPostsInCategory)
    }
  }

  public componentWillUnmount(): void {
    this.controller.abort();
  }

  private fetchPostsInCategory(): void {
    fetch("http://127.0.0.1:5000/posts/" + this.state.category)
      .then(response => response.json())
      .then(posts => this.setState({ posts, loading: false }));
  }

  private listOfPostsInCategory(posts: Array<string>): React.ReactNode {
    return <ul>
      {posts.map(post => (
        <li key={post}>
          <Link to={"/post/" + this.state.category.toLowerCase() + "/" + post.slice(0, -3).replace(/\s+/g, "_")}>{post.substr(11).slice(0, -3)}</Link>
        </li>
      ))}
    </ul>;
  }

  private static capitalise(category: string): string {
    return category.charAt(0).toUpperCase() + category.slice(1);
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
                    <h2 className="title article-title">{Posts.capitalise(this.state.category)}</h2>
                  </div>
                </div>
                <div className="content article-body">
                  {this.state.loading ? <Spinner/> : this.listOfPostsInCategory(this.state.posts[Object.keys(this.state.posts)[0]])}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
