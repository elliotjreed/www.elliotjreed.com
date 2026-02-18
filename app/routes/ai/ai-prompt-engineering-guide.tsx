import type { ReactElement } from "react";
import { Link } from "react-router";
import { HeadingAnchor } from "~/components/HeadingAnchor/HeadingAnchor";
import { PageHeader } from "~/components/PageHeader/PageHeader";
import { createBreadcrumbs, createTechArticle } from "~/data/schemaData";
import { createMeta } from "~/utils/seo";

export const meta = () => [
  ...createMeta({
    title: "AI Prompting Guide - Getting Started with Prompt Engineering | EJR",
    description:
      "A guide and introduction to prompt engineering techniques for AI LLMs such as ChatGPT, Claude, Gemini, and DeepSeek.",
    url: "https://www.elliotjreed.com/ai/ai-prompt-engineering-guide",
    type: "article",
    ogImage: "https://www.elliotjreed.com/og.png",
    twitterImage: "https://www.elliotjreed.com/twitter-card.png",
  }),
  {
    "script:ld+json": createTechArticle({
      url: "https://www.elliotjreed.com/ai/ai-prompt-engineering-guide",
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
  },
  {
    "script:ld+json": createBreadcrumbs([
      { name: "Home", url: "https://www.elliotjreed.com" },
      { name: "AI Guides", url: "https://www.elliotjreed.com/ai" },
      {
        name: "AI Prompting Guide",
        url: "https://www.elliotjreed.com/ai/ai-prompt-engineering-guide",
      },
    ]),
  },
  {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the difference between zero-shot and few-shot prompting?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Zero-shot prompting means asking the AI to perform a task without providing any examples. For instance, 'Summarise this article' with no example summaries. Few-shot prompting involves providing one or more examples of the desired output format or style before asking the AI to complete a similar task. Few-shot prompting typically produces more consistent and higher-quality results because the AI understands exactly what you're looking for.",
          },
        },
        {
          "@type": "Question",
          name: "How long should prompts be?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "There's no single ideal length - prompts should be as long as necessary to provide sufficient context and clarity. A simple task might only need one sentence, whilst complex tasks might require several paragraphs of context, detailed instructions, and examples. Focus on being concise whilst including all essential information. If you find your prompts becoming very long, consider breaking the task into smaller, sequential steps.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use these techniques with any AI model?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, the CAFE framework and prompt engineering principles work across different AI models including ChatGPT, Claude, Gemini, and DeepSeek. Whilst specific models may have unique strengths or respond better to certain phrasing, the fundamental principles of providing context, clear actions, format specifications, and examples remain effective regardless of which model you're using. Some experimentation may be needed to optimise for particular models.",
          },
        },
      ],
    },
  },
];

