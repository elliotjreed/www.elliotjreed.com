import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router";
import { NavLinkItem } from "./NavLinkItem";
import type { StaticLink } from "~/data/staticLinks";

describe("NavLinkItem", () => {
  const mockLink: StaticLink = {
    href: "/test",
    title: "Test Link",
    showInNavigation: true,
  };

  it("should render link with title", () => {
    const closeMenu = vi.fn();
    render(
      <BrowserRouter>
        <NavLinkItem link={mockLink} closeMenu={closeMenu} />
      </BrowserRouter>,
    );

    expect(screen.getByText("Test Link")).toBeInTheDocument();
  });

  it("should render link with correct href", () => {
    const closeMenu = vi.fn();
    render(
      <BrowserRouter>
        <NavLinkItem link={mockLink} closeMenu={closeMenu} />
      </BrowserRouter>,
    );

    const link = screen.getByRole("link", { name: "Test Link" });
    expect(link).toHaveAttribute("href", "/test");
  });

  it("should call closeMenu when clicked", async () => {
    const user = userEvent.setup();
    const closeMenu = vi.fn();
    render(
      <BrowserRouter>
        <NavLinkItem link={mockLink} closeMenu={closeMenu} />
      </BrowserRouter>,
    );

    const link = screen.getByRole("link", { name: "Test Link" });
    await user.click(link);

    expect(closeMenu).toHaveBeenCalledTimes(1);
  });

  it("should have hover classes", () => {
    const closeMenu = vi.fn();
    render(
      <BrowserRouter>
        <NavLinkItem link={mockLink} closeMenu={closeMenu} />
      </BrowserRouter>,
    );

    const link = screen.getByRole("link", { name: "Test Link" });
    expect(link).toHaveClass("hover:bg-gray-100", "dark:hover:bg-gray-700");
  });

  it("should have base styling classes", () => {
    const closeMenu = vi.fn();
    render(
      <BrowserRouter>
        <NavLinkItem link={mockLink} closeMenu={closeMenu} />
      </BrowserRouter>,
    );

    const link = screen.getByRole("link", { name: "Test Link" });
    expect(link).toHaveClass("block", "py-2", "px-3", "rounded-sm");
  });

  it("should have text color classes", () => {
    const closeMenu = vi.fn();
    render(
      <BrowserRouter>
        <NavLinkItem link={mockLink} closeMenu={closeMenu} />
      </BrowserRouter>,
    );

    const link = screen.getByRole("link", { name: "Test Link" });
    expect(link).toHaveClass("text-gray-700", "dark:text-gray-200");
  });

  it("should have prefetch intent attribute", () => {
    const closeMenu = vi.fn();
    render(
      <BrowserRouter>
        <NavLinkItem link={mockLink} closeMenu={closeMenu} />
      </BrowserRouter>,
    );

    const link = screen.getByRole("link", { name: "Test Link" });
    expect(link).toHaveAttribute("data-discover", "true");
  });

  it("should apply font-semibold class when isActive is true", () => {
    const closeMenu = vi.fn();
    render(
      <BrowserRouter>
        <NavLinkItem link={mockLink} closeMenu={closeMenu} isActive={true} />
      </BrowserRouter>,
    );

    const link = screen.getByRole("link", { name: "Test Link" });
    expect(link).toHaveClass("font-semibold");
  });

  it("should render list item", () => {
    const closeMenu = vi.fn();
    const { container } = render(
      <BrowserRouter>
        <NavLinkItem link={mockLink} closeMenu={closeMenu} />
      </BrowserRouter>,
    );

    const li = container.querySelector("li");
    expect(li).toBeInTheDocument();
  });
});
