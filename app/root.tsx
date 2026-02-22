import type { ReactElement, ReactNode } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  type MetaDescriptor,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";
import { Footer } from "~/components/Footer/Footer";
import { NavBar } from "~/components/NavBar/NavBar";

import type { Route } from "./+types/root";
import "./fonts.css";
import "./app.css";

const SITE_URL = "https://www.elliotjreed.com";

export const meta: Route.MetaFunction = ({ location, matches }) => {
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

  if (!hasProperty("og:image:alt")) {
    derivedMeta.push({ property: "og:image:alt", content: "Elliot J. Reed" });
  }
  if (!hasName("twitter:image:alt")) {
    derivedMeta.push({ name: "twitter:image:alt", content: "Elliot J. Reed" });
  }

  return derivedMeta;
};

export const loader = ({ context }: Route.LoaderArgs) => {
  return { nonce: context?.nonce ?? "" };
};

export const Layout = ({ children }: { children: ReactNode }): ReactElement => {
  const loaderData = useLoaderData<typeof loader>() as { nonce: string } | undefined;
  const nonce = loaderData?.nonce ?? "";

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, shrink-to-fit=no, initial-scale=1" />
        <meta property="og:image" content="https://www.elliotjreed.com/og.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@elliotjreed" />
        <meta name="twitter:image" content="https://www.elliotjreed.com/og.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#1f2937" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="EJR" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/icon-maskable-512.png" color="#1f2937" />
        <link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <Meta />
        <Links />
      </head>
      <body className="bg-white text-black antialiased dark:bg-gray-900 dark:text-white">
        <a href="#main-content" className="sr-only focus:not-sr-only">
          Skip to content
        </a>

        <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
          <div className="flex h-screen flex-col justify-between">
            <NavBar />
            <div id="page-content" className="flex flex-1 flex-col">
              <main className="mb-auto" id="main-content">
                {children}
              </main>
              <Footer />
            </div>
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
  { href: "/ai", label: "AI Guides" },
  { href: "/linux", label: "ZSH / Bash Shell Guides" },
  { href: "/docker", label: "Docker Guides" },
  { href: "/php", label: "PHP Guides" },
];

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps): ReactElement {
  const isRouteError = isRouteErrorResponse(error);

  if (isRouteError && error.status === 404) {
    return (
      <section className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-700 sm:text-4xl sm:leading-10 md:text-6xl dark:text-gray-200">
            404
          </h1>
          <p className="prose dark:prose-dark max-w-none text-lg leading-7 text-gray-600 dark:text-gray-300">
            Sorry, that page doesn't exist. You might find what you're looking for in one of these sections:
          </p>
          <nav aria-label="Suggested sections">
            <ul className="mt-4 space-y-2 text-lg">
              {CATEGORY_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-gray-700 underline hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
                  >
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

  let message = "Oops!";
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
    <section className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-700 sm:text-4xl sm:leading-10 md:text-6xl dark:text-gray-200">
          {message}
        </h1>
        <p className="prose dark:prose-dark max-w-none text-lg leading-7 text-gray-600 dark:text-gray-300">{details}</p>
      </div>

      {stack && (
        <div className="prose dark:prose-dark max-w-none">
          <pre className="w-full overflow-x-auto p-4">
            <code>{stack}</code>
          </pre>
        </div>
      )}
    </section>
  );
}
