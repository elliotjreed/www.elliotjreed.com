import { FC, lazy, ReactElement, Suspense } from "react";
import { Route, Routes as RouterRoutes } from "react-router-dom";

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

const Projects = lazy(() =>
  import(/* webpackPrefetch: true, webpackChunkName: "thevape" */ "./Projects").then(({ Projects }) => ({
    default: Projects
  }))
);

export const Routes: FC = (): ReactElement => {
  return (
    <RouterRoutes>
      <Route
        path="/"
        element={
          <Suspense fallback={<Spinner />}>
            <Home />
          </Suspense>
        }
      />
      <Route
        path="/cv"
        element={
          <Suspense fallback={<Spinner />}>
            <Cv />
          </Suspense>
        }
      />
      <Route
        path="/contact"
        element={
          <Suspense fallback={<Spinner />}>
            <Contact />
          </Suspense>
        }
      />
      <Route
        path="/travel"
        element={
          <Suspense fallback={<Spinner />}>
            <Travelling />
          </Suspense>
        }
      />
      <Route
        path="/privacy"
        element={
          <Suspense fallback={<Spinner />}>
            <PrivacyPolicy />
          </Suspense>
        }
      />
      <Route
        path="/the-vape"
        element={
          <Suspense fallback={<Spinner />}>
            <TheVapeDomain />
          </Suspense>
        }
      />
      <Route
        path="/stay-alert"
        element={
          <Suspense fallback={<Spinner />}>
            <StayAlert />
          </Suspense>
        }
      />
      <Route
        path="/projects"
        element={
          <Suspense fallback={<Spinner />}>
            <Projects />
          </Suspense>
        }
      />
      <Route
        path="/government-tweet"
        element={
          <Suspense fallback={<Spinner />}>
            <GovernmentTwitter />
          </Suspense>
        }
      />
      <Route
        path="/blog"
        element={
          <Suspense fallback={<Spinner />}>
            <Posts />
          </Suspense>
        }
      />
      <Route
        path="/blog/:date/:post"
        element={
          <Suspense fallback={<Spinner />}>
            <Post />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense fallback={<Spinner />}>
            <PageNotFound />
          </Suspense>
        }
      />
    </RouterRoutes>
  );
};
