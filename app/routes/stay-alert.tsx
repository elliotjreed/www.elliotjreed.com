import type { ReactElement } from "react";
import { StayAlert } from "~/components/StayAlert/StayAlert";
import { createBreadcrumbs } from "~/data/schemaData";

export const meta = () => [
  { title: "Stay alert poster generator | EJR" },
  {
    name: "description",
    content: "Generate your own 'Stay Alert' poster. A bit of a throwback to when I was bored over the COVID times...",
  },
  {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "@id": "https://www.elliotjreed.com/stay-alert#webapp",
      url: "https://www.elliotjreed.com/stay-alert",
      name: "Stay Alert Poster Generator",
      description:
        "Generate your own 'Stay Alert' poster. A bit of a throwback to when I was bored over the COVID times...",
      applicationCategory: "EntertainmentApplication",
      isPartOf: { "@id": "https://www.elliotjreed.com/#website" },
      author: { "@id": "https://www.elliotjreed.com/#author" },
      inLanguage: "en-GB",
      isAccessibleForFree: true,
    },
  },
  {
    "script:ld+json": createBreadcrumbs([
      { name: "Home", url: "https://www.elliotjreed.com" },
      { name: "Tools", url: "https://www.elliotjreed.com" },
      { name: "Stay Alert", url: "https://www.elliotjreed.com/stay-alert" },
    ]),
  },
];

export default (): ReactElement => (
  <section className="divide-y divide-gray-200 dark:divide-gray-700">
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-700 dark:text-gray-200 sm:text-4xl sm:leading-10 md:text-6xl">
        &ldquo;Stay alert&rdquo; poster generator
      </h1>

      <p className="prose dark:prose-dark max-w-none text-lg leading-7 text-gray-600 dark:text-gray-300">
        Fill in the box below, and click the <strong>download</strong> button when you&apos;re done.
      </p>
    </div>

    <StayAlert />
  </section>
);
