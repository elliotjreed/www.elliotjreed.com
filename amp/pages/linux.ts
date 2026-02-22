import { createBreadcrumbs } from "../../app/data/schemaData.js";
import { sitePages } from "../../app/data/contentRegistry.js";
import type { AmpPageData } from "../layout.js";

const CATEGORY_TITLE = "ZSH / Bash Shell Guides";
const CATEGORY_SLUG = "linux";
const DESCRIPTION = "Command-line tips, database admin notes, and shell productivity guides.";
const PAGE_URL = `https://www.elliotjreed.com/${CATEGORY_SLUG}`;

function getCategoryPages() {
  const prefix = `/${CATEGORY_SLUG}/`;
  return sitePages.filter((page) => page.path.startsWith(prefix)).sort((a, b) => a.title.localeCompare(b.title));
}

export function renderPage(): AmpPageData {
  const pages = getCategoryPages();
  const listItems = pages.map((page) => `<li><a href="${page.path}">${page.title}</a></li>`).join("\n      ");

  return {
    title: `${CATEGORY_TITLE} | EJR`,
    description: DESCRIPTION,
    canonicalPath: `/${CATEGORY_SLUG}`,
    type: "website",
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: CATEGORY_TITLE,
        description: DESCRIPTION,
        isPartOf: { "@id": "https://www.elliotjreed.com/#website" },
        author: { "@id": "https://www.elliotjreed.com/#author" },
        inLanguage: "en-GB",
      },
      createBreadcrumbs([
        { name: "Home", url: "https://www.elliotjreed.com" },
        { name: CATEGORY_TITLE, url: PAGE_URL },
      ]),
    ],
    body: `<section class="page-section">
  <div class="page-header">
    <h1 class="page-title">${CATEGORY_TITLE}</h1>
    <p class="page-intro">${DESCRIPTION}</p>
  </div>
  <div class="prose">
    <ul>
      ${listItems}
    </ul>
  </div>
</section>`,
  };
}
