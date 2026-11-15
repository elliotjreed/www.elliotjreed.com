import { describe, expect, it } from "vitest";
import {
  authorReference,
  authorSchema,
  createFaqPage,
  createTechArticle,
  websiteReference,
  websiteSchema,
} from "./schemaData";

describe("authorReference", () => {
  it("identifies the author by name and URL so it resolves without the homepage", () => {
    expect(authorReference).toMatchObject({
      "@type": "Person",
      "@id": "https://www.elliotjreed.com/#author",
      name: "Elliot J. Reed",
      url: "https://www.elliotjreed.com",
      jobTitle: "Head of Engineering",
    });
  });

  it("lists external profiles without the site itself", () => {
    expect(authorReference.sameAs).toContain("https://github.com/elliotjreed");
    expect(authorReference.sameAs).not.toContain("https://www.elliotjreed.com");
  });
});

describe("authorSchema", () => {
  it("uses the same job title as the visible homepage", () => {
    expect(authorSchema.jobTitle).toBe("Head of Engineering");
    expect(websiteSchema.about).toContain("Head of Engineering");
  });

  it("does not list the site itself as another profile", () => {
    expect(authorSchema.sameAs).not.toContain("https://www.elliotjreed.com");
  });
});

describe("createTechArticle", () => {
  const article = createTechArticle({
    url: "https://www.elliotjreed.com/linux/zsh-bash-aliases",
    headline: "Useful shell aliases",
    description: "Aliases",
    datePublished: "2025-01-01T00:00:00+00:00",
    articleSection: "Linux",
  });

  it("embeds the author and website so the article stands alone", () => {
    expect(article.author).toEqual(authorReference);
    expect(article.isPartOf).toEqual(websiteReference);
    expect(websiteReference).toMatchObject({
      "@type": "WebSite",
      "@id": "https://www.elliotjreed.com/#website",
      name: "Elliot J. Reed",
    });
  });

  it("includes the site's social image", () => {
    expect(article.image).toBe("https://www.elliotjreed.com/og.png");
  });

  it("does not claim a word count", () => {
    expect(article).not.toHaveProperty("wordCount");
  });
});

describe("createFaqPage", () => {
  it("builds FAQPage structured data from the visible questions", () => {
    expect(createFaqPage([{ question: "Is this advice?", answer: "No." }])).toEqual({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is this advice?",
          acceptedAnswer: { "@type": "Answer", text: "No." },
        },
      ],
    });
  });
});
