import { createHash } from "node:crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { themeScript, themeScriptHash } from "./themeScript";

const runThemeScript = (): void => {
  new Function(themeScript)();
};

describe("themeScript", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("should apply a stored dark theme to the document", () => {
    localStorage.setItem("theme", JSON.stringify("dark"));

    runThemeScript();

    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
  });

  it("should apply a stored light theme to the document", () => {
    localStorage.setItem("theme", JSON.stringify("light"));

    runThemeScript();

    expect(document.documentElement).toHaveAttribute("data-theme", "light");
  });

  it("should leave data-theme unset when no theme has been chosen", () => {
    runThemeScript();

    expect(document.documentElement).not.toHaveAttribute("data-theme");
  });

  it("should ignore an unrecognised stored theme", () => {
    localStorage.setItem("theme", JSON.stringify("sepia"));

    runThemeScript();

    expect(document.documentElement).not.toHaveAttribute("data-theme");
  });

  it("should not throw on malformed stored data", () => {
    localStorage.setItem("theme", "{not json");

    expect(runThemeScript).not.toThrow();
    expect(document.documentElement).not.toHaveAttribute("data-theme");
  });
});

describe("themeScriptHash", () => {
  it("should return the CSP sha256 source for the exact script text", async () => {
    const expected = `'sha256-${createHash("sha256").update(themeScript).digest("base64")}'`;

    expect(await themeScriptHash()).toBe(expected);
  });
});
