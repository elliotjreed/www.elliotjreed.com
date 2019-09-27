import * as React from "react";
import * as ReactGA from "react-ga";
import { Link } from "react-router-dom";

interface State {
  categories: string[];
  loading: boolean;
}

export default class Categories extends React.Component<{}, State> {
  private controller: AbortController;

  constructor(props: null) {
    super(props);
    this.controller = new AbortController();

    this.state = {
      categories: [],
      loading: true
    };
  }

  public componentDidMount(): void {
    ReactGA.pageview(window.location.pathname + location.search);

    this.fetchCategories();
  }

  public componentWillUnmount(): void {
    this.controller.abort();
  }

  public render(): React.ReactNode {
    return (
      <React.Fragment>
        {!this.state.loading &&
          this.state.categories.map((category, index) => (
            <Link key={index} className="navbar-item" to={"/category/" + category.toLowerCase().replace(" ", "-")}>
              {category}
            </Link>
          ))}
      </React.Fragment>
    );
  }

  private fetchCategories(): Promise<void> {
    if (!("caches" in self)) {
      return this.updateFromNetwork();
    }

    return caches
      .open("ejr")
      .then(cache => {
        cache
          .match("https://api.elliotjreed.com/categories")
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
          .then((categories: string[]): void => {
            this.setState({
              categories,
              loading: false
            });
          })
          .catch(() => this.updateFromNetwork());
      })
      .catch(() => this.updateFromNetwork());
  }

  private updateFromNetwork(): Promise<void> {
    return fetch("https://api.elliotjreed.com/categories")
      .then(
        (response: Response): Promise<string[]> => {
          return new Promise((resolve, reject): void => {
            const clonedResponse = response.clone();
            if (clonedResponse.ok) {
              if ("caches" in self) {
                caches
                  .open("ejr")
                  .then(cache => cache.put("https://api.elliotjreed.com/categories", clonedResponse.clone()))
                  .catch();
              }
              resolve(clonedResponse.clone().json());
            } else {
              reject();
            }
          });
        }
      )
      .then((categories: string[]): void => {
        this.setState({
          categories,
          loading: false
        });
      })
      .catch((): void => this.controller.abort());
  }
}
