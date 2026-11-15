import { describe, expect, it } from "vitest";
import { generateSitemap } from "./sitemap";

describe("generateSitemap", () => {
  const sitemap = generateSitemap(["/", "/linux/zsh-bash-aliases"], { "/linux/zsh-bash-aliases": "2026-01-30" });

  it("lists each URL on the canonical host", () => {
    expect(sitemap).toContain("<loc>https://www.elliotjreed.com/</loc>");
    expect(sitemap).toContain("<loc>https://www.elliotjreed.com/linux/zsh-bash-aliases</loc>");
  });

  it("includes lastmod only where a date is known", () => {
    expect(sitemap).toContain("<lastmod>2026-01-30</lastmod>");
    expect(sitemap.match(/<lastmod>/g)).toHaveLength(1);
  });

  it("omits changefreq and priority, which search engines ignore", () => {
    expect(sitemap).not.toContain("<changefreq>");
    expect(sitemap).not.toContain("<priority>");
  });
});
