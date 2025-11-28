import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import GovernmentTweetRoute, { meta } from "./government-tweet";

vi.mock("~/components/GovernmentTwitter/GovernmentTwitter", () => ({
  GovernmentTwitter: () => <div data-testid="government-twitter-component">GovernmentTwitter Component</div>,
}));

describe("government-tweet route", () => {
  describe("meta", () => {
    it("should return correct meta data", () => {
      const metaData = meta();

      expect(metaData).toHaveLength(2);
      expect(metaData[0]).toEqual({ title: "No. 10 Downing Street government tweet generator | EJR" });
      expect(metaData[1]).toHaveProperty("name", "description");
      expect(metaData[1].content).toContain("UK government tweet");
    });
  });

  describe("component", () => {
    it("should render main heading", () => {
      render(<GovernmentTweetRoute />);

      expect(screen.getByRole("heading", { name: /UK Prime Minister tweet generator/i })).toBeInTheDocument();
    });

    it("should render description", () => {
      render(<GovernmentTweetRoute />);

      expect(screen.getByText(/Fill in the box below/i)).toBeInTheDocument();
    });

    it("should render GovernmentTwitter component", () => {
      render(<GovernmentTweetRoute />);

      expect(screen.getByTestId("government-twitter-component")).toBeInTheDocument();
    });

    it("should have section with divide classes", () => {
      const { container } = render(<GovernmentTweetRoute />);
      const section = container.querySelector("section");

      expect(section).toHaveClass("divide-y", "divide-gray-200", "dark:divide-gray-700");
    });

    it("should emphasize download button in text", () => {
      render(<GovernmentTweetRoute />);

      const strong = screen.getByText("download");
      expect(strong.tagName).toBe("STRONG");
    });
  });
});
