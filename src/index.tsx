import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { initialize } from "react-ga";

import { Routes } from "./components/Routes";
import "./assets/scss/app.scss";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", (): void => {
    navigator.serviceWorker.register("/service-worker.js").catch((error: Error): void => console.error(error));
  });
}

initialize("UA-90440102-1");

const rootEl: Element = document.getElementById("root");

hydrateRoot(
  rootEl,
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
);
