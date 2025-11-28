import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import { Footer } from "./Footer";

vi.mock("~/components/SocialLinks/SocialLinks", () => ({
  SocialLinks: () => <div data-testid="social-links">Social Links</div>,
}));

describe("Footer", () => {
  it("should render footer element", () => {
    const { container } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );
    const footer = container.querySelector("footer");

    expect(footer).toBeInTheDocument();
  });

  it("should render SocialLinks component", () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );

    expect(screen.getByTestId("social-links")).toBeInTheDocument();
  });

  it("should render Privacy Policy link", () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );

    const privacyLink = screen.getByRole("link", { name: "Privacy Policy" });
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink).toHaveAttribute("href", "/privacy");
  });

  it("should render Sitemap link", () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );

    const sitemapLink = screen.getByRole("link", { name: "Sitemap" });
    expect(sitemapLink).toBeInTheDocument();
    expect(sitemapLink).toHaveAttribute("href", "/sitemap");
  });

  it("should render copyright text with author name", () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );

    expect(screen.getByText("Elliot J. Reed")).toBeInTheDocument();
  });

  it("should have home link on copyright", () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );

    const copyrightLink = screen.getByRole("link", { name: /© Elliot J. Reed/i });
    expect(copyrightLink).toBeInTheDocument();
    expect(copyrightLink).toHaveAttribute("href", "/");
  });

  it("should have print:hidden class", () => {
    const { container } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );
    const footer = container.querySelector("footer");

    expect(footer).toHaveClass("print:hidden");
  });

  it("should have dark mode text color classes", () => {
    const { container } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );
    const footer = container.querySelector("footer");

    expect(footer).toHaveClass("text-gray-700", "dark:text-gray-200");
  });
});
