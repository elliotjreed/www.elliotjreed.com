import { createBrowserHistory } from "history";
import * as React from "react";
import * as ReactGA from "react-ga";
import { Route, Router, Switch } from "react-router-dom";

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

const history = createBrowserHistory();
history.listen(location => {
  ReactGA.set({ page: location.pathname + location.search });
  ReactGA.pageview(location.pathname + location.search);
});

export class Routes extends React.Component<{}, {}> {
  public componentDidMount(): void {
    ReactGA.pageview(window.location.pathname + location.search);
  }

  public render(): Router {
    return (
      <Router history={history}>
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
