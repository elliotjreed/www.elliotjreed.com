import * as React from "react";
import * as ReactGA from "react-ga";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import "./../assets/scss/App.scss";

export const PageNotFound = (): JSX.Element => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + location.search);
  }, []);

  return (
    <section className="hero is-info is-small is-bold">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title">
            Unfortunately I can’t find this page. Try <Link to="/">returning to the home page</Link> and going from
            there.
          </h1>
        </div>
      </div>
    </section>
  );
};
