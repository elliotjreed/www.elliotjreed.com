import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Callout } from "./Callout";

describe("Callout", () => {
  it("renders a note with its label word by default", () => {
    render(<Callout>Back up the database first.</Callout>);

    const callout = screen.getByRole("note");
    expect(callout).toHaveClass("ejr-callout");
    expect(callout).toHaveTextContent("Note");
    expect(callout).toHaveTextContent("Back up the database first.");
  });

  it.each([
    ["success", "Success", "ejr-callout-success"],
    ["warning", "Warning", "ejr-callout-warning"],
  ] as const)("renders the %s variant with its label and class", (variant, label, className) => {
    render(<Callout variant={variant}>Content</Callout>);

    const callout = screen.getByRole("note");
    expect(callout).toHaveClass("ejr-callout", className);
    expect(screen.getByText(label)).toHaveClass("ejr-callout-label");
  });

  it("announces the danger variant as an alert", () => {
    render(<Callout variant="danger">This deletes every container.</Callout>);

    const callout = screen.getByRole("alert");
    expect(callout).toHaveClass("ejr-callout-danger");
    expect(callout).toHaveTextContent("Danger");
  });

  it("accepts a custom label", () => {
    render(
      <Callout variant="warning" label="Not financial advice">
        Content
      </Callout>,
    );

    expect(screen.getByText("Not financial advice")).toHaveClass("ejr-callout-label");
  });
});
