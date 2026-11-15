import { contentSecurityPolicy } from "./securityHeaders";

export interface PageScripts {
  path: string;
  scriptSources: string[];
}

const scriptPattern = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
const executableTypes = new Set(["", "module", "text/javascript", "application/javascript"]);

const typeAttribute = (attributes: string): string =>
  (/\btype\s*=\s*["']?([^"'\s>]+)/i.exec(attributes)?.[1] ?? "").toLowerCase();

export const executableInlineScripts = (html: string): string[] =>
  [...html.matchAll(scriptPattern)]
    .filter(([, attributes]) => !/\bsrc\s*=/i.test(attributes) && executableTypes.has(typeAttribute(attributes)))
    .map(([, , content]) => content);

export const pagePath = (relativeFile: string): string => {
  const directory = relativeFile.replaceAll("\\", "/").replace(/(^|\/)index\.html$/, "");

  return `/${directory}`;
};

const rule = (path: string, headers: Record<string, string>): string =>
  `${path}\n${Object.entries(headers)
    .map(([name, value]) => `  ${name}: ${value}\n`)
    .join("")}`;

export const buildHeadersFile = (pages: PageScripts[], securityHeaders: Record<string, string>): string =>
  [
    rule("/*", securityHeaders),
    rule("/assets/*", { "Cache-Control": "public, max-age=31536000, immutable" }),
    rule("/fonts/*", { "Cache-Control": "public, max-age=2592000, stale-while-revalidate=86400" }),
    ...pages.map((page) => rule(page.path, { "Content-Security-Policy": contentSecurityPolicy(page.scriptSources) })),
  ].join("\n");
