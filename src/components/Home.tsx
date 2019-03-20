import * as React from "react";
import "./../assets/scss/App.scss";
import AllPosts from "./AllPosts";

interface EmptyProps {
}

interface EmptyState {
}

export default class Home extends React.Component<EmptyProps, EmptyState> {
  constructor(props: EmptyProps) {
    super(props);
  }

  public render(): React.ReactNode {
    return (
      <section className="container">
        <div className="articles">
          <div className="column is-10 is-offset-1">
            <div className="card article">
              <div className="card-content">
                <div className="media">
                  <div className="media-content has-text-centered">
                    <p className="title article-title">Hi</p>
                  </div>
                </div>
                <div className="content article-body">
                  <AllPosts/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