export default (): ReactElement => (
  <section className="divide-y divide-gray-200 dark:divide-gray-700">
    <PageHeader
      title="AI Prompting Guide"
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
        This is a brief "getting started" guide on how to get the most out of AI Assistants through effective "prompt
        engineering".
      </p>

      <p className="prose dark:prose-dark max-w-none text-lg leading-7 text-gray-600 dark:text-gray-300">
        You can find an easy-to-reference{" "}
        <Link
          to="/ai/cafe-ai-prompt-framework"
          prefetch="render"
          className="text-primary-700 dark:text-primary-500 underline"
        >
          simple guide here
        </Link>
        .
      </p>

      <p className="prose dark:prose-dark max-w-none text-lg leading-7 text-gray-600 dark:text-gray-300">
        You can listen to the audio version of this guide here:
        {/* biome-ignore lint/a11y/useMediaCaption: this guide is the text version of the audio */}
        <audio controls>
          <source
            src="https://www.elliotjreed.com/2025-05-03_ai-prompt-engineering-audio-guide.mp3"
            type="audio/mpeg"
          />
        </audio>
      </p>

      <aside className="leading-7 text-gray-600 dark:text-gray-300">
        <strong>Note:</strong> for this guide I shall use the term "<strong>AI Assistant</strong>" to refer to
        user-facing generative AI Large Language Model (LLM) applications such as <em>ChatGPT</em>, <em>Claude</em>,{" "}
        <em>Gemini</em>, and <em>DeepSeek</em>.
      </aside>
    </PageHeader>

    <div className="prose dark:prose-dark max-w-none">
      <section>
        <h2>Table of Contents</h2>
        <ul>
          <li>
            <a href="#what-is-prompt-engineering">What is "Prompt Engineering"?</a>
          </li>
          <li>
            <a href="#what-makes-good-prompt">What makes a good prompt?</a>
          </li>
          <li>
            <a href="#prompt-structure">What is a useful prompt structure?</a>
          </li>
          <li>
            <a href="#cafe-framework">CAFE Framework</a>
            <ul>
              <li>
                <a href="#context">Context</a>
              </li>
              <li>
                <a href="#action">Action</a>
              </li>
              <li>
                <a href="#format">Format</a>
              </li>
              <li>
                <a href="#examples">Examples</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#iterate">Iterate on the Output</a>
          </li>
          <li>
            <a href="#faq">Frequently Asked Questions</a>
          </li>
          <li>
            <a href="#conclusion">Conclusion</a>
          </li>
        </ul>
      </section>

      <section id="what-is-prompt-engineering">
        <h3>What is "Prompt Engineering"?</h3>
        <p>
          "<strong>Prompt Engineering</strong>" is the practice of crafting clear, structured instructions (prompts) to
          guide AI models towards producing your desired output. Think of it as learning how to communicate effectively
          with an AI assistant to get better, more accurate results.
        </p>
      </section>

      <section id="what-makes-good-prompt">
        <h3>What makes a good prompt?</h3>
        <p>
          A good prompt will be clear and concise. It will provide relevant background <strong>context</strong>,
          describe the <strong>action</strong> you want it to take, state the <strong>format</strong> you want the
          response to be in, and will often contain <strong>examples</strong> or references.
        </p>

        <p>
          One of my favourite quotes was from Anthropic's{" "}
          <a href="https://askell.io/?utm_source=www.elliotjreed.com" rel="noopener noreferrer" target="_blank">
            Amanda Askell
          </a>
          . Here's a rough paraphrasing of what she said:
        </p>

        <blockquote cite="https://www.youtube.com/watch?v=T9aRN5JkmL8&utm_source=www.elliotjreed.com">
          Imagine you've hired a temporary worker for a task.
          <br />
          They're skilled and knowledgeable about your industry, but they've just arrived and know nothing about your
          specific situation.
          <br />
          They ask, "I'm here to help - what would you like me to do?"
          <br />
          What instructions would you give this person to get the job done correctly?
        </blockquote>
      </section>

      <section id="prompt-structure">
        <h3>What is a useful prompt structure?</h3>
        <p>
          To help remember this we can use the mnemonic "<strong>CAFE</strong>":
          <br />
          <a href="#context">Context</a>
          <br />
          <a href="#action">Action</a>
          <br />
          <a href="#format">Format</a>
          <br />
          <a href="#examples">Examples</a>
        </p>
        <p>
          Remember, once you have a response you can <a href="#iterate">iterate on the output</a> with the AI Assistant.
        </p>
      </section>

      <section>
        <HeadingAnchor id="cafe-framework">CAFE Framework</HeadingAnchor>
        <p>
          Let's go through each of the elements of the CAFE framework. The order of the elements doesn't matter. The
          important things are <strong>clarity</strong> and <strong>simplicity</strong>: prompts should be clear and
          concise, using normal, natural language and sticking to relevant information.
        </p>

        <section id="context">
          <HeadingAnchor id="context" level={3}>
            Context
          </HeadingAnchor>
          <p>Provide background information relevant to the action you want the AI Assistant to perform.</p>

          <p>
            This could include context such as the intended audience, your skills, where you are located, or what
            equipment you have access to.
          </p>

          <p>Let's have a look at a bad example of a prompt without context, then a better one with context.</p>

          <section>
            <h4>Bad Example</h4>
            <p className="border-s-4 border-gray-200 px-4 italic dark:border-gray-700">Make a dinner party menu.</p>
          </section>

          <section>
            <h4>Better Example</h4>
            <p className="border-s-4 border-gray-200 px-4 italic dark:border-gray-700">
              I am hosting a Saturday evening dinner party for 12 people. I would like to prepare as much as possible in
              advance so I have time to socialise. Make a dinner party menu.
            </p>
          </section>
        </section>

        <section id="action">
          <HeadingAnchor id="action" level={3}>
            Action
          </HeadingAnchor>
          <p>Describe in detail the action you want to be completed by the AI Assistant.</p>

          <h4>Action Verbs</h4>
          <p>
            <strong>Use action verbs to describe the task</strong> you want completing.
          </p>
          <p>
            Here are some examples as provided by Google's{" "}
            <a
              href="https://www.kaggle.com/whitepaper-prompt-engineering?utm_source=www.elliotjreed.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              Lee Boonstra
            </a>
            :
          </p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            <li>Act</li>
            <li>Analyse</li>
            <li>Categorise</li>
            <li>Classify</li>
            <li>Contrast</li>
            <li>Compare</li>
            <li>Create</li>
            <li>Describe</li>
            <li>Define</li>
            <li>Evaluate</li>
            <li>Extract</li>
            <li>Find</li>
            <li>Generate</li>
            <li>Identify</li>
            <li>List</li>
            <li>Measure</li>
            <li>Organise</li>
            <li>Pick</li>
            <li>Predict</li>
            <li>Provide</li>
            <li>Rank</li>
            <li>Recommend</li>
            <li>Rewrite</li>
            <li>Select</li>
            <li>Sort</li>
            <li>Summarise</li>
            <li>Translate</li>
            <li>Write</li>
          </ul>

          <section>
            <h4>Provide positive criteria over negative constraints</h4>
            <p>
              As a general rule, tell the AI Assistant what to do rather than what not to do. That is to say, focus on{" "}
              <strong>positive criteria rather than negative constraints</strong>.
            </p>
            <p>
              For example, a positive criteria could be "<em>use vegan-friendly, plant-based ingredients</em>", whereas
              a negative constraint could be "<em>do not use meat, fish, eggs, or dairy</em>".
            </p>
            <p>
              For another example, a positive criteria could be "
              <em>be concise and use clear section headings and subheadings for easy referencing</em>", as opposed to
              negative constraints such as "<em>do not use long sentences and large blocks of text</em>".
            </p>
          </section>

          <section>
            <h4>Bad Example</h4>
            <p className="border-s-4 border-gray-200 px-4 italic dark:border-gray-700">
              I need a dinner party menu. Don't include meat, fish, eggs, or dairy. Don't use ingredients which are
              difficult to find.
            </p>
          </section>

          <section>
            <h4>Better Example</h4>
            <p className="border-s-4 border-gray-200 px-4 italic dark:border-gray-700">
              Create a dinner party menu using plant-based ingredients suitable for vegans. The ingredients should be
              easily available in Britain.
            </p>
          </section>
        </section>

        <section id="format">
          <HeadingAnchor id="format" level={3}>
            Format
          </HeadingAnchor>
          <p>The more specific you can be about the output format the better.</p>
          <p>This can include information such as:</p>
          <ul>
            <li>
              tone (eg. <em>humorous</em> or <em>formal</em>)
            </li>
            <li>
              length (eg. <em>in-depth</em> or <em>fit on one side of A4 paper</em>)
            </li>
            <li>
              medium (eg. <em>PowerPoint presentation slides</em> or <em>easy to reference note</em>)
            </li>
            <li>
              layout (eg. <em>bullet points</em> or <em>descriptive paragraphs</em>)
            </li>
          </ul>

          <section>
            <h4>Example</h4>
            <p className="border-s-4 border-gray-200 px-4 italic dark:border-gray-700">
              The menu should be concise and easy to reference, making use of clear sections headed by the time the
              different elements need attention.
            </p>
          </section>
        </section>

        <section id="examples">
          <HeadingAnchor id="examples" level={3}>
            Examples
          </HeadingAnchor>
          <p>
            Providing examples can be key to getting a good output. The sweet spot is around{" "}
            <strong>two to five examples</strong> in what is called "few shot" prompting. By contrast providing one
            example is called "one shot" prompting, and no examples is called "zero shot" prompting.
          </p>

          <section>
            <h4>Example</h4>
            <p className="border-s-4 border-gray-200 px-4 italic dark:border-gray-700">
              On two previous occasions, the meals I cooked went down really well with guests. The first was a dish
              based around crispy sesame tofu with a peanut sauce; and the second was a red wine mushroom bourguignon.
            </p>
          </section>

          <section>
            <h4>Formatting examples</h4>

            <p>
              It is important to make it clear that the examples are examples. Most of the time it should be quite
              clear, however you can make it really specific by using XML tags. For example:
            </p>

            <p className="border-s-4 border-gray-200 px-4 italic dark:border-gray-700">
              Here are examples of previous menu items which have been popular:
              <br />
              &lt;example&gt;Vegan Scallops with Paprika Sauce&lt;/example&gt;
              <br />
              &lt;example&gt;Potato Cream with Caramelised Leek &amp; Saffron&lt;/example&gt;
              <br />
              &lt;example&gt;Broccoli with Black Garlic &amp; Olive Dressing&lt;/example&gt;
            </p>
          </section>
        </section>

        <section id="complete_example">
          <HeadingAnchor id="complete_example" level={3}>
            Putting it all together
          </HeadingAnchor>
          <section>
            <h4>Dinner party prompt</h4>
            <p>
              We started with a basic bad example prompt of "<em>make a dinner party menu</em>". Using the CAFE
              framework we could engineer our prompt to provide a much better output.
            </p>

            <p className="border-s-4 border-gray-200 px-4 italic dark:border-gray-700">
              I am hosting a Saturday evening dinner party for 12 people. I would like to prepare as much as possible in
              advance so I have time to socialise.
              <br />
              Create a dinner party menu using plant-based ingredients suitable for vegans. The ingredients should be
              easily available in Britain.
              <br />
              The menu should be concise and easy to reference, making use of clear sections headed by the time the
              different elements need attention.
              <br />
              On two previous occasions, the meals I cooked went down really well with guests. The first was a dish
              based around crispy sesame tofu with a peanut sauce; and the second was a red wine mushroom bourguignon.
            </p>
          </section>

          <section>
            <h4>Book recommendation prompt</h4>
            <p>For another example, here's a prompt I used recently to find new books to read before sleep.</p>

            <p className="border-s-4 border-gray-200 px-4 italic dark:border-gray-700">
              I'm looking for some book recommendations, in particular ones which I can read before going to bed.
              <br />
              For this I would prefer shorter novels, or short stories.
              <br />I particularly enjoy books which make me think a bit about deeper subjects like philosophy,
              politics, ethics, religion, culture, and the societal impacts of future technology.
              <br />
              Recently I have enjoyed Ishmael by Daniel Quinn, The Paper Menagerie collection of short stories by Ken
              Lui, Spin by Robert Charles Wilson, and The First Fifteen Lives of Harry August by Claire North as bedtime
              reads. Other books I have enjoyed, though not for bedtime reading, have been the Dune novels by Frank
              Herbert, Project Hail Mary by Andy Weir, Children of Time by Adrian Tchaikovsky, The Handmaid's Tale and
              The Testaments by Margaret Atwood, and the Three Body Problem trilogy by Liu Cixin. Provide me with 10
              book suggestions, each with a one line description of why you think the suggestion fits.
            </p>
          </section>
        </section>

        <section id="iterate">
          <HeadingAnchor id="iterate" level={3}>
            Iterate
          </HeadingAnchor>
          <p>
            Once you have entered your initial prompt and received a response, evaluate it to see if the response meets
            your requirements. Hopefully your initial prompt will be good enough that you can follow up, if not then
            some re-writing of the prompt might be required.
          </p>

          <section>
            <h4>Following up</h4>
            <p>
              If the response is close to meeting your requirements, you can discuss the response with the AI Assistant.
              This might be requesting a change, clarifying what you meant, or asking for further information.
            </p>

            <section>
              <h5>Example</h5>
              <p className="border-s-4 border-gray-200 px-4 italic dark:border-gray-700">
                That plan looks good in general, however one of the guests has a severe allergy to tomatoes. Update the
                menu to account for that.
                <br />
                Additionally, suggest some wine and other drinks which would pair well.
              </p>
            </section>
          </section>

          <section>
            <h4>Re-writing</h4>
            <p>
              If the response is quite far off what you would like, you can try rewriting the prompt using one or more
              of the following techniques:
            </p>

            <ul>
              <li>
                ensure the CAFE framework is followed, in particular by adding better examples or including more
                positive criteria
              </li>
              <li>
                break the prompt down into smaller tasks, following up with each smaller task after the first response
                from the AI Assistant
              </li>
              <li>changing to an analogous or synonymous task by rephrasing in a different context</li>
            </ul>

            <section>
              <section>
                <h5>Example: Revisiting the CAFE framework</h5>

                <p className="border-s-4 border-gray-200 px-4 italic dark:border-gray-700">
                  That looks good, however some of those ingredients will be difficult to find. Update the menu to
                  include ingredients easily available from standard British supermarkets, such as Tesco and ASDA.
                </p>
              </section>

              <section>
                <h5>Example: Breaking the prompt down into smaller tasks</h5>

                <div className="border-s-4 border-gray-200 px-4 italic dark:border-gray-700">
                  <ol>
                    <li className="italic">
                      I am hosting a Saturday evening dinner party for 12 people. I would like to prepare as much as
                      possible in advance so I have time to socialise.
                      <br />
                      Create a main course recipe using plant-based ingredients suitable for vegans. The ingredients
                      should be easily available in Britain.
                      <br />
                      The recipe should be concise and easy to reference, making use of clear sections headed by the
                      time the different elements need attention.
                      <br />
                      On two previous occasions, the meals I cooked went down really well with guests. The first was a
                      dish based around crispy sesame tofu with a peanut sauce; and the second was a red wine mushroom
                      bourguignon.
                    </li>

                    <li>Can you now create a vegan starter that would go well before this main.</li>

                    <li>Could you now create a vegan dessert that would finish off the meal nicely?</li>
                  </ol>
                </div>
              </section>

              <section>
                <h5>Example: Changing to an analogous or synonymous task</h5>

                <p className="border-s-4 border-gray-200 px-4 italic dark:border-gray-700">
                  I would like you to take on the role of a diligent and respectful dinner party host who is hosting a
                  Saturday evening dinner party for 12 people. In this role you would want to spend as much time in the
                  company of the guests, and prepare food suitable for all.
                  <br />
                  The food should use ingredients easily available in the United Kingdom, and be suitable for vegans.
                  <br />
                  The menu should be concise and easy to reference, making use of clear sections headed by the time the
                  different elements need attention.
                  <br />
                  Past successful dinner parties included on the menu: a dish based around crispy sesame tofu with a
                  peanut sauce; and a red wine mushroom bourguignon.
                </p>
              </section>
            </section>
          </section>
        </section>

        <section>
          <HeadingAnchor id="faq" level={2}>
            Frequently Asked Questions
          </HeadingAnchor>

          <h3>What is the difference between zero-shot and few-shot prompting?</h3>
          <p>
            <strong>Zero-shot prompting</strong> means asking the AI to perform a task without providing any examples.
            For instance, "Summarise this article" with no example summaries. <strong>Few-shot prompting</strong>{" "}
            involves providing one or more examples of the desired output format or style before asking the AI to
            complete a similar task. Few-shot prompting typically produces more consistent and higher-quality results
            because the AI understands exactly what you're looking for.
          </p>

          <h3>How long should prompts be?</h3>
          <p>
            There's no single ideal length - prompts should be as long as necessary to provide sufficient context and
            clarity. A simple task might only need one sentence, whilst complex tasks might require several paragraphs
            of context, detailed instructions, and examples. Focus on being concise whilst including all essential
            information. If you find your prompts becoming very long, consider breaking the task into smaller,
            sequential steps.
          </p>

          <h3>Can I use these techniques with any AI model?</h3>
          <p>
            Yes, the CAFE framework and prompt engineering principles work across different AI models including ChatGPT,
            Claude, Gemini, and DeepSeek. Whilst specific models may have unique strengths or respond better to certain
            phrasing, the fundamental principles of providing context, clear actions, format specifications, and
            examples remain effective regardless of which model you're using. Some experimentation may be needed to
            optimise for particular models.
          </p>
        </section>

        <section>
          <HeadingAnchor id="conclusion" level={2}>
            Conclusion
          </HeadingAnchor>

          <p>
            Effective prompt engineering transforms AI interactions from simple questions to powerful collaborations. By
            applying the <strong>CAFE framework</strong> (Context, Action, Format, Examples), you can consistently
            generate more accurate, relevant, and useful responses from AI Assistants.
          </p>

          <p>Key takeaways:</p>
          <ul>
            <li>Provide comprehensive context to ground the AI's understanding</li>
            <li>Specify clear actions using precise verbs and role-based instructions</li>
            <li>Define exact output formats to match your needs</li>
            <li>Use examples to demonstrate expectations and improve quality</li>
          </ul>

          <p>
            Start by experimenting with one technique at a time. As you become comfortable, combine multiple strategies
            to craft increasingly sophisticated prompts. The more specific and thoughtful your prompts, the more
            valuable the AI's assistance becomes.
          </p>

          <p>
            For a quick reference guide, check out the{" "}
            <Link
              to="/ai/cafe-ai-prompt-framework"
              prefetch="render"
              className="text-primary-700 dark:text-primary-500 underline"
            >
              CAFE AI Prompt Framework
            </Link>
            .
          </p>
        </section>
      </section>
    </div>
  </section>
);
