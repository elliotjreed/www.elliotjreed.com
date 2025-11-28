import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SocialLinks } from "./SocialLinks";

describe("SocialLinks", () => {
  it("should render GitHub link", () => {
    render(<SocialLinks />);

    const githubLink = screen.getByTitle("GitHub");
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute("href", "https://github.com/elliotjreed");
    expect(githubLink).toHaveAttribute("rel", "noreferrer noopener");
  });

  it("should render LinkedIn link", () => {
    render(<SocialLinks />);

    const linkedinLink = screen.getByTitle("LinkedIn");
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute("href", "https://www.linkedin.com/in/elliotjreed?utm_source=elliotjreed.com");
    expect(linkedinLink).toHaveAttribute("rel", "noreferrer noopener");
  });

  it("should render Telegram link", () => {
    render(<SocialLinks />);

    const telegramLink = screen.getByTitle("Telegram");
    expect(telegramLink).toBeInTheDocument();
    expect(telegramLink).toHaveAttribute("href", "https://t.me/elliotjreed?utm_source=elliotjreed.com");
    expect(telegramLink).toHaveAttribute("rel", "noreferrer noopener");
  });

  it("should render Twitter / X link", () => {
    render(<SocialLinks />);

    const twitterLink = screen.getByTitle("Twitter / X");
    expect(twitterLink).toBeInTheDocument();
    expect(twitterLink).toHaveAttribute("href", "https://x.com/elliotjreed?utm_source=elliotjreed.com");
    expect(twitterLink).toHaveAttribute("rel", "noreferrer noopener");
  });

  it("should render BlueSky link", () => {
    render(<SocialLinks />);

    const blueskyLink = screen.getByTitle("BlueSky");
    expect(blueskyLink).toBeInTheDocument();
    expect(blueskyLink).toHaveAttribute(
      "href",
      "https://bsky.app/profile/elliotjreed.bsky.social?utm_source=elliotjreed.com",
    );
    expect(blueskyLink).toHaveAttribute("rel", "noreferrer noopener");
  });

  it("should render all social links", () => {
    render(<SocialLinks />);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(5);
  });

  it("should have correct aria-labels", () => {
    render(<SocialLinks />);

    expect(screen.getByLabelText("GitHub Profile")).toBeInTheDocument();
    expect(screen.getByLabelText("LinkedIn Profile")).toBeInTheDocument();
    expect(screen.getByLabelText("Telegram")).toBeInTheDocument();
    expect(screen.getByLabelText("Twitter / X Profile")).toBeInTheDocument();
    expect(screen.getByLabelText("BlueSky Profile")).toBeInTheDocument();
  });

  it("should have dark mode text color classes", () => {
    const { container } = render(<SocialLinks />);
    const links = container.querySelectorAll("a");

    links.forEach((link) => {
      expect(link).toHaveClass("text-primary-900", "dark:text-primary-200");
    });
  });
});
