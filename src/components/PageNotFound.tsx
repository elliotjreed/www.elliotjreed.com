import * as React from "react";
import "./../assets/scss/App.scss";

interface EmptyProps {
}

interface EmptyState {
}

export default class PageNotFound extends React.Component<EmptyProps, EmptyState> {
  public render(): React.ReactNode {
    return (
      <div className="app">
        <h1>404!</h1>
      </div>
    );
  }
}
