import * as React from "react";
import * as ReactGA from "react-ga";
import { Helmet } from "react-helmet";

import { PostCard } from "./PostCard";
import { Spinner } from "./Spinner";
import "./../assets/scss/App.scss";

interface Props {
  match: { params: { category: string } };
}

interface State {
  category: string;
  loading: boolean;
  posts: string[];
}

export class Posts extends React.Component<Props, State> {
  private static capitalise(category: string): string {
    return category.charAt(0).toUpperCase() + category.slice(1);
  }

  private controller: AbortController;

  constructor(props: Props) {
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

  public componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>): void {
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
          <meta
            name="description"
            content={"Various posts, guides, and how-tos on " + Posts.capitalise(this.state.category)}
          />
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
              {this.state.loading ? (
                <Spinner />
              ) : (
                this.postsInCategory(this.state.posts[Object.keys(this.state.posts)[0]])
              )}
            </div>
          </div>
        </section>
      </main>
    );
  }

  private fetchPostsInCategory(): Promise<void> {
    if (!("caches" in self)) {
      return this.updateFromNetwork();
    }

    return caches
      .open("ejr")
      .then((cache) => {
        cache
          .match("https://api.elliotjreed.com/posts/" + this.state.category)
          .then(
            (response: Response | undefined): Promise<string[]> => {
              return new Promise((resolve, reject): void => {
                if (response) {
                  resolve(response.clone().json());
                } else {
                  reject();
                }
              });
            }
          )
          .then((posts) => this.setState({ posts, loading: false }))
          .catch((): Promise<void> => this.updateFromNetwork());
      })
      .catch((): Promise<void> => this.updateFromNetwork());
  }

  private updateFromNetwork(): Promise<void> {
    return fetch("https://api.elliotjreed.com/posts/" + this.state.category)
      .then(
        (response: Response): Promise<string[]> => {
          return new Promise((resolve, reject): void => {
            const clonedResponse = response.clone();
            if (clonedResponse.ok) {
              if ("caches" in self) {
                caches
                  .open("ejr")
                  .then((cache) =>
                    cache.put("https://api.elliotjreed.com/posts/" + this.state.category, clonedResponse.clone())
                  )
                  .catch();
              }
              resolve(clonedResponse.clone().json());
            } else {
              reject();
            }
          });
        }
      )
      .then((posts) => this.setState({ posts, loading: false }))
      .catch((): void => this.controller.abort());
  }

  private postsInCategory(posts: string[]): React.ReactNode {
    return (
      <ul>
        {posts.reverse().map((post) => (
          <PostCard key={post} category={this.state.category.toLowerCase()} post={post} />
        ))}
      </ul>
    );
  }
}
