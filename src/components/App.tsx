import * as React from "react";

import "./../assets/scss/App.scss";
import { Routes } from "./Routes";

export class App extends React.Component<{}, {}> {
  public render(): React.ReactNode {
    return (
      <div>
        <Routes />
      </div>
    );
  }
}
