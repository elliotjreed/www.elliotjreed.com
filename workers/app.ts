import { createRequestHandler, RouterContextProvider } from "react-router";
import { cloudflareContext, nonceContext } from "../app/context/loadContext";
import { lastModifiedByPath, unlistedPaths } from "../app/data/contentRegistry";
import { type StaticLink, staticLinks } from "../app/data/staticLinks";
import { themeScriptHash } from "../app/utils/themeScript";
import { ampRedirectPath } from "./redirects";
import { contentSecurityPolicy, securityHeaders } from "./securityHeaders";
import { generateSitemap } from "./sitemap";

let themeHashPromise: Promise<string> | undefined;

interface Env {}

declare global {
  interface CloudflareEnvironment extends Env {}
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

const PERMANENT_REDIRECTS: Record<string, string> = {
  "/blog/2019-03-29/detect-disposable-or-temporary-email-addresses-in-php":
    "/php/detect-disposable-or-temporary-email-addresses-in-php",
  "/blog/2020-09-02/get-docker-and-docker-compose-container-ip-addresses":
    "/docker/get-docker-and-docker-compose-container-ip-addresses",
  "/post/docker/2016-12-29_Clean_up_Docker": "/docker/delete-all-docker-containers-and-images",
};

const requestHandler = createRequestHandler(() => import("virtual:react-router/server-build"), import.meta.env.MODE);

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const nonce = generateNonce();

    const redirectTarget = PERMANENT_REDIRECTS[url.pathname] ?? ampRedirectPath(url.pathname);
    if (redirectTarget) {
      return Response.redirect(`${SITE_URL}${redirectTarget}`, 301);
    }

    // Handle sitemap.xml directly
    if (url.pathname === "/sitemap.xml") {
      const canonicalUrls = extractUrls(staticLinks).filter((path) => !unlistedPaths.includes(path));
      const sitemap = generateSitemap(canonicalUrls, lastModifiedByPath);

      return new Response(sitemap, {
        status: 200,
        headers: {
          "Content-Type": "application/xml; charset=utf-8",
          "Cache-Control": "public, max-age=86400",
          ...securityHeaders,
        },
      });
    }

    const loadContext = new RouterContextProvider();
    loadContext.set(cloudflareContext, { env, ctx });
    loadContext.set(nonceContext, nonce);

    const response = await requestHandler(request, loadContext);

    const headers = new Headers(response.headers);
    const contentType = headers.get("Content-Type") ?? "";

    if (request.method === "GET" && contentType.includes("text/html")) {
      headers.set("Cache-Control", "public, max-age=0, s-maxage=600, stale-while-revalidate=86400");
    }

    themeHashPromise ??= themeScriptHash();
    const themeHash = await themeHashPromise;

    for (const [name, value] of Object.entries(securityHeaders)) {
      headers.set(name, value);
    }
    headers.set("Content-Security-Policy", contentSecurityPolicy([`'nonce-${nonce}'`, themeHash]));

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
} satisfies ExportedHandler<CloudflareEnvironment>;
