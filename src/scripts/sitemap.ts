import { writeFileSync } from "fs";

import { BlogPosting } from "../interfaces/BlogPosting";
import { ApiResponse } from "../interfaces/ApiResponse";
import { staticLinks } from "../data/staticLinks";
import { StaticLink } from "../interfaces/StaticLink";
import { Blog } from "../interfaces/Blog";

const currentDate = new Date().toISOString();

fetch("https://api.elliotjreed.com/blog/posts", {
  method: "GET",
  headers: { Accept: "application/json" }
})
  .then((response: Response): Promise<any> => response.json())
  .then((response: ApiResponse<Blog>): void => {
    let content = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>https://www.elliotjreed.com</loc>
          <lastmod>${currentDate}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.8</priority>
        </url>`;

    staticLinks.map((link: StaticLink): void => {
      content += `<url>
        <loc>https://www.elliotjreed.com${link.href}</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.4</priority>
      </url>`;
    });

    const posts = response.data.blogPosts;

    posts.sort((a: BlogPosting, b: BlogPosting): number => b.dateCreated.localeCompare(a.dateCreated));

    posts.map((post: BlogPosting) => {
      content += `<url>
          <loc>${post.url}</loc>
          <lastmod>${post.dateModified}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.6</priority>
        </url>`;
    });

    content += "</urlset>";

    try {
      writeFileSync("dist/static/sitemap.xml", content.replace(/>\s*/g, ">").replace(/\s*</g, "<"));

      console.log("Sitemap generated!");
    } catch (error: unknown) {
      console.error(error);
    }
  });
