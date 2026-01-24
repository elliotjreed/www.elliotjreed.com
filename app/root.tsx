import type { ReactElement, ReactNode } from "react";
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { Footer } from "~/components/Footer/Footer";
import { NavBar } from "~/components/NavBar/NavBar";

import type { Route } from "./+types/root";
import "./app.css";

export const Layout = ({ children }: { children: ReactNode }): ReactElement => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, shrink-to-fit=no, initial-scale=1" />
      <title>Elliot J. Reed | EJR</title>
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
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fira+Code&family=Fira+Sans:wght@700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
      />
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
          <main className="mb-auto" id="main-content">
            {children}
          </main>
          <Footer />
        </div>
      </div>
      <ScrollRestoration />
      <Scripts />
    </body>
  </html>
);

export default (): ReactElement => <Outlet />;

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps): ReactElement {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <section className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-700 dark:text-gray-200 sm:text-4xl sm:leading-10 md:text-6xl">
          {message}
        </h1>
        <p className="text-lg leading-7 text-gray-600 dark:text-gray-300">{details}</p>
      </div>

      {stack && (
        <div className="prose max-w-none dark:prose-dark">
          <pre className="w-full p-4 overflow-x-auto">
            <code>{stack}</code>
          </pre>
        </div>
      )}
    </section>
  );
}
