import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CodeSnippet } from "./CodeSnippet";

describe("CodeSnippet", () => {
  const mockCode = "console.log('Hello, World!')";
  const mockTitle = "Test Code";
  let mockWriteText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockWriteText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      writable: true,
      configurable: true,
      value: {
        writeText: mockWriteText,
      },
    });
  });

  it("should render title", () => {
    render(<CodeSnippet code={mockCode} title={mockTitle} />);

    expect(screen.getByText(mockTitle)).toBeInTheDocument();
  });

  it("should render code content", () => {
    render(<CodeSnippet code={mockCode} title={mockTitle} />);

    expect(screen.getByText(mockCode)).toBeInTheDocument();
  });

  it("should render copy button", () => {
    render(<CodeSnippet code={mockCode} title={mockTitle} />);

    const copyButton = screen.getByRole("button", { name: /copy/i });
    expect(copyButton).toBeInTheDocument();
  });

  it("should show 'Copied' message after copying", async () => {
    const user = userEvent.setup();
    render(<CodeSnippet code={mockCode} title={mockTitle} />);

    const copyButton = screen.getByRole("button", { name: /copy/i });
    await user.click(copyButton);

    expect(screen.getByRole("button", { name: "Copied" })).toBeInTheDocument();
  });

  it("should render the code inside a design system code block", () => {
    const { container } = render(<CodeSnippet code={mockCode} title={mockTitle} />);

    const figure = container.querySelector("figure");

    expect(figure).toHaveClass("ejr-code", "not-prose");
    expect(figure?.querySelector("pre code")).toBeInTheDocument();
  });

  it("should render the title as the block caption", () => {
    const { container } = render(<CodeSnippet code={mockCode} title={mockTitle} />);

    expect(container.querySelector("figcaption")).toHaveTextContent(mockTitle);
  });

  it("should style the copy control as the design system copy button", () => {
    render(<CodeSnippet code={mockCode} title={mockTitle} />);

    expect(screen.getByRole("button", { name: "Copy" })).toHaveClass("ejr-code-copy");
  });

  it("should have button type attribute", () => {
    render(<CodeSnippet code={mockCode} title={mockTitle} />);

    const copyButton = screen.getByRole("button", { name: /copy/i });
    expect(copyButton).toHaveAttribute("type", "button");
  });

  it("should use bash language by default", () => {
    const { container } = render(<CodeSnippet code={mockCode} title={mockTitle} />);

    const pre = container.querySelector("pre");
    expect(pre).toBeInTheDocument();
  });

  it("should accept and use custom language prop", () => {
    const phpCode = "<?php echo 'Hello World'; ?>";
    const { container } = render(<CodeSnippet code={phpCode} title="PHP Example" language="php" />);

    const pre = container.querySelector("pre");
    expect(pre).toBeInTheDocument();
    expect(screen.getByText(phpCode)).toBeInTheDocument();
  });
});
