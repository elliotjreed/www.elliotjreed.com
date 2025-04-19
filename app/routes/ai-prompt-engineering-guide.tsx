export const meta = () => [
  { title: "AI Prompting Guide" },
  {
    name: "description",
    content:
      "An guide and introduction to prompt engineering techniques for AI LLMs such as ChatGPT, CLaude, Gemini, and DeepSeek.",
  },
];

export default function Index() {
  return (
    <section className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          AI Prompting Guide
        </h1>

        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          This is a brief guide on how to get the most out of AI Assistants through effective "prompt engineering".
        </p>

        <aside className="leading-7 text-gray-500 dark:text-gray-400">
          <strong>Note:</strong> for this guide I shall use the term "<strong>AI Assistant</strong>" to refer to
          user-facing generative AI Large Language Model (LLM) applications such as <em>ChatGPT</em>, <em>Claude</em>,{" "}
          <em>Gemini</em>, and <em>DeepSeek</em>.
        </aside>
      </div>

      <div className="prose max-w-none dark:prose-dark">
        <section>
          <h3>What is "Prompt Engineering"?</h3>
          <p>
            "<strong>Prompt Engineering</strong>" is the practice of crafting instructions (prompts) to guide generative
            AI models towards producing the desired output.
          </p>

          <p>
            Prompt engineering is like giving directions to a helpful but unfamiliar visitor.
            <br />
            Just as clear directions help someone navigate to the right destination, well-crafted prompts guide AI
            assistants to produce the results you want.
            <br />
            The better your directions, the more likely you'll get exactly what you're looking for.
          </p>
        </section>

        <section>
          <h3>What makes a good prompt?</h3>
          <p>
            A good prompt will be clear and concise. It will provide relevant background <strong>context</strong>,
            describe the <strong>action</strong> you want it to take, state the <strong>format</strong> you want the
            response to be in, and will often contain <strong>examples</strong> or references.
          </p>

          <p>
            One of my favourite quotes was from{" "}
            <a href="https://askell.io/?utm_source=www.elliotjreed.com" rel="noopener noreferrer" target="_blank">
              Amanda Askell
            </a>{" "}
            in a{" "}
            <a
              href="https://www.youtube.com/watch?v=T9aRN5JkmL8&utm_source=www.elliotjreed.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              YouTube video
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

        <section>
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
            Remember, once you have a <a href="#complete_example">response</a> you can{" "}
            <a href="#iterate">iterate and discuss</a> the output with the AI Assistant.
          </p>
        </section>

        <section>
          <h2>CAFE Framework</h2>
          <p>
            Let's go through each of the elements of the CAFE framework. The order of the elements doesn't matter. The
            important things are <strong>clarity</strong> and <strong>simplicity</strong>: prompts should be clear and
            concise, using normal, natural language and sticking to relevant information.
          </p>

          <section id="context">
            <h3>Context</h3>
            <p>Provide background information relevant to the action you want to AI Assistant to perform.</p>

            <p>
              This could include context such as the intended audience, your skills, where you are located, or what
              equipment you have access to.
            </p>

            <p>Let's have a look at a bad example of a prompt without context, then a better one with context.</p>

            <section>
              <h4>Bad Example</h4>
              <p className="italic">Make a dinner party menu.</p>
            </section>

            <section>
              <h4>Better Example</h4>
              <p className="italic">
                I am hosting a Saturday evening dinner party for 12 people. I would like to prepare as much as possible
                in advance so I have time to socialise. Make a dinner party menu.
              </p>
            </section>
          </section>

          <section id="action">
            <h3>Action</h3>
            <p>Describe in detail the action you want to be completed by the AI Assistant.</p>

            <h4>Action Verbs</h4>
            <p>
              <strong>Use action verbs to describe the task</strong> you want completing.
            </p>
            <p>
              Here are some examples as provided by{" "}
              <a
                href="https://www.kaggle.com/whitepaper-prompt-engineering?utm_source=www.elliotjreed.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                Prompt Engineering by Lee Boonstra
              </a>
              :
            </p>
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-1">
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
              <li>Parse</li>
              <li>Pick</li>
              <li>Predict</li>
              <li>Provide</li>
              <li>Rank</li>
              <li>Recommend</li>
              <li>Return</li>
              <li>Retrieve</li>
              <li>Rewrite</li>
              <li>Select</li>
              <li>Show</li>
              <li>Sort</li>
              <li>Summarise</li>
              <li>Translate</li>
              <li>Write</li>
            </ul>

            <section>
              <h4>Provide positive instructions</h4>
              <p>
                As a general rule, tell the AI Assistant what to do rather than what not to do. That is to say,{" "}
                <strong>focus on explicit instructions rather than constraints</strong>.
              </p>
              <p>
                For example, an explicit instruction could be "<em>use vegan-friendly, plant-based ingredients</em>",
                whereas a constraint could be "<em>do not use meat, fish, eggs, or dairy</em>".
              </p>
            </section>

            <section>
              <h4>Bad Example</h4>
              <p className="italic">
                I need a dinner party menu. Don't include meat, fish, eggs, or dairy. Don't use ingredients which are
                difficult to find.
              </p>
            </section>

            <section>
              <h4>Better Example</h4>
              <p className="italic">
                Create a dinner party menu using plant-based ingredients suitable for vegans. The ingredients should be
                easily available from standard British supermarkets.
              </p>
            </section>
          </section>

          <section id="format">
            <h3>Format</h3>
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
              <p className="italic">
                The menu should be concise and easy to reference, making use of clear sections headed by the time the
                different elements need attention.
              </p>
            </section>
          </section>

          <section id="examples">
            <h3>Examples</h3>
            <p>
              Providing examples can be key to getting a good output. The sweet spot is around{" "}
              <strong>two to five examples</strong> in what is called "few shot" prompting. By contrast providing one
              example is called "one shot" prompting, and no examples is called "zero shot" prompting.
            </p>

            <section>
              <h4>Example</h4>
              <p className="italic">
                On two previous occasions, the meals I cooked went down really well with guests. The first was a dish
                based around crispy sesame tofu with a peanut sauce; and the second was a red wine mushroom bourguignon.
              </p>
            </section>
          </section>

          <section id="complete_example">
            <h4>Putting it all together</h4>
            <section>
              <h5>Dinner party prompt</h5>
              <p>
                We started with a basic bad example prompt of "<em>make a dinner party menu</em>". Using the CAFE
                framework we could engineer our prompt to provide a much better output.
              </p>
              <p className="italic">
                I am hosting a Saturday evening dinner party for 12 people. I would like to prepare as much as possible
                in advance so I have time to socialise.
                <br />
                Create a dinner party menu using plant-based ingredients suitable for vegans. The ingredients should be
                easily available from standard British supermarkets.
                <br />
                The menu should be concise and easy to reference, making use of clear sections headed by the time the
                different elements need attention.
                <br />
                On two previous occasions, the meals I cooked went down really well with guests. The first was a dish
                based around crispy sesame tofu with a peanut sauce; and the second was a red wine mushroom bourguignon.
              </p>
            </section>

            <section>
              <h5>Book recommendation prompt</h5>
              <p>For another example, here's a prompt I used recently to find new books to read at bedtime.</p>
              <p className="italic">
                I'm looking for some book recommendations, in particular ones which I can read before going to bed.
                <br />
                For this I would prefer shorter novels, or short stories.
                <br />I particularly enjoy books which make me think a bit about deeper subjects like philosophy,
                politics, ethics, religion, and culture.
                <br />
                Recently I have enjoyed Ishmael by Daniel Quinn as a bedtime read. Other books I have enjoyed, though
                not for bedtime reading, have been the Dune novels, Project Hail Mary, Philip Pullman's His Dark
                Materials books, Ken Follett's Kingsbridge novels, and the Three Body Problem trilogy. Provide me with
                10 book suggestions, each with a one line description of why you think the suggestion fits.
              </p>
            </section>
          </section>

          <section id="iterate">
            <h3>Iterate</h3>
            <p>
              Once you have entered your initial prompt, you can discuss it with the AI Assistant. This might be
              requesting a change, clarifying what you meant, or asking for further information.
            </p>

            <section>
              <h4>Examples</h4>

              <section>
                <h5>The dinner party prompt</h5>
                <p className="italic">
                  That plan looks good in general, however one of the guests has a severe allergy to tomatoes. Can you
                  update the menu to account for that?
                  <br />
                  Could you also suggest some wine and other drinks which would pair well?
                </p>
              </section>
            </section>

            <section>
              <h5>The book recommendation prompt</h5>
              <p className="italic">
                Thanks! I'm almost finished reading The Paper Menagerie and Other Stories by Ken Liu and am really
                enjoying that. Could you suggest three more books which are collections of short stories drawing upon
                similar themes and ideas?
              </p>
            </section>
          </section>
        </section>
      </div>
    </section>
  );
}
