import { describe, expect, it } from "vitest";
import { contentSecurityPolicy, securityHeaders, sha256Source } from "./securityHeaders";

describe("sha256Source", () => {
  it("returns a quoted CSP hash source for the given text", async () => {
    expect(await sha256Source("alert(1)")).toBe("'sha256-bhHHL3z2vDgxUt0W3dWQOrprscmda2Y5pLsLg4GF+pI='");
  });
});

describe("contentSecurityPolicy", () => {
  it("allows the given script sources alongside the site's own scripts", () => {
    const policy = contentSecurityPolicy(["'nonce-abc'", "'sha256-xyz'"]);

    expect(policy).toContain(
      "script-src 'self' 'nonce-abc' 'sha256-xyz' https://static.cloudflareinsights.com; script-src-elem 'self' 'nonce-abc' 'sha256-xyz' https://static.cloudflareinsights.com",
    );
  });

  it("forbids framing and restricts the base URI", () => {
    const policy = contentSecurityPolicy([]);

    expect(policy).toContain("frame-ancestors 'none'");
    expect(policy).toContain("base-uri 'self'");
    expect(policy.startsWith("default-src 'self'; ")).toBe(true);
  });
});

describe("securityHeaders", () => {
  it("enforces HTTPS and prevents MIME sniffing and framing", () => {
    expect(securityHeaders["Strict-Transport-Security"]).toBe("max-age=31536000; includeSubDomains; preload");
    expect(securityHeaders["X-Content-Type-Options"]).toBe("nosniff");
    expect(securityHeaders["X-Frame-Options"]).toBe("DENY");
    expect(securityHeaders["Referrer-Policy"]).toBe("strict-origin-when-cross-origin");
    expect(securityHeaders["Permissions-Policy"]).toContain("camera=()");
  });
});
