import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ga, initialize } from "react-ga";

import "./polyfills";
import { App } from "./components/App";
import "./assets/css/tailwind.css";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", (): void => {
    navigator.serviceWorker.register("/service-worker.js").catch((error: Error): void => console.error(error));
  });
}

initialize("UA-90440102-1", { gaOptions: { allowLinker: true } });
ga({
  linker: {
    domains: ["www.elliotjreed.com", "amp.elliotjreed.com"]
  }
});

const rootEl: Element = document.getElementById("root");

hydrateRoot(
  rootEl,
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
