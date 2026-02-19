import { createBreadcrumbs, createTechArticle } from "../../../app/data/schemaData.js";
import type { AmpPageData } from "../../layout.js";

const PAGE_URL = "https://www.elliotjreed.com/ai/recommended-ai-learning-resources";

export function renderPage(): AmpPageData {
  return {
    title: "AI Resources | EJR",
    description:
      "Recommended resources for learning more about AI LLMs such as ChatGPT, Claude, Gemini, and DeepSeek.",
    canonicalPath: "/ai/recommended-ai-learning-resources",
    type: "article",
    schemas: [
      createTechArticle({
        url: PAGE_URL,
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
      createBreadcrumbs([
        { name: "Home", url: "https://www.elliotjreed.com" },
        { name: "AI Guides", url: "https://www.elliotjreed.com/ai" },
        { name: "AI Resources", url: PAGE_URL },
      ]),
    ],
    body: `<section class="page-section">
  <div class="page-header">
    <h1 class="page-title">AI Resources</h1>
    <div class="page-meta">
      <span>By Elliot J. Reed</span>
      <span>&#8226;</span>
      <time datetime="2025-04-20">Published: 20th April 2025</time>
      <span>&#8226;</span>
      <time datetime="2026-01-30">Last updated: 30th January 2026</time>
    </div>
    <p class="page-intro">
      A curated collection of AI learning resources covering practical prompt engineering techniques, forward-thinking
      essays on AI&#39;s potential impact on society, responsible AI development policies, and useful tools for working
      with AI APIs.
    </p>
  </div>
  <div class="prose">
    <section>
      <h2>Table of Contents</h2>
      <ul>
        <li><a href="#prompt_engineering">Prompts &amp; Prompt Engineering</a></li>
        <li><a href="#future_of_ai">The Future of AI</a></li>
        <li><a href="#tools">Tools</a></li>
        <li><a href="#conclusion">Conclusion</a></li>
      </ul>
    </section>

    <section id="prompt_engineering">
      <h2>Prompts &amp; Prompt Engineering</h2>
      <ul>
        <li>
          <a href="https://www.kaggle.com/whitepaper-prompt-engineering" rel="noreferrer noopener">
            Prompt Engineering, Lee Boonstra - 2025 whitepaper on effective prompts
          </a>.
        </li>
      </ul>
    </section>

    <section id="future_of_ai">
      <h2>The Future of AI</h2>
      <ul>
        <li>
          <a href="https://www.darioamodei.com/essay/machines-of-loving-grace" rel="noreferrer noopener">
            Machines of Loving Grace, Dario Amodei - a post on &#8220;How AI Could Transform the World for the Better&#8221; by
            the CEO of Anthropic
          </a>
        </li>
        <li>
          <a href="https://www.anthropic.com/news/anthropics-responsible-scaling-policy" rel="noreferrer noopener">
            Responsible Scaling Policy, Anthropic - research on managing the risks of improving AI
          </a>
        </li>
      </ul>
    </section>

    <section id="tools">
      <h2>Tools</h2>
      <ul>
        <li>
          <a href="https://tiktokenizer.vercel.app/" rel="noreferrer noopener">
            AI LLM token calculator - useful if you&#39;re using APIs
          </a>.
        </li>
      </ul>
    </section>

    <section id="conclusion">
      <h2>Conclusion</h2>
      <p>
        The resources listed above provide a solid foundation for understanding AI development, from practical prompt
        engineering techniques to forward-thinking research on AI safety and responsible scaling. Whether you&#39;re just
        starting your AI journey or looking to deepen your understanding of how AI could shape our future, these
        carefully curated materials offer valuable insights from leading voices in the field.
      </p>
      <p>
        To get the most from these resources, I recommend starting with the prompt engineering whitepaper to develop
        practical skills, then exploring the more conceptual pieces about AI&#39;s future and safety considerations. The
        token calculator tool will prove invaluable if you decide to work with AI APIs directly.
      </p>
    </section>
  </div>
</section>`,
  };
}
