import * as React from "react";
import "./../assets/scss/App.scss";
import Categories from "./Categories";

const reactLogo = require("../assets/img/react_logo.svg");

export default class Home extends React.Component {
  public render() {
    return (
      <div className="app">
        <h1>Hello World!</h1>
        <img src={reactLogo} height="480"/>
        <Categories/>
      </div>
    );
  }
}
