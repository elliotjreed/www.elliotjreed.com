const SITE_URL = "https://www.elliotjreed.com";

export const generateSitemap = (paths: string[], lastModifiedByPath: Record<string, string>): string => {
  const entries = paths
    .map((path) => {
      const lastModified = lastModifiedByPath[path];
      const lastModifiedEntry = lastModified ? `    <lastmod>${lastModified}</lastmod>\n` : "";

      return `  <url>\n    <loc>${SITE_URL}${path}</loc>\n${lastModifiedEntry}  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;
};
