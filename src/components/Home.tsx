import * as React from "react";
import "./../assets/scss/App.scss";

interface EmptyProps {
}

interface EmptyState {
}

export default class Home extends React.Component<EmptyProps, EmptyState> {
  public render(): React.ReactNode {
    return (
      <div>hi</div>
    );
  }
}
