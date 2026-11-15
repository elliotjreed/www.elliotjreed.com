import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HeadingAnchor } from "./HeadingAnchor";

describe("HeadingAnchor", () => {
  it("renders a heading with the given id", () => {
    render(<HeadingAnchor id="installation">Installation</HeadingAnchor>);

    expect(screen.getByRole("heading", { level: 2 })).toHaveAttribute("id", "installation");
  });

  it("keeps the heading text free of icon labels so parsers read only the heading", () => {
    render(<HeadingAnchor id="installation">Installation</HeadingAnchor>);

    expect(screen.getByRole("heading", { level: 2 }).textContent).toBe("Installation");
  });

  it("offers a labelled button to copy the section link", () => {
    render(<HeadingAnchor id="installation">Installation</HeadingAnchor>);

    expect(screen.getByRole("button", { name: "Copy link to Installation" })).toBeInTheDocument();
  });
});
