import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router";
import { NavBar } from "./NavBar";

vi.mock("~/components/ThemeSwitch", () => ({
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

    const menuButton = screen.getByRole("button", { name: /open main menu/i });
    expect(menuButton).toBeInTheDocument();
  });

  it("should toggle menu when hamburger button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>,
    );

    const menuButton = screen.getByRole("button", { name: /open main menu/i });
    const nav = screen.getByRole("navigation");

    expect(nav).toHaveClass("hidden");

    await user.click(menuButton);

    expect(nav).toHaveClass("block");
  });

  it("should close menu when hamburger button is clicked again", async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>,
    );

    const menuButton = screen.getByRole("button", { name: /open main menu/i });
    const nav = screen.getByRole("navigation");

    await user.click(menuButton); // Open
    expect(nav).toHaveClass("block");

    const closeButton = screen.getByRole("button", { name: /close main menu/i });
    await user.click(closeButton); // Close
    expect(nav).toHaveClass("hidden");
  });

  it("should render navigation links", () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>,
    );

    expect(screen.getByText("AI Guides")).toBeInTheDocument();
    expect(screen.getByText("ZSH / Bash Shell Guides")).toBeInTheDocument();
    expect(screen.getByText("Docker Guides")).toBeInTheDocument();
    expect(screen.getByText("PHP Guides")).toBeInTheDocument();
  });

  it("should toggle dropdown when clicking on a section with children", async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>,
    );

    // Open menu first
    const menuButton = screen.getByRole("button", { name: /open main menu/i });
    await user.click(menuButton);

    // Click on AI Guides dropdown
    const aiGuidesButton = screen.getByRole("button", { name: /AI Guides/i });
    await user.click(aiGuidesButton);

    // Check if child links are visible
    expect(screen.getByRole("link", { name: "AI Prompt Guide" })).toBeInTheDocument();
  });

  it("should close dropdown when clicked again", async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>,
    );

    const menuButton = screen.getByRole("button", { name: /open main menu/i });
    await user.click(menuButton);

    const aiGuidesButton = screen.getByRole("button", { name: /AI Guides/i });
    await user.click(aiGuidesButton); // Open dropdown

    expect(screen.getByRole("link", { name: "AI Prompt Guide" })).toBeVisible();

    await user.click(aiGuidesButton); // Close dropdown

    expect(screen.queryByRole("link", { name: "AI Prompt Guide" })).not.toBeVisible();
  });

  it("should close menu when clicking outside", () => {
    render(
      <BrowserRouter>
        <div>
          <NavBar />
          <div data-testid="outside">Outside</div>
        </div>
      </BrowserRouter>,
    );

    const menuButton = screen.getByRole("button", { name: /open main menu/i });
    fireEvent.click(menuButton);

    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass("block");

    const outside = screen.getByTestId("outside");
    fireEvent.mouseDown(outside);

    expect(nav).toHaveClass("hidden");
  });

  it("should have aria-expanded attribute on menu button", () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>,
    );

    const menuButton = screen.getByRole("button", { name: /open main menu/i });
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
  });

  it("should update aria-expanded when menu is opened", async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>,
    );

    const menuButton = screen.getByRole("button", { name: /open main menu/i });
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
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>,
    );

    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("id", "primary-navigation");
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
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>,
    );

    const menuButton = screen.getByRole("button", { name: /open main menu/i });
    await user.click(menuButton);

    const aiGuidesButton = screen.getByRole("button", { name: /AI Guides/i });
    await user.click(aiGuidesButton);

    const childLink = screen.getByRole("link", { name: "AI Prompt Guide" });
    await user.click(childLink);

    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass("hidden");
  });
});
