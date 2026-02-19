import type { MetaDescriptor } from "react-router";

// Extended meta descriptor to allow JSON-LD entries alongside standard React Router descriptors.
export type AppMetaDescriptor = MetaDescriptor & { "script:ld+json"?: Record<string, unknown> };

const SITE_URL = "https://www.elliotjreed.com";

export const createAmpLink = (path: string): MetaDescriptor => ({
  tagName: "link",
  rel: "amphtml",
  href: `${SITE_URL}/amp${path}`,
});

interface CreateMetaOptions {
  title: string;
  description: string;
  url: string;
  type?: "website" | "article";
  image?: string;
  imageAlt?: string;
  ogImage?: string;
  ogImageAlt?: string;
  twitterImage?: string;
  twitterImageAlt?: string;
  twitterCard?: "summary" | "summary_large_image";
  twitterSite?: string;
  twitterCreator?: string;
  keywords?: string[];
  locale?: string;
  siteName?: string;
}

const DEFAULT_IMAGE = "https://www.elliotjreed.com/og.png";
const DEFAULT_TWITTER_IMAGE = "https://www.elliotjreed.com/twitter-card.png";

export const createMeta = (options: CreateMetaOptions): AppMetaDescriptor[] => {
  const {
    title,
    description,
    url,
    type = "website",
    image,
    imageAlt,
    ogImage,
    ogImageAlt,
    twitterImage,
    twitterImageAlt,
    twitterCard = type === "article" ? "summary_large_image" : "summary",
    twitterSite = "@elliotjreed",
    twitterCreator,
    keywords,
    locale = "en_GB",
    siteName = "Elliot J. Reed",
  } = options;

  const resolvedOgImage = ogImage ?? image ?? DEFAULT_IMAGE;
  const resolvedTwitterImage = twitterImage ?? image ?? DEFAULT_TWITTER_IMAGE;
  const resolvedOgImageAlt = ogImageAlt ?? imageAlt ?? "Elliot J. Reed";
  const resolvedTwitterImageAlt = twitterImageAlt ?? imageAlt ?? "Elliot J. Reed";

  const meta: MetaDescriptor[] = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { property: "og:site_name", content: siteName },
    { property: "og:locale", content: locale },
    { property: "og:image", content: resolvedOgImage },
    { property: "og:image:alt", content: resolvedOgImageAlt },
    { name: "twitter:card", content: twitterCard },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: resolvedTwitterImage },
    { name: "twitter:image:alt", content: resolvedTwitterImageAlt },
    { name: "twitter:site", content: twitterSite },
  ];

  if (twitterCreator) {
    meta.push({ name: "twitter:creator", content: twitterCreator });
  }

  if (keywords?.length) {
    meta.push({ name: "keywords", content: keywords.join(", ") });
  }

  return meta;
};
