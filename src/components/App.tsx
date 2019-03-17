import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import "./../assets/scss/App.scss";
import Routes from "./Routes";

interface EmptyProps {
}

interface EmptyState {
}

export default class App extends React.Component<EmptyProps, EmptyState> {
  public render(): React.ReactNode {
    return (
      <div>
        <Routes/>
      </div>
    );
  }
}
