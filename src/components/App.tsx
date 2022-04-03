import { FC, ReactElement } from "react";

import { Footer } from "./Footer";
import { Routes } from "./Routes";
import { TopBar } from "./TopBar";

export const App: FC = (): ReactElement => {
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only">
        Skip to content
      </a>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
        <div className="flex h-screen flex-col justify-between">
          <TopBar />

          <main className="mb-auto" id="main-content">
            <Routes />
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
};
