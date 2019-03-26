import { createBrowserHistory } from "history";
import * as React from "react";
import * as ReactGA from "react-ga";
import { Route, Router, Switch } from "react-router-dom";

import "./../assets/scss/App.scss";
import Home from "./Home";
import PageNotFound from "./PageNotFound";
import Post from "./Post";
import Posts from "./Posts";
import TopBar from "./TopBar";
import Footer from "./Footer";
import Sitemap from "./Sitemap";

const history = createBrowserHistory();
history.listen(location => {
  ReactGA.set({ page: location.pathname + location.search });
  ReactGA.pageview(location.pathname + location.search);
});

export default class Routes extends React.Component<{}, {}> {
  public componentDidMount(): void {
    ReactGA.pageview(window.location.pathname + location.search);
  }

  public render(): React.ReactNode {
    return (
      <Router history={history}>
        <TopBar/>
        <Switch>
          <Route exact={true} path="/" component={Home}/>
          <Route exact={true} path="/sitemap" component={Sitemap}/>
          <Route exact={true} path="/category/:category" component={Posts}/>
          <Route exact={true} path="/post/:category/:post" component={Post}/>
          <Route component={PageNotFound}/>
        </Switch>
        <Footer/>
      </Router>
    );
  }
}
