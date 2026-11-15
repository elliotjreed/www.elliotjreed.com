import type { ReactElement } from "react";
import { ArticleCard } from "~/components/ArticleCard/ArticleCard";
import type { SitePage } from "~/data/contentRegistry";

interface CategoryListingProps {
  pages: SitePage[];
  topic: string;
}

const lastModified = (page: SitePage): string => page.sitemap?.lastModified ?? "";

const leadFirst = (pages: SitePage[]): SitePage[] => {
  const lead = pages.reduce<SitePage | undefined>(
    (latest, page) => (latest === undefined || lastModified(page) > lastModified(latest) ? page : latest),
    undefined,
  );

  return lead ? [lead, ...pages.filter((page) => page !== lead)] : [];
};

export const CategoryListing = ({ pages, topic }: CategoryListingProps): ReactElement => {
  if (pages.length === 0) {
    return <p className="text-ink-muted py-8">No articles in this topic yet.</p>;
  }

  return (
    <section className="py-8" aria-labelledby="category-listing-heading">
      <h2 id="category-listing-heading" className="sr-only">
        Articles
      </h2>
      <div className="ejr-cards">
        {leadFirst(pages).map((page, index) => (
          <ArticleCard
            key={page.path}
            title={page.title}
            href={page.path}
            excerpt={page.search?.description}
            topic={topic}
            updated={page.sitemap?.lastModified}
            lead={index === 0}
          />
        ))}
      </div>
    </section>
  );
};
