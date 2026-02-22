import { PageHeader } from "~/components/PageHeader/PageHeader";
import { emailAddress } from "~/data/emailAddress";
import { createBreadcrumbs } from "~/data/schemaData";
import { createAmpLink, createMeta } from "~/utils/seo";

export const meta = () => [
  ...createMeta({
    title: "TheVape.co.uk - Domain for Sale | EJR",
    description: "Contact me to submit an offer for The Vape.co.uk domain.",
    url: "https://www.elliotjreed.com/the-vape",
    type: "website",
    image: "https://www.elliotjreed.com/og.png",
  }),
  {
    "script:ld+json": {
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
  },
  {
    "script:ld+json": createBreadcrumbs([
      { name: "Home", url: "https://www.elliotjreed.com" },
      { name: "TheVape.co.uk", url: "https://www.elliotjreed.com/the-vape" },
    ]),
  },
  createAmpLink("/the-vape"),
];

export default function Index() {
  return (
    <section className="divide-y divide-gray-200 dark:divide-gray-700">
      <PageHeader title="TheVape.co.uk">
        <p className="prose dark:prose-dark max-w-none text-lg leading-7 text-gray-600 dark:text-gray-300">
          The domain name &ldquo;TheVape.co.uk&rdquo; is available for purchase should you be interested. Email{" "}
          <a href={`mailto:${emailAddress}`}>{emailAddress}</a> to make an enquiry.
        </p>
      </PageHeader>
    </section>
  );
}
