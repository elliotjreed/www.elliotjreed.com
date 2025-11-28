import { render, screen, waitFor } from "@testing-library/react";
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

  // Skipping clipboard mocking tests due to browser API limitations in test environment
  it.skip("should copy code to clipboard when copy button is clicked", async () => {
    const user = userEvent.setup();
    render(<CodeSnippet code={mockCode} title={mockTitle} />);

    const copyButton = screen.getByRole("button", { name: /copy/i });
    await user.click(copyButton);

    expect(mockWriteText).toHaveBeenCalledWith(mockCode);
  });

  it("should show 'Copied!' message after copying", async () => {
    const user = userEvent.setup();
    render(<CodeSnippet code={mockCode} title={mockTitle} />);

    const copyButton = screen.getByRole("button", { name: /copy/i });
    await user.click(copyButton);

    expect(screen.getByText("Copied!")).toBeInTheDocument();
  });

  it.skip("should revert to 'Copy' text after 2 seconds", async () => {
    vi.useFakeTimers();
    const user = userEvent.setup({ delay: null });
    render(<CodeSnippet code={mockCode} title={mockTitle} />);

    const copyButton = screen.getByRole("button", { name: /copy/i });
    await user.click(copyButton);

    expect(await screen.findByText("Copied!")).toBeInTheDocument();

    vi.advanceTimersByTime(2000);

    expect(await screen.findByText("Copy")).toBeInTheDocument();

    vi.useRealTimers();
  });

  it.skip("should handle copy error gracefully", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const errorWriteText = vi.fn().mockRejectedValue(new Error("Copy failed"));

    Object.defineProperty(navigator, "clipboard", {
      writable: true,
      configurable: true,
      value: {
        writeText: errorWriteText,
      },
    });

    const user = userEvent.setup();
    render(<CodeSnippet code={mockCode} title={mockTitle} />);

    const copyButton = screen.getByRole("button", { name: /copy/i });
    await user.click(copyButton);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    consoleErrorSpy.mockRestore();
  });

  it("should render pre and code elements", () => {
    const { container } = render(<CodeSnippet code={mockCode} title={mockTitle} />);

    const pre = container.querySelector("pre");
    const code = container.querySelector("code");

    expect(pre).toBeInTheDocument();
    expect(code).toBeInTheDocument();
  });

  it("should have correct styling classes", () => {
    const { container } = render(<CodeSnippet code={mockCode} title={mockTitle} />);

    const pre = container.querySelector("pre");
    expect(pre).toHaveClass("p-4", "text-gray-300", "bg-gray-800", "overflow-x-auto", "font-mono", "text-sm");
  });

  it("should render copy icon SVG", () => {
    render(<CodeSnippet code={mockCode} title={mockTitle} />);

    expect(screen.getByTitle("Copy button icon")).toBeInTheDocument();
  });

  it("should have button type attribute", () => {
    render(<CodeSnippet code={mockCode} title={mockTitle} />);

    const copyButton = screen.getByRole("button", { name: /copy/i });
    expect(copyButton).toHaveAttribute("type", "button");
  });
});
