import { describe, expect, it } from "vitest";
import { buildHeadersFile, executableInlineScripts, pagePath } from "./staticHeaders";

describe("executableInlineScripts", () => {
  it("returns the contents of inline scripts, ignoring external and JSON-LD scripts", () => {
    const html = [
      "<head>",
      "<script>window.theme=1</script>",
      '<script nonce="abc">window.__context={}</script>',
      '<script type="module" async="" nonce="abc">import "./entry.js";</script>',
      '<script type="application/ld+json">{"@type":"Person"}</script>',
      '<script type="module" src="/assets/app.js"></script>',
      "</head>",
    ].join("");

    expect(executableInlineScripts(html)).toEqual(["window.theme=1", "window.__context={}", 'import "./entry.js";']);
  });

  it("keeps whitespace exactly so hashes match what the browser sees", () => {
    expect(executableInlineScripts("<script>\n  run();\n</script>")).toEqual(["\n  run();\n"]);
  });
});

describe("pagePath", () => {
  it("maps the root index file to the home path", () => {
    expect(pagePath("index.html")).toBe("/");
  });

  it("maps a nested index file to its extensionless path", () => {
    expect(pagePath("linux/zsh-bash-aliases/index.html")).toBe("/linux/zsh-bash-aliases");
  });

  it("normalises Windows path separators", () => {
    expect(pagePath("ai\\claude-code-guide-and-tips\\index.html")).toBe("/ai/claude-code-guide-and-tips");
  });
});

describe("buildHeadersFile", () => {
  const file = buildHeadersFile(
    [{ path: "/linux/zsh-bash-aliases", scriptSources: ["'sha256-one'", "'sha256-two'"] }],
    { "X-Frame-Options": "DENY", "X-Content-Type-Options": "nosniff" },
  );

  it("applies the security headers to every asset", () => {
    expect(file).toContain("/*\n  X-Frame-Options: DENY\n  X-Content-Type-Options: nosniff\n");
  });

  it("caches fingerprinted assets permanently", () => {
    expect(file).toContain("/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n");
  });

  it("caches fonts for thirty days", () => {
    expect(file).toContain("/fonts/*\n  Cache-Control: public, max-age=2592000, stale-while-revalidate=86400\n");
  });

  it("gives each page a content security policy allowing its own inline scripts", () => {
    expect(file).toMatch(
      /\/linux\/zsh-bash-aliases\n {2}Content-Security-Policy: default-src 'self'; script-src 'self' 'sha256-one' 'sha256-two' /,
    );
  });
});
