import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import HomeRoute from "./home";

const renderHome = () =>
  render(
    <MemoryRouter>
      <HomeRoute />
    </MemoryRouter>,
  );

describe("home route", () => {
  describe("open source section", () => {
    it("should render the open source heading", () => {
      renderHome();

      expect(screen.getByRole("heading", { name: "Open source", level: 2 })).toBeInTheDocument();
    });

    it("should link each repository to GitHub in a new tab", () => {
      renderHome();

      const section = screen.getByRole("region", { name: "Open source" });
      const repositoryLinks = within(section)
        .getAllByRole("link")
        .filter((link) => link.closest("h3"));

      expect(repositoryLinks.length).toBeGreaterThan(0);
      for (const link of repositoryLinks) {
        expect(link).toHaveAttribute("href", expect.stringMatching(/^https:\/\/github\.com\/elliotjreed\/[\w.-]+$/));
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noreferrer noopener");
      }
    });

    it("should link to the full GitHub profile", () => {
      renderHome();

      const section = screen.getByRole("region", { name: "Open source" });

      expect(within(section).getByRole("link", { name: "See everything on GitHub" })).toHaveAttribute(
        "href",
        "https://github.com/elliotjreed",
      );
    });

    it("should come before the getting started with AI section", () => {
      renderHome();

      const openSource = screen.getByRole("heading", { name: "Open source", level: 2 });
      const gettingStarted = screen.getByRole("heading", { name: "Getting started with AI", level: 2 });

      expect(openSource.compareDocumentPosition(gettingStarted) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    });
  });
});
