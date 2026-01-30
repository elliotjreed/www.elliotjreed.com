import type { ReactElement } from "react";
import { createBreadcrumbs, createTechArticle } from "~/data/schemaData";

export const meta = () => [
  { title: "AI Resources | EJR" },
  {
    name: "description",
    content: "Recommended resources for learning more about AI LLMs such as ChatGPT, Claude, Gemini, and DeepSeek.",
  },
  { property: "og:title", content: "AI Resources" },
  {
    property: "og:description",
    content: "Recommended resources for learning more about AI LLMs such as ChatGPT, Claude, Gemini, and DeepSeek.",
  },
  { property: "og:type", content: "article" },
  { property: "og:url", content: "https://www.elliotjreed.com/ai/recommended-ai-learning-resources" },
  { property: "og:site_name", content: "Elliot J. Reed" },
  { property: "og:locale", content: "en_GB" },
  {
    "script:ld+json": createTechArticle({
      url: "https://www.elliotjreed.com/ai/recommended-ai-learning-resources",
      headline: "AI Resources",
      description:
        "Recommended resources for learning more about AI LLMs such as ChatGPT, Claude, Gemini, and DeepSeek.",
      datePublished: "2025-04-20T16:51:20+01:00",
      dateModified: "2025-04-20T16:51:20+01:00",
      articleSection: "AI",
      keywords: ["AI", "learning resources", "LLM", "ChatGPT", "Claude", "Gemini"],
      wordCount: 345,
      proficiencyLevel: "Beginner",
    }),
  },
  {
    "script:ld+json": createBreadcrumbs([
      { name: "Home", url: "https://www.elliotjreed.com" },
      { name: "Guides", url: "https://www.elliotjreed.com" },
      { name: "AI", url: "https://www.elliotjreed.com/ai/recommended-ai-learning-resources" },
      { name: "AI Resources", url: "https://www.elliotjreed.com/ai/recommended-ai-learning-resources" },
    ]),
  },
];

export default (): ReactElement => (
  <section className="divide-y divide-gray-200 dark:divide-gray-700">
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-700 dark:text-gray-200 sm:text-4xl sm:leading-10 md:text-6xl">
        AI Resources
      </h1>

      <p className="prose dark:prose-dark max-w-none text-lg leading-7 text-gray-600 dark:text-gray-300">
        Some articles I have found valuable and interesting, alongside resources for expanding learning of AI.
      </p>
    </div>

    <div className="prose max-w-none dark:prose-dark">
      <section id="prompt_engineering">
        <h3>Prompts &amp; Prompt EngineeringI</h3>
        <ul>
          <li>
            <a href="https://www.kaggle.com/whitepaper-prompt-engineering" target="_blank" rel="noreferrer noopener">
              Prompt Engineering,Lee Boonstra - 2025 whitepaper on effective prompts
            </a>
            .
          </li>
        </ul>
      </section>

      <section id="future_of_ai">
        <h3>The Future of AI</h3>
        <ul>
          <li>
            <a
              href="https://www.darioamodei.com/essay/machines-of-loving-grace"
              target="_blank"
              rel="noreferrer noopener"
            >
              Machines of Loving Grace, Dario Amodei - a post on "How AI Could Transform the World for the Better" by
              the CEO of Anthropic
            </a>
          </li>
          <li>
            <a
              href="https://www.anthropic.com/news/anthropics-responsible-scaling-policy"
              target="_blank"
              rel="noreferrer noopener"
            >
              Responsible Scaling Policy, Anthropic - research on managing the risks of improving AI
            </a>
          </li>
        </ul>
      </section>

      <section id="tools">
        <h3>Tools</h3>
        <ul>
          <li>
            <a href="https://tiktokenizer.vercel.app/" target="_blank" rel="noreferrer noopener">
              AI LLM token calculator - useful if you're using APIs
            </a>
            .
          </li>
        </ul>
      </section>
    </div>
  </section>
);
