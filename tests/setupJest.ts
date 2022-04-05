import "whatwg-fetch";

jest.mock("react-ga", () => ({
  pageview: () => {}
}));

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    matches: false
  }))
});
