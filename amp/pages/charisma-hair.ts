import { createBreadcrumbs } from "../../app/data/schemaData.js";
import type { AmpPageData } from "../layout.js";

const DESCRIPTION = "Charisma Hair has closed. A thank you and farewell message from Charis, Jo, and Lily.";

export function renderPage(): AmpPageData {
  return {
    title: "Charisma Hair | EJR",
    description: DESCRIPTION,
    canonicalPath: "/charisma-hair",
    type: "website",
    ogImage: "https://www.elliotjreed.com/2026-03-28_charis_jo_lily.jpg",
    twitterImage: "https://www.elliotjreed.com/2026-03-28_charis_jo_lily.jpg",
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://www.elliotjreed.com/charisma-hair#webpage",
        url: "https://www.elliotjreed.com/charisma-hair",
        name: "Charisma Hair",
        description: DESCRIPTION,
        isPartOf: { "@id": "https://www.elliotjreed.com/#website" },
        author: { "@id": "https://www.elliotjreed.com/#author" },
        inLanguage: "en-GB",
      },
      createBreadcrumbs([
        { name: "Home", url: "https://www.elliotjreed.com" },
        { name: "Charisma Hair", url: "https://www.elliotjreed.com/charisma-hair" },
      ]),
    ],
    body: `<section class="page-section">
  <div class="page-header">
    <h1 class="page-title">Charisma Hair</h1>
    <p class="page-intro">Charisma Hair in Onehouse, Suffolk closed in March 2026 following the retirement of Charis.<br /><em>Charis, Jo, and Lily would like to say a massive thank you and farewell to all our amazing, generous, funny, kind, lovely clients. Some of you have been with us for literally decades. You will all be missed so much.</em></p>
  </div>
  <div class="photo-grid">
    <div class="photo-card">
      <div class="photo-card-inner">
        <amp-img
          alt="The Charisma Hair salon sign"
          src="https://www.elliotjreed.com/2026-03-28_charisma_hair.jpg"
          width="1200"
          height="1600"
          layout="responsive"
        ></amp-img>
      </div>
    </div>
    <div class="photo-card">
      <div class="photo-card-inner">
        <amp-img
          alt="Charis, Jo, and Lily together at Charisma Hair"
          src="https://www.elliotjreed.com/2026-03-28_charis_jo_lily.jpg"
          width="2048"
          height="1536"
          layout="responsive"
        ></amp-img>
      </div>
    </div>
  </div>
</section>`,
  };
}
