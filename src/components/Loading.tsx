import * as React from "react";
import Spinner from "./Spinner";

interface EmptyProps {
}

interface EmptyState {
}

export default class Loading extends React.Component<EmptyProps, EmptyState> {
  public render(): React.ReactNode {
    return (
      <section className="container">
        <div className="articles">
          <div className="column is-8 is-offset-2">
            <div className="card article">
              <div className="card-content">
                <div className="media">
                  <div className="media-content has-text-centered">
                    <h2 className="title article-title">Loading...</h2>
                  </div>
                </div>
                <div className="content article-body">
                  <Spinner/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
