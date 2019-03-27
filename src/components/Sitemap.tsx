import * as React from "react";
import * as ReactGA from "react-ga";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import "./../assets/scss/App.scss";
import Spinner from "./Spinner";

interface IState {
  loading: boolean
  posts: object,
}

export default class Sitemap extends React.Component<{}, IState> {
  private controller: AbortController;

  constructor(props: null) {
    super(props);

    this.controller = new AbortController();

    this.state = {
      loading: true,
      posts: {}
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
          <title>Sitemap</title>
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
                    <h3 className="title article-title">Sitemap</h3>
                  </div>

                  {this.state.loading ?
                    <Spinner/> : this.listOfPosts(this.state.posts)
                  }

                </div>
              </div>
            </div>
          </article>
        </div>
      </main>
    );
  }

  private fetchPostsInCategories(): void {
    fetch("https://api.elliotjreed.com/")
      .then(response => response.json())
      .then(posts => this.setState({ posts, loading: false }));
  }

  private listOfPosts(posts): React.ReactFragment {
    return <React.Fragment>
      {Object.keys(posts).reverse().map(category => (
        <div className="content article-body" key={category}>
          <h3 className="subtitle"><Link to={"category/" + category}>{category}</Link></h3>
          <ul>
            {this.listOfPostsInCategory(category)}
          </ul>
        </div>
      ))}
    </React.Fragment>;
  }

  private listOfPostsInCategory(category): React.ReactFragment {
    return <React.Fragment>
      <Helmet>
        <title>All Posts</title>
      </Helmet>
      {this.state.posts[category].map(post => (
        <li key={post}>
          <Link to={"/post/" + category.toLowerCase() + "/" + post.slice(0, -3).replace(/\s+/g, "_")}>{post.substr(11).slice(0, -3)}</Link>
        </li>
      ))}
    </React.Fragment>;
  }
};
