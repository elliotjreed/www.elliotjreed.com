import type { ReactElement } from "react";
import { Link } from "react-router";
import { SocialLinks } from "~/components/SocialLinks/SocialLinks";
import { authorSchema, createBreadcrumbs, websiteSchema } from "~/data/schemaData";
import { createMeta } from "~/utils/seo";

const HERO_IMAGE_URL = "https://www.elliotjreed.com/elliot.webp";

interface Repository {
  name: string;
  description: string;
  language: string;
}

const repositories: Repository[] = [
  {
    name: "disposable-emails-filter-php",
    description: "Checks whether an email address comes from a disposable or temporary email provider.",
    language: "PHP",
  },
  {
    name: "haveibeenpwned",
    description: "A client for the Have I Been Pwned API, for checking breached accounts and passwords.",
    language: "PHP",
  },
  {
    name: "royal-mail-tracking",
    description: "A library for the Royal Mail Tracking API version 2.",
    language: "PHP",
  },
  {
    name: "google-shopping-feed",
    description: "A library for building a Google Shopping product feed for Google Merchant Center.",
    language: "PHP",
  },
  {
    name: "vitest-minimal-reporter",
    description: "A Vitest reporter that keeps test output short, to save tokens in AI coding assistants.",
    language: "TypeScript",
  },
  {
    name: "openai-product-feed-php",
    description: "A library for building OpenAI product feeds, so your products can be found and bought in ChatGPT.",
    language: "PHP",
  },
];

export function meta() {
  const title = "Elliot J. Reed | Head of Engineering – Software and AI Guides";
  const description =
    "Elliot J. Reed, Head of Engineering in the UK. Practical guides on AI, Claude Code, prompt engineering, Linux, Docker and PHP, plus free UK finance tools.";

  return [
    ...createMeta({
      title,
      description,
      url: "https://www.elliotjreed.com",
      type: "website",
      image: "https://www.elliotjreed.com/og.png",
    }),
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@graph": [
          {
            ...websiteSchema,
            headline: "Elliot J. Reed's Website",
            alternativeHeadline: "Elliot Reed's Website",
          },
          authorSchema,
          {
            "@type": "WebPage",
            "@id": "https://www.elliotjreed.com/#webpage",
            url: "https://www.elliotjreed.com",
            name: "Elliot J. Reed",
            isPartOf: { "@id": "https://www.elliotjreed.com/#website" },
            about: { "@id": "https://www.elliotjreed.com/#author" },
            mainEntity: { "@id": "https://www.elliotjreed.com/#author" },
            inLanguage: "en-GB",
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: ["h1", ".prose p"],
            },
          },
        ],
      },
    },
    {
      "script:ld+json": createBreadcrumbs([{ name: "Home", url: "https://www.elliotjreed.com" }]),
    },
  ];
}

export default (): ReactElement => {
  return (
    <>
      <section
        aria-labelledby="home-heading"
        className="band-rhubarb grid items-center gap-8 py-12 sm:py-16 lg:min-h-[58svh] lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-16 lg:py-20"
      >
        <div className="flex min-w-0 flex-col items-start gap-6">
          <h1 id="home-heading" className="text-display text-on-rhubarb sm:text-display-xl">
            Elliot J<span className="text-custard">.</span> Reed
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <SocialLinks accent />
          </div>
        </div>
        <div className="relative order-first w-48 sm:w-64 lg:w-[320px]">
          <span
            aria-hidden="true"
            className="bg-custard absolute inset-0 translate-x-3 translate-y-3 rounded-full sm:translate-x-5 sm:translate-y-5"
          />
          <img
            src={HERO_IMAGE_URL}
            alt="Photograph of Elliot"
            width={374}
            height={374}
            className="relative aspect-square w-full rounded-full"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>
      </section>
      <div aria-hidden="true" className="band-custard h-3" />

      <section aria-labelledby="interests-heading" className="pt-16 pb-20 sm:pt-20 sm:pb-32" id="author">
        <h2 id="interests-heading" className="sr-only">
          About me
        </h2>
        <p className="text-lead text-ink max-w-[52ch] text-pretty sm:text-(length:--text-heading-2) sm:leading-10">
          Hello, I'm Elliot. I've been in the e-commerce and software development industry for around 15 years, and am
          the Head of Engineering at{" "}
          <a href="https://www.bunches.co.uk/?aff=ejr" rel="noopener">
            Bunches
          </a>
          .<br />I like discussing all things e-commerce, software development, AI, and technology in general – so feel
          free to get in touch and have a chat!
        </p>
      </section>

      <section
        aria-labelledby="charity-heading"
        className="band-soft grid gap-6 py-16 sm:py-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16"
      >
        <h2 id="charity-heading" className="font-display text-heading-1 text-ink sm:text-display text-balance">
          Help for charities and non-profits
        </h2>
        <div className="flex max-w-(--measure) flex-col items-start gap-6">
          <p className="text-body-long text-ink text-pretty">
            If you work in the non-profit or charity sector and want to explore ways of using AI or have questions
            around software development in general, please do give me a shout. I will be happy to volunteer my time and
            provide advice.
          </p>
        </div>
      </section>

      <section aria-labelledby="open-source-heading" className="pt-20 sm:pt-32">
        <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4 sm:mb-12">
          <h2 id="open-source-heading" className="font-display text-heading-1 text-ink sm:text-display">
            Open source
          </h2>
          <a href="https://github.com/elliotjreed" target="_blank" rel="noreferrer noopener" className="ejr-link">
            See everything on GitHub
          </a>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {repositories.map((repository: Repository): ReactElement => (
            <article key={repository.name} className="ejr-card">
              <h3>
                <a href={`https://github.com/elliotjreed/${repository.name}`} target="_blank" rel="noreferrer noopener">
                  {repository.name}
                </a>
              </h3>
              <p>{repository.description}</p>
              <div className="ejr-card-foot">
                <span className="ejr-card-topic">{repository.language}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="start-heading" className="pt-20 pb-4 sm:pt-32">
        <h2 id="start-heading" className="font-display text-heading-1 text-ink sm:text-display mb-8 sm:mb-12">
          Getting started with AI
        </h2>
        <div className="prose text-body-long grid max-w-none gap-x-16 md:grid-cols-2">
          <p>
            A good place to start if you want to effectively use AI Assistants such as ChatGPT, Claude, and Gemini is my{" "}
            <Link to="/ai/ai-prompt-engineering-guide" prefetch="render">
              AI prompting introduction and guide
            </Link>
            . For an easy-to-reference quick outline, have a look at{" "}
            <Link to="/ai/cafe-ai-prompt-framework" prefetch="render">
              <em>CAFE</em> prompt framework
            </Link>
            .
          </p>
          <p>
            If you are looking for a guide and some handy tips on Claude Code, take a look at my{" "}
            <Link to="/ai/claude-code-guide-and-tips" prefetch="render">
              Claude Code Guide
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
};
