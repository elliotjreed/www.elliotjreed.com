import type { ReactElement } from "react";
import { Link } from "react-router";

export const meta = () => [
  { title: "AI Resources | EJR" },
  {
    name: "description",
    content: "Recommended resources for learning more about AI LLMs such as ChatGPT, CLaude, Gemini, and DeepSeek.",
  },
];

export default (): ReactElement => (
  <section className="divide-y divide-gray-200 dark:divide-gray-700">
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-700 dark:text-gray-200 sm:text-4xl sm:leading-10 md:text-6xl">
        AI Resources
      </h1>

      <p className="text-lg leading-7 text-gray-600 dark:text-gray-300">
        Some articles I have found valuable and interesting, alongside resources for expanding learning of AI.
      </p>
    </div>

    <div className="prose max-w-none dark:prose-dark">
      <section id="prompt_engineering">
        <h3>Prompts &amp; Prompt EngineeringI</h3>
        <ul>
          <li>
            <a href="https://www.kaggle.com/whitepaper-prompt-engineering">
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
            <a href="https://www.darioamodei.com/essay/machines-of-loving-grace">
              Machines of Loving Grace, Dario Amodei - a post on "How AI Could Transform the World for the Better" by
              the CEO of Anthropic
            </a>
          </li>
          <li>
            <a href="https://www.anthropic.com/news/anthropics-responsible-scaling-policy">
              Responsible Scaling Policy, Anthropic - research on managing the risks of improving AI
            </a>
          </li>
        </ul>
      </section>

      <section id="tools">
        <h3>Tools</h3>
        <ul>
          <li>
            <a href="https://tiktokenizer.vercel.app/">AI LLM token calculator - useful if you're using APIs</a>.
          </li>
        </ul>
      </section>
    </div>
  </section>
);
