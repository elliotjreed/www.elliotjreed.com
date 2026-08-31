import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PensionPlannerCalculatorRoute, { meta } from "./pension-planner-calculator";

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

describe("PensionPlannerCalculatorRoute", () => {
  it("renders the pension planner", () => {
    render(<PensionPlannerCalculatorRoute />);

    expect(screen.getByRole("heading", { level: 1, name: /pension planner/i })).toBeInTheDocument();
  });

  describe("meta", () => {
    it("returns the page title and description", () => {
      const metaTags = meta();

      expect(metaTags).toContainEqual({ title: "UK Pension Planner Calculator | EJR" });
      expect(metaTags).toContainEqual({
        name: "description",
        content: expect.stringContaining("pension"),
      });
    });

    it("includes Open Graph tags with the canonical URL", () => {
      const metaTags = meta();

      expect(metaTags).toContainEqual({
        property: "og:url",
        content: "https://www.elliotjreed.com/finance/pension-planner-calculator",
      });
      expect(metaTags).toContainEqual({ property: "og:type", content: "website" });
    });

    it("includes WebApplication structured data in the finance category", () => {
      expect(structuredDataOfType("WebApplication")).toMatchObject({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "UK Pension Planner Calculator",
        applicationCategory: "FinanceApplication",
      });
    });

    it("includes breadcrumbs pointing at the finance category page", () => {
      const breadcrumbs = structuredDataOfType("BreadcrumbList");

      expect(breadcrumbs).toBeDefined();
      expect(JSON.stringify(breadcrumbs)).toContain("https://www.elliotjreed.com/finance");
    });

    it("includes FAQPage structured data covering the models and FIRE", () => {
      const faq = structuredDataOfType("FAQPage");

      expect(faq).toBeDefined();
      expect(JSON.stringify(faq)).toMatch(/AS TM1/);
      expect(JSON.stringify(faq)).toMatch(/FIRE number/);
    });

    it("does not offer an AMP version", () => {
      const metaTags = meta() as Array<Record<string, unknown>>;

      expect(metaTags.some((tag) => tag.rel === "amphtml")).toBe(false);
    });
  });
});
