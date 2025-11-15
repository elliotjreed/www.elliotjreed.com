import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { GovernmentTwitter } from "./GovernmentTwitter";

vi.mock("dom-to-image-more", () => ({
  default: {
    toPng: vi.fn(() => Promise.resolve("data:image/png;base64,mockImageData")),
  },
}));

describe("GovernmentTwitter", () => {
  it("should render TweetBox component", () => {
    render(<GovernmentTwitter />);

    // Check for elements that exist in the real TweetBox component
    expect(screen.getByText("UK Prime Minister")).toBeInTheDocument();
    expect(screen.getByText(/@10DowningStreet/)).toBeInTheDocument();
  });

  it("should render textarea", () => {
    render(<GovernmentTwitter />);

    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeInTheDocument();
  });

  it("should have correct placeholder", () => {
    render(<GovernmentTwitter />);

    expect(screen.getByPlaceholderText("Stay alert by making your own government tweet.")).toBeInTheDocument();
  });

  it("should render download button", async () => {
    render(<GovernmentTwitter />);

    await waitFor(() => {
      const downloadLink = screen.getByRole("link", { name: "Download" });
      expect(downloadLink).toBeInTheDocument();
      expect(downloadLink).toHaveAttribute("download", "tweet.png");
    });
  });

  it("should have initial tweet content", () => {
    render(<GovernmentTwitter />);

    expect(screen.getByText(/Stay alert by making your own Government tweet/i)).toBeInTheDocument();
  });

  it("should update TweetBox when textarea changes", async () => {
    const user = userEvent.setup();
    render(<GovernmentTwitter />);

    const textarea = screen.getByRole("textbox");
    await user.clear(textarea);
    await user.type(textarea, "New tweet content");

    await waitFor(() => {
      expect(screen.getByText("New tweet content")).toBeInTheDocument();
    });
  });

  it("should have download URL href", async () => {
    render(<GovernmentTwitter />);

    await waitFor(() => {
      const downloadLink = screen.getByRole("link", { name: "Download" });
      const href = downloadLink.getAttribute("href");
      expect(href).toBeTruthy();
      expect(href).toContain("data:image/png");
    });
  });

  it("should have form element", () => {
    const { container } = render(<GovernmentTwitter />);
    const form = container.querySelector("form");

    expect(form).toBeInTheDocument();
  });

  it("should have container with grid layout", () => {
    const { container } = render(<GovernmentTwitter />);
    const grid = container.querySelector(".grid");

    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass("grid-cols-4", "gap-4");
  });

  it("should have textarea with 3 rows", () => {
    render(<GovernmentTwitter />);

    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("rows", "3");
  });

  it("should have correct title attribute", () => {
    render(<GovernmentTwitter />);

    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("title", "Stay alert by making your own government tweet.");
  });
});
