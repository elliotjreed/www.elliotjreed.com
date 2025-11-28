import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import type { StaticLink } from "~/data/staticLinks";
import { NavLinkItem } from "./NavLinkItem";

describe("NavLinkItem", () => {
  const mockLink: StaticLink = {
    href: "/test",
    title: "Test Link",
    showInNavigation: true,
  };

  it("should render link with title", () => {
    const closeMenu = vi.fn();
    render(
      <MemoryRouter>
        <NavLinkItem link={mockLink} closeMenu={closeMenu} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Test Link")).toBeInTheDocument();
  });

  it("should render link with correct href", () => {
    const closeMenu = vi.fn();
    render(
      <MemoryRouter>
        <NavLinkItem link={mockLink} closeMenu={closeMenu} />
      </MemoryRouter>,
    );

    const link = screen.getByRole("link", { name: "Test Link" });
    expect(link).toHaveAttribute("href", "/test");
  });

  it("should call closeMenu when clicked", async () => {
    const user = userEvent.setup();
    const closeMenu = vi.fn();
    render(
      <MemoryRouter>
        <NavLinkItem link={mockLink} closeMenu={closeMenu} />
      </MemoryRouter>,
    );

    const link = screen.getByRole("link", { name: "Test Link" });
    await user.click(link);

    expect(closeMenu).toHaveBeenCalledTimes(1);
  });

  it("should have hover classes", () => {
    const closeMenu = vi.fn();
    render(
      <MemoryRouter>
        <NavLinkItem link={mockLink} closeMenu={closeMenu} />
      </MemoryRouter>,
    );

    const link = screen.getByRole("link", { name: "Test Link" });
    expect(link).toHaveClass("hover:bg-gray-100", "dark:hover:bg-gray-800");
  });

  it("should have base styling classes", () => {
    const closeMenu = vi.fn();
    render(
      <MemoryRouter>
        <NavLinkItem link={mockLink} closeMenu={closeMenu} />
      </MemoryRouter>,
    );

    const link = screen.getByRole("link", { name: "Test Link" });
    expect(link).toHaveClass("block", "px-4", "py-3", "md:py-2", "rounded-lg", "font-medium");
  });

  it("should have text color classes", () => {
    const closeMenu = vi.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <NavLinkItem link={mockLink} closeMenu={closeMenu} />
      </MemoryRouter>,
    );

    const link = screen.getByRole("link", { name: "Test Link" });
    expect(link).toHaveClass("text-gray-700", "dark:text-gray-200");
  });

  it("should have prefetch intent attribute", () => {
    const closeMenu = vi.fn();
    render(
      <MemoryRouter>
        <NavLinkItem link={mockLink} closeMenu={closeMenu} />
      </MemoryRouter>,
    );

    const link = screen.getByRole("link", { name: "Test Link" });
    expect(link).toHaveAttribute("data-discover", "true");
  });

  it("should apply active styling classes when isActive is true", () => {
    const closeMenu = vi.fn();
    render(
      <MemoryRouter>
        <NavLinkItem link={mockLink} closeMenu={closeMenu} isActive={true} />
      </MemoryRouter>,
    );

    const link = screen.getByRole("link", { name: "Test Link" });
    expect(link).toHaveClass("text-primary-700", "dark:text-primary-400", "bg-primary-50", "dark:bg-gray-800");
  });

  it("should render list item", () => {
    const closeMenu = vi.fn();
    const { container } = render(
      <MemoryRouter>
        <NavLinkItem link={mockLink} closeMenu={closeMenu} />
      </MemoryRouter>,
    );

    const li = container.querySelector("li");
    expect(li).toBeInTheDocument();
  });
});
