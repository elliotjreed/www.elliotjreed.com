import { render, screen } from "@testing-library/react";
import { isRouteErrorResponse } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ErrorBoundary, Layout } from "./root";

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    Links: () => <span data-testid="links">Links</span>,
    Meta: () => <span data-testid="meta">Meta</span>,
    ScrollRestoration: () => <span data-testid="scroll-restoration">ScrollRestoration</span>,
    Scripts: () => <span data-testid="scripts">Scripts</span>,
    useLoaderData: () => ({ nonce: "test-nonce" }),
    isRouteErrorResponse: vi.fn(),
  };
});

vi.mock("~/components/Footer/Footer", () => ({
  Footer: () => <footer data-testid="footer">Footer</footer>,
}));

vi.mock("~/components/NavBar/NavBar", () => ({
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
      render(
        <Layout>
          <div>Content</div>
        </Layout>,
      );

      const html = document.querySelector("html");
      expect(html).toHaveAttribute("lang", "en");
    });

    it("should have viewport meta tag", () => {
      render(
        <Layout>
          <div>Content</div>
        </Layout>,
      );

      const viewport = document.querySelector('meta[name="viewport"]');
      expect(viewport).toHaveAttribute("content", "width=device-width, shrink-to-fit=no, initial-scale=1");
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
      render(
        <Layout>
          <div>Content</div>
        </Layout>,
      );

      const ogImage = document.querySelector('meta[property="og:image"]');
      expect(ogImage).toHaveAttribute("content", "https://www.elliotjreed.com/og.png");
    });

    it("should have twitter card meta tags", () => {
      render(
        <Layout>
          <div>Content</div>
        </Layout>,
      );

      const twitterCard = document.querySelector('meta[name="twitter:card"]');
      const twitterSite = document.querySelector('meta[name="twitter:site"]');
      const twitterImage = document.querySelector('meta[name="twitter:image"]');

      expect(twitterCard).toHaveAttribute("content", "summary");
      expect(twitterSite).toHaveAttribute("content", "@elliotjreed");
      expect(twitterImage).toHaveAttribute("content", "https://www.elliotjreed.com/og.png");
    });

    it("should have manifest link", () => {
      render(
        <Layout>
          <div>Content</div>
        </Layout>,
      );

      const manifest = document.querySelector('link[rel="manifest"]');
      expect(manifest).toHaveAttribute("href", "/manifest.webmanifest");
    });

    it("should have theme-color meta tag", () => {
      render(
        <Layout>
          <div>Content</div>
        </Layout>,
      );

      const themeColor = document.querySelector('meta[name="theme-color"]');
      expect(themeColor).toHaveAttribute("content", "#1f2937");
    });
  });

  describe("ErrorBoundary", () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it("should render 404 message for 404 errors", () => {
      vi.mocked(isRouteErrorResponse).mockReturnValue(true);

      const error = { status: 404, statusText: "Not Found" };
      render(<ErrorBoundary params={{}} error={error} />);

      expect(screen.getByRole("heading", { name: "404" })).toBeInTheDocument();
      expect(screen.getByText("The requested page could not be found.")).toBeInTheDocument();
    });

    it("should render generic error message for other route errors", () => {
      vi.mocked(isRouteErrorResponse).mockReturnValue(true);

      const error = { status: 500, statusText: "Internal Server Error" };
      render(<ErrorBoundary params={{}} error={error} />);

      expect(screen.getByRole("heading", { name: "Error" })).toBeInTheDocument();
      expect(screen.getByText("Internal Server Error")).toBeInTheDocument();
    });

    it("should render default error message for non-route errors", () => {
      vi.mocked(isRouteErrorResponse).mockReturnValue(false);

      const error = null;
      render(<ErrorBoundary params={{}} error={error} />);

      expect(screen.getByRole("heading", { name: "Oops!" })).toBeInTheDocument();
      expect(screen.getByText("An unexpected error occurred.")).toBeInTheDocument();
    });

    it("should have section with divide classes", () => {
      vi.mocked(isRouteErrorResponse).mockReturnValue(false);

      const { container } = render(<ErrorBoundary params={{}} error={null} />);
      const section = container.querySelector("section");

      expect(section).toHaveClass("divide-y", "divide-gray-200", "dark:divide-gray-700");
    });
  });
});
