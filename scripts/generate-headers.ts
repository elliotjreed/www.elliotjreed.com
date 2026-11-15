import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { securityHeaders, sha256Source } from "../workers/securityHeaders";
import { buildHeadersFile, executableInlineScripts, type PageScripts, pagePath } from "../workers/staticHeaders";

const clientDirectory = path.resolve(import.meta.dirname, "../build/client");

const htmlFiles = (await readdir(clientDirectory, { recursive: true })).filter((file) => file.endsWith("index.html"));

const pages: PageScripts[] = await Promise.all(
  htmlFiles.sort().map(async (file) => {
    const html = await readFile(path.join(clientDirectory, file), "utf8");
    const scriptSources = await Promise.all(executableInlineScripts(html).map(sha256Source));

    return { path: pagePath(file), scriptSources: [...new Set(scriptSources)] };
  }),
);

await writeFile(path.join(clientDirectory, "_headers"), buildHeadersFile(pages, securityHeaders));

console.log(`Wrote _headers for ${pages.length} prerendered pages`);
