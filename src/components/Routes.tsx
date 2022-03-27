import { FC, lazy, ReactElement, Suspense } from "react";
import { Link, Route, Routes as RouterRoutes } from "react-router-dom";

// import { Footer } from "./Footer";
import { RouteLoading } from "./RouteLoading";
import { TopBar } from "./TopBar";
import { Spinner } from "./Spinner";

const Cv = lazy(() =>
  import(/* webpackPrefetch: true, webpackChunkName: "cv" */ "./Cv").then(({ Cv }) => ({ default: Cv }))
);

const Contact = lazy(() =>
  import(/* webpackPrefetch: true, webpackChunkName: "contact" */ "./Contact").then(({ Contact }) => ({
    default: Contact
  }))
);

const Home = lazy(() =>
  import(/* webpackPrefetch: true, webpackChunkName: "home" */ "./Home").then(({ Home }) => ({ default: Home }))
);

const PageNotFound = lazy(() =>
  import(/* webpackPrefetch: true, webpackChunkName: "pagenotfound" */ "./PageNotFound").then(({ PageNotFound }) => ({
    default: PageNotFound
  }))
);

const Post = lazy(() =>
  import(/* webpackPrefetch: true, webpackChunkName: "post" */ "./Post").then(({ Post }) => ({ default: Post }))
);

const Posts = lazy(() =>
  import(/* webpackPrefetch: true, webpackChunkName: "posts" */ "./Posts").then(({ Posts }) => ({ default: Posts }))
);

const Travelling = lazy(() =>
  import(/* webpackPrefetch: true, webpackChunkName: "travelling" */ "./Travelling").then(({ Travelling }) => ({
    default: Travelling
  }))
);
const PrivacyPolicy = lazy(() =>
  import(/* webpackPrefetch: true, webpackChunkName: "privacy" */ "./PrivacyPolicy").then(({ PrivacyPolicy }) => ({
    default: PrivacyPolicy
  }))
);

const StayAlert = lazy(() =>
  import(/* webpackPrefetch: true, webpackChunkName: "stayalert" */ "./StayAlert/StayAlert").then(({ StayAlert }) => ({
    default: StayAlert
  }))
);

const GovernmentTwitter = lazy(() =>
  import(
    /* webpackPrefetch: true, webpackChunkName: "governmenttwitter" */ "./GovernmentTwitter/GovernmentTwitter"
  ).then(({ GovernmentTwitter }) => ({ default: GovernmentTwitter }))
);

const TheVapeDomain = lazy(() =>
  import(/* webpackPrefetch: true, webpackChunkName: "thevape" */ "./TheVapeDomain").then(({ TheVapeDomain }) => ({
    default: TheVapeDomain
  }))
);

export const Routes: FC = (): ReactElement => {
  return (
    <Suspense fallback={<Spinner />}>
      <Link to="#main-content" className="skip-link">
        Skip to content
      </Link>

      <TopBar />

      <main>
        <Suspense fallback={<RouteLoading />}>
          <RouterRoutes>
            <Route path="/" element={<Home />} />
            <Route path="/cv" element={<Cv />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/travel" element={<Travelling />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/the-vape" element={<TheVapeDomain />} />
            <Route path="/stay-alert" element={<StayAlert />} />
            <Route path="/government-tweet" element={<GovernmentTwitter />} />
            <Route path="/blog" element={<Posts />} />
            <Route path="/blog/:date/:post" element={<Post />} />
            <Route element={<PageNotFound />} />
          </RouterRoutes>
        </Suspense>
      </main>
      {/*<Footer />*/}
    </Suspense>
  );
};
