import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./../assets/scss/App.scss";
import Home from "./Home";
import PageNotFound from "./PageNotFound";
import Post from "./Post";
import Posts from "./Posts";
import TopBar from "./TopBar";

export default class App extends React.Component<{}, {}> {
  public render(): React.ReactNode {
    return (
      <div>
        <BrowserRouter>
          <TopBar/>
          <Switch>
            <Route exact={true} path="/" component={Home}/>
            <Route exact={true} path="/category/:category" component={Posts}/>
            <Route exact={true} path="/post/:category/:post" component={Post}/>
            <Route component={PageNotFound}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
