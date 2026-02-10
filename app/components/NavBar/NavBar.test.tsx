import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import { NavBar } from "./NavBar";

vi.mock("~/components/ThemeSwitch/ThemeSwitch", () => ({
  ThemeSwitch: () => <div data-testid="theme-switch">Theme Switch</div>,
}));

describe("NavBar", () => {
  it("should render header element", () => {
    const { container } = render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>,
    );

    const header = container.querySelector("header");
    expect(header).toBeInTheDocument();
  });

  it("should render home link with EJR text", () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>,
    );

    const homeLink = screen.getByRole("link", { name: "EJR" });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("should render ThemeSwitch component", () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>,
    );

    expect(screen.getByTestId("theme-switch")).toBeInTheDocument();
  });

  it("should render hamburger menu button", () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>,
    );

    const menuButton = screen.getByRole("button", { name: /toggle navigation menu/i });
    expect(menuButton).toBeInTheDocument();
  });

  it("should toggle menu when hamburger button is clicked", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>,
    );

    const menuButton = screen.getByRole("button", { name: /toggle navigation menu/i });
    const nav = container.querySelector("#mobile-navigation");

    expect(nav).toHaveClass("translate-x-full");

    await user.click(menuButton);

    expect(nav).toHaveClass("translate-x-0");
  });

  it("should close menu when hamburger button is clicked again", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>,
    );

    const menuButton = screen.getByRole("button", { name: /toggle navigation menu/i });
    const nav = container.querySelector("#mobile-navigation");

    await user.click(menuButton); // Open
    expect(nav).toHaveClass("translate-x-0");

    const closeButton = screen.getByRole("button", { name: /close menu/i });
    await user.click(closeButton); // Close
    expect(nav).toHaveClass("translate-x-full");
  });

  it("should render navigation links", () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>,
    );

    expect(screen.getAllByText("Guides")[0]).toBeInTheDocument();
  });

  it("should toggle dropdown when clicking on a section with children", async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>,
    );

    // Open menu first
    const menuButton = screen.getByRole("button", { name: /toggle navigation menu/i });
    await user.click(menuButton);

    // Click on Guides dropdown
    const guidesButtons = screen.getAllByRole("button", { name: /Guides/i });
    const guidesButton = guidesButtons.find((btn) => btn.textContent === "Guides");
    // biome-ignore lint/style/noNonNullAssertion: test ensures button exists via screen.getAllByRole
    await user.click(guidesButton!);

    // Check if child links are visible - should find the AI Prompt Guide link
    await waitFor(() => {
      expect(screen.getAllByRole("link", { name: "AI Prompt Guide" }).length).toBeGreaterThan(0);
    });
  });

  it("should close menu when clicking outside", () => {
    const { container } = render(
      <BrowserRouter>
        <div>
          <NavBar />
          <div data-testid="outside">Outside</div>
        </div>
      </BrowserRouter>,
    );

    const menuButton = screen.getByRole("button", { name: /toggle navigation menu/i });
    fireEvent.click(menuButton);

    const nav = container.querySelector("#mobile-navigation");
    expect(nav).toHaveClass("translate-x-0");

    const outside = screen.getByTestId("outside");
    fireEvent.mouseDown(outside);

    expect(nav).toHaveClass("translate-x-full");
  });

  it("should have aria-expanded attribute on menu button", () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>,
    );

    const menuButton = screen.getByRole("button", { name: /toggle navigation menu/i });
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
  });

  it("should update aria-expanded when menu is opened", async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>,
    );

    const menuButton = screen.getByRole("button", { name: /toggle navigation menu/i });
    await user.click(menuButton);

    expect(menuButton).toHaveAttribute("aria-expanded", "true");
  });

  it("should have print:hidden class on header", () => {
    const { container } = render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>,
    );

    const header = container.querySelector("header");
    expect(header).toHaveClass("print:hidden");
  });

  it("should render navigation with correct id", () => {
    const { container } = render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>,
    );

    const nav = container.querySelector("#mobile-navigation");
    expect(nav).toHaveAttribute("id", "mobile-navigation");
  });

  it("should render mobile navigation as a dialog", () => {
    const { container } = render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>,
    );

    const nav = container.querySelector("#mobile-navigation");
    expect(nav).toHaveAttribute("role", "dialog");
    expect(nav).toHaveAttribute("aria-modal", "true");
    expect(nav).toHaveAttribute("aria-labelledby", "mobile-navigation-title");
  });

  it("should mark desktop dropdown buttons as menus", () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>,
    );

    const guidesButtons = screen.getAllByRole("button", { name: /Guides/i });
    const menuButton = guidesButtons.find((button) => button.getAttribute("aria-haspopup") === "menu");

    expect(menuButton).toBeDefined();
    expect(menuButton).toHaveAttribute("aria-haspopup", "menu");
  });

  it("should only show navigation items marked as showInNavigation", () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>,
    );

    // These should NOT be visible as they have showInNavigation: false
    expect(screen.queryByText("Home")).not.toBeInTheDocument();
    expect(screen.queryByText("Privacy Policy")).not.toBeInTheDocument();
  });

  it("should close menu and dropdown when clicking a child link", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>,
    );

    const menuButton = screen.getByRole("button", { name: /toggle navigation menu/i });
    await user.click(menuButton);

    const mobileNav = container.querySelector("#mobile-navigation");
    const guidesButtons = screen.getAllByRole("button", { name: /Guides/i });
    const guidesButton = guidesButtons.find((btn) => mobileNav?.contains(btn));
    // biome-ignore lint/style/noNonNullAssertion: test ensures button exists via screen.getAllByRole
    await user.click(guidesButton!);

    await waitFor(() => {
      const childLinks = screen.getAllByRole("link", { name: "AI Prompt Guide" });
      expect(childLinks.length).toBeGreaterThan(0);
    });

    const childLinks = screen.getAllByRole("link", { name: "AI Prompt Guide" });
    const childLink = childLinks.find((link) => mobileNav?.contains(link));
    expect(childLink).toBeDefined();
    // biome-ignore lint/style/noNonNullAssertion: test ensures child link exists
    await user.click(childLink!);

    const nav = container.querySelector("#mobile-navigation");
    await waitFor(() => {
      expect(nav).toHaveClass("translate-x-full");
    });
  });
});
