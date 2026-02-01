import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PercentageCalculatorRoute, { meta } from "./percentage-calculator";

describe("PercentageCalculatorRoute", () => {
  it("renders the percentage calculator component", () => {
    render(<PercentageCalculatorRoute />);
    expect(screen.getByRole("heading", { name: /percentage calculator/i })).toBeInTheDocument();
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
      const metaTags = meta();
      const webAppData = metaTags.find((tag) => tag["script:ld+json"]?.["@type"] === "WebApplication");

      expect(webAppData).toBeDefined();
      expect(webAppData?.["script:ld+json"]).toMatchObject({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Percentage Calculator",
        applicationCategory: "UtilityApplication",
      });
    });

    it("includes BreadcrumbList structured data", () => {
      const metaTags = meta();
      const breadcrumbData = metaTags.find((tag) => tag["script:ld+json"]?.["@type"] === "BreadcrumbList");

      expect(breadcrumbData).toBeDefined();
      expect(breadcrumbData?.["script:ld+json"]).toMatchObject({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
      });
    });

    it("includes FAQPage structured data", () => {
      const metaTags = meta();
      const faqData = metaTags.find((tag) => tag["script:ld+json"]?.["@type"] === "FAQPage");

      expect(faqData).toBeDefined();
      expect(faqData?.["script:ld+json"]).toMatchObject({
        "@context": "https://schema.org",
        "@type": "FAQPage",
      });
      const schema = faqData?.["script:ld+json"];
      if (schema && "@type" in schema && schema["@type"] === "FAQPage" && "mainEntity" in schema) {
        expect(schema.mainEntity).toHaveLength(5);
      }
    });
  });
});
