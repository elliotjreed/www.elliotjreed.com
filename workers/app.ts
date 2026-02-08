import { createRequestHandler } from "react-router";
import { lastModifiedByPath } from "../app/data/contentRegistry";
import { type StaticLink, staticLinks } from "../app/data/staticLinks";

// biome-ignore lint/suspicious/noEmptyInterface: Env interface may be extended with environment variables in the future
interface Env {}

declare global {
  interface CloudflareEnvironment extends Env {}
}

declare module "react-router" {
  export interface AppLoadContext {
    cloudflare: {
      env: CloudflareEnvironment;
      ctx: ExecutionContext;
    };
    nonce: string;
  }
}

const SITE_URL = "https://www.elliotjreed.com";

const generateNonce = (): string => {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
};

function extractUrls(links: StaticLink[], urls: string[] = []): string[] {
  for (const link of links) {
    if (link.href) {
      urls.push(link.href);
    }
    if (link.children) {
      extractUrls(link.children, urls);
    }
  }
  return urls;
}

function generateSitemap(urls: string[]): string {
  const urlEntries = urls
    .map(
      (url: string): string => {
        const lastmod = lastModifiedByPath[url];
        const lastmodEntry = lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : "";

        return `  <url>
    <loc>${SITE_URL}${url}</loc>
${lastmodEntry}    <changefreq>monthly</changefreq>
    <priority>${url === "/" ? "1.0" : "0.8"}</priority>
  </url>`;
      },
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

const requestHandler = createRequestHandler(() => import("virtual:react-router/server-build"), import.meta.env.MODE);

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const nonce = generateNonce();

    // Handle sitemap.xml directly
    if (url.pathname === "/sitemap.xml") {
      const urls = extractUrls(staticLinks);
      const sitemap = generateSitemap(urls);

      return new Response(sitemap, {
        status: 200,
        headers: {
          "Content-Type": "application/xml; charset=utf-8",
          "Cache-Control": "public, max-age=86400",
          "X-Frame-Options": "DENY",
          "X-Content-Type-Options": "nosniff",
          "Referrer-Policy": "strict-origin-when-cross-origin",
          "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
          "Cross-Origin-Opener-Policy": "same-origin",
          "Cross-Origin-Resource-Policy": "same-site",
        },
      });
    }

    const response = await requestHandler(request, {
      cloudflare: { env, ctx },
      nonce,
    });

    const headers = new Headers(response.headers);
    const contentType = headers.get("Content-Type") ?? "";

    if (request.method === "GET" && contentType.includes("text/html")) {
      headers.set("Cache-Control", "public, max-age=0, s-maxage=600, stale-while-revalidate=86400");
    }

    headers.set("X-Frame-Options", "DENY");

    headers.set("X-Content-Type-Options", "nosniff");

    headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

    headers.set(
      "Content-Security-Policy",
      [
        "default-src 'self'",
        `script-src 'self' 'nonce-${nonce}' https://static.cloudflareinsights.com`,
        `script-src-elem 'self' 'nonce-${nonce}' https://static.cloudflareinsights.com`,
        "style-src 'self' 'unsafe-inline'",
        "font-src 'self'",
        "img-src 'self' data: https:",
        "connect-src 'self' https://static.cloudflareinsights.com",
        "frame-ancestors 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ].join("; "),
    );

    headers.set("Permissions-Policy", "accelerometer=(), ambient-light-sensor=(), autoplay=(), battery=(), bluetooth=(), browsing-topics=(), camera=(), display-capture=(), document-domain=(), encrypted-media=(), execution-while-not-rendered=(), execution-while-out-of-viewport=(), fullscreen=(self), gamepad=(), geolocation=(), gyroscope=(), hid=(), idle-detection=(), local-fonts=(self), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), screen-wake-lock=(), serial=(), speaker-selection=(), usb=(), web-share=(self), xr-spatial-tracking=()");

    headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
    headers.set("Cross-Origin-Opener-Policy", "same-origin");
    headers.set("Cross-Origin-Resource-Policy", "same-site");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
} satisfies ExportedHandler<CloudflareEnvironment>;
