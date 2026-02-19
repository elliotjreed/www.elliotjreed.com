import { createBreadcrumbs, createTechArticle } from "../../../app/data/schemaData.js";
import type { AmpPageData } from "../../layout.js";

const PAGE_URL = "https://www.elliotjreed.com/ai/ai-prompt-engineering-guide";

export function renderPage(): AmpPageData {
  return {
    title: "AI Prompting Guide - Getting Started with Prompt Engineering | EJR",
    description:
      "A guide and introduction to prompt engineering techniques for AI LLMs such as ChatGPT, Claude, Gemini, and DeepSeek.",
    canonicalPath: "/ai/ai-prompt-engineering-guide",
    type: "article",
    schemas: [
      createTechArticle({
        url: PAGE_URL,
        headline: "AI Prompting Guide - Getting Started with Prompt Engineering",
        description:
          "A guide and introduction to prompt engineering techniques for AI LLMs such as ChatGPT, Claude, Gemini, and DeepSeek.",
        datePublished: "2025-04-20T13:09:43+01:00",
        dateModified: "2026-01-30T00:00:00+00:00",
        articleSection: "AI",
        keywords: ["AI", "prompt engineering", "LLM", "ChatGPT", "Claude", "Gemini", "DeepSeek"],
        wordCount: 2254,
        proficiencyLevel: "Beginner",
      }),
      createBreadcrumbs([
        { name: "Home", url: "https://www.elliotjreed.com" },
        { name: "AI Guides", url: "https://www.elliotjreed.com/ai" },
        { name: "AI Prompting Guide", url: PAGE_URL },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is the difference between zero-shot and few-shot prompting?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Zero-shot prompting means asking the AI to perform a task without providing any examples. Few-shot prompting involves providing one or more examples of the desired output format or style before asking the AI to complete a similar task.",
            },
          },
          {
            "@type": "Question",
            name: "How long should prompts be?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "There's no single ideal length - prompts should be as long as necessary to provide sufficient context and clarity. Focus on being concise whilst including all essential information.",
            },
          },
          {
            "@type": "Question",
            name: "Can I use these techniques with any AI model?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, the CAFE framework and prompt engineering principles work across different AI models including ChatGPT, Claude, Gemini, and DeepSeek.",
            },
          },
        ],
      },
    ],
    body: `<section class="page-section">
  <div class="page-header">
    <h1 class="page-title">AI Prompting Guide</h1>
    <div class="page-meta">
      <span>By Elliot J. Reed</span>
      <span>&#8226;</span>
      <time datetime="2025-04-20">Published: 20th April 2025</time>
      <span>&#8226;</span>
      <time datetime="2026-01-30">Last updated: 30th January 2026</time>
    </div>
    <p class="page-intro">
      This is a brief &#8220;getting started&#8221; guide on how to get the most out of AI Assistants through effective
      &#8220;prompt engineering&#8221;.
    </p>
    <p class="page-intro">
      You can find an easy-to-reference <a href="/ai/cafe-ai-prompt-framework">simple guide here</a>.
    </p>
    <aside class="page-intro">
      <strong>Note:</strong> for this guide I shall use the term &#8220;<strong>AI Assistant</strong>&#8221; to refer to
      user-facing generative AI Large Language Model (LLM) applications such as <em>ChatGPT</em>, <em>Claude</em>,
      <em>Gemini</em>, and <em>DeepSeek</em>.
    </aside>
  </div>
  <div class="prose">
    <section>
      <h2>Table of Contents</h2>
      <ul>
        <li><a href="#what-is-prompt-engineering">What is &#8220;Prompt Engineering&#8221;?</a></li>
        <li><a href="#what-makes-good-prompt">What makes a good prompt?</a></li>
        <li><a href="#prompt-structure">What is a useful prompt structure?</a></li>
        <li>
          <a href="#cafe-framework">CAFE Framework</a>
          <ul>
            <li><a href="#context">Context</a></li>
            <li><a href="#action">Action</a></li>
            <li><a href="#format">Format</a></li>
            <li><a href="#examples">Examples</a></li>
          </ul>
        </li>
        <li><a href="#iterate">Iterate on the Output</a></li>
        <li><a href="#faq">Frequently Asked Questions</a></li>
        <li><a href="#conclusion">Conclusion</a></li>
      </ul>
    </section>

    <section id="what-is-prompt-engineering">
      <h2>What is &#8220;Prompt Engineering&#8221;?</h2>
      <p>
        &#8220;<strong>Prompt Engineering</strong>&#8221; is the practice of crafting clear, structured instructions
        (prompts) to guide AI models towards producing your desired output. Think of it as learning how to communicate
        effectively with an AI assistant to get better, more accurate results.
      </p>
    </section>

    <section id="what-makes-good-prompt">
      <h2>What makes a good prompt?</h2>
      <p>
        A good prompt will be clear and concise. It will provide relevant background <strong>context</strong>,
        describe the <strong>action</strong> you want it to take, state the <strong>format</strong> you want the
        response to be in, and will often contain <strong>examples</strong> or references.
      </p>
      <p>
        One of my favourite quotes was from Anthropic&#39;s
        <a href="https://askell.io/" rel="noopener noreferrer" target="_blank">Amanda Askell</a>.
        Here&#39;s a rough paraphrasing of what she said:
      </p>
      <blockquote>
        Imagine you&#39;ve hired a temporary worker for a task.<br/>
        They&#39;re skilled and knowledgeable about your industry, but they&#39;ve just arrived and know nothing about
        your specific situation.<br/>
        They ask, &#8220;I&#39;m here to help - what would you like me to do?&#8221;<br/>
        What instructions would you give this person to get the job done correctly?
      </blockquote>
    </section>

    <section id="prompt-structure">
      <h2>What is a useful prompt structure?</h2>
      <p>
        To help remember this we can use the mnemonic &#8220;<strong>CAFE</strong>&#8221;:<br/>
        <a href="#context">Context</a><br/>
        <a href="#action">Action</a><br/>
        <a href="#format">Format</a><br/>
        <a href="#examples">Examples</a>
      </p>
      <p>Remember, once you have a response you can <a href="#iterate">iterate on the output</a> with the AI Assistant.</p>
    </section>

    <section id="cafe-framework">
      <h2>CAFE Framework</h2>
      <p>
        Let&#39;s go through each of the elements of the CAFE framework. The order of the elements doesn&#39;t matter.
        The important things are <strong>clarity</strong> and <strong>simplicity</strong>: prompts should be clear and
        concise, using normal, natural language and sticking to relevant information.
      </p>

      <section id="context">
        <h3>Context</h3>
        <p>Provide background information relevant to the action you want the AI Assistant to perform.</p>
        <p>
          This could include context such as the intended audience, your skills, where you are located, or what
          equipment you have access to.
        </p>
        <h4>Bad Example</h4>
        <p class="example-prompt">Make a dinner party menu.</p>
        <h4>Better Example</h4>
        <p class="example-prompt">
          I am hosting a Saturday evening dinner party for 12 people. I would like to prepare as much as possible in
          advance so I have time to socialise. Make a dinner party menu.
        </p>
      </section>

      <section id="action">
        <h3>Action</h3>
        <p>Describe in detail the action you want to be completed by the AI Assistant.</p>
        <h4>Action Verbs</h4>
        <p><strong>Use action verbs to describe the task</strong> you want completing. For example:</p>
        <ul>
          <li>Act</li><li>Analyse</li><li>Categorise</li><li>Classify</li><li>Contrast</li>
          <li>Compare</li><li>Create</li><li>Describe</li><li>Define</li><li>Evaluate</li>
          <li>Extract</li><li>Find</li><li>Generate</li><li>Identify</li><li>List</li>
          <li>Measure</li><li>Organise</li><li>Pick</li><li>Predict</li><li>Provide</li>
          <li>Rank</li><li>Recommend</li><li>Rewrite</li><li>Select</li><li>Sort</li>
          <li>Summarise</li><li>Translate</li><li>Write</li>
        </ul>
        <h4>Provide positive criteria over negative constraints</h4>
        <p>
          As a general rule, tell the AI Assistant what to do rather than what not to do. That is to say, focus on
          <strong>positive criteria rather than negative constraints</strong>.
        </p>
        <h4>Bad Example</h4>
        <p class="example-prompt">
          I need a dinner party menu. Don&#39;t include meat, fish, eggs, or dairy. Don&#39;t use ingredients which
          are difficult to find.
        </p>
        <h4>Better Example</h4>
        <p class="example-prompt">
          Create a dinner party menu using plant-based ingredients suitable for vegans. The ingredients should be
          easily available in Britain.
        </p>
      </section>

      <section id="format">
        <h3>Format</h3>
        <p>The more specific you can be about the output format the better. This can include information such as:</p>
        <ul>
          <li>tone (e.g. <em>humorous</em> or <em>formal</em>)</li>
          <li>length (e.g. <em>in-depth</em> or <em>fit on one side of A4 paper</em>)</li>
          <li>medium (e.g. <em>PowerPoint presentation slides</em> or <em>easy to reference note</em>)</li>
          <li>layout (e.g. <em>bullet points</em> or <em>descriptive paragraphs</em>)</li>
        </ul>
        <h4>Example</h4>
        <p class="example-prompt">
          The menu should be concise and easy to reference, making use of clear sections headed by the time the
          different elements need attention.
        </p>
      </section>

      <section id="examples">
        <h3>Examples</h3>
        <p>
          Providing examples can be key to getting a good output. The sweet spot is around
          <strong>two to five examples</strong> in what is called &#8220;few shot&#8221; prompting.
        </p>
        <h4>Example</h4>
        <p class="example-prompt">
          On two previous occasions, the meals I cooked went down really well with guests. The first was a dish
          based around crispy sesame tofu with a peanut sauce; and the second was a red wine mushroom bourguignon.
        </p>
      </section>

      <section id="complete_example">
        <h3>Putting it all together</h3>
        <h4>Dinner party prompt</h4>
        <p class="example-prompt">
          I am hosting a Saturday evening dinner party for 12 people. I would like to prepare as much as possible
          in advance so I have time to socialise.<br/>
          Create a dinner party menu using plant-based ingredients suitable for vegans. The ingredients should be
          easily available in Britain.<br/>
          The menu should be concise and easy to reference, making use of clear sections headed by the time the
          different elements need attention.<br/>
          On two previous occasions, the meals I cooked went down really well with guests. The first was a dish
          based around crispy sesame tofu with a peanut sauce; and the second was a red wine mushroom bourguignon.
        </p>
        <h4>Book recommendation prompt</h4>
        <p class="example-prompt">
          I&#39;m looking for some book recommendations, in particular ones which I can read before going to bed.<br/>
          For this I would prefer shorter novels, or short stories.<br/>
          I particularly enjoy books which make me think a bit about deeper subjects like philosophy, politics,
          ethics, religion, culture, and the societal impacts of future technology.<br/>
          Recently I have enjoyed Ishmael by Daniel Quinn, The Paper Menagerie collection of short stories by Ken
          Lui, Spin by Robert Charles Wilson, and The First Fifteen Lives of Harry August by Claire North as bedtime
          reads. Provide me with 10 book suggestions, each with a one line description of why you think the
          suggestion fits.
        </p>
      </section>

      <section id="iterate">
        <h3>Iterate</h3>
        <p>
          Once you have entered your initial prompt and received a response, evaluate it to see if the response
          meets your requirements.
        </p>
        <h4>Following up</h4>
        <p>
          If the response is close to meeting your requirements, you can discuss the response with the AI Assistant.
          This might be requesting a change, clarifying what you meant, or asking for further information.
        </p>
        <h5>Example</h5>
        <p class="example-prompt">
          That plan looks good in general, however one of the guests has a severe allergy to tomatoes. Update the
          menu to account for that.<br/>
          Additionally, suggest some wine and other drinks which would pair well.
        </p>
        <h4>Re-writing</h4>
        <p>If the response is quite far off what you would like, you can try rewriting the prompt using one or more of the following techniques:</p>
        <ul>
          <li>ensure the CAFE framework is followed, in particular by adding better examples or including more positive criteria</li>
          <li>break the prompt down into smaller tasks, following up with each smaller task after the first response</li>
          <li>changing to an analogous or synonymous task by rephrasing in a different context</li>
        </ul>
      </section>
    </section>

    <section id="faq">
      <h2>Frequently Asked Questions</h2>
      <h3>What is the difference between zero-shot and few-shot prompting?</h3>
      <p>
        <strong>Zero-shot prompting</strong> means asking the AI to perform a task without providing any examples.
        <strong>Few-shot prompting</strong> involves providing one or more examples of the desired output format or
        style before asking the AI to complete a similar task. Few-shot prompting typically produces more consistent
        and higher-quality results.
      </p>
      <h3>How long should prompts be?</h3>
      <p>
        There&#39;s no single ideal length - prompts should be as long as necessary to provide sufficient context
        and clarity. Focus on being concise whilst including all essential information.
      </p>
      <h3>Can I use these techniques with any AI model?</h3>
      <p>
        Yes, the CAFE framework and prompt engineering principles work across different AI models including ChatGPT,
        Claude, Gemini, and DeepSeek.
      </p>
    </section>

    <section id="conclusion">
      <h2>Conclusion</h2>
      <p>
        Effective prompt engineering transforms AI interactions from simple questions to powerful collaborations. By
        applying the <strong>CAFE framework</strong> (Context, Action, Format, Examples), you can consistently
        generate more accurate, relevant, and useful responses from AI Assistants.
      </p>
      <ul>
        <li>Provide comprehensive context to ground the AI&#39;s understanding</li>
        <li>Specify clear actions using precise verbs and role-based instructions</li>
        <li>Define exact output formats to match your needs</li>
        <li>Use examples to demonstrate expectations and improve quality</li>
      </ul>
      <p>
        For a quick reference guide, check out the
        <a href="/ai/cafe-ai-prompt-framework">CAFE AI Prompt Framework</a>.
      </p>
    </section>
  </div>
</section>`,
  };
}
