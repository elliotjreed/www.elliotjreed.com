import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { ThemeSwitch } from "./ThemeSwitch";

describe("ThemeSwitch", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
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

    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(button).toHaveAttribute("title", "Switch to light theme");
  });

  it("should toggle back to light theme when clicked again", async () => {
    const user = userEvent.setup();
    render(<ThemeSwitch />);

    const button = screen.getByRole("button", { name: "Toggle dark mode" });
    await user.click(button); // Switch to dark
    await user.click(button); // Switch back to light

    expect(document.documentElement.classList.contains("dark")).toBe(false);
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

    expect(document.documentElement.classList.contains("dark")).toBe(true);
    const button = screen.getByRole("button", { name: "Toggle dark mode" });
    expect(button).toHaveAttribute("title", "Switch to light theme");
  });

  it("should have correct button classes", () => {
    render(<ThemeSwitch />);

    const button = screen.getByRole("button", { name: "Toggle dark mode" });
    expect(button).toHaveClass("ml-1", "mr-1", "h-8", "w-8", "rounded", "p-1", "sm:ml-4");
  });

  it("should have type button", () => {
    render(<ThemeSwitch />);

    const button = screen.getByRole("button", { name: "Toggle dark mode" });
    expect(button).toHaveAttribute("type", "button");
  });

  it("should add dark class to document when theme is dark", async () => {
    const user = userEvent.setup();
    render(<ThemeSwitch />);

    const button = screen.getByRole("button", { name: "Toggle dark mode" });
    await user.click(button);

    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("should remove dark class from document when theme is light", async () => {
    const _user = userEvent.setup();
    document.documentElement.classList.add("dark");

    render(<ThemeSwitch />);

    // Initially should be light (default), so dark class should be removed
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });
});
