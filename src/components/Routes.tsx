import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import { Footer } from "./Footer";
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

const StayAlert = React.lazy(() =>
  import(/* webpackChunkName: "stayalert" */ "./StayAlert/StayAlert").then(({ StayAlert }) => ({ default: StayAlert }))
);

const GovernmentTwitter = React.lazy(() =>
  import(
    /* webpackChunkName: "governmenttwitter" */ "./GovernmentTwitter/GovernmentTwitter"
  ).then(({ GovernmentTwitter }) => ({ default: GovernmentTwitter }))
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
            <Route exact={true} path="/stay-alert" component={StayAlert} />
            <Route exact={true} path="/government-tweet" component={GovernmentTwitter} />
            <Route exact={true} path="/blog" component={Posts} />
            <Route exact={true} path="/blog/:date/:post" component={Post} />
            <Route component={PageNotFound} />
          </Switch>
        </React.Suspense>
      </main>
      {/*<Footer />*/}
    </Router>
  );
};
