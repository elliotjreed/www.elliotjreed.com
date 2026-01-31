import type { ReactElement } from "react";
import { GovernmentTwitter } from "~/components/GovernmentTwitter/GovernmentTwitter";
import { createBreadcrumbs } from "~/data/schemaData";

export const meta = () => [
  { title: "No. 10 Downing Street government tweet generator | EJR" },
  {
    name: "description",
    content: "Generate your own UK government tweet. A bit of a throwback to when I was bored over the COVID times...",
  },
  {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "@id": "https://www.elliotjreed.com/government-tweet#webapp",
      url: "https://www.elliotjreed.com/government-tweet",
      name: "UK Government Tweet Generator",
      description:
        "Generate your own UK government tweet. A bit of a throwback to when I was bored over the COVID times...",
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
      { name: "Government Tweet", url: "https://www.elliotjreed.com/government-tweet" },
    ]),
  },
];

export default (): ReactElement => (
  <section className="divide-y divide-gray-200 dark:divide-gray-700">
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-700 dark:text-gray-200 sm:text-4xl sm:leading-10 md:text-6xl">
        UK Prime Minister tweet generator
      </h1>

      <p className="prose dark:prose-dark max-w-none text-lg leading-7 text-gray-600 dark:text-gray-300">
        Fill in the box below, and click the <strong>download</strong> button when you&apos;re done.
      </p>
    </div>

    <GovernmentTwitter />
  </section>
);
