import * as React from "react";
import { Link } from "react-router-dom";
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
      this.setState({ category: this.props.match.params.category }, this.fetchPostsInCategory);
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
        <PostCard key={post} category={this.state.category.toLowerCase()} post={post}/>
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
          <div className="column is-10 is-offset-1">
            <h2 className="title article-title">{Posts.capitalise(this.state.category)}</h2>
            {this.state.loading ?
              <Spinner/> : this.listOfPostsInCategory(this.state.posts[Object.keys(this.state.posts)[0]])}
          </div>
        </div>
      </section>
    );
  }
}
