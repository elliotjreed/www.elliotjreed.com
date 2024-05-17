import "@testing-library/jest-dom";
import "whatwg-fetch";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    matches: false
  }))
});
