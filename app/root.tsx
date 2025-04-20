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
      <title>Elliot J. Reed | EJR</title>
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
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          about:
            "Elliot Reed is the Head of Technology for a respected e-commerce retailer based in the United Kingdom, with over 12 years experience in management and software development. Interests include AI, philosophy and ethics, DevOps, and leadership and strategy.",
          alternateName: "Elliot Reed",
          alternativeHeadline: "Elliot Reed's Website",
          author: {
            "@type": "Person",
            additionalName: "John",
            address: {
              "@type": "PostalAddress",
              addressCountry: {
                "@type": "Country",
                name: "United Kingdom",
              },
              addressLocality: "Nottingham",
              addressRegion: "Nottinghamshire",
            },
            alternateName: "Elliot Reed",
            alumniOf: [
              {
                "@type": "CollegeOrUniversity",
                name: "University of Nottingham",
                url: "https://www.nottingham.ac.uk",
              },
              {
                "@type": "CollegeOrUniversity",
                name: "Nottingham Law School, Nottingham Trent University",
                url: "https://www.ntu.ac.uk",
              },
              {
                "@type": "EducationalOrganization",
                name: "Stowupland High School",
                url: "https://www.stowuplandhighschool.co.uk",
              },
            ],
            birthDate: "1990-02-25T12:21:00+00:00",
            birthPlace: {
              "@type": "Place",
              address: {
                "@type": "PostalAddress",
                addressCountry: {
                  "@type": "Country",
                  name: "United Kingdom",
                },
                addressLocality: "Bury St. Edmunds",
                addressRegion: "Suffolk",
              },
            },
            description:
              "Technology leader based in the United Kingdom, focusing on software engineering and development for the e-commerce sector. Interested in AI, philosophy and ethics, DevOps, and leadership and strategy.",
            familyName: "Reed",
            gender: "https://schema.org/Male",
            givenName: "Elliot",
            height: {
              "@type": "QuantitativeValue",
              unitCode: "cm",
              value: 183,
            },
            honorificSuffix: "BA (Hons.)",
            image: {
              "@type": "ImageObject",
              url: "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553434444/elliotjreed.jpg",
            },
            jobTitle: "Head of Technology",
            knowsLanguage: "en-GB",
            name: "Elliot J. Reed",
            nationality: {
              "@type": "Country",
              name: "United Kingdom",
            },
            sameAs: [
              "https://www.elliotjreed.com",
              "https://x.com/elliotjreed",
              "https://www.linkedin.com/in/elliotjreed",
              "https://github.com/elliotjreed",
              "https://bsky.app/profile/elliotjreed.bsky.social",
            ],
            url: "https://www.elliotjreed.com",
          },
          dateCreated: "2010-05-15T00:00:00+01:00",
          description:
            "The personal website of Elliot Reed, containing current and past projects, and guides on PHP, Symfony, Javascript, React, Python, and Linux / DevOps.",
          headline: "Elliot J. Reed's Website",
          inLanguage: ["en-GB", "en-US"],
          keywords: ["Elliot Reed", "Elliot J. Reed", "elliotjreed"],
          name: "Elliot J. Reed",
          url: "https://www.elliotjreed.com",
        })}
      </script>
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
