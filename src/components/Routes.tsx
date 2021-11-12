import { lazy, StrictMode, Suspense } from "react";
import { BrowserRouter, Link, Route, Routes as RouterRoutes } from "react-router-dom";
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
  import(/* webpackChunkName: "governmenttwitter" */ "./GovernmentTwitter/GovernmentTwitter").then(
    ({ GovernmentTwitter }) => ({ default: GovernmentTwitter })
  )
);

const TheVapeDomain = lazy(() =>
  import(/* webpackChunkName: "thevape" */ "./TheVapeDomain").then(({ TheVapeDomain }) => ({
    default: TheVapeDomain
  }))
);

export const Routes = (): JSX.Element => {
  return (
    <BrowserRouter>
      <StrictMode>
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
      </StrictMode>
    </BrowserRouter>
  );
};
