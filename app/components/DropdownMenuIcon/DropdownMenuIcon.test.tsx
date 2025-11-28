import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DropdownMenuIcon } from "./DropdownMenuIcon";

describe("DropdownMenuIcon", () => {
  it("should render SVG element", () => {
    const { container } = render(<DropdownMenuIcon isOpen={false} />);
    const svg = container.querySelector("svg");

    expect(svg).toBeInTheDocument();
  });

  it("should have correct classes when closed", () => {
    const { container } = render(<DropdownMenuIcon isOpen={false} />);
    const svg = container.querySelector("svg");

    expect(svg).toHaveClass("w-2.5", "h-2.5", "ml-2", "transition-transform");
    expect(svg).not.toHaveClass("rotate-180");
  });

  it("should have rotate-180 class when open", () => {
    const { container } = render(<DropdownMenuIcon isOpen={true} />);
    const svg = container.querySelector("svg");

    expect(svg).toHaveClass("w-2.5", "h-2.5", "ml-2", "transition-transform", "rotate-180");
  });

  it("should have correct viewBox", () => {
    const { container } = render(<DropdownMenuIcon isOpen={false} />);
    const svg = container.querySelector("svg");

    expect(svg).toHaveAttribute("viewBox", "0 0 10 6");
  });

  it("should have title element", () => {
    render(<DropdownMenuIcon isOpen={false} />);

    expect(screen.getByTitle("Toggle Submenu")).toBeInTheDocument();
  });

  it("should render path element", () => {
    const { container } = render(<DropdownMenuIcon isOpen={false} />);
    const path = container.querySelector("path");

    expect(path).toBeInTheDocument();
    expect(path).toHaveAttribute("stroke", "currentColor");
    expect(path).toHaveAttribute("stroke-linecap", "round");
    expect(path).toHaveAttribute("stroke-linejoin", "round");
    expect(path).toHaveAttribute("stroke-width", "2");
  });
});
