import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import ZshBashAliases from "./zsh-bash-aliases";

const renderPage = () =>
  render(
    <MemoryRouter>
      <ZshBashAliases />
    </MemoryRouter>,
  );

describe("zsh-bash-aliases route", () => {
  it("uses a heading that matches the page title", () => {
    renderPage();

    expect(screen.getByRole("heading", { level: 1, name: "Useful ZSH and Bash aliases" })).toBeInTheDocument();
  });

  it("groups the aliases under section headings", () => {
    renderPage();

    for (const heading of ["Navigation", "Listing files", "Files, disk and memory", "Clipboard", "Networking"]) {
      expect(screen.getByRole("heading", { level: 2, name: new RegExp(`^${heading}`) })).toBeInTheDocument();
    }
  });

  it("defines du as a function so a directory argument reaches du rather than sort", () => {
    const { container } = renderPage();

    expect(container.textContent).toContain('du() { command du -ach "$@" | sort -h; }');
    expect(container.textContent).not.toContain("alias du='du -ach | sort -h'");
  });

  it("gives macOS equivalents for the Linux-only commands", () => {
    const { container } = renderPage();

    expect(container.textContent).toContain("pbcopy");
    expect(container.textContent).toContain('stat -f "%A %N"');
    expect(container.textContent).toContain("dscacheutil -flushcache");
  });

  it("explains where to put the aliases and how to reload them", () => {
    renderPage();

    expect(screen.getByRole("heading", { level: 2, name: /^Where to put your aliases/ })).toBeInTheDocument();
  });
});
