import { describe, expect, it } from "vitest";
import { createAmpLink, createMeta } from "./seo";

describe("createMeta", () => {
  const baseOptions = {
    title: "Test Page | EJR",
    description: "A test page description.",
    url: "https://www.elliotjreed.com/test-page",
  };

  it("includes a canonical link tag for the given URL", () => {
    const meta = createMeta(baseOptions);

    expect(meta).toContainEqual({
      tagName: "link",
      rel: "canonical",
      href: "https://www.elliotjreed.com/test-page",
    });
  });

  it("includes the page title", () => {
    const meta = createMeta(baseOptions);

    expect(meta).toContainEqual({ title: "Test Page | EJR" });
  });

  it("includes the meta description", () => {
    const meta = createMeta(baseOptions);

    expect(meta).toContainEqual({ name: "description", content: "A test page description." });
  });

  it("includes Open Graph tags", () => {
    const meta = createMeta(baseOptions);

    expect(meta).toContainEqual({ property: "og:url", content: "https://www.elliotjreed.com/test-page" });
    expect(meta).toContainEqual({ property: "og:title", content: "Test Page | EJR" });
    expect(meta).toContainEqual({ property: "og:description", content: "A test page description." });
  });

  it("defaults og:type to website", () => {
    const meta = createMeta(baseOptions);

    expect(meta).toContainEqual({ property: "og:type", content: "website" });
  });

  it("sets og:type to article when specified", () => {
    const meta = createMeta({ ...baseOptions, type: "article" });

    expect(meta).toContainEqual({ property: "og:type", content: "article" });
  });

  it("includes keywords tag when keywords are provided", () => {
    const meta = createMeta({ ...baseOptions, keywords: ["foo", "bar"] });

    expect(meta).toContainEqual({ name: "keywords", content: "foo, bar" });
  });

  it("omits keywords tag when no keywords are provided", () => {
    const meta = createMeta(baseOptions);

    expect(meta.find((m) => "name" in m && m.name === "keywords")).toBeUndefined();
  });
});

describe("createAmpLink", () => {
  it("returns an amphtml link descriptor for the given path", () => {
    const link = createAmpLink("/ai/some-guide");

    expect(link).toEqual({
      tagName: "link",
      rel: "amphtml",
      href: "https://www.elliotjreed.com/amp/ai/some-guide",
    });
  });
});
