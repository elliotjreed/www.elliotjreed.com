import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { ArticleCard } from "./ArticleCard";

const renderCard = (props: Partial<Parameters<typeof ArticleCard>[0]> = {}) =>
  render(
    <MemoryRouter>
      <ArticleCard
        title="Update global Bun packages"
        href="/linux/update-bun-global-packages"
        excerpt="Bun has no -g flag."
        topic="Linux"
        {...props}
      />
    </MemoryRouter>,
  );

describe("ArticleCard", () => {
  it("links the title to the article", () => {
    renderCard();

    expect(screen.getByRole("link", { name: "Update global Bun packages" })).toHaveAttribute(
      "href",
      "/linux/update-bun-global-packages",
    );
    expect(screen.getByRole("heading", { level: 3, name: "Update global Bun packages" })).toBeInTheDocument();
  });

  it("shows the excerpt and the topic", () => {
    renderCard();

    expect(screen.getByText("Bun has no -g flag.")).toBeInTheDocument();
    expect(screen.getByText("Linux")).toHaveClass("ejr-card-topic");
  });

  it("shows the updated date in long form with a machine-readable value", () => {
    renderCard({ updated: "2026-02-18T00:00:00+00:00" });

    const time = screen.getByText("Updated 18th February 2026");
    expect(time.tagName).toBe("TIME");
    expect(time).toHaveAttribute("datetime", "2026-02-18");
  });

  it("omits the date when none is known", () => {
    const { container } = renderCard();

    expect(container.querySelector("time")).not.toBeInTheDocument();
  });

  it("contains only one link so the whole card has a single target", () => {
    renderCard({ updated: "2026-02-18" });

    expect(screen.getAllByRole("link")).toHaveLength(1);
  });

  it("marks the lead card", () => {
    renderCard({ lead: true });

    expect(screen.getByRole("article")).toHaveClass("ejr-card", "ejr-card-lead");
  });
});
