import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Footer } from "./Footer";
import { RouteLoading } from "./RouteLoading";
import { TopBar } from "./TopBar";

const Cv = React.lazy(() => import(/* webpackChunkName: "cv" */ "./Cv").then(({ Cv }) => ({ default: Cv })));

const Home = React.lazy(() => import(/* webpackChunkName: "home" */ "./Home").then(({ Home }) => ({ default: Home })));

const PageNotFound = React.lazy(() =>
  import(/* webpackChunkName: "pagenotfound" */ "./PageNotFound").then(({ PageNotFound }) => ({
    default: PageNotFound
  }))
);

const Post = React.lazy(() => import(/* webpackChunkName: "post" */ "./Post").then(({ Post }) => ({ default: Post })));

const Posts = React.lazy(() =>
  import(/* webpackChunkName: "posts" */ "./Posts").then(({ Posts }) => ({ default: Posts }))
);

const Travelling = React.lazy(() =>
  import(/* webpackChunkName: "travelling" */ "./Travelling").then(({ Travelling }) => ({ default: Travelling }))
);

export const Routes = (): Router => {
  return (
    <Router>
      <TopBar />
      <main>
        <React.Suspense fallback={<RouteLoading />}>
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/cv" component={Cv} />
            <Route exact={true} path="/travel" component={Travelling} />
            <Route exact={true} path="/category/:category" component={Posts} />
            <Route exact={true} path="/post/:category/:post" component={Post} />
            <Route component={PageNotFound} />
          </Switch>
        </React.Suspense>
      </main>
      <Footer />
    </Router>
  );
};
