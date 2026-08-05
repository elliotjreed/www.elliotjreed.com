import type { ReactElement } from "react";
import { PageHeader } from "~/components/PageHeader/PageHeader";
import { createBreadcrumbs } from "~/data/schemaData";
import { createAmpLink, createMeta } from "~/utils/seo";

const DESCRIPTION = "Charisma Hair has closed. A thank you and farewell message from Charis, Jo, and Lily.";

export const meta = () => [
  ...createMeta({
    title: "Charisma Hair | EJR",
    description: DESCRIPTION,
    url: "https://www.elliotjreed.com/charisma-hair",
    type: "website",
    image: "https://www.elliotjreed.com/2026-03-28_charis_jo_lily.jpg",
  }),
  {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://www.elliotjreed.com/charisma-hair#webpage",
      url: "https://www.elliotjreed.com/charisma-hair",
      name: "Charisma Hair",
      description: DESCRIPTION,
      isPartOf: { "@id": "https://www.elliotjreed.com/#website" },
      author: { "@id": "https://www.elliotjreed.com/#author" },
      inLanguage: "en-GB",
    },
  },
  {
    "script:ld+json": createBreadcrumbs([
      { name: "Home", url: "https://www.elliotjreed.com" },
      { name: "Charisma Hair", url: "https://www.elliotjreed.com/charisma-hair" },
    ]),
  },
  createAmpLink("/charisma-hair"),
];

export default (): ReactElement => (
  <section className="divide-y divide-gray-200 dark:divide-gray-700">
    <PageHeader title="Charisma Hair">
      <p className="prose dark:prose-dark max-w-none text-lg leading-7 text-gray-600 dark:text-gray-300">
        Charisma Hair in Onehouse, Suffolk closed in March 2026 following the retirement of Charis.
        <br />
        <em>
          Charis, Jo, and Lily would like to say a massive thank you and farewell to all our amazing, generous, funny,
          kind, lovely clients. Some of you have been with us for literally decades. You will all be missed so much.
        </em>
      </p>
    </PageHeader>

    <div className="grid gap-6 py-12 sm:grid-cols-2">
      <img
        src="/2026-03-28_charisma_hair.jpg"
        alt="The Charisma Hair salon sign"
        width={1200}
        height={1600}
        className="h-auto w-full rounded-md border-2 border-gray-200 object-cover dark:border-gray-700"
        loading="lazy"
      />
      <img
        src="/2026-03-28_charis_jo_lily.jpg"
        alt="Charis, Jo, and Lily together at Charisma Hair"
        width={2048}
        height={1536}
        className="h-auto w-full rounded-md border-2 border-gray-200 object-cover dark:border-gray-700"
        loading="lazy"
      />
    </div>
  </section>
);
