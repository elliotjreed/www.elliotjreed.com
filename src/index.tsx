import * as React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import App from "./components/App";
import "./assets/scss/App.scss";


if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").then(registration => {
      console.log("SW registered: ", registration);
    }).catch(registrationError => {
      console.log("SW registration failed: ", registrationError);
    });
  });
}

const rootEl: Element = document.getElementById("root");

render(
  <AppContainer>
    <App/>
  </AppContainer>,
  rootEl
);

declare let module: { hot: any };
if (module.hot) {
  module.hot.accept("./components/App", () => {
    const NewApp = require("./components/App").default;

    render(
      <AppContainer>
        <NewApp/>
      </AppContainer>,
      rootEl
    );
  });
}
