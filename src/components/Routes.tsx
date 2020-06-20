import * as React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { Footer } from "./Footer";
import { Spinner } from "./Spinner";
import { TopBar } from "./TopBar";
import "./../assets/scss/App.scss";

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
const Sitemap = React.lazy(() =>
  import(/* webpackChunkName: "sitemap" */ "./Sitemap").then(({ Sitemap }) => ({ default: Sitemap }))
);
const Travelling = React.lazy(() =>
  import(/* webpackChunkName: "travelling" */ "./Travelling").then(({ Travelling }) => ({ default: Travelling }))
);

interface Props {}
interface State {}

export class Routes extends React.Component<Props, State> {
  public render(): Router {
    return (
      <Router>
        <TopBar />
        <React.Suspense fallback={<Spinner />}>
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/sitemap" component={Sitemap} />
            <Route exact={true} path="/cv" component={Cv} />
            <Route exact={true} path="/travel" component={Travelling} />
            <Route exact={true} path="/category/:category" component={Posts} />
            <Route exact={true} path="/post/:category/:post" component={Post} />
            <Route component={PageNotFound} />
          </Switch>
        </React.Suspense>
        <Footer />
      </Router>
    );
  }
}
