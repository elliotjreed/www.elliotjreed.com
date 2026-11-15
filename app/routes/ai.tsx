import type { ReactElement } from "react";

import { CategoryListing } from "~/components/CategoryListing/CategoryListing";
import { PageHeader } from "~/components/PageHeader/PageHeader";
import { createBreadcrumbs } from "~/data/schemaData";
import { getCategoryPages } from "~/utils/categoryListings";
import { createMeta } from "~/utils/seo";

const CATEGORY_TITLE = "AI guides";
const CATEGORY_SLUG = "ai";
const DESCRIPTION = "All AI articles, tutorials, and resources in one place.";
const PAGE_URL = `https://www.elliotjreed.com/${CATEGORY_SLUG}`;

const categoryPages = getCategoryPages(CATEGORY_SLUG);

export const meta = () => [
  ...createMeta({
    title: `${CATEGORY_TITLE} | EJR`,
    description: DESCRIPTION,
    url: PAGE_URL,
    type: "website",
  }),
  {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: CATEGORY_TITLE,
      description: DESCRIPTION,
      isPartOf: { "@id": "https://www.elliotjreed.com/#website" },
      author: { "@id": "https://www.elliotjreed.com/#author" },
      inLanguage: "en-GB",
    },
  },
  {
    "script:ld+json": createBreadcrumbs([
      { name: "Home", url: "https://www.elliotjreed.com" },
      { name: CATEGORY_TITLE, url: PAGE_URL },
    ]),
  },
];

export default (): ReactElement => (
  <section>
    <PageHeader tone="band" title={CATEGORY_TITLE}>
      <p className="prose ejr-lead">{DESCRIPTION}</p>
    </PageHeader>

    <CategoryListing pages={categoryPages} topic="AI" />
  </section>
);
