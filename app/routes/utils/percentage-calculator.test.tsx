import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PercentageCalculatorRoute, { meta } from "./percentage-calculator";

const structuredDataOfType = (type: string): Record<string, unknown> | undefined => {
  const metaTags = meta() as Array<Record<string, unknown>>;
  const match = metaTags.find(
    (tag) =>
      tag["script:ld+json"] &&
      typeof tag["script:ld+json"] === "object" &&
      (tag["script:ld+json"] as Record<string, unknown>)["@type"] === type,
  );

  return match?.["script:ld+json"] as Record<string, unknown> | undefined;
};

describe("PercentageCalculatorRoute", () => {
  it("renders the percentage calculator component", () => {
    render(<PercentageCalculatorRoute />);
    expect(screen.getByRole("heading", { level: 1, name: /percentage calculator/i })).toBeInTheDocument();
  });

  it("renders all three calculator sections", () => {
    render(<PercentageCalculatorRoute />);
    expect(screen.getByRole("heading", { name: /what is x% of y\?/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /x is what percent of y\?/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /percentage change/i })).toBeInTheDocument();
  });

  describe("meta", () => {
    it("returns correct meta tags", () => {
      const metaTags = meta();

      expect(metaTags).toContainEqual({
        title: "Percentage Calculator | EJR",
      });
      expect(metaTags).toContainEqual({
        name: "description",
        content: expect.stringContaining("percentage calculator"),
      });
    });

    it("includes Open Graph tags", () => {
      const metaTags = meta();

      expect(metaTags).toContainEqual({
        property: "og:title",
        content: "Percentage Calculator | EJR",
      });
      expect(metaTags).toContainEqual({
        property: "og:type",
        content: "website",
      });
      expect(metaTags).toContainEqual({
        property: "og:url",
        content: "https://www.elliotjreed.com/utils/percentage-calculator",
      });
    });

    it("includes Twitter Card tags", () => {
      const metaTags = meta();

      expect(metaTags).toContainEqual({
        name: "twitter:card",
        content: "summary",
      });
      expect(metaTags).toContainEqual({
        name: "twitter:creator",
        content: "@elliotjreed",
      });
    });

    it("includes WebApplication structured data", () => {
      const metaTags = meta() as Array<Record<string, unknown>>;
      const webAppData = metaTags.find(
        (tag) =>
          tag["script:ld+json"] &&
          typeof tag["script:ld+json"] === "object" &&
          (tag["script:ld+json"] as Record<string, unknown>)["@type"] === "WebApplication",
      );

      expect(webAppData).toBeDefined();
      expect(webAppData?.["script:ld+json"]).toMatchObject({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Percentage Calculator",
        applicationCategory: "UtilityApplication",
      });
    });

    it("includes BreadcrumbList structured data", () => {
      const metaTags = meta() as Array<Record<string, unknown>>;
      const breadcrumbData = metaTags.find(
        (tag) =>
          tag["script:ld+json"] &&
          typeof tag["script:ld+json"] === "object" &&
          (tag["script:ld+json"] as Record<string, unknown>)["@type"] === "BreadcrumbList",
      );

      expect(breadcrumbData).toBeDefined();
      expect(breadcrumbData?.["script:ld+json"]).toMatchObject({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
      });
    });

    it("includes FAQPage structured data", () => {
      const metaTags = meta() as Array<Record<string, unknown>>;
      const faqData = metaTags.find(
        (tag) =>
          tag["script:ld+json"] &&
          typeof tag["script:ld+json"] === "object" &&
          (tag["script:ld+json"] as Record<string, unknown>)["@type"] === "FAQPage",
      );

      expect(faqData).toBeDefined();
      expect(faqData?.["script:ld+json"]).toMatchObject({
        "@context": "https://schema.org",
        "@type": "FAQPage",
      });
    });
  });

  describe("structured data matches the page", () => {
    it("shows every FAQ question from the structured data on the page", () => {
      render(<PercentageCalculatorRoute />);
      const faq = structuredDataOfType("FAQPage") as { mainEntity: { name: string }[] };

      expect(faq.mainEntity.length).toBeGreaterThan(0);
      for (const { name } of faq.mainEntity) {
        expect(screen.getByRole("heading", { level: 3, name })).toBeInTheDocument();
      }
    });

    it("describes the tool as a free web application with its own identifier and a named author", () => {
      expect(structuredDataOfType("WebApplication")).toMatchObject({
        "@id": "https://www.elliotjreed.com/utils/percentage-calculator#webapp",
        mainEntityOfPage: { "@id": "https://www.elliotjreed.com/utils/percentage-calculator" },
        offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
        author: { "@type": "Person", name: "Elliot J. Reed" },
      });
    });
  });

  it("does not link a breadcrumb to the missing utils page", () => {
    expect(JSON.stringify(structuredDataOfType("BreadcrumbList"))).not.toContain('https://www.elliotjreed.com/utils"');
  });
});
