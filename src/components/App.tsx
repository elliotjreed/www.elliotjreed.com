import { FC, ReactElement } from "react";
import { Helmet } from "react-helmet";

import { usePageView } from "../hooks/usePageView";
import { TopBar } from "./TopBar";
import ErrorBoundary from "./ErrorBoundary";
import { Routes } from "./Routes";
import { Footer } from "./Footer";

export const App: FC = (): ReactElement => {
  usePageView();

  return (
    <>
      <Helmet>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Elliot J. Reed" />
        <meta
          property="og:description"
          content="Elliot's website - a little bit about me, my work, system administration and programming articles, and projects I'm working on."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1648587259/og.png"
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@elliotjreed" />
        <meta name="twitter:title" content="Elliot J. Reed" />
        <meta
          name="twitter:description"
          content="Elliot's website - a little bit about me, my work, system administration and programming articles, and projects I'm working on."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1648588302/og-no-number.png"
        />
      </Helmet>
      <a href="#main-content" className="sr-only focus:not-sr-only">
        Skip to content
      </a>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
        <div className="flex h-screen flex-col justify-between">
          <TopBar />

          <main className="mb-auto" id="main-content">
            <ErrorBoundary>
              <Routes />
            </ErrorBoundary>
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
};
