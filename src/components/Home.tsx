import * as React from "react";
import "./../assets/scss/App.scss";
import Categories from "./Categories";
import AllPosts from "./AllPosts";

const reactLogo = require("../assets/img/react_logo.svg");

interface EmptyProps {
}

interface EmptyState {
}

export default class Home extends React.Component<EmptyProps, EmptyState> {
  public render(): React.ReactNode {
    return (
      <div className="app">
        <h1>Hello World!</h1>
        <img src={reactLogo} height="480"/>
        <Categories/>
        <AllPosts />
      </div>
    );
  }
}
