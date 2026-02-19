import { existsSync, readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { describe, expect, it } from "vitest";
import { sitePages } from "../../app/data/contentRegistry.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ampPagesDir = path.join(__dirname, "..", "pages");

function pagePathToAmpFilePath(pagePath: string): string {
  const slug = pagePath === "/" ? "home" : pagePath.slice(1);
  return path.join(ampPagesDir, `${slug}.ts`);
}

describe("AMP page file integrity", () => {
  const ampEligiblePages = sitePages.filter((page) => page.ampEligible !== false);

  it("all AMP-eligible pages have a corresponding AMP page file", () => {
    const missingFiles: string[] = [];

    for (const page of ampEligiblePages) {
      const filePath = pagePathToAmpFilePath(page.path);
      if (!existsSync(filePath)) {
        missingFiles.push(`${page.path} → ${filePath}`);
      }
    }

    expect(missingFiles, `Missing AMP page files:\n${missingFiles.join("\n")}`).toHaveLength(0);
  });

  it("has AMP-eligible pages to process", () => {
    expect(ampEligiblePages.length).toBeGreaterThan(0);
  });
});

describe("AMP CSS size", () => {
  it("amp.css is under the AMP 75KB limit", () => {
    const cssPath = path.join(__dirname, "..", "amp.css");
    const cssContent = readFileSync(cssPath, "utf-8");
    const sizeInBytes = Buffer.byteLength(cssContent, "utf-8");
    const limitInBytes = 75 * 1024;

    expect(sizeInBytes, `amp.css is ${sizeInBytes} bytes (limit: ${limitInBytes})`).toBeLessThan(limitInBytes);
  });
});
