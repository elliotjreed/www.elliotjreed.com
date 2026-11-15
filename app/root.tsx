import type { ReactElement, ReactNode } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  type MetaDescriptor,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { Footer } from "~/components/Footer/Footer";
import { NavBar } from "~/components/NavBar/NavBar";
import { useNonce } from "~/context/nonce";
import { themeScript } from "~/utils/themeScript";

import type { Route } from "./+types/root";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./fonts.css";
import "./app.css";

config.autoAddCss = false;

const SITE_URL = "https://www.elliotjreed.com";

const DEFAULT_SOCIAL_IMAGE = "https://www.elliotjreed.com/og.png";

export const meta: Route.MetaFunction = ({ location, matches, error }) => {
  if (isRouteErrorResponse(error) && error.status === 404) {
    return [{ title: "Page not found | Elliot J. Reed" }, { name: "robots", content: "noindex" }];
  }

  const safeMatches = matches ?? [];
  const metaFromMatches = safeMatches.flatMap((match) => match?.meta ?? []);

  const hasProperty = (property: string): boolean =>
    metaFromMatches.some((meta) => "property" in meta && meta.property === property);
  const hasName = (name: string): boolean => metaFromMatches.some((meta) => "name" in meta && meta.name === name);
  const hasLinkRel = (rel: string): boolean =>
    metaFromMatches.some((meta) => "tagName" in meta && meta.tagName === "link" && meta.rel === rel);

  const title = [...metaFromMatches]
    .reverse()
    .find(
      (meta): meta is MetaDescriptor & { title: string } => "title" in meta && typeof meta.title === "string",
    )?.title;
  const description = [...metaFromMatches]
    .reverse()
    .find(
      (meta): meta is MetaDescriptor & { name: string; content?: string } =>
        "name" in meta && meta.name === "description" && typeof meta.content === "string",
    )?.content;

  const canonicalUrl = new URL(location.pathname, SITE_URL).toString();
  const derivedMeta: MetaDescriptor[] = [];

  if (!hasLinkRel("canonical")) {
    derivedMeta.push({ tagName: "link", rel: "canonical", href: canonicalUrl });
  }

  if (title) {
    if (!hasProperty("og:title")) derivedMeta.push({ property: "og:title", content: title });
    if (!hasName("twitter:title")) derivedMeta.push({ name: "twitter:title", content: title });
  }

  if (description) {
    if (!hasProperty("og:description")) derivedMeta.push({ property: "og:description", content: description });
    if (!hasName("twitter:description")) derivedMeta.push({ name: "twitter:description", content: description });
  }

  if (!hasProperty("og:url")) derivedMeta.push({ property: "og:url", content: canonicalUrl });
  if (!hasProperty("og:type")) derivedMeta.push({ property: "og:type", content: "website" });
  if (!hasProperty("og:site_name")) derivedMeta.push({ property: "og:site_name", content: "Elliot J. Reed" });
  if (!hasProperty("og:locale")) derivedMeta.push({ property: "og:locale", content: "en_GB" });

  if (!hasProperty("og:image")) derivedMeta.push({ property: "og:image", content: DEFAULT_SOCIAL_IMAGE });
  if (!hasName("twitter:card")) derivedMeta.push({ name: "twitter:card", content: "summary" });
  if (!hasName("twitter:site")) derivedMeta.push({ name: "twitter:site", content: "@elliotjreed" });
  if (!hasName("twitter:image")) derivedMeta.push({ name: "twitter:image", content: DEFAULT_SOCIAL_IMAGE });

  if (!hasProperty("og:image:alt")) {
    derivedMeta.push({ property: "og:image:alt", content: "Elliot J. Reed" });
  }
  if (!hasName("twitter:image:alt")) {
    derivedMeta.push({ name: "twitter:image:alt", content: "Elliot J. Reed" });
  }

  return derivedMeta;
};

export const Layout = ({ children }: { children: ReactNode }): ReactElement => {
  const nonce = useNonce();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#fbf5f4" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#170f0e" media="(prefers-color-scheme: dark)" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="EJR" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link
          rel="preload"
          href="/fonts/atkinson-hyperlegible-next-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link rel="preload" href="/fonts/besley-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        {nonce && <meta name="csp-nonce" content={nonce} />}
        <Meta />
        <Links nonce={nonce || undefined} />
      </head>
      <body>
        <a
          href="#website"
          className="focus:bg-surface-200 focus:text-ink sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[80] focus:rounded-md focus:px-4 focus:py-3"
        >
          Skip to content
        </a>

        <div className="flex min-h-screen flex-col">
          <NavBar />
          <div id="page-content" className="flex flex-1 flex-col">
            <main className="mx-auto mb-auto w-full max-w-(--content-max) px-4 sm:px-8" id="website">
              {children}
            </main>
            <Footer />
          </div>
        </div>
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
};

export default (): ReactElement => <Outlet />;

const CATEGORY_LINKS = [
  { href: "/ai", label: "AI guides" },
  { href: "/linux", label: "ZSH / Bash shell guides" },
  { href: "/docker", label: "Docker guides" },
  { href: "/php", label: "PHP guides" },
];

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps): ReactElement {
  const isRouteError = isRouteErrorResponse(error);

  if (isRouteError && error.status === 404) {
    return (
      <section className="ejr-article divide-line divide-y">
        <div className="space-y-4 pt-12 pb-8">
          <h1 className="text-heading-1 sm:text-display">404</h1>
          <p className="prose ejr-lead">
            Sorry, that page doesn't exist. You might find what you're looking for in one of these sections:
          </p>
          <nav aria-label="Suggested sections">
            <ul className="text-body-long mt-4 space-y-2">
              {CATEGORY_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} className="ejr-link">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    );
  }

  let message = "Something went wrong";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteError) {
    message = "Error";
    details = error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <section className="ejr-article divide-line divide-y">
      <div className="space-y-4 pt-12 pb-8">
        <h1 className="text-heading-1 sm:text-display">{message}</h1>
        <p className="prose ejr-lead">{details}</p>
      </div>

      {stack && (
        <div className="prose ejr-prose">
          <pre className="w-full overflow-x-auto p-4">
            <code>{stack}</code>
          </pre>
        </div>
      )}
    </section>
  );
}
