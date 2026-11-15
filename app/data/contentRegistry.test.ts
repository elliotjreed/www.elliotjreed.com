import { describe, expect, it } from "vitest";
import { unlistedPaths } from "./contentRegistry";

describe("unlistedPaths", () => {
  it("lists the pages kept out of the sitemap because they are not indexed", () => {
    expect(unlistedPaths).toEqual(["/the-vape", "/charisma-hair"]);
  });
});
