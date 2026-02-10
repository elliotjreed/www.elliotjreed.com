import type { ReactElement } from "react";
import { PageHeader } from "~/components/PageHeader/PageHeader";
import { createBreadcrumbs, createTechArticle } from "~/data/schemaData";
import { createMeta } from "~/utils/seo";

export const meta = () => [
  ...createMeta({
    title: "AI Resources | EJR",
    description: "Recommended resources for learning more about AI LLMs such as ChatGPT, Claude, Gemini, and DeepSeek.",
    url: "https://www.elliotjreed.com/ai/recommended-ai-learning-resources",
    type: "article",
    ogImage: "https://www.elliotjreed.com/og.png",
    twitterImage: "https://www.elliotjreed.com/twitter-card.png",
  }),
  {
    "script:ld+json": createTechArticle({
      url: "https://www.elliotjreed.com/ai/recommended-ai-learning-resources",
      headline: "AI Resources",
      description:
        "Recommended resources for learning more about AI LLMs such as ChatGPT, Claude, Gemini, and DeepSeek.",
      datePublished: "2025-04-20T16:51:20+01:00",
      dateModified: "2026-01-30T00:00:00+00:00",
      articleSection: "AI",
      keywords: ["AI", "learning resources", "LLM", "ChatGPT", "Claude", "Gemini"],
      wordCount: 345,
      proficiencyLevel: "Beginner",
    }),
  },
  {
    "script:ld+json": createBreadcrumbs([
      { name: "Home", url: "https://www.elliotjreed.com" },
      { name: "AI Guides", url: "https://www.elliotjreed.com/ai" },
      { name: "AI Resources", url: "https://www.elliotjreed.com/ai/recommended-ai-learning-resources" },
    ]),
  },
];

export default (): ReactElement => (
  <section className="divide-y divide-gray-200 dark:divide-gray-700">
    <PageHeader
      title="AI Resources"
      meta={
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span>By Elliot J. Reed</span>
          <span>•</span>
          <time dateTime="2025-04-20">
            Published: 20<sup>th</sup> April 2025
          </time>
          <span>•</span>
          <time dateTime="2026-01-30">
            Last updated: 30<sup>th</sup> January 2026
          </time>
        </div>
      }
    >
      <p className="prose dark:prose-dark max-w-none text-lg leading-7 text-gray-600 dark:text-gray-300">
        A curated collection of AI learning resources covering practical prompt engineering techniques, forward-thinking
        essays on AI's potential impact on society, responsible AI development policies, and useful tools for working
        with AI APIs. These resources span from hands-on technical guides to thoughtful explorations of AI safety and
        ethics.
      </p>
    </PageHeader>

    <div className="prose max-w-none dark:prose-dark">
      <section>
        <h2>Table of Contents</h2>
        <ul>
          <li>
            <a href="#prompt_engineering">Prompts & Prompt Engineering</a>
          </li>
          <li>
            <a href="#future_of_ai">The Future of AI</a>
          </li>
          <li>
            <a href="#tools">Tools</a>
          </li>
          <li>
            <a href="#conclusion">Conclusion</a>
          </li>
        </ul>
      </section>

      <section id="prompt_engineering">
        <h3>Prompts &amp; Prompt Engineering</h3>
        <ul>
          <li>
            <a href="https://www.kaggle.com/whitepaper-prompt-engineering" target="_blank" rel="noreferrer noopener">
              Prompt Engineering, Lee Boonstra - 2025 whitepaper on effective prompts
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

      <section id="conclusion">
        <h3>Conclusion</h3>
        <p>
          The resources listed above provide a solid foundation for understanding AI development, from practical prompt
          engineering techniques to forward-thinking research on AI safety and responsible scaling. Whether you're just
          starting your AI journey or looking to deepen your understanding of how AI could shape our future, these
          carefully curated materials offer valuable insights from leading voices in the field.
        </p>
        <p>
          To get the most from these resources, I recommend starting with the prompt engineering whitepaper to develop
          practical skills, then exploring the more conceptual pieces about AI's future and safety considerations. The
          token calculator tool will prove invaluable if you decide to work with AI APIs directly. Remember that the AI
          field evolves rapidly, so bookmark these resources and check back regularly for updates.
        </p>
      </section>
    </div>
  </section>
);
