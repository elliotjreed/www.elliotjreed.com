import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
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
    render(
      <MemoryRouter>
        <PensionPlannerCalculatorRoute />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { level: 1, name: /pension planner/i })).toBeInTheDocument();
  });

  describe("meta", () => {
    it("returns the page title and description", () => {
      const metaTags = meta();

      expect(metaTags).toContainEqual({ title: "UK Pension Calculator and Retirement Planner | EJR" });
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
  });

  describe("structured data matches the page", () => {
    it("shows every FAQ question from the structured data on the page", () => {
      render(
        <MemoryRouter>
          <PensionPlannerCalculatorRoute />
        </MemoryRouter>,
      );
      const faq = structuredDataOfType("FAQPage") as { mainEntity: { name: string }[] };

      expect(faq.mainEntity.length).toBeGreaterThan(0);
      for (const { name } of faq.mainEntity) {
        expect(screen.getByRole("heading", { level: 3, name })).toBeInTheDocument();
      }
    });

    it("describes the tool as a free web application with its own identifier and a named author", () => {
      expect(structuredDataOfType("WebApplication")).toMatchObject({
        "@id": "https://www.elliotjreed.com/finance/pension-planner-calculator#webapp",
        mainEntityOfPage: { "@id": "https://www.elliotjreed.com/finance/pension-planner-calculator" },
        offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
        author: { "@type": "Person", name: "Elliot J. Reed" },
      });
    });
  });

  it("links to the related finance tool", () => {
    render(
      <MemoryRouter>
        <PensionPlannerCalculatorRoute />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: "Where should I put my money? flowchart" })).toHaveAttribute(
      "href",
      "/finance/personal-finance",
    );
  });
});
