import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HamburgerIcon } from "./HamburgerIcon";

describe("HamburgerIcon", () => {
  it("should render open menu icon when isOpen is false", () => {
    const { container } = render(<HamburgerIcon isOpen={false} />);

    const srOnly = container.querySelector(".sr-only");
    expect(srOnly).toHaveTextContent("Open main menu");
    const title = container.querySelector("title");
    expect(title).toHaveTextContent("Open main menu");
  });

  it("should render close menu icon when isOpen is true", () => {
    const { container } = render(<HamburgerIcon isOpen={true} />);

    const srOnly = container.querySelector(".sr-only");
    expect(srOnly).toHaveTextContent("Close main menu");
    const title = container.querySelector("title");
    expect(title).toHaveTextContent("Close main menu");
  });

  it("should render SVG element when isOpen is false", () => {
    const { container } = render(<HamburgerIcon isOpen={false} />);
    const svg = container.querySelector("svg");

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("w-5", "h-5");
  });

  it("should render SVG element when isOpen is true", () => {
    const { container } = render(<HamburgerIcon isOpen={true} />);
    const svg = container.querySelector("svg");

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("w-5", "h-5");
  });

  it("should have correct viewBox for both states", () => {
    const { container: containerClosed } = render(<HamburgerIcon isOpen={false} />);
    const svgClosed = containerClosed.querySelector("svg");
    expect(svgClosed).toHaveAttribute("viewBox", "0 0 24 24");

    const { container: containerOpen } = render(<HamburgerIcon isOpen={true} />);
    const svgOpen = containerOpen.querySelector("svg");
    expect(svgOpen).toHaveAttribute("viewBox", "0 0 24 24");
  });

  it("should have screen reader only text", () => {
    const { container } = render(<HamburgerIcon isOpen={false} />);
    const srOnly = container.querySelector(".sr-only");

    expect(srOnly).toBeInTheDocument();
    expect(srOnly).toHaveTextContent("Open main menu");
  });
});
