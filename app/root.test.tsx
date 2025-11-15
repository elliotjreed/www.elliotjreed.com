import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Layout, ErrorBoundary } from "./root";

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    Links: () => <div data-testid="links">Links</div>,
    Meta: () => <div data-testid="meta">Meta</div>,
    ScrollRestoration: () => <div data-testid="scroll-restoration">ScrollRestoration</div>,
    Scripts: () => <div data-testid="scripts">Scripts</div>,
    isRouteErrorResponse: vi.fn(),
  };
});

vi.mock("~/components/Footer", () => ({
  Footer: () => <footer data-testid="footer">Footer</footer>,
}));

vi.mock("~/components/NavBar", () => ({
  NavBar: () => <nav data-testid="navbar">NavBar</nav>,
}));

describe("root", () => {
  describe("Layout", () => {
    it("should render children", () => {
      render(
        <Layout>
          <div>Test Content</div>
        </Layout>,
      );

      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("should render NavBar component", () => {
      render(
        <Layout>
          <div>Content</div>
        </Layout>,
      );

      expect(screen.getByTestId("navbar")).toBeInTheDocument();
    });

    it("should render Footer component", () => {
      render(
        <Layout>
          <div>Content</div>
        </Layout>,
      );

      expect(screen.getByTestId("footer")).toBeInTheDocument();
    });

    it("should have html lang attribute", () => {
      const { container } = render(
        <Layout>
          <div>Content</div>
        </Layout>,
      );

      const html = container.querySelector("html");
      expect(html).toHaveAttribute("lang", "en");
    });

    it("should have viewport meta tag", () => {
      const { container } = render(
        <Layout>
          <div>Content</div>
        </Layout>,
      );

      const viewport = container.querySelector('meta[name="viewport"]');
      expect(viewport).toHaveAttribute("content", "width=device-width, shrink-to-fit=no, initial-scale=1");
    });

    it("should have default title", () => {
      render(
        <Layout>
          <div>Content</div>
        </Layout>,
      );

      expect(screen.getByText("Elliot J. Reed | EJR")).toBeInTheDocument();
    });

    it("should have skip to content link", () => {
      render(
        <Layout>
          <div>Content</div>
        </Layout>,
      );

      const skipLink = screen.getByRole("link", { name: "Skip to content" });
      expect(skipLink).toBeInTheDocument();
      expect(skipLink).toHaveAttribute("href", "#main-content");
    });

    it("should have main content area with id", () => {
      const { container } = render(
        <Layout>
          <div>Content</div>
        </Layout>,
      );

      const main = container.querySelector("main#main-content");
      expect(main).toBeInTheDocument();
    });

    it("should have og:image meta tag", () => {
      const { container } = render(
        <Layout>
          <div>Content</div>
        </Layout>,
      );

      const ogImage = container.querySelector('meta[property="og:image"]');
      expect(ogImage).toHaveAttribute("content", "https://www.elliotjreed.com/og.png");
    });

    it("should have twitter card meta tags", () => {
      const { container } = render(
        <Layout>
          <div>Content</div>
        </Layout>,
      );

      const twitterCard = container.querySelector('meta[name="twitter:card"]');
      const twitterSite = container.querySelector('meta[name="twitter:site"]');
      const twitterImage = container.querySelector('meta[name="twitter:image"]');

      expect(twitterCard).toHaveAttribute("content", "summary");
      expect(twitterSite).toHaveAttribute("content", "@elliotjreed");
      expect(twitterImage).toHaveAttribute("content", "https://www.elliotjreed.com/og.png");
    });

    it("should have manifest link", () => {
      const { container } = render(
        <Layout>
          <div>Content</div>
        </Layout>,
      );

      const manifest = container.querySelector('link[rel="manifest"]');
      expect(manifest).toHaveAttribute("href", "/manifest.webmanifest");
    });

    it("should have theme-color meta tag", () => {
      const { container } = render(
        <Layout>
          <div>Content</div>
        </Layout>,
      );

      const themeColor = container.querySelector('meta[name="theme-color"]');
      expect(themeColor).toHaveAttribute("content", "#1f2937");
    });
  });

  describe("ErrorBoundary", () => {
    it("should render 404 message for 404 errors", () => {
      const { isRouteErrorResponse } = require("react-router");
      isRouteErrorResponse.mockReturnValue(true);

      const error = { status: 404, statusText: "Not Found" };
      render(<ErrorBoundary error={error} />);

      expect(screen.getByRole("heading", { name: "404" })).toBeInTheDocument();
      expect(screen.getByText("The requested page could not be found.")).toBeInTheDocument();
    });

    it("should render generic error message for other route errors", () => {
      const { isRouteErrorResponse } = require("react-router");
      isRouteErrorResponse.mockReturnValue(true);

      const error = { status: 500, statusText: "Internal Server Error" };
      render(<ErrorBoundary error={error} />);

      expect(screen.getByRole("heading", { name: "Error" })).toBeInTheDocument();
      expect(screen.getByText("Internal Server Error")).toBeInTheDocument();
    });

    it("should render default error message for non-route errors", () => {
      const { isRouteErrorResponse } = require("react-router");
      isRouteErrorResponse.mockReturnValue(false);

      const error = null;
      render(<ErrorBoundary error={error} />);

      expect(screen.getByRole("heading", { name: "Oops!" })).toBeInTheDocument();
      expect(screen.getByText("An unexpected error occurred.")).toBeInTheDocument();
    });

    it("should have section with divide classes", () => {
      const { isRouteErrorResponse } = require("react-router");
      isRouteErrorResponse.mockReturnValue(false);

      const { container } = render(<ErrorBoundary error={null} />);
      const section = container.querySelector("section");

      expect(section).toHaveClass("divide-y", "divide-gray-200", "dark:divide-gray-700");
    });
  });
});
