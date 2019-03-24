import * as React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./../assets/scss/App.scss";
import Spinner from "./Spinner";
import PostCard from "./PostCard";

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
      category: props.match.params.category.replace("-", " "),
      posts: [],
      loading: true
    };

    this.postsInCategory = this.postsInCategory.bind(this);
  }

  public componentDidMount(): void {
    this.fetchPostsInCategory();
  }

  public componentDidUpdate(prevProps: Readonly<PostsProps>, prevState: Readonly<PostsState>): void {
    if (this.state.category !== this.props.match.params.category) {
      this.setState({ category: this.props.match.params.category }, this.fetchPostsInCategory);
    }
  }

  public componentWillUnmount(): void {
    this.controller.abort();
  }

  private fetchPostsInCategory(): void {
    fetch("https://api.elliotjreed.com/posts/" + this.state.category)
      .then(response => response.json())
      .then(posts => this.setState({ posts, loading: false }));
  }

  private postsInCategory(posts: Array<string>): React.ReactNode {
    return <ul>
      {posts.map(post => (
        <PostCard key={post} category={this.state.category.toLowerCase()} post={post}/>
      ))}
    </ul>;
  }

  private static capitalise(category: string): string {
    return category.charAt(0).toUpperCase() + category.slice(1);
  }

  public render(): React.ReactNode {
    return (
      <main>
        <Helmet>
          <title>{Posts.capitalise(this.state.category)}</title>
        </Helmet>
        <section className="hero is-info is-small is-bold">
          <div className="hero-body main-banner">
            <div className="container has-text-centered">
              <h1 className="title">{Posts.capitalise(this.state.category)}</h1>
            </div>
          </div>
        </section>
        <section className="container home">
          <div className="articles">
            <div className="column is-10 is-offset-1">
              {this.state.loading ?
                <Spinner/> : this.postsInCategory(this.state.posts[Object.keys(this.state.posts)[0]])}
            </div>
          </div>
        </section>
      </main>
    );
  }
}