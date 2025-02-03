import type { ReactNode } from "react";
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { TopBar } from "~/components/TopBar";
import { Footer } from "~/components/Footer";

import type { Route } from "./+types/root";
import "./app.css";

export const Layout = ({ children }: { children: ReactNode }) => (
    <html lang="en">
    <head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, shrink-to-fit=no, initial-scale=1"/>
        <title>Elliot J. Reed</title>
        <meta
            property="og:image"
            content="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1648587259/og.png"
        />
        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:site" content="@elliotjreed"/>
        <meta
            name="twitter:image"
            content="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1648588302/og.png"
        />
        <Meta/>
        <Links/>
    </head>
    <body className="bg-white text-black antialiased dark:bg-gray-900 dark:text-white">
    <a href="#main-content" className="sr-only focus:not-sr-only">
        Skip to content
    </a>

    <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
        <div className="flex h-screen flex-col justify-between">
            <TopBar/>
            <main className="mb-auto" id="main-content">
                {children}
            </main>
            <Footer/>
        </div>
    </div>
    <ScrollRestoration/>
    <Scripts/>
    </body>
    </html>
);

export default function App() {
  return <Outlet />;
}

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
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
