import * as React from "react";
import { Link } from "react-router-dom";

import "./../assets/scss/App.scss";

export default class PageNotFound extends React.Component<{}, {}> {
  public render(): React.ReactNode {
    return (
      <section className="hero is-info is-small is-bold">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">Unfortunately I can't find this page. Try <Link to="/">returning to the home page</Link> and going from there.</h1>
          </div>
        </div>
      </section>
    );
  }
}
