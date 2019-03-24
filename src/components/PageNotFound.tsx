import * as React from "react";
import "./../assets/scss/App.scss";

interface EmptyProps {
}

interface EmptyState {
}

export default class PageNotFound extends React.Component<EmptyProps, EmptyState> {
  public render(): React.ReactNode {
    return (
      <section className="hero is-info is-small is-bold">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">Lorem ipsum dolor sit amet, consectetur adipiscing elit</h1>
          </div>
        </div>
      </section>
    );
  }
}
