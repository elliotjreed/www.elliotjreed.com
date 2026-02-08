import type { ReactElement } from "react";
import { Link } from "react-router";

import { PageHeader } from "~/components/PageHeader/PageHeader";
import { createBreadcrumbs } from "~/data/schemaData";
import { getCategoryPages } from "~/utils/categoryListings";
import { createMeta } from "~/utils/seo";

const CATEGORY_TITLE = "AI Guides";
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
  <section className="divide-y divide-gray-200 dark:divide-gray-700">
    <PageHeader title={CATEGORY_TITLE}>
      <p className="prose dark:prose-dark max-w-none text-lg leading-7 text-gray-600 dark:text-gray-300">
        {DESCRIPTION}
      </p>
    </PageHeader>

    <div className="prose max-w-none dark:prose-dark">
      <ul>
        {categoryPages.map((page) => (
          <li key={page.path} className="mb-1">
            <Link to={page.path} className="text-gray-700 dark:text-gray-200">
              {page.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
