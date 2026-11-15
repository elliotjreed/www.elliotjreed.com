import { describe, expect, it } from "vitest";
import { meta } from "./the-vape";

describe("the-vape route", () => {
  it("asks search engines not to index the page", () => {
    expect(meta()).toContainEqual({ name: "robots", content: "noindex" });
  });
});
