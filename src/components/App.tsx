import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Posts from "./Posts";
import Post from "./Post";
import PageNotFound from "./PageNotFound";
import "./../assets/scss/App.scss";
import TopBar from "./TopBar";
import * as OfflinePluginRuntime from 'offline-plugin/runtime';

interface EmptyProps {
}

interface EmptyState {
}

export default class App extends React.Component<EmptyProps, EmptyState> {
  constructor(props: EmptyProps) {
    super(props);
    OfflinePluginRuntime.install();
  }

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
