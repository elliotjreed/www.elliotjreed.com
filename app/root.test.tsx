import { render, screen } from "@testing-library/react";
import { isRouteErrorResponse } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { config } from "@fortawesome/fontawesome-svg-core";
import { NonceContext } from "~/context/nonce";
import { themeScript } from "~/utils/themeScript";
import { ErrorBoundary, Layout, meta } from "./root";

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    Links: ({ nonce }: { nonce?: string }) => (
      <span data-testid="links" data-nonce={nonce}>
        Links
      </span>
    ),
    Meta: () => <span data-testid="meta">Meta</span>,
    ScrollRestoration: () => <span data-testid="scroll-restoration">ScrollRestoration</span>,
    Scripts: () => <span data-testid="scripts">Scripts</span>,
    isRouteErrorResponse: vi.fn<(error: unknown) => boolean>(),
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
      expect(viewport).toHaveAttribute("content", "width=device-width, initial-scale=1");
    });

    it("should have skip to content link", () => {
      render(
        <Layout>
          <div>Content</div>
        </Layout>,
      );

      const skipLink = screen.getByRole("link", { name: "Skip to content" });
      expect(skipLink).toBeInTheDocument();
      expect(skipLink).toHaveAttribute("href", "#website");
    });

    it("should have main content area with id", () => {
      const { container } = render(
        <Layout>
          <div>Content</div>
        </Layout>,
      );

      const main = container.querySelector("main#website");
      expect(main).toBeInTheDocument();
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

    it("should have a theme-color meta tag for each colour scheme", () => {
      render(
        <Layout>
          <div>Content</div>
        </Layout>,
      );

      const lightThemeColor = document.querySelector('meta[name="theme-color"][media="(prefers-color-scheme: light)"]');
      const darkThemeColor = document.querySelector('meta[name="theme-color"][media="(prefers-color-scheme: dark)"]');
      expect(lightThemeColor).toHaveAttribute("content", "#fbf5f4");
      expect(darkThemeColor).toHaveAttribute("content", "#170f0e");
    });

    it("should run the theme script in the head before the page renders", () => {
      render(
        <Layout>
          <div>Content</div>
        </Layout>,
      );

      const scripts = Array.from(document.head.querySelectorAll("script"));
      expect(scripts.some((script) => script.textContent === themeScript)).toBe(true);
    });

    it("should use the build-time Font Awesome stylesheet rather than injecting one at runtime", () => {
      expect(config.autoAddCss).toBe(false);
    });

    it("should pass the CSP nonce to Links so server and client render the same attribute", () => {
      render(
        <NonceContext.Provider value="test-nonce">
          <Layout>
            <div>Content</div>
          </Layout>
        </NonceContext.Provider>,
      );

      expect(document.querySelector('[data-testid="links"]')).toHaveAttribute("data-nonce", "test-nonce");
    });

    it("should not pass an empty nonce to Links when there is no nonce", () => {
      render(
        <Layout>
          <div>Content</div>
        </Layout>,
      );

      expect(document.querySelector('[data-testid="links"]')).not.toHaveAttribute("data-nonce");
    });

    it("should render without throwing during error boundary path (no nonce context)", () => {
      expect(() =>
        render(
          <Layout>
            <div>Error content</div>
          </Layout>,
        ),
      ).not.toThrow();
    });
  });

  describe("meta", () => {
    const location = { pathname: "/linux/zsh-bash-aliases" } as Parameters<typeof meta>[0]["location"];
    const run = (overrides: Partial<Parameters<typeof meta>[0]> = {}) =>
      meta({ location, matches: [], error: undefined, ...overrides } as Parameters<typeof meta>[0]) as Record<
        string,
        string
      >[];
    const content = (tags: Record<string, string>[], key: "property" | "name", value: string): string[] =>
      tags.filter((tag) => tag[key] === value).map((tag) => tag.content);

    beforeEach(() => {
      vi.clearAllMocks();
    });

    it("adds the default social image and Twitter card when the route sets none", () => {
      const tags = run();

      expect(content(tags, "property", "og:image")).toEqual(["https://www.elliotjreed.com/og.png"]);
      expect(content(tags, "name", "twitter:card")).toEqual(["summary"]);
      expect(content(tags, "name", "twitter:site")).toEqual(["@elliotjreed"]);
      expect(content(tags, "name", "twitter:image")).toEqual(["https://www.elliotjreed.com/og.png"]);
    });

    it("does not duplicate social tags the route already sets", () => {
      const routeMeta = [
        { property: "og:image", content: "https://www.elliotjreed.com/custom.png" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@elliotjreed" },
        { name: "twitter:image", content: "https://www.elliotjreed.com/custom.png" },
      ];
      const tags = run({ matches: [{ meta: routeMeta }] } as unknown as Partial<Parameters<typeof meta>[0]>);

      expect(content(tags, "property", "og:image")).toEqual([]);
      expect(content(tags, "name", "twitter:card")).toEqual([]);
      expect(content(tags, "name", "twitter:site")).toEqual([]);
      expect(content(tags, "name", "twitter:image")).toEqual([]);
    });

    it("marks a missing page as noindex without a canonical URL", () => {
      vi.mocked(isRouteErrorResponse).mockReturnValue(true);

      const tags = run({ error: { status: 404, statusText: "Not Found" } });

      expect(tags).toContainEqual({ name: "robots", content: "noindex" });
      expect(tags).toContainEqual({ title: "Page not found | Elliot J. Reed" });
      expect(tags.some((tag) => tag.rel === "canonical")).toBe(false);
      expect(content(tags, "property", "og:url")).toEqual([]);
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
      expect(screen.getByText(/Sorry, that page doesn't exist/)).toBeInTheDocument();
    });

    it("should render category links on 404", () => {
      vi.mocked(isRouteErrorResponse).mockReturnValue(true);

      const error = { status: 404, statusText: "Not Found" };
      render(<ErrorBoundary params={{}} error={error} />);

      const nav = screen.getByRole("navigation", { name: "Suggested sections" });
      expect(nav).toBeInTheDocument();

      expect(screen.getByRole("link", { name: "AI guides" })).toHaveAttribute("href", "/ai");
      expect(screen.getByRole("link", { name: "ZSH / Bash shell guides" })).toHaveAttribute("href", "/linux");
      expect(screen.getByRole("link", { name: "Docker guides" })).toHaveAttribute("href", "/docker");
      expect(screen.getByRole("link", { name: "PHP guides" })).toHaveAttribute("href", "/php");
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

      expect(screen.getByRole("heading", { name: "Something went wrong" })).toBeInTheDocument();
      expect(screen.getByText("An unexpected error occurred.")).toBeInTheDocument();
    });

    it("should have section with divide classes", () => {
      vi.mocked(isRouteErrorResponse).mockReturnValue(false);

      const { container } = render(<ErrorBoundary params={{}} error={null} />);
      const section = container.querySelector("section");

      expect(section).toHaveClass("divide-y", "divide-line");
    });
  });
});
