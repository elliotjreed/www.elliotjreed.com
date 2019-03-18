import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Posts from "./Posts";
import Post from "./Post";
import PageNotFound from "./PageNotFound";
import "./../assets/scss/App.scss";
import TopBar from "./TopBar";

interface EmptyProps {
}

interface EmptyState {
}

export default class App extends React.Component<EmptyProps, EmptyState> {
  public render(): React.ReactNode {
    return (
      <div>
        <BrowserRouter>
          <TopBar/>
          <section className="hero is-info is-small is-bold">
            <div className="hero-body">
              <div className="container has-text-centered">
                <h1 className="title">Lorem ipsum dolor sit amet, consectetur adipiscing elit</h1>
              </div>
            </div>
          </section>
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
