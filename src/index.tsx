import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./polyfills";
import { App } from "./components/App";
import "./assets/css/tailwind.css";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", (): void => {
    navigator.serviceWorker.register("/service-worker.js").catch((error: Error): void => console.error(error));
  });
}

const rootEl: Element = document.getElementById("root");

hydrateRoot(
  rootEl,
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
