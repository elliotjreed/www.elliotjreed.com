import { createBreadcrumbs } from "../../app/data/schemaData.js";
import type { AmpPageData } from "../layout.js";

const EMAIL = "contact@elliotjreed.com";

export function renderPage(): AmpPageData {
  return {
    title: "TheVape.co.uk - Domain for Sale | EJR",
    description: "Contact me to submit an offer for The Vape.co.uk domain.",
    canonicalPath: "/the-vape",
    type: "website",
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://www.elliotjreed.com/the-vape#webpage",
        url: "https://www.elliotjreed.com/the-vape",
        name: "TheVape.co.uk - Domain for Sale",
        description: "Contact me to submit an offer for The Vape.co.uk domain.",
        isPartOf: { "@id": "https://www.elliotjreed.com/#website" },
        author: { "@id": "https://www.elliotjreed.com/#author" },
        inLanguage: "en-GB",
      },
      createBreadcrumbs([
        { name: "Home", url: "https://www.elliotjreed.com" },
        { name: "TheVape.co.uk", url: "https://www.elliotjreed.com/the-vape" },
      ]),
    ],
    body: `<section class="page-section">
  <div class="page-header">
    <h1 class="page-title">TheVape.co.uk</h1>
    <p class="page-intro">The domain name &#8220;TheVape.co.uk&#8221; is available for purchase should you be interested. Email <a href="mailto:${EMAIL}">${EMAIL}</a> to make an enquiry.</p>
  </div>
</section>`,
  };
}
