import { authorSchema, createBreadcrumbs, websiteSchema } from "../../app/data/schemaData.js";
import type { AmpPageData } from "../layout.js";
import { socialLinksHtml } from "../components/socialIcons.js";

const EMAIL = "contact@elliotjreed.com";
const HERO_IMAGE_URL = "https://www.elliotjreed.com/elliot-greyscale.webp";

export function renderPage(): AmpPageData {
  return {
    title: "Elliot J. Reed | EJR",
    description:
      "The personal website of Elliot J. Reed, whose interests include e-commerce and technology management, philosophy, AI, software development, DevOps, and Linux.",
    canonicalPath: "/",
    type: "website",
    schemas: [
      {
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
          },
        ],
      },
      createBreadcrumbs([{ name: "Home", url: "https://www.elliotjreed.com" }]),
    ],
    body: `<section class="page-section">
  <div class="home-grid">
    <div class="profile">
      <amp-img
        alt="Photograph of Elliot"
        src="${HERO_IMAGE_URL}"
        width="192"
        height="192"
        layout="fixed"
        class="profile-photo"
      ></amp-img>
      <h1 class="profile-name">Elliot Reed</h1>
      <div class="profile-email">
        <a href="mailto:${EMAIL}">${EMAIL}</a>
      </div>
      <div class="profile-location">Nottingham, United Kingdom</div>
      <div class="profile-social">
        ${socialLinksHtml}
      </div>
    </div>
    <div class="prose">
      <p>
        Hi! I&#39;m Elliot, I work in e-commerce and software development. My technical interests are generally in
        e-commerce, AI, Linux, PHP, Javascript, and general DevOps.
      </p>
      <p>
        If you work in the non-profit or charity sector and want to explore ways of using AI or have questions
        around software development in general, please do feel free to get in touch - I will be happy to volunteer
        my time and provide advice.
      </p>
      <p>
        A good place to start if you want to effectively use AI Assistants such as ChatGPT, Claude, and Gemini is my
        <a href="/ai/ai-prompt-engineering-guide">AI prompting introduction and guide</a>.
        For an easy-to-reference quick outline, have a look at
        <a href="/ai/cafe-ai-prompt-framework"><em>CAFE</em> prompt framework</a>.
      </p>
      <p>
        If you are looking for a guide and some handy tips on Claude Code, take a look at my
        <a href="/ai/claude-code-guide-and-tips">Claude Code Guide</a>.
      </p>
    </div>
  </div>
</section>`,
  };
}
