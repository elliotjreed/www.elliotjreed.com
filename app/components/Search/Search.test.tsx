import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { Search } from "./Search";

describe("Search", () => {
  it("should render search button", () => {
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>,
    );

    const button = screen.getByRole("button", { name: "Open search" });
    expect(button).toBeInTheDocument();
  });

  it("should expand search input when button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>,
    );

    const button = screen.getByRole("button", { name: "Open search" });
    await user.click(button);

    const input = screen.getByRole("combobox", { name: "Search guides and articles" });
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass("w-64", "opacity-100");
  });

  it("should show close icon when expanded", async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>,
    );

    const openButton = screen.getByRole("button", { name: "Open search" });
    await user.click(openButton);

    const closeButton = screen.getByRole("button", { name: "Close search" });
    expect(closeButton).toBeInTheDocument();
  });

  it("should close search when close button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>,
    );

    const openButton = screen.getByRole("button", { name: "Open search" });
    await user.click(openButton);

    const closeButton = screen.getByRole("button", { name: "Close search" });
    await user.click(closeButton);

    const button = screen.getByRole("button", { name: "Open search" });
    expect(button).toBeInTheDocument();
  });

  it("should search when typing in input", async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>,
    );

    const button = screen.getByRole("button", { name: "Open search" });
    await user.click(button);

    const input = screen.getByRole("combobox", { name: "Search guides and articles" });
    await user.type(input, "docker");

    expect(input).toHaveValue("docker");
  });

  it("should close search on Escape key", async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>,
    );

    const button = screen.getByRole("button", { name: "Open search" });
    await user.click(button);

    const input = screen.getByRole("combobox", { name: "Search guides and articles" });
    input.focus();
    await user.keyboard("{Escape}");

    const newButton = screen.getByRole("button", { name: "Open search" });
    expect(newButton).toBeInTheDocument();
  });

  it("should have correct aria attributes", async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>,
    );

    const button = screen.getByRole("button", { name: "Open search" });
    await user.click(button);

    const input = screen.getByRole("combobox");
    expect(input).toHaveAttribute("aria-label", "Search guides and articles");
    expect(input).toHaveAttribute("aria-expanded");
    expect(input).toHaveAttribute("aria-controls", "search-results");
  });
});
