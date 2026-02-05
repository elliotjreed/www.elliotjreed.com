import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PrivacyRoute, { meta } from "./privacy";

describe("privacy route", () => {
  describe("meta", () => {
    it("should return correct meta data", () => {
      const metaData = meta();

      expect(metaData).toContainEqual({ title: "Privacy Policy | EJR" });
      expect(metaData).toContainEqual({
        name: "description",
        content: "Website privacy policy for www.elliotjreed.com",
      });
    });
  });

  describe("component", () => {
    it("should render main heading", () => {
      render(<PrivacyRoute />);

      expect(screen.getByRole("heading", { name: "Privacy Policy", level: 1 })).toBeInTheDocument();
    });

    it("should render introduction text", () => {
      render(<PrivacyRoute />);

      expect(screen.getByText(/Welcome to my personal website/i)).toBeInTheDocument();
    });

    it("should render Information I Collect section", () => {
      render(<PrivacyRoute />);

      expect(screen.getByRole("heading", { name: "Information I Collect" })).toBeInTheDocument();
    });

    it("should have section with divide classes", () => {
      const { container } = render(<PrivacyRoute />);
      const section = container.querySelector("section");

      expect(section).toHaveClass("divide-y", "divide-gray-200", "dark:divide-gray-700");
    });

    it("should mention GDPR compliance", () => {
      render(<PrivacyRoute />);

      expect(screen.getByText(/UK General Data Protection Regulation/i)).toBeInTheDocument();
    });

    it("should mention Cloudflare as hosting provider", () => {
      render(<PrivacyRoute />);

      const cloudflareReferences = screen.getAllByText(/hosting provider \(Cloudflare\)/i);
      expect(cloudflareReferences.length).toBeGreaterThan(0);
    });

    it("should have prose container", () => {
      const { container } = render(<PrivacyRoute />);
      const prose = container.querySelector(".prose");

      expect(prose).toBeInTheDocument();
      expect(prose).toHaveClass("max-w-none", "dark:prose-dark");
    });
  });
});
