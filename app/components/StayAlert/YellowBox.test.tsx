import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { createRef } from "react";
import { YellowBox } from "./YellowBox";

describe("YellowBox", () => {
  const mockRef = createRef<HTMLDivElement>();
  const props = {
    lineOne: "First line text",
    lineTwo: "Second line text",
    lineThree: "Third line text",
    contentContainerRef: mockRef,
  };

  it("should render all three lines of text", () => {
    render(<YellowBox {...props} />);

    expect(screen.getByText("First line text")).toBeInTheDocument();
    expect(screen.getByText("Second line text")).toBeInTheDocument();
    expect(screen.getByText("Third line text")).toBeInTheDocument();
  });

  it("should have yellow-poster-container class", () => {
    const { container } = render(<YellowBox {...props} />);
    const posterContainer = container.querySelector(".yellow-poster-container");

    expect(posterContainer).toBeInTheDocument();
  });

  it("should have yellow-poster class", () => {
    const { container } = render(<YellowBox {...props} />);
    const poster = container.querySelector(".yellow-poster");

    expect(poster).toBeInTheDocument();
  });

  it("should attach ref to container", () => {
    const ref = createRef<HTMLDivElement>();
    const propsWithRef = { ...props, contentContainerRef: ref };
    render(<YellowBox {...propsWithRef} />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("should render arrow-down divs", () => {
    const { container } = render(<YellowBox {...props} />);
    const arrows = container.querySelectorAll(".arrow-down");

    expect(arrows).toHaveLength(2);
  });

  it("should have centered text paragraphs", () => {
    const { container } = render(<YellowBox {...props} />);
    const paragraphs = container.querySelectorAll(".has-text-centered");

    expect(paragraphs).toHaveLength(3);
  });

  it("should render figure element", () => {
    const { container } = render(<YellowBox {...props} />);
    const figure = container.querySelector("figure");

    expect(figure).toBeInTheDocument();
    expect(figure).toHaveClass("yellow-poster-inner");
  });

  it("should render different content when props change", () => {
    const { rerender } = render(<YellowBox {...props} />);

    expect(screen.getByText("First line text")).toBeInTheDocument();

    const newProps = {
      ...props,
      lineOne: "Updated first line",
      lineTwo: "Updated second line",
      lineThree: "Updated third line",
    };

    rerender(<YellowBox {...newProps} />);

    expect(screen.getByText("Updated first line")).toBeInTheDocument();
    expect(screen.getByText("Updated second line")).toBeInTheDocument();
    expect(screen.getByText("Updated third line")).toBeInTheDocument();
  });
});
