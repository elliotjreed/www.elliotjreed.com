import { render, screen } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";
import FinanceCategoryRoute, { meta } from "./finance";

const renderRoute = (): void => {
  const Stub = createRoutesStub([{ path: "/finance", Component: FinanceCategoryRoute }]);

  render(<Stub initialEntries={["/finance"]} />);
};

describe("FinanceCategoryRoute", () => {
  it("renders the category heading", () => {
    renderRoute();

    expect(screen.getByRole("heading", { level: 1, name: /finance tools/i })).toBeInTheDocument();
  });

  it("lists the pension planner calculator", () => {
    renderRoute();

    expect(screen.getByRole("link", { name: /pension planner calculator/i })).toHaveAttribute(
      "href",
      "/finance/pension-planner-calculator",
    );
  });

  it("states that the tools are not financial advice", () => {
    renderRoute();

    expect(screen.getByText(/not financial advice/i)).toBeInTheDocument();
  });

  describe("meta", () => {
    it("returns the page title and canonical URL", () => {
      const metaTags = meta();

      expect(metaTags).toContainEqual({ title: "Finance Tools | EJR" });
      expect(metaTags).toContainEqual({
        property: "og:url",
        content: "https://www.elliotjreed.com/finance",
      });
    });

    it("includes CollectionPage structured data", () => {
      const metaTags = meta() as Array<Record<string, unknown>>;
      const collection = metaTags.find(
        (tag) =>
          tag["script:ld+json"] &&
          typeof tag["script:ld+json"] === "object" &&
          (tag["script:ld+json"] as Record<string, unknown>)["@type"] === "CollectionPage",
      );

      expect(collection?.["script:ld+json"]).toMatchObject({
        "@type": "CollectionPage",
        name: "Finance Tools",
      });
    });

    it("does not offer an AMP version", () => {
      const metaTags = meta() as Array<Record<string, unknown>>;

      expect(metaTags.some((tag) => tag.rel === "amphtml")).toBe(false);
    });
  });
});
