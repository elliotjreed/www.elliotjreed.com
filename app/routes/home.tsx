import type { ReactElement } from "react";
import { Link } from "react-router";
import { SocialLinks } from "~/components/SocialLinks/SocialLinks";
import { emailAddress } from "~/data/emailAddress";
import { authorSchema, createBreadcrumbs, websiteSchema } from "~/data/schemaData";

export function meta() {
  return [
    { title: "Elliot J. Reed | EJR" },
    {
      name: "description",
      content:
        "The personal website of Elliot J. Reed, whose interests include e-commerce and technology management, philosophy, AI, software development, DevOps, and Linux.",
    },
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
    <section>
      <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
        <div className="flex flex-col items-center pt-8 text-gray-700 dark:text-gray-200">
          <img
            src="https://www.elliotjreed.com/elliot-greyscale.webp"
            alt="Photograph of Elliot"
            width={192}
            height={192}
            className="h-48 w-48 rounded-full"
            loading="eager"
            decoding="async"
          />
          <h1 className="pt-4 pb-1 text-2xl font-bold leading-8 tracking-tight">Elliot Reed</h1>
          <div className="text-navy-900 dark:text-gray-300">
            <a href={`mailto:${emailAddress}`}>{emailAddress}</a>{" "}
          </div>
          <div className="text-gray-600 dark:text-gray-300">Nottingham, United Kingdom</div>
          <div className="flex space-x-3 pt-3">
            <SocialLinks />
          </div>
        </div>
        <div className="prose max-w-none pt-8 pb-8 xl:col-span-2">
          <p>
            Hi! I&apos;m Elliot, I work in e-commerce and software development. My technical interests are generally in
            e-commerce, AI, Linux, PHP, Javascript, and general DevOps.
          </p>
          <p>
            If you work in the non-profit or charity sector and want to explore ways of using AI or have questions
            around software development in general, please do feel free to get in touch - I will be happy to volunteer
            my time and provide advice.
          </p>
          <p>
            A good place to start if you want to effectively use AI Assistants such as ChatGPT, Claude, and Gemini is my{" "}
            <Link to="/ai/ai-prompt-engineering-guide" prefetch="render">
              AI prompting introduction and guide
            </Link>
            . For an easy-to-reference quick outline, have a look at{" "}
            <Link to="/ai/cafe-ai-prompt-framework" prefetch="render">
              <em>CAFE</em> prompt framework
            </Link>
          </p>
          <p>
            If you are looking for a guide and some handy tips on Claude Code, take a look at my{" "}
            <Link to="/ai/claude-code-guide-and-tips" prefetch="render">
              Claude Code Guide
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
};
