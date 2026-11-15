import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderToString } from "react-dom/server";
import { beforeEach, describe, expect, it } from "vitest";
import { ThemeSwitch } from "./ThemeSwitch";

describe("ThemeSwitch", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("should render button", () => {
    render(<ThemeSwitch />);

    const button = screen.getByRole("button", { name: "Toggle dark mode" });
    expect(button).toBeInTheDocument();
  });

  it("should initialize with light theme by default", () => {
    render(<ThemeSwitch />);

    const button = screen.getByRole("button", { name: "Toggle dark mode" });
    expect(button).toHaveAttribute("title", "Switch to dark theme");
  });

  it("should toggle to dark theme when clicked", async () => {
    const user = userEvent.setup();
    render(<ThemeSwitch />);

    const button = screen.getByRole("button", { name: "Toggle dark mode" });
    await user.click(button);

    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(button).toHaveAttribute("title", "Switch to light theme");
  });

  it("should toggle back to light theme when clicked again", async () => {
    const user = userEvent.setup();
    render(<ThemeSwitch />);

    const button = screen.getByRole("button", { name: "Toggle dark mode" });
    await user.click(button); // Switch to dark
    await user.click(button); // Switch back to light

    expect(document.documentElement).toHaveAttribute("data-theme", "light");
    expect(button).toHaveAttribute("title", "Switch to dark theme");
  });

  it("should save theme to localStorage", async () => {
    const user = userEvent.setup();
    render(<ThemeSwitch />);

    const button = screen.getByRole("button", { name: "Toggle dark mode" });
    await user.click(button);

    expect(localStorage.getItem("theme")).toBe(JSON.stringify("dark"));
  });

  it("should load theme from localStorage", () => {
    localStorage.setItem("theme", JSON.stringify("dark"));

    render(<ThemeSwitch />);

    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    const button = screen.getByRole("button", { name: "Toggle dark mode" });
    expect(button).toHaveAttribute("title", "Switch to light theme");
  });

  it("should have correct button classes", () => {
    render(<ThemeSwitch />);

    const button = screen.getByRole("button", { name: "Toggle dark mode" });
    expect(button).toHaveClass("h-11", "w-11", "rounded-md", "text-ink-muted", "hover:bg-surface-300");
  });

  it("should have type button", () => {
    render(<ThemeSwitch />);

    const button = screen.getByRole("button", { name: "Toggle dark mode" });
    expect(button).toHaveAttribute("type", "button");
  });

  it("should set the dark data-theme on the document when theme is dark", async () => {
    const user = userEvent.setup();
    render(<ThemeSwitch />);

    const button = screen.getByRole("button", { name: "Toggle dark mode" });
    await user.click(button);

    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
  });

  it("should server-render the same markup regardless of the stored theme, so hydration matches", () => {
    const withoutStoredTheme = renderToString(<ThemeSwitch />);
    localStorage.setItem("theme", JSON.stringify("dark"));
    const withStoredTheme = renderToString(<ThemeSwitch />);

    expect(withStoredTheme).toBe(withoutStoredTheme);
  });

  it("should leave data-theme unset when no theme has been chosen, so the system setting applies", () => {
    render(<ThemeSwitch />);

    expect(document.documentElement).not.toHaveAttribute("data-theme");
  });
});
