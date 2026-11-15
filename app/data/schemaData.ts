/**
 * Centralised Schema.org JSON-LD data for consistent structured data across all routes
 */

/**
 * Full author profile schema with comprehensive Person details
 * Used across all routes to ensure consistent author attribution
 */
export const authorSchema = {
  "@type": "Person",
  "@id": "https://www.elliotjreed.com/#author",
  name: "Elliot J. Reed",
  givenName: "Elliot",
  familyName: "Reed",
  additionalName: "John",
  alternateName: "Elliot Reed",
  honorificSuffix: "BA (Hons.)",
  jobTitle: "Head of Engineering",
  description:
    "Technology leader based in the United Kingdom, focusing on software engineering and development for the e-commerce sector. Interested in AI, philosophy and ethics, DevOps, and leadership and strategy.",
  url: "https://www.elliotjreed.com",
  image: {
    "@type": "ImageObject",
    url: "https://www.elliotjreed.com/elliot-greyscale.jpg",
  },
  sameAs: [
    "https://x.com/elliotjreed",
    "https://www.linkedin.com/in/elliotjreed",
    "https://github.com/elliotjreed",
    "https://bsky.app/profile/elliotjreed.com",
  ],
  knowsLanguage: "en-GB",
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
  address: {
    "@type": "PostalAddress",
    addressCountry: {
      "@type": "Country",
      name: "United Kingdom",
    },
    addressLocality: "Nottingham",
    addressRegion: "Nottinghamshire",
  },
  nationality: {
    "@type": "Country",
    name: "United Kingdom",
  },
  gender: "https://schema.org/Male",
  height: {
    "@type": "QuantitativeValue",
    unitCode: "cm",
    value: 183,
  },
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
};

/**
 * Minimal author entity for embedding in individual pages, so the author resolves without the homepage
 */
export const authorReference = {
  "@type": "Person",
  "@id": authorSchema["@id"],
  name: authorSchema.name,
  url: authorSchema.url,
  jobTitle: authorSchema.jobTitle,
  sameAs: authorSchema.sameAs,
};

/**
 * Website schema with publisher reference
 * Used to establish site-wide context and link to author
 */
export const websiteSchema = {
  "@type": "WebSite",
  "@id": "https://www.elliotjreed.com/#website",
  name: "Elliot J. Reed",
  alternateName: "Elliot Reed",
  url: "https://www.elliotjreed.com",
  description:
    "The personal website of Elliot Reed, containing current and past projects, and guides on AI, prompting, Claude Code, PHP, Symfony, Javascript, React, Python, and Linux / DevOps.",
  about:
    "Elliot Reed is the Head of Engineering for a respected e-commerce retailer based in the United Kingdom, with over 12 years experience in management and software development. His interests include AI, philosophy and ethics, DevOps, and leadership and strategy.",
  inLanguage: ["en-GB", "en-US"],
  dateCreated: "2010-05-15T00:00:00+01:00",
  publisher: { "@id": "https://www.elliotjreed.com/#author" },
  keywords: ["Elliot Reed", "Elliot J. Reed", "elliotjreed"],
};

/**
 * Minimal website entity for embedding in individual pages
 */
export const websiteReference = {
  "@type": "WebSite",
  "@id": websiteSchema["@id"],
  name: websiteSchema.name,
  url: websiteSchema.url,
};

/**
 * Breadcrumb item type
 */
export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Create BreadcrumbList schema from array of items
 * @param items Array of breadcrumb items with name and url
 * @returns Schema.org BreadcrumbList object
 */
export const createBreadcrumbs = (items: BreadcrumbItem[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

/**
 * Create TechArticle schema with full metadata
 * @param config Article configuration
 * @returns Schema.org TechArticle object
 */
export interface TechArticleConfig {
  url: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  articleSection: string;
  keywords?: string[];
  proficiencyLevel?: "Beginner" | "Intermediate" | "Advanced";
}

export const createTechArticle = (config: TechArticleConfig) => ({
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "@id": `${config.url}#article`,
  headline: config.headline,
  name: config.headline,
  description: config.description,
  dateCreated: config.datePublished,
  datePublished: config.datePublished,
  dateModified: config.dateModified || config.datePublished,
  image: "https://www.elliotjreed.com/og.png",
  author: authorReference,
  copyrightHolder: { "@id": "https://www.elliotjreed.com/#author" },
  publisher: { "@id": "https://www.elliotjreed.com/#author" },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": config.url,
  },
  isPartOf: websiteReference,
  inLanguage: "en-GB",
  articleSection: config.articleSection,
  ...(config.keywords && { keywords: config.keywords }),
  ...(config.proficiencyLevel && { proficiencyLevel: config.proficiencyLevel }),
});

export interface FaqItem {
  question: string;
  answer: string;
}

export const createFaqPage = (items: FaqItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
});
