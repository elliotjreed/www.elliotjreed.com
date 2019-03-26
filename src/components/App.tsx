import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./../assets/scss/App.scss";
import Routes from "./Routes";

export default class App extends React.Component<{}, {}> {
  public render(): React.ReactNode {
    return (
      <div>
        <Routes/>
      </div>
    );
  }
}
