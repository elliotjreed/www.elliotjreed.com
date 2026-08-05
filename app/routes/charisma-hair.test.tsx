import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CharismaHairRoute, { meta } from "./charisma-hair";

describe("charisma-hair route", () => {
  describe("meta", () => {
    it("should return correct meta data", () => {
      const metaData = meta();

      expect(metaData).toContainEqual({ title: "Charisma Hair | EJR" });
      expect(metaData).toContainEqual({
        name: "description",
        content: "Charisma Hair has closed. A thank you and farewell message from Charis, Jo, and Lily.",
      });
    });
  });

  describe("component", () => {
    it("should render main heading", () => {
      render(<CharismaHairRoute />);

      expect(screen.getByRole("heading", { name: "Charisma Hair", level: 1 })).toBeInTheDocument();
    });

    it("should render the farewell message", () => {
      render(<CharismaHairRoute />);

      expect(
        screen.getByText(/Charis, Jo, and Lily would like to say a massive thank you and farewell/i),
      ).toBeInTheDocument();
    });

    it("should render both photographs with descriptive alt text", () => {
      render(<CharismaHairRoute />);

      expect(screen.getByAltText("The Charisma Hair salon sign")).toBeInTheDocument();
      expect(screen.getByAltText("Charis, Jo, and Lily together at Charisma Hair")).toBeInTheDocument();
    });

    it("should have section with divide classes", () => {
      const { container } = render(<CharismaHairRoute />);
      const section = container.querySelector("section");

      expect(section).toHaveClass("divide-y", "divide-gray-200", "dark:divide-gray-700");
    });
  });
});
