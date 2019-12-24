import * as React from "react";
import * as ReactGA from "react-ga";
import { Code } from "react-content-loader";

import { PostCard } from "./PostCard";
import "./../assets/scss/App.scss";

interface State {
  posts: string[];
  loading: boolean;
}

export class AllPosts extends React.Component<{}, State> {
  private controller: AbortController;

  constructor(props: null) {
    super(props);

    this.controller = new AbortController();

    this.state = {
      loading: true,
      posts: []
    };
  }

  public componentDidMount(): void {
    ReactGA.pageview(window.location.pathname + location.search);

    this.fetchAllPosts();
  }

  public componentWillUnmount(): void {
    this.controller.abort();
  }

  public render(): React.ReactNode {
    return <div className="column is-10 is-offset-1">{this.state.loading ? <Code /> : this.posts()}</div>;
  }

  private fetchAllPosts(): Promise<void> {
    if (!("caches" in self)) {
      return this.updateFromNetwork();
    }

    return caches
      .open("ejr")
      .then(cache => {
        cache
          .match("https://api.elliotjreed.com/all")
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
          .then((posts: string[]): void => {
            this.setState({
              loading: false,
              posts
            });
          })
          .catch((): Promise<void> => this.updateFromNetwork());
      })
      .catch((): Promise<void> => this.updateFromNetwork());
  }

  private updateFromNetwork(): Promise<void> {
    return fetch("https://api.elliotjreed.com/all")
      .then(
        (response: Response): Promise<string[]> => {
          return new Promise((resolve, reject): void => {
            const clonedResponse = response.clone();
            if (clonedResponse.ok) {
              if ("caches" in self) {
                caches
                  .open("ejr")
                  .then(cache => cache.put("https://api.elliotjreed.com/all", clonedResponse.clone()))
                  .catch();
              }
              resolve(clonedResponse.clone().json());
            } else {
              reject();
            }
          });
        }
      )
      .then((posts: string[]): void => {
        this.setState({
          loading: false,
          posts
        });
      })
      .catch((): void => this.controller.abort());
  }

  private posts(): React.ReactFragment {
    return (
      <React.Fragment>
        {this.state.posts.reverse().map(post => (
          <PostCard key={post} category={post.split("/")[0].toLowerCase()} post={post.split("/")[1]} />
        ))}
      </React.Fragment>
    );
  }
}
