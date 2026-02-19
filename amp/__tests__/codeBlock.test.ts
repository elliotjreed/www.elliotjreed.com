import { describe, expect, it } from "vitest";
import { codeBlock, escapeHtml, highlightCode } from "../components/codeBlock.js";

describe("escapeHtml", () => {
  it("escapes ampersands", () => {
    expect(escapeHtml("a & b")).toBe("a &amp; b");
  });

  it("escapes less-than signs", () => {
    expect(escapeHtml("<script>")).toBe("&lt;script&gt;");
  });

  it("escapes double quotes", () => {
    expect(escapeHtml('"hello"')).toBe("&quot;hello&quot;");
  });

  it("escapes single quotes", () => {
    expect(escapeHtml("it's")).toBe("it&#039;s");
  });

  it("returns plain text unchanged", () => {
    expect(escapeHtml("hello world")).toBe("hello world");
  });
});

describe("highlightCode", () => {
  it("falls back to escapeHtml for text language", () => {
    const code = '<script>alert("xss")</script>';
    expect(highlightCode(code, "text")).toBe(escapeHtml(code));
  });

  it("falls back to escapeHtml when no language is provided", () => {
    const code = "const x = 1;";
    expect(highlightCode(code)).toBe(escapeHtml(code));
  });

  it("highlights bash code with Prism tokens", () => {
    const code = "echo hello";
    const result = highlightCode(code, "bash");
    expect(result).toContain("hello");
  });

  it("highlights SQL code", () => {
    const code = "SELECT * FROM users";
    const result = highlightCode(code, "sql");
    expect(result).toContain("users");
  });

  it("highlights TypeScript code", () => {
    const code = "const x: number = 1;";
    const result = highlightCode(code, "typescript");
    expect(result).toContain("1");
  });

  it("highlights JSON code", () => {
    const code = '{"key": "value"}';
    const result = highlightCode(code, "json");
    expect(result).toContain("key");
  });
});

describe("codeBlock", () => {
  it("wraps code in the expected HTML structure", () => {
    const result = codeBlock("const x = 1;", "Example", "typescript");
    expect(result).toContain('<div class="code-block">');
    expect(result).toContain('<div class="code-title">Example</div>');
    expect(result).toContain('<pre class="code-pre">');
    expect(result).toContain("<code>");
  });

  it("escapes the title to prevent XSS", () => {
    const result = codeBlock("code", '<script>alert("xss")</script>', "text");
    expect(result).not.toContain("<script>");
    expect(result).toContain("&lt;script&gt;");
  });

  it("includes the code content", () => {
    const result = codeBlock("echo hello", "Bash example", "bash");
    expect(result).toContain("hello");
  });

  it("works without a language argument", () => {
    const result = codeBlock("<html>", "Raw code");
    expect(result).toContain("&lt;html&gt;");
  });
});
