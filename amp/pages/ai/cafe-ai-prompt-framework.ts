import { createBreadcrumbs, createTechArticle } from "../../../app/data/schemaData.js";
import type { AmpPageData } from "../../layout.js";

const PAGE_URL = "https://www.elliotjreed.com/ai/cafe-ai-prompt-framework";
const POSTER_WEBP = "https://www.elliotjreed.com/CAFE Prompt Framework Poster - Elliot J. Reed.webp";
const POSTER_PNG = "https://www.elliotjreed.com/CAFE Prompt Framework Poster - Elliot J. Reed.png";
const POSTER_PDF = "https://www.elliotjreed.com/CAFE Prompt Framework Poster - Elliot J. Reed.pdf";

export function renderPage(): AmpPageData {
  return {
    title: "CAFE Framework Prompting Guide | EJR",
    description:
      "A guide on effective prompting using the CAFE prompt engineering framework, for AI LLMs such as ChatGPT, Claude, Gemini, and DeepSeek.",
    canonicalPath: "/ai/cafe-ai-prompt-framework",
    type: "article",
    schemas: [
      createTechArticle({
        url: PAGE_URL,
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
      createBreadcrumbs([
        { name: "Home", url: "https://www.elliotjreed.com" },
        { name: "AI Guides", url: "https://www.elliotjreed.com/ai" },
        { name: "CAFE Framework", url: PAGE_URL },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Do I need to use all four elements in every prompt?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No, not every prompt requires all four CAFE elements. The framework is a guideline, not a rigid formula. Simple questions might only need an Action, whilst complex tasks benefit from combining multiple elements.",
            },
          },
          {
            "@type": "Question",
            name: "Which element is most important?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The Action is the most essential element - you must tell the AI what you want it to do. Beyond that, importance varies by task.",
            },
          },
        ],
      },
    ],
    body: `<section class="page-section">
  <div class="page-header">
    <h1 class="page-title">CAFE Prompt Framework</h1>
    <div class="page-meta">
      <span>By Elliot J. Reed</span>
      <span>&#8226;</span>
      <time datetime="2025-04-20">Published: 20th April 2025</time>
      <span>&#8226;</span>
      <time datetime="2026-01-30">Last updated: 30th January 2026</time>
    </div>
    <p class="page-intro">
      This is an outline of my <strong>CAFE</strong> prompt framework. For a more in-depth guide, take a look at my
      <a href="/ai/ai-prompt-engineering-guide">AI Prompt Engineering Guide</a>.
    </p>
  </div>
  <div class="prose">
    <section>
      <h2>Table of Contents</h2>
      <ul>
        <li><a href="#context">Context</a> - Background information and situation</li>
        <li><a href="#action">Action</a> - What you want the AI to do</li>
        <li><a href="#format">Format</a> - How you want the response structured</li>
        <li><a href="#examples">Examples</a> - Sample outputs or references</li>
        <li><a href="#faq">Frequently Asked Questions</a></li>
        <li><a href="#conclusion">Conclusion</a></li>
      </ul>
    </section>

    <section id="introduction">
      <a href="${POSTER_PNG}" download="CAFE Prompt Framework Poster.png">
        <amp-img
          src="${POSTER_WEBP}"
          alt="CAFE prompt engineering poster"
          width="220"
          height="311"
          layout="responsive"
        ></amp-img>
      </a>
      <p>
        Feel free to download the poster as
        <a href="${POSTER_PNG}" download="CAFE Prompt Framework Poster.png">a PNG image</a>,
        or in <a href="${POSTER_PDF}" download="CAFE Prompt Framework Poster.pdf">PDF format</a>.
      </p>
    </section>

    <section id="context">
      <h2>Context</h2>
      <p>This could include:</p>
      <ul>
        <li>the intended audience</li>
        <li>your skills or area of expertise</li>
        <li>your job role</li>
        <li>the tools, software, or equipment you have access to</li>
      </ul>
    </section>

    <section id="action">
      <h2>Action</h2>
      <p><strong>Use active verbs</strong> to describe the task. For example:</p>
      <ul>
        <li>act as&hellip;</li>
        <li>analyse&hellip;</li>
        <li>create&hellip;</li>
        <li>organise&hellip;</li>
        <li>summarise&hellip;</li>
      </ul>
      <p>
        <strong>Use &#8220;active criteria&#8221;</strong> over &#8220;negative constraints&#8221;. For example,
        &#8220;<em>include only details about the camera resolution, screen size, processor, and memory</em>&#8221;
        rather than &#8220;<em>do not include details about battery life, available apps, or charging capabilities</em>&#8221;.
      </p>
    </section>

    <section id="format">
      <h2>Format</h2>
      <p>This can include information such as:</p>
      <ul>
        <li><strong>tone</strong> (e.g. <em>use a professional tone</em>)</li>
        <li><strong>length</strong> (e.g. <em>keep it short and quick to read</em>)</li>
        <li><strong>medium</strong> (e.g. <em>in the medium of a business memo</em>)</li>
        <li><strong>layout</strong> (e.g. <em>use bullet points and clear headings</em>)</li>
      </ul>
    </section>

    <section id="examples">
      <h2>Examples</h2>
      <p>
        Provide <strong>two to five examples</strong> where possible. E.g. if you want to generate a social media
        post, provide examples of ones you like.
      </p>
    </section>

    <section id="iterate">
      <h2>Iterate</h2>
      <p>Iterate on the response. This could include:</p>
      <ul>
        <li>requesting a change in tone</li>
        <li>clarifying a point</li>
        <li>pointing out an error</li>
        <li>asking for a more concise output</li>
        <li>re-writing as a similar task</li>
      </ul>
    </section>

    <section id="example_prompts">
      <h2>Example Prompts</h2>
      <p>
        Here are three examples using the CAFE framework. The order of the CAFE elements doesn&#39;t matter.
      </p>

      <section>
        <h3>Garden Planning for Small Space</h3>
        <p class="example-prompt">
          <strong>Context:</strong> I live in a terraced house in Manchester with a north-facing garden that&#39;s
          approximately 3m x 5m. The space gets limited direct sunlight except on summer mornings. The soil is
          clay-heavy and tends to waterlog during winter months.<br/>
          <strong>Action:</strong> Design a low-maintenance garden plan that incorporates edible plants, year-round
          visual interest, and creates habitat for local wildlife like birds and pollinators.<br/>
          <strong>Format:</strong> Provide a visual layout description with seasonal planting recommendations. Include
          a short shopping list of essential plants and materials, and a monthly maintenance calendar.<br/>
          <strong>Examples:</strong> My neighbour created a successful small garden using raised beds to overcome poor
          drainage, and my sister incorporated vertical growing spaces with trellises to maximise her limited garden
          footprint.
        </p>
      </section>

      <section>
        <h3>Family History Research Strategy</h3>
        <p class="example-prompt">
          I&#39;m researching my family history and have hit a roadblock with my maternal great-grandfather. I know he
          was born around 1885 in Glasgow and worked as a shipbuilder, but I&#39;ve found conflicting information
          about his parents and siblings.<br/>
          Outline a systematic research strategy to verify his parentage and siblings. Recommend specific archives,
          databases, or resources I should consult.<br/>
          Create a detailed research plan organised by source type, with specific questions to investigate for each
          source. Include troubleshooting tips for common problems like name variations or missing records.<br/>
          When researching my paternal line, I successfully broke through a similar roadblock by examining church
          parish records and local newspaper archives for marriage announcements.
        </p>
      </section>

      <section>
        <h3>School Climate Change Presentation</h3>
        <p class="example-prompt">
          I&#39;m a volunteer at a local primary school and will be giving a 30-minute presentation to Year 4 pupils
          (ages 8-9) about climate change. Most children have some awareness of the topic but limited understanding
          of the science.<br/>
          Create an age-appropriate explanation of climate change with interactive elements to maintain engagement.
          Include key concepts that children should understand by the end.<br/>
          Structure the presentation with a simple introduction, 3-4 core concepts, and a hopeful conclusion with
          actions children can take. Include suggestions for simple demonstrations or activities that require minimal
          materials.<br/>
          Previous successful presentations to this age group have used the &#8220;greenhouse as a blanket&#8221;
          analogy and incorporated sorting activities where children categorised everyday actions as &#8220;helps
          the planet&#8221; or &#8220;harms the planet.&#8221;
        </p>
      </section>
    </section>

    <section id="faq">
      <h2>Frequently Asked Questions</h2>
      <h3>Do I need to use all four elements in every prompt?</h3>
      <p>
        No, not every prompt requires all four CAFE elements. The framework is a guideline, not a rigid formula.
        Simple questions might only need an <strong>Action</strong> (&#8220;Explain quantum computing&#8221;), whilst
        complex tasks benefit from combining multiple elements.
      </p>
      <h3>Which element is most important?</h3>
      <p>
        The <strong>Action</strong> is the most essential element - you must tell the AI what you want it to do.
        Beyond that, importance varies by task.
      </p>
    </section>

    <section id="conclusion">
      <h2>Conclusion</h2>
      <p>
        The <strong>CAFE framework</strong> provides a simple, memorable structure for crafting effective AI prompts.
        By systematically addressing Context, Action, Format, and Examples, you can significantly improve the quality
        and relevance of AI responses.
      </p>
      <p>
        For a comprehensive exploration of prompt engineering techniques and strategies, refer to the
        <a href="/ai/ai-prompt-engineering-guide">AI Prompt Engineering Guide</a>.
      </p>
    </section>
  </div>
</section>`,
  };
}
