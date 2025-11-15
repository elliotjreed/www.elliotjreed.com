import { Window } from "happy-dom";

// Set up happy-dom window BEFORE any other imports
const window = new Window({
  url: "http://localhost",
  width: 1024,
  height: 768,
});

// Set up global variables
globalThis.window = window as unknown as Window & typeof globalThis;
globalThis.document = window.document;
globalThis.navigator = window.navigator as Navigator;
globalThis.HTMLElement = window.HTMLElement;
globalThis.HTMLAnchorElement = window.HTMLAnchorElement;
globalThis.HTMLButtonElement = window.HTMLButtonElement;
globalThis.HTMLInputElement = window.HTMLInputElement;
globalThis.HTMLTextAreaElement = window.HTMLTextAreaElement;
globalThis.HTMLSelectElement = window.HTMLSelectElement;
globalThis.HTMLFormElement = window.HTMLFormElement;
globalThis.Element = window.Element;
globalThis.Node = window.Node;
globalThis.NodeList = window.NodeList;
globalThis.HTMLCollection = window.HTMLCollection;
globalThis.Text = window.Text;
globalThis.Comment = window.Comment;
globalThis.DocumentFragment = window.DocumentFragment;

// NOW import testing-library after DOM is set up
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach } from "bun:test";

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia (if not already provided by happy-dom)
if (!window.matchMedia) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => true,
    }),
  });
}
