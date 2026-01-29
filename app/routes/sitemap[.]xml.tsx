import type { LoaderFunctionArgs } from "react-router";
import { type StaticLink, staticLinks } from "~/data/staticLinks";

const SITE_URL = "https://www.elliotjreed.com";

const extractUrls = (links: StaticLink[], urls: string[] = []): string[] => {
  for (const link of links) {
    if (link.href) {
      urls.push(link.href);
    }
    if (link.children) {
      extractUrls(link.children, urls);
    }
  }
  return urls;
};

const generateSitemap = (urls: string[]): string => {
  const urlEntries = urls
    .map(
      (url: string): string => `  <url>
    <loc>${SITE_URL}${url}</loc>
    <changefreq>monthly</changefreq>
    <priority>${url === "/" ? "1.0" : "0.8"}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const urls = extractUrls(staticLinks);
  const sitemap = generateSitemap(urls);

  return new Response(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
};
