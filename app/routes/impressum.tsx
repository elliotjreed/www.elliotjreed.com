import type { ReactElement } from "react";
import { PageHeader } from "~/components/PageHeader/PageHeader";
import { emailAddress } from "~/data/emailAddress";
import { createBreadcrumbs } from "~/data/schemaData";
import { createMeta } from "~/utils/seo";

export const meta = () => [
  ...createMeta({
    title: "Impressum | EJR",
    description: "Legal information and imprint for www.elliotjreed.com",
    url: "https://www.elliotjreed.com/impressum",
    type: "website",
    image: "https://www.elliotjreed.com/og.png",
  }),
  {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": ["WebPage", "ContactPage"],
      "@id": "https://www.elliotjreed.com/impressum#webpage",
      url: "https://www.elliotjreed.com/impressum",
      name: "Impressum",
      description: "Legal information and imprint for www.elliotjreed.com",
      isPartOf: { "@id": "https://www.elliotjreed.com/#website" },
      about: { "@id": "https://www.elliotjreed.com/#author" },
      inLanguage: "en-GB",
    },
  },
  {
    "script:ld+json": createBreadcrumbs([
      { name: "Home", url: "https://www.elliotjreed.com" },
      { name: "Impressum", url: "https://www.elliotjreed.com/impressum" },
    ]),
  },
];

export default (): ReactElement => (
  <section className="divide-y divide-gray-200 dark:divide-gray-700">
    <PageHeader title="Impressum">
      <p className="prose dark:prose-dark max-w-none text-lg leading-7 text-gray-600 dark:text-gray-300">
        Legal information and imprint in accordance with applicable regulations.
      </p>
    </PageHeader>

    <div className="prose dark:prose-dark max-w-none">
      <section>
        <h2>Information According to Law</h2>
        <p>
          <strong>Elliot J. Reed</strong>
          <br />
          Email: <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
        </p>
      </section>

      <section>
        <h2>Responsibility for Content</h2>
        <p>
          The content of this website has been compiled with meticulous care and to the best of my knowledge. However, I
          cannot assume any liability for the up-to-dateness, completeness, or accuracy of any of the pages.
        </p>
        <p>
          Pursuant to applicable law, I am responsible for my own content on these web pages. In this matter, please
          note that I am not obliged to monitor the transmitted or saved information of third parties, or investigate
          circumstances pointing to illegal activity.
        </p>
      </section>

      <section>
        <h2>Responsibility for Links</h2>
        <p>
          This website contains links to third-party websites. I have no influence whatsoever on the information on
          these websites and accept no guarantee for its correctness. The content of such third-party sites is the
          responsibility of the respective owners/providers.
        </p>
        <p>
          At the time third-party websites were linked to this site, I found no grounds whatsoever for any likely
          contravention of the law. I shall promptly delete a link upon becoming aware that it violates the law.
        </p>
      </section>

      <section>
        <h2>Copyright</h2>
        <p>
          The content and works published on this website are governed by the copyright laws of the United Kingdom. Any
          duplication, processing, distribution, or any form of utilisation beyond the scope of copyright law shall
          require the prior written consent of the author or authors in question.
        </p>
      </section>

      <section>
        <h2>Data Protection</h2>
        <p>
          For information about how I collect, use, and protect your personal data, please refer to my{" "}
          <a href="/privacy">Privacy Policy</a>.
        </p>
      </section>
    </div>
  </section>
);
