import { render } from "react-dom";
import * as ReactGA from "react-ga";

import "./assets/scss/App.scss";
import { App } from "./components/App";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").catch((error: Error): void => console.error(error));
  });
}

ReactGA.initialize("UA-90440102-1");

const rootEl: Element = document.getElementById("root");

render(<App />, rootEl);
