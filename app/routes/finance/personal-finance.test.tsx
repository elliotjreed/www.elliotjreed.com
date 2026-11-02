import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PersonalFinanceRoute, { meta } from "./personal-finance";

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

describe("PersonalFinanceRoute", () => {
  it("renders the flowchart tool", () => {
    render(<PersonalFinanceRoute />);

    expect(screen.getByRole("heading", { level: 1, name: /where should i put my money/i })).toBeInTheDocument();
  });

  describe("meta", () => {
    it("returns the page title and canonical URL", () => {
      const metaTags = meta();

      expect(metaTags).toContainEqual({
        title: "Where Should I Put My Money? UK Personal Finance Flowchart | EJR",
      });
      expect(metaTags).toContainEqual({
        property: "og:url",
        content: "https://www.elliotjreed.com/finance/personal-finance",
      });
    });

    it("declares the source and licence of the original flowchart", () => {
      const webApp = structuredDataOfType("WebApplication");

      expect(webApp).toMatchObject({
        applicationCategory: "FinanceApplication",
        isBasedOn: "https://ukpersonal.finance/flowchart/",
        license: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
      });
    });

    it("includes HowTo structured data covering all eight steps", () => {
      const howTo = structuredDataOfType("HowTo");

      expect(howTo).toBeDefined();
      expect(howTo?.step).toHaveLength(8);
      expect(JSON.stringify(howTo)).toMatch(/employer pension match/i);
    });

    it("includes breadcrumbs pointing at the finance category page", () => {
      const breadcrumbs = structuredDataOfType("BreadcrumbList");

      expect(JSON.stringify(breadcrumbs)).toContain("https://www.elliotjreed.com/finance");
    });

    it("includes FAQPage structured data answering the common ordering questions", () => {
      const faq = structuredDataOfType("FAQPage");

      expect(faq).toBeDefined();
      expect(JSON.stringify(faq)).toMatch(/pay off debt or save/i);
      expect(JSON.stringify(faq)).toMatch(/Lifetime ISA/);
    });

    it("does not offer an AMP version", () => {
      const metaTags = meta() as Array<Record<string, unknown>>;

      expect(metaTags.some((tag) => tag.rel === "amphtml")).toBe(false);
    });
  });
});
