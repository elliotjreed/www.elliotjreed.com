import type { ReactElement, ReactNode } from "react";
import { Link, Links, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse } from "react-router";
import { Footer } from "~/components/Footer";
import { NavBar } from "~/components/NavBar";

import type { Route } from "./+types/root";
import "./app.css";

export const Layout = ({ children }: { children: ReactNode }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, shrink-to-fit=no, initial-scale=1" />
      <title>Elliot J. Reed</title>
      <meta property="og:image" content="https://www.elliotjreed.com/og.png" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@elliotjreed" />
      <meta name="twitter:image" content="https://www.elliotjreed.com/og.png" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet"
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

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
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
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl">
          {message}
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">{details}</p>
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
