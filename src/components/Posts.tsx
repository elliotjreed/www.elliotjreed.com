import * as React from "react";
import * as ReactGA from "react-ga";
import { Helmet } from "react-helmet";

import "./../assets/scss/App.scss";
import PostCard from "./PostCard";
import Spinner from "./Spinner";

interface IProps {
  match: { params: { category: string } }
}

interface IState {
  category: string,
  loading: boolean
  posts: string[],
}

export default class Posts extends React.Component<IProps, IState> {

  private static capitalise(category: string): string {
    return category.charAt(0).toUpperCase() + category.slice(1);
  }

  private controller: AbortController;

  constructor(props: IProps) {
    super(props);
    this.controller = new AbortController();

    this.state = {
      category: props.match.params.category.replace("-", " "),
      loading: true,
      posts: []
    };

    this.postsInCategory = this.postsInCategory.bind(this);
  }

  public componentDidMount(): void {
    ReactGA.pageview(window.location.pathname + location.search);

    this.fetchPostsInCategory();
  }

  public componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>): void {
    if (this.state.category !== this.props.match.params.category) {
      this.setState({ category: this.props.match.params.category }, this.fetchPostsInCategory);
    }
  }

  public componentWillUnmount(): void {
    this.controller.abort();
  }

  public render(): React.ReactNode {
    return (
      <main>
        <Helmet>
          <title>{Posts.capitalise(this.state.category) + " | Elliot J. Reed"}</title>
          <meta name="description" content={"Various posts, guides, and how-tos on " + Posts.capitalise(this.state.category)}/>
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

  private fetchPostsInCategory(): void {
    fetch("https://api.elliotjreed.com/posts/" + this.state.category)
      .then(response => response.json())
      .then(posts => this.setState({ posts, loading: false }));
  }

  private postsInCategory(posts: string[]): React.ReactNode {
    return <ul>
      {posts.reverse().map(post => (
        <PostCard key={post} category={this.state.category.toLowerCase()} post={post}/>
      ))}
    </ul>;
  }
}
