import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { TweetBox } from "./TweetBox";

describe("TweetBox", () => {
  const mockContent = "This is a test tweet content";
  const mockRef = createRef<HTMLDivElement>();

  it("should render tweet content", () => {
    render(<TweetBox content={mockContent} contentContainerRef={mockRef} />);

    expect(screen.getByText(mockContent)).toBeInTheDocument();
  });

  it("should render UK Prime Minister name", () => {
    render(<TweetBox content={mockContent} contentContainerRef={mockRef} />);

    expect(screen.getByText("UK Prime Minister")).toBeInTheDocument();
  });

  it("should render @10DowningStreet handle", () => {
    render(<TweetBox content={mockContent} contentContainerRef={mockRef} />);

    expect(screen.getByText("@10DowningStreet")).toBeInTheDocument();
  });

  it("should render profile image", () => {
    render(<TweetBox content={mockContent} contentContainerRef={mockRef} />);

    const image = screen.getByAltText("10DowningStreet Twitter avatar");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("width", "40");
    expect(image).toHaveAttribute("height", "40");
  });

  it("should have tweet class", () => {
    const { container } = render(<TweetBox content={mockContent} contentContainerRef={mockRef} />);
    const tweet = container.querySelector(".tweet");

    expect(tweet).toBeInTheDocument();
  });

  it("should have tweet-body class for content", () => {
    const { container } = render(<TweetBox content={mockContent} contentContainerRef={mockRef} />);
    const tweetBody = container.querySelector(".tweet-body");

    expect(tweetBody).toBeInTheDocument();
    expect(tweetBody).toHaveTextContent(mockContent);
  });

  it("should render footer with icons", () => {
    const { container } = render(<TweetBox content={mockContent} contentContainerRef={mockRef} />);
    const footer = container.querySelector(".tweet-footer");

    expect(footer).toBeInTheDocument();
  });

  it("should attach ref to container", () => {
    const ref = createRef<HTMLDivElement>();
    render(<TweetBox content={mockContent} contentContainerRef={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("should render tweet head section", () => {
    const { container } = render(<TweetBox content={mockContent} contentContainerRef={mockRef} />);
    const tweetHead = container.querySelector(".tweet-head");

    expect(tweetHead).toBeInTheDocument();
  });

  it("should have name span", () => {
    const { container } = render(<TweetBox content={mockContent} contentContainerRef={mockRef} />);
    const name = container.querySelector(".name");

    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent("UK Prime Minister");
  });

  it("should have handle span", () => {
    const { container } = render(<TweetBox content={mockContent} contentContainerRef={mockRef} />);
    const handle = container.querySelector(".handle");

    expect(handle).toBeInTheDocument();
    expect(handle).toHaveTextContent("@10DowningStreet");
  });
});
