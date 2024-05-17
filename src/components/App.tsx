import { FC, ReactElement } from "react";
import { Helmet } from "react-helmet";

import { TopBar } from "./TopBar";
import ErrorBoundary from "./ErrorBoundary";
import { Routes } from "./Routes";
import { Footer } from "./Footer";

export const App: FC = (): ReactElement => {
  return (
    <>
      <Helmet>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Elliot J. Reed" />
        <meta
          property="og:description"
          content="Elliot's website - a little bit about me, my work, system administration and programming articles, and projects I'm working on."
        />
        <meta name="twitter:title" content="Elliot J. Reed" />
        <meta
          name="twitter:description"
          content="Elliot's website - a little bit about me, my work, system administration and programming articles, and projects I'm working on."
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
