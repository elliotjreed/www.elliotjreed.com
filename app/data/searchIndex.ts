import { sitePages } from "./contentRegistry";

export interface SearchableItem {
  href: string;
  title: string;
  description: string;
  category: string;
  keywords: string[];
}

export const searchIndex: SearchableItem[] = sitePages.flatMap((page) => {
  if (!page.search) return [];

  return [
    {
      href: page.path,
      title: page.title,
      description: page.search.description,
      category: page.search.category,
      keywords: page.search.keywords,
    },
  ];
});
