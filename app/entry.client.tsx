import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";

hydrateRoot(document, <HydratedRouter />);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", (): void => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration): void => console.log("SW registered: ", registration))
      .catch((registrationError): void => console.log("SW registration failed: ", registrationError));
  });
}
