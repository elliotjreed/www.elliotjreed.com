import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import StayAlertRoute, { meta } from "./stay-alert";

vi.mock("~/components/StayAlert/StayAlert", () => ({
  StayAlert: () => <div data-testid="stay-alert-component">StayAlert Component</div>,
}));

describe("stay-alert route", () => {
  describe("meta", () => {
    it("should return correct meta data", () => {
      const metaData = meta();

      expect(metaData).toHaveLength(2);
      expect(metaData[0]).toEqual({ title: "Stay alert poster generator | EJR" });
      expect(metaData[1]).toHaveProperty("name", "description");
      expect(metaData[1].content).toContain("Stay Alert");
    });
  });

  describe("component", () => {
    it("should render main heading", () => {
      render(<StayAlertRoute />);

      expect(screen.getByRole("heading", { name: /Stay alert.*poster generator/i })).toBeInTheDocument();
    });

    it("should render description", () => {
      render(<StayAlertRoute />);

      expect(screen.getByText(/Fill in the box below/i)).toBeInTheDocument();
    });

    it("should render StayAlert component", () => {
      render(<StayAlertRoute />);

      expect(screen.getByTestId("stay-alert-component")).toBeInTheDocument();
    });

    it("should have section with divide classes", () => {
      const { container } = render(<StayAlertRoute />);
      const section = container.querySelector("section");

      expect(section).toHaveClass("divide-y", "divide-gray-200", "dark:divide-gray-700");
    });

    it("should emphasize download button in text", () => {
      render(<StayAlertRoute />);

      const strong = screen.getByText("download");
      expect(strong.tagName).toBe("STRONG");
    });
  });
});
