import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { renderNavigation } from "./components/navigation.js";
import { renderFooter } from "./components/footer.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ampCss = readFileSync(path.join(__dirname, "amp.css"), "utf-8");

const SITE_URL = "https://www.elliotjreed.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og.png`;
const DEFAULT_TWITTER_IMAGE = `${SITE_URL}/twitter-card.png`;

// Required AMP boilerplate - must not be modified
const AMP_BOILERPLATE = `<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`;

export interface AmpPageData {
  title: string;
  description: string;
  canonicalPath: string;
  body: string;
  schemas: object[];
  type?: "website" | "article";
  ogImage?: string;
  twitterImage?: string;
  keywords?: string[];
}

function escapeAttr(str: string): string {
  return str.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function generateAmpHtml(page: AmpPageData): string {
  const canonicalUrl = `${SITE_URL}${page.canonicalPath}`;
  const ogImage = page.ogImage ?? DEFAULT_OG_IMAGE;
  const twitterImage = page.twitterImage ?? DEFAULT_TWITTER_IMAGE;

  const schemaScripts = page.schemas
    .map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`)
    .join("\n  ");

  const keywordsMeta = page.keywords?.length
    ? `\n  <meta name="keywords" content="${escapeAttr(page.keywords.join(", "))}"/>`
    : "";

  return `<!doctype html>
<html amp lang="en">
<head>
  <meta charset="utf-8"/>
  <title>${escapeAttr(page.title)}</title>
  <link rel="canonical" href="${escapeAttr(canonicalUrl)}"/>
  <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"/>
  ${AMP_BOILERPLATE}
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>
  <script async custom-element="amp-img" src="https://cdn.ampproject.org/v0/amp-img-0.1.js"></script>
  <style amp-custom>${ampCss}</style>
  <meta name="description" content="${escapeAttr(page.description)}"/>${keywordsMeta}
  <meta property="og:title" content="${escapeAttr(page.title)}"/>
  <meta property="og:description" content="${escapeAttr(page.description)}"/>
  <meta property="og:type" content="${page.type ?? "website"}"/>
  <meta property="og:url" content="${escapeAttr(canonicalUrl)}"/>
  <meta property="og:site_name" content="Elliot J. Reed"/>
  <meta property="og:locale" content="en_GB"/>
  <meta property="og:image" content="${escapeAttr(ogImage)}"/>
  <meta property="og:image:alt" content="Elliot J. Reed"/>
  <meta name="twitter:card" content="${page.type === "article" ? "summary_large_image" : "summary"}"/>
  <meta name="twitter:site" content="@elliotjreed"/>
  <meta name="twitter:title" content="${escapeAttr(page.title)}"/>
  <meta name="twitter:description" content="${escapeAttr(page.description)}"/>
  <meta name="twitter:image" content="${escapeAttr(twitterImage)}"/>
  <meta name="twitter:image:alt" content="Elliot J. Reed"/>
  ${schemaScripts}
</head>
<body>
  <a href="#main-content" class="sr-only">Skip to content</a>

  ${renderNavigation()}

  <div class="site-wrapper">
    <div class="layout">
      <main class="main-content" id="main-content">
        ${page.body}
      </main>
      ${renderFooter()}
    </div>
  </div>
</body>
</html>`;
}
