import * as React from "react";
import { BrowserRouter, Link, Switch, Route, browserHistory } from "react-router-dom";
import "./../assets/scss/App.scss";
import Posts from "./Posts";
import Post from "./Post";
import Home from "./Home";
import PageNotFound from "./PageNotFound";

interface CategoriesProps {
}

interface CategoriesState {
  categories: Array<string>,
  loading: boolean
}

export default class Routes extends React.Component<CategoriesProps, CategoriesState> {

  public render(): React.ReactNode {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/" component={Home}/>
          <Route exact={true} path="/category/:category" component={Posts}/>
          <Route exact={true} path="/post/:category/:post" component={Post}/>
          <Route component={PageNotFound}/>
        </Switch>
      </BrowserRouter>
    );
  }
}
