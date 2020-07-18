import * as React from "react";
import { PostContentSpinner } from "./PostContentSpinner";

export const RouteLoading = (): JSX.Element => {
  return (
    <>
      <section className="hero is-info is-small is-bold">
        <div className="hero-body" />
      </section>
      <section className="container home">
        <div className="articles">
          <div className="column is-10 is-offset-1">
            <PostContentSpinner />
          </div>
        </div>
      </section>
    </>
  );
};
