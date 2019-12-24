import * as React from "react";
import * as ReactGA from "react-ga";
import { Helmet } from "react-helmet";
import { Code } from "react-content-loader";
import { Link } from "react-router-dom";

import "./../assets/scss/App.scss";

interface State {
  loading: boolean;
  posts: object;
  updated: boolean;
}

export class Sitemap extends React.Component<{}, State> {
  private controller: AbortController;

  constructor(props: null) {
    super(props);

    this.controller = new AbortController();

    this.state = {
      loading: true,
      posts: {},
      updated: false
    };
  }

  public componentDidMount(): void {
    ReactGA.pageview(window.location.pathname + location.search);

    this.fetchPostsInCategories();
  }

  public componentWillUnmount(): void {
    this.controller.abort();
  }

  public render(): React.ReactNode {
    return (
      <main>
        <Helmet>
          <title>Sitemap | Elliot J. Reed</title>
          <meta name="description" content="A list of all the posts, guides, and how-tos on my website." />
        </Helmet>

        <section className="hero is-info is-small is-bold">
          <div className="hero-body" />
        </section>

        <div className="container home">
          <article className="articles">
            <div className="column is-10 is-offset-1">
              <div className="card article">
                <div className="card-content">
                  <div className="has-text-centered">
                    <h3 className="title article-title">Sitemap</h3>
                  </div>

                  {this.state.loading ? <Code /> : this.listOfPosts(this.state.posts)}
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>
    );
  }

  private fetchPostsInCategories(): Promise<void> {
    if (!("caches" in self)) {
      return this.updateFromNetwork();
    }

    return caches
      .open("ejr")
      .then(cache => {
        cache
          .match("https://api.elliotjreed.com/")
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
            if (!this.state.updated) {
              this.updateFromNetwork();
            }
          })
          .catch(() => this.updateFromNetwork());
      })
      .catch(() => this.updateFromNetwork());
  }

  private updateFromNetwork(): Promise<void> {
    return fetch("https://api.elliotjreed.com/")
      .then(
        (response: Response): Promise<string[]> => {
          return new Promise((resolve, reject): void => {
            const clonedResponse = response.clone();
            if (clonedResponse.ok) {
              if ("caches" in self) {
                caches
                  .open("ejr")
                  .then(cache => cache.put("https://api.elliotjreed.com/", clonedResponse.clone()))
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

  private listOfPosts(posts: object): React.ReactFragment {
    return (
      <React.Fragment>
        {Object.keys(posts)
          .reverse()
          .map(category => (
            <div className="content article-body" key={category}>
              <h3 className="subtitle">
                <Link to={"category/" + category}>{category}</Link>
              </h3>
              <ul>{this.listOfPostsInCategory(category)}</ul>
            </div>
          ))}
      </React.Fragment>
    );
  }

  private listOfPostsInCategory(category: string): React.ReactFragment {
    return (
      <React.Fragment>
        {this.state.posts[category].map(post => (
          <li key={post}>
            <Link to={"/post/" + category.toLowerCase() + "/" + post.slice(0, -3).replace(/\s+/g, "_")}>{post.substr(11).slice(0, -3)}</Link>
          </li>
        ))}
      </React.Fragment>
    );
  }
}
