import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import ampHtmlValidator from "amphtml-validator";

import { sitePages } from "../app/data/contentRegistry.js";
import { generateAmpHtml } from "./layout.js";
import type { AmpPageData } from "./layout.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const buildDir = path.join(__dirname, "..", "build", "client", "amp");

function pagePathToModulePath(pagePath: string): string {
  if (pagePath === "/") return "./pages/home.js";
  return `./pages${pagePath}.js`;
}

function pagePathToOutputPath(pagePath: string): string {
  if (pagePath === "/") return path.join(buildDir, "index.html");
  return path.join(buildDir, pagePath.slice(1), "index.html");
}

async function buildAmpPages(): Promise<void> {
  const validator = await ampHtmlValidator.getInstance();
  const ampEligiblePages = sitePages.filter((page) => page.ampEligible !== false);

  let errorCount = 0;
  let builtCount = 0;

  for (const page of ampEligiblePages) {
    const modulePath = pagePathToModulePath(page.path);

    let pageData: AmpPageData;
    try {
      const module = (await import(modulePath)) as { renderPage: () => AmpPageData };
      pageData = module.renderPage();
    } catch (error) {
      console.error(`✗ Failed to import AMP renderer for ${page.path}: ${String(error)}`);
      errorCount++;
      continue;
    }

    const html = generateAmpHtml(pageData);
    const result = validator.validateString(html);

    if (result.status === "FAIL") {
      console.error(`✗ AMP validation failed for ${page.path}:`);
      for (const validationError of result.errors) {
        const severity = validationError.severity === "WARNING" ? "⚠" : "✗";
        console.error(`  ${severity} Line ${validationError.line}: ${validationError.message}`);
      }
      errorCount++;
    } else {
      const warnings = result.errors.filter((e) => e.severity === "WARNING");
      if (warnings.length > 0) {
        console.warn(`⚠ AMP warnings for ${page.path}:`);
        for (const warning of warnings) {
          console.warn(`  Line ${warning.line}: ${warning.message}`);
        }
      } else {
        console.log(`✓ ${page.path}`);
      }
    }

    const outputPath = pagePathToOutputPath(page.path);
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, html, "utf-8");
    builtCount++;
  }

  console.log(`\nBuilt ${builtCount} AMP pages to build/client/amp/`);

  if (errorCount > 0) {
    console.error(`\n${errorCount} page(s) had AMP validation errors.`);
    process.exit(1);
  }
}

buildAmpPages().catch((error: unknown) => {
  console.error("AMP build failed:", error);
  process.exit(1);
});
