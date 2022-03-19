import { StrictMode } from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import * as ReactGA from "react-ga";

import "./assets/scss/app.scss";
import { Routes } from "./components/Routes";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", (): void => {
    navigator.serviceWorker.register("/service-worker.js").catch((error: Error): void => console.error(error));
  });
}

ReactGA.initialize("UA-90440102-1");

const rootEl: Element = document.getElementById("root");

hydrate(
  <StrictMode>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </StrictMode>,
  rootEl
);
