import { describe, expect, it } from "vitest";
import { emailAddress } from "./emailAddress";

describe("emailAddress", () => {
  it("should be a string", () => {
    expect(typeof emailAddress).toBe("string");
  });

  it("should contain @ symbol", () => {
    expect(emailAddress).toContain("@");
  });

  it("should be a valid email format", () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(emailRegex.test(emailAddress)).toBe(true);
  });

  it("should have correct domain", () => {
    expect(emailAddress).toContain("elliotjreed.com");
  });

  it("should have correct structure", () => {
    const parts = emailAddress.split("@");
    expect(parts.length).toBe(2);
    expect(parts[0].length).toBeGreaterThan(0);
    expect(parts[1].length).toBeGreaterThan(0);
  });

  it("should decode to expected email address", () => {
    expect(emailAddress).toBe("contact@elliotjreed.com");
  });
});
