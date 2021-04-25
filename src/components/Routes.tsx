import { lazy, StrictMode, Suspense } from "react";
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import { Footer } from "./Footer";
import { RouteLoading } from "./RouteLoading";
import { TopBar } from "./TopBar";

const Cv = lazy(() => import(/* webpackChunkName: "cv" */ "./Cv").then(({ Cv }) => ({ default: Cv })));

const Contact = lazy(() =>
  import(/* webpackChunkName: "contact" */ "./Contact").then(({ Contact }) => ({ default: Contact }))
);

const Home = lazy(() => import(/* webpackChunkName: "home" */ "./Home").then(({ Home }) => ({ default: Home })));

const PageNotFound = lazy(() =>
  import(/* webpackChunkName: "pagenotfound" */ "./PageNotFound").then(({ PageNotFound }) => ({
    default: PageNotFound
  }))
);

const Post = lazy(() => import(/* webpackChunkName: "post" */ "./Post").then(({ Post }) => ({ default: Post })));

const Posts = lazy(() => import(/* webpackChunkName: "posts" */ "./Posts").then(({ Posts }) => ({ default: Posts })));

const Travelling = lazy(() =>
  import(/* webpackChunkName: "travelling" */ "./Travelling").then(({ Travelling }) => ({ default: Travelling }))
);
const PrivacyPolicy = lazy(() =>
  import(/* webpackChunkName: "privacy" */ "./PrivacyPolicy").then(({ PrivacyPolicy }) => ({ default: PrivacyPolicy }))
);

const StayAlert = lazy(() =>
  import(/* webpackChunkName: "stayalert" */ "./StayAlert/StayAlert").then(({ StayAlert }) => ({ default: StayAlert }))
);

const GovernmentTwitter = lazy(() =>
  import(
    /* webpackChunkName: "governmenttwitter" */ "./GovernmentTwitter/GovernmentTwitter"
  ).then(({ GovernmentTwitter }) => ({ default: GovernmentTwitter }))
);

const TheVapeDomain = lazy(() =>
  import(/* webpackChunkName: "thevape" */ "./TheVapeDomain").then(({ TheVapeDomain }) => ({
    default: TheVapeDomain
  }))
);

export const Routes = (): Router => {
  return (
    <Router>
      <StrictMode>
        <Link to="#main-content" className="skip-link">
          Skip to content
        </Link>
        <TopBar />
        <main>
          <Suspense fallback={<RouteLoading />}>
            <Switch>
              <Route exact={true} path="/" component={Home} />
              <Route exact={true} path="/cv" component={Cv} />
              <Route exact={true} path="/contact" component={Contact} />
              <Route exact={true} path="/travel" component={Travelling} />
              <Route exact={true} path="/privacy" component={PrivacyPolicy} />
              <Route exact={true} path="/the-vape" component={TheVapeDomain} />
              <Route exact={true} path="/stay-alert" component={StayAlert} />
              <Route exact={true} path="/government-tweet" component={GovernmentTwitter} />
              <Route exact={true} path="/blog" component={Posts} />
              <Route exact={true} path="/blog/:date/:post" component={Post} />
              <Route component={PageNotFound} />
            </Switch>
          </Suspense>
        </main>
        {/*<Footer />*/}
      </StrictMode>
    </Router>
  );
};
