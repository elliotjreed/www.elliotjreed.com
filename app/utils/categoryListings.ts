import { type SitePage, sitePages } from "~/data/contentRegistry";

/**
 * Return all child pages that live under a category slug, sorted alphabetically by title.
 * The slug may be provided with or without a leading slash.
 */
export const getCategoryPages = (categorySlug: string): SitePage[] => {
  const normalizedSlug = categorySlug.startsWith("/") ? categorySlug : `/${categorySlug}`;
  const prefix = `${normalizedSlug.replace(/\/$/, "")}/`;

  return sitePages.filter((page) => page.path.startsWith(prefix)).sort((a, b) => a.title.localeCompare(b.title));
};
