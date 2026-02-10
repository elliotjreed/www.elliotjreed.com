import type { ReactElement } from "react";
import { Link } from "react-router";
import { HeadingAnchor } from "~/components/HeadingAnchor/HeadingAnchor";
import { PageHeader } from "~/components/PageHeader/PageHeader";
import { createBreadcrumbs, createTechArticle } from "~/data/schemaData";
import { createMeta } from "~/utils/seo";

export const meta = () => [
  ...createMeta({
    title: "CAFE Framework Prompting Guide | EJR",
    description:
      "A guide on effective prompting using the CAFE prompt engineering framework, for AI LLMs such as ChatGPT, Claude, Gemini, and DeepSeek.",
    url: "https://www.elliotjreed.com/ai/cafe-ai-prompt-framework",
    type: "article",
    ogImage: "https://www.elliotjreed.com/og.png",
    twitterImage: "https://www.elliotjreed.com/twitter-card.png",
  }),
  {
    "script:ld+json": createTechArticle({
      url: "https://www.elliotjreed.com/ai/cafe-ai-prompt-framework",
      headline: "CAFE Framework Prompting Guide",
      description:
        "A guide on effective prompting using the CAFE prompt engineering framework, for AI LLMs such as ChatGPT, Claude, Gemini, and DeepSeek.",
      datePublished: "2025-04-20T13:09:43+01:00",
      dateModified: "2026-01-30T00:00:00+00:00",
      articleSection: "AI",
      keywords: ["AI", "CAFE framework", "prompt engineering", "LLM", "ChatGPT", "Claude"],
      wordCount: 1092,
      proficiencyLevel: "Beginner",
    }),
  },
  {
    "script:ld+json": createBreadcrumbs([
      { name: "Home", url: "https://www.elliotjreed.com" },
      { name: "AI Guides", url: "https://www.elliotjreed.com/ai" },
      { name: "CAFE Framework", url: "https://www.elliotjreed.com/ai/cafe-ai-prompt-framework" },
    ]),
  },
  {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Do I need to use all four elements in every prompt?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No, not every prompt requires all four CAFE elements. The framework is a guideline, not a rigid formula. Simple questions might only need an Action ('Explain quantum computing'), whilst complex tasks benefit from combining multiple elements. Start with what feels natural, then add Context, Format, or Examples if the initial response doesn't meet your needs.",
          },
        },
        {
          "@type": "Question",
          name: "Which element is most important?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Action is the most essential element - you must tell the AI what you want it to do. Beyond that, importance varies by task. Context becomes critical for domain-specific or nuanced requests, Format matters when you need structured output (like JSON or markdown), and Examples are vital when you need precise replication of a particular style or format. Prioritise based on your specific needs.",
          },
        },
      ],
    },
  },
];

