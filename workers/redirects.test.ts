import { describe, expect, it } from "vitest";
import { ampRedirectPath } from "./redirects";

describe("ampRedirectPath", () => {
  it("redirects the AMP home page to the home page", () => {
    expect(ampRedirectPath("/amp")).toBe("/");
    expect(ampRedirectPath("/amp/")).toBe("/");
  });

  it("redirects an AMP page to its canonical page", () => {
    expect(ampRedirectPath("/amp/linux/zsh-bash-aliases")).toBe("/linux/zsh-bash-aliases");
  });

  it("drops a trailing slash from the canonical page", () => {
    expect(ampRedirectPath("/amp/linux/zsh-bash-aliases/")).toBe("/linux/zsh-bash-aliases");
  });

  it("collapses repeated slashes so the target stays on this site", () => {
    expect(ampRedirectPath("/amp//example.com/path")).toBe("/example.com/path");
  });

  it("ignores paths that only start with the letters amp", () => {
    expect(ampRedirectPath("/ampersand")).toBeNull();
  });

  it("ignores non-AMP paths", () => {
    expect(ampRedirectPath("/linux/zsh-bash-aliases")).toBeNull();
    expect(ampRedirectPath("/")).toBeNull();
  });
});
