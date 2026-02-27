import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";
import { NonceContext } from "~/context/nonce";

const nonce = (document.querySelector("meta[name='csp-nonce']") as HTMLMetaElement | null)?.content ?? "";

hydrateRoot(
  document,
  <NonceContext.Provider value={nonce}>
    <HydratedRouter />
  </NonceContext.Provider>,
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", (): void => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration): void => console.log("SW registered: ", registration))
      .catch((registrationError): void => console.log("SW registration failed: ", registrationError));
  });
}
