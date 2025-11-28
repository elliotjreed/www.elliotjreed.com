import { describe, expect, it } from "vitest";
import { type StaticLink, staticLinks } from "./staticLinks";

describe("staticLinks", () => {
  it("should be an array", () => {
    expect(Array.isArray(staticLinks)).toBe(true);
  });

  it("should contain valid static link objects", () => {
    staticLinks.forEach((link) => {
      expect(link).toHaveProperty("title");
      expect(link).toHaveProperty("showInNavigation");
      expect(typeof link.title).toBe("string");
      expect(typeof link.showInNavigation).toBe("boolean");
    });
  });

  it("should have home page link", () => {
    const homePage = staticLinks.find((link) => link.href === "/");
    expect(homePage).toBeDefined();
    expect(homePage?.title).toBe("Home");
    expect(homePage?.showInNavigation).toBe(false);
  });

  it("should have AI Guides section with children", () => {
    const guides = staticLinks.find((link) => link.title === "Guides");
    const aiGuides = guides?.children?.find((child) => child.title === "AI Guides");
    expect(aiGuides).toBeDefined();
    expect(aiGuides?.showInNavigation).toBe(true);
    expect(aiGuides?.children).toBeDefined();
    expect(Array.isArray(aiGuides?.children)).toBe(true);
    expect(aiGuides?.children?.length).toBeGreaterThan(0);
  });

  it("should have ZSH / Bash Shell Guides section with children", () => {
    const guides = staticLinks.find((link) => link.title === "Guides");
    const shellGuides = guides?.children?.find((child) => child.title === "ZSH / Bash Shell Guides");
    expect(shellGuides).toBeDefined();
    expect(shellGuides?.showInNavigation).toBe(true);
    expect(shellGuides?.children).toBeDefined();
    expect(Array.isArray(shellGuides?.children)).toBe(true);
    expect(shellGuides?.children?.length).toBeGreaterThan(0);
  });

  it("should have Docker Guides section with children", () => {
    const guides = staticLinks.find((link) => link.title === "Guides");
    const dockerGuides = guides?.children?.find((child) => child.title === "Docker Guides");
    expect(dockerGuides).toBeDefined();
    expect(dockerGuides?.showInNavigation).toBe(true);
    expect(dockerGuides?.children).toBeDefined();
    expect(Array.isArray(dockerGuides?.children)).toBe(true);
    expect(dockerGuides?.children?.length).toBeGreaterThan(0);
  });

  it("should have PHP Guides section with children", () => {
    const guides = staticLinks.find((link) => link.title === "Guides");
    const phpGuides = guides?.children?.find((child) => child.title === "PHP Guides");
    expect(phpGuides).toBeDefined();
    expect(phpGuides?.showInNavigation).toBe(true);
    expect(phpGuides?.children).toBeDefined();
    expect(Array.isArray(phpGuides?.children)).toBe(true);
    expect(phpGuides?.children?.length).toBeGreaterThan(0);
  });

  it("should have privacy policy link", () => {
    const privacy = staticLinks.find((link) => link.href === "/privacy");
    expect(privacy).toBeDefined();
    expect(privacy?.title).toBe("Privacy Policy");
    expect(privacy?.showInNavigation).toBe(false);
  });

  it("should have valid hrefs for all children", () => {
    const checkChildren = (link: StaticLink): void => {
      if (link.children) {
        link.children.forEach((child) => {
          if (child.href) {
            expect(child.href).toBeDefined();
            expect(typeof child.href).toBe("string");
            expect(child.href?.startsWith("/")).toBe(true);
          }
          // Recursively check nested children
          if (child.children) {
            checkChildren(child);
          }
        });
      }
    };

    staticLinks.forEach(checkChildren);
  });

  it("should have showInNavigation property for all children", () => {
    staticLinks.forEach((link) => {
      if (link.children) {
        link.children.forEach((child) => {
          expect(child).toHaveProperty("showInNavigation");
          expect(typeof child.showInNavigation).toBe("boolean");
        });
      }
    });
  });

  it("should have unique hrefs", () => {
    const hrefs: string[] = [];
    const collectHrefs = (link: StaticLink): void => {
      if (link.href) {
        hrefs.push(link.href);
      }
      if (link.children) {
        link.children.forEach(collectHrefs);
      }
    };

    staticLinks.forEach(collectHrefs);
    const uniqueHrefs = new Set(hrefs);
    expect(hrefs.length).toBe(uniqueHrefs.size);
  });

  it("should have non-empty titles", () => {
    const checkTitles = (link: StaticLink): void => {
      expect(link.title.length).toBeGreaterThan(0);
      if (link.children) {
        link.children.forEach(checkTitles);
      }
    };

    staticLinks.forEach(checkTitles);
  });
});
