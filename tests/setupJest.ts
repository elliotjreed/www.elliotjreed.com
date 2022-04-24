import "whatwg-fetch";

jest.mock("react-ga", () => ({
  pageview: () => jest.fn(),
  event: () => jest.fn()
}));

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    matches: false
  }))
});