export default (): ReactElement => (
  <section className="divide-y divide-gray-200 dark:divide-gray-700">
    <PageHeader
      title="CAFE Prompt Framework"
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
        This is an outline of my <strong>CAFE</strong> prompt framework. For a more in-depth guide, take a look at my{" "}
        <Link
          to="/ai/ai-prompt-engineering-guide"
          className="text-primary-700 dark:text-primary-500 underline"
          prefetch="render"
        >
          AI Prompt Engineering Guide
        </Link>
        .
      </p>
    </PageHeader>

    <div className="prose max-w-none dark:prose-dark">
      <section>
        <h2>Table of Contents</h2>
        <ul>
          <li>
            <a href="#context">Context</a> - Background information and situation
          </li>
          <li>
            <a href="#action">Action</a> - What you want the AI to do
          </li>
          <li>
            <a href="#format">Format</a> - How you want the response structured
          </li>
          <li>
            <a href="#examples">Examples</a> - Sample outputs or references
          </li>
          <li>
            <a href="#faq">Frequently Asked Questions</a>
          </li>
          <li>
            <a href="#conclusion">Conclusion</a>
          </li>
        </ul>
      </section>

      <section id="introduction">
        <a
          href="https://www.elliotjreed.com/CAFE Prompt Framework Poster - Elliot J. Reed.png"
          download="CAFE Prompt Framework Poster.png"
        >
          <img
            src="https://www.elliotjreed.com/CAFE Prompt Framework Poster - Elliot J. Reed.webp"
            alt="CAFE prompt engineering poster"
            width={220}
            height={311}
            className="h-auto w-full max-w-sm md:max-w-64"
            loading="lazy"
            decoding="async"
          />
        </a>

        <p>
          Feel free to download the poster as{" "}
          <a
            href="https://www.elliotjreed.com/CAFE Prompt Framework Poster - Elliot J. Reed.png"
            download="CAFE Prompt Framework Poster.png"
          >
            a PNG image
          </a>
          , or in{" "}
          <a
            href="https://www.elliotjreed.com/CAFE Prompt Framework Poster - Elliot J. Reed.pdf"
            download="CAFE Prompt Framework Poster.pdf"
          >
            PDF format
          </a>
          .
        </p>
      </section>

      <section id="context">
        <HeadingAnchor id="context">Context</HeadingAnchor>

        <p>This could include:</p>
        <div className="px-4 border-s-4 border-gray-200  dark:border-gray-700 italic">
          <ul>
            <li>the intended audience</li>
            <li>your skills or area of expertise</li>
            <li>your job role</li>
            <li>the tools, software, or equipment you have access to</li>
          </ul>
        </div>
      </section>

      <section id="action">
        <HeadingAnchor id="action">Action</HeadingAnchor>

        <p>
          <strong>Use active verbs</strong> to describe the task. For example:
        </p>
        <div className="px-4 border-s-4 border-gray-200  dark:border-gray-700 italic">
          <ul>
            <li>act as&hellip;</li>
            <li>analyse&hellip;</li>
            <li>create&hellip;</li>
            <li>organise&hellip;</li>
            <li>summarise&hellip;</li>
          </ul>
        </div>

        <p>
          <strong>Use "active criteria"</strong> over "negative constraints". For example, "
          <em>include only details about the camera resolution, screen size, processor, and memory</em>" rather than "
          <em>do not include details about battery life, available apps, or charging capabilities</em>".
        </p>
      </section>

      <section id="format">
        <HeadingAnchor id="format">Format</HeadingAnchor>

        <p>This can include information such as:</p>
        <div className="px-4 border-s-4 border-gray-200  dark:border-gray-700 italic">
          <ul>
            <li>
              <strong>tone</strong> (eg. <em>use a professional tone</em>)
            </li>
            <li>
              <strong>length</strong> (eg. <em>keep it short and quick to read</em>)
            </li>
            <li>
              <strong>medium</strong> (eg. <em>in the medium of a business memo</em>)
            </li>
            <li>
              <strong>layout</strong> (eg. <em>use bullet points and clear headings</em>)
            </li>
          </ul>
        </div>
      </section>

      <section id="examples">
        <HeadingAnchor id="examples">Examples</HeadingAnchor>

        <p>
          Provide <strong>two to five examples</strong> where possible. Eg. if you want to generate a social media post,
          provide examples of ones you like.
        </p>
      </section>

      <section id="iterate">
        <HeadingAnchor id="iterate">Iterate</HeadingAnchor>

        <p>Iterate on the response. This could include:</p>
        <div className="px-4 border-s-4 border-gray-200  dark:border-gray-700 italic">
          <ul>
            <li>requesting a change in tone</li>
            <li>clarifying a point</li>
            <li>pointing out an error</li>
            <li>asking for a more concise output</li>
            <li>
              re-writing as a similar task (eg. instead of "<em>analyse the report for social media trends in 2025</em>"
              you could re-write as "<em>identify key trends in social media marketing from the 2025 report</em>")
            </li>
          </ul>
        </div>
      </section>

      <section id="example_prompts">
        <HeadingAnchor id="example_prompts">Example Prompts</HeadingAnchor>
        <p>
          Here are three examples using the CAFE framework. The order of the CAFE elements doesn't matter (for example,
          the action could come before the context, or the format after the examples).
        </p>

        <section>
          <h3>Garden Planning for Small Space</h3>
          <p className="px-4 border-s-4 border-gray-200  dark:border-gray-700 italic">
            <strong>Context:</strong> I live in a terraced house in Manchester with a north-facing garden that's
            approximately 3m x 5m. The space gets limited direct sunlight except on summer mornings. The soil is
            clay-heavy and tends to waterlog during winter months.
            <br />
            <strong>Action:</strong> Design a low-maintenance garden plan that incorporates edible plants, year-round
            visual interest, and creates habitat for local wildlife like birds and pollinators.
            <br />
            <strong>Format:</strong> Provide a visual layout description with seasonal planting recommendations. Include
            a short shopping list of essential plants and materials, and a monthly maintenance calendar.
            <br />
            <strong>Examples:</strong> My neighbour created a successful small garden using raised beds to overcome poor
            drainage, and my sister incorporated vertical growing spaces with trellises to maximise her limited garden
            footprint.
          </p>
        </section>

        <section>
          <h3>Family History Research Strategy</h3>
          <p className="px-4 border-s-4 border-gray-200  dark:border-gray-700 italic">
            I'm researching my family history and have hit a roadblock with my maternal great-grandfather. I know he was
            born around 1885 in Glasgow and worked as a shipbuilder, but I've found conflicting information about his
            parents and siblings.
            <br />
            Outline a systematic research strategy to verify his parentage and siblings. Recommend specific archives,
            databases, or resources I should consult.
            <br />
            Create a detailed research plan organised by source type, with specific questions to investigate for each
            source. Include troubleshooting tips for common problems like name variations or missing records.
            <br />
            When researching my paternal line, I successfully broke through a similar roadblock by examining church
            parish records and local newspaper archives for marriage announcements.
          </p>
        </section>

        <section>
          <h3>School Climate Change Presentation</h3>
          <p className="px-4 border-s-4 border-gray-200  dark:border-gray-700 italic">
            I'm a volunteer at a local primary school and will be giving a 30-minute presentation to Year 4 pupils (ages
            8-9) about climate change. Most children have some awareness of the topic but limited understanding of the
            science.
            <br />
            Create an age-appropriate explanation of climate change with interactive elements to maintain engagement.
            Include key concepts that children should understand by the end.
            <br />
            Structure the presentation with a simple introduction, 3-4 core concepts, and a hopeful conclusion with
            actions children can take. Include suggestions for simple demonstrations or activities that require minimal
            materials.
            <br />
            Previous successful presentations to this age group have used the "greenhouse as a blanket" analogy and
            incorporated sorting activities where children categorised everyday actions as "helps the planet" or "harms
            the planet."
          </p>
        </section>

        <section>
          <HeadingAnchor id="faq" level={2}>
            Frequently Asked Questions
          </HeadingAnchor>

          <h3>Do I need to use all four elements in every prompt?</h3>
          <p>
            No, not every prompt requires all four CAFE elements. The framework is a guideline, not a rigid formula.
            Simple questions might only need an <strong>Action</strong> ("Explain quantum computing"), whilst complex
            tasks benefit from combining multiple elements. Start with what feels natural, then add Context, Format, or
            Examples if the initial response doesn't meet your needs.
          </p>

          <h3>Which element is most important?</h3>
          <p>
            The <strong>Action</strong> is the most essential element - you must tell the AI what you want it to do.
            Beyond that, importance varies by task. Context becomes critical for domain-specific or nuanced requests,
            Format matters when you need structured output (like JSON or markdown), and Examples are vital when you need
            precise replication of a particular style or format. Prioritise based on your specific needs.
          </p>
        </section>

        <section>
          <HeadingAnchor id="conclusion" level={2}>
            Conclusion
          </HeadingAnchor>

          <p>
            The <strong>CAFE framework</strong> provides a simple, memorable structure for crafting effective AI
            prompts. By systematically addressing Context, Action, Format, and Examples, you can significantly improve
            the quality and relevance of AI responses.
          </p>

          <p>
            Remember: not every prompt needs all four elements. Start with Action (what you want), add Context when
            background matters, specify Format for structured outputs, and include Examples when precision is critical.
          </p>

          <p>
            For a comprehensive exploration of prompt engineering techniques and strategies, refer to the{" "}
            <Link
              to="/ai/ai-prompt-engineering-guide"
              className="text-primary-700 dark:text-primary-500 underline"
              prefetch="render"
            >
              AI Prompt Engineering Guide
            </Link>
            .
          </p>
        </section>
      </section>
    </div>
  </section>
);
