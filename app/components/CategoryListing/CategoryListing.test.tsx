import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import type { SitePage } from "~/data/contentRegistry";
import { CategoryListing } from "./CategoryListing";

const page = (overrides: Partial<SitePage>): SitePage => ({
  id: "page",
  path: "/linux/page",
  routeFile: "routes/linux/page.tsx",
  title: "Page",
  ...overrides,
});

const pages: SitePage[] = [
  page({
    id: "a",
    path: "/linux/a",
    title: "Aliases",
    search: { description: "Shell aliases.", category: "Linux guides", keywords: [] },
    sitemap: { lastModified: "2026-01-05T00:00:00+00:00" },
  }),
  page({
    id: "b",
    path: "/linux/b",
    title: "Bun packages",
    search: { description: "Update Bun.", category: "Linux guides", keywords: [] },
    sitemap: { lastModified: "2026-02-18T00:00:00+00:00" },
  }),
  page({ id: "c", path: "/linux/c", title: "Copy tables" }),
];

const renderListing = (listedPages: SitePage[] = pages) =>
  render(
    <MemoryRouter>
      <CategoryListing pages={listedPages} topic="Linux" />
    </MemoryRouter>,
  );

describe("CategoryListing", () => {
  it("renders a card for every page", () => {
    renderListing();

    expect(screen.getAllByRole("article")).toHaveLength(3);
    expect(screen.getByRole("link", { name: "Copy tables" })).toHaveAttribute("href", "/linux/c");
  });

  it("leads with the most recently updated page", () => {
    renderListing();

    const [lead, ...rest] = screen.getAllByRole("article");
    expect(lead).toHaveClass("ejr-card-lead");
    expect(within(lead).getByRole("link", { name: "Bun packages" })).toBeInTheDocument();
    expect(within(lead).getByText("Updated 18th February 2026")).toBeInTheDocument();
    for (const card of rest) {
      expect(card).not.toHaveClass("ejr-card-lead");
    }
  });

  it("keeps the remaining pages in the order given", () => {
    renderListing();

    const titles = screen.getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent);
    expect(titles).toEqual(["Bun packages", "Aliases", "Copy tables"]);
  });

  it("shows the description and the topic on each card", () => {
    renderListing();

    expect(screen.getByText("Shell aliases.")).toBeInTheDocument();
    expect(screen.getAllByText("Linux")).toHaveLength(3);
  });

  it("says so when there are no pages", () => {
    renderListing([]);

    expect(screen.getByText("No articles in this topic yet.")).toBeInTheDocument();
  });
});
