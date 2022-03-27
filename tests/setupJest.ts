import "whatwg-fetch";

jest.mock("react-ga", () => ({
  pageview: () => {}
}));
