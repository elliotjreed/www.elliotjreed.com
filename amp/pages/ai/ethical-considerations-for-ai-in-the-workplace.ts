import { createBreadcrumbs, createTechArticle } from "../../../app/data/schemaData.js";
import type { AmpPageData } from "../../layout.js";

const PAGE_URL = "https://www.elliotjreed.com/ai/ethical-considerations-for-ai-in-the-workplace";

export function renderPage(): AmpPageData {
  return {
    title: "Ethical Considerations for AI in the Workplace | EJR",
    description:
      "A comprehensive guide to using AI responsibly in the workplace, covering ethical concerns, environmental impact, and practical implementation strategies.",
    canonicalPath: "/ai/ethical-considerations-for-ai-in-the-workplace",
    type: "article",
    schemas: [
      createTechArticle({
        url: PAGE_URL,
        headline: "Ethical Considerations for AI in the Workplace",
        description:
          "A comprehensive guide to using AI responsibly in the workplace, covering ethical concerns, environmental impact, and practical implementation strategies.",
        datePublished: "2026-01-31T00:00:00+00:00",
        articleSection: "AI",
        keywords: [
          "AI",
          "artificial intelligence",
          "workplace ethics",
          "AI ethics",
          "responsible AI",
          "AI environmental impact",
          "AI in business",
          "employee AI training",
        ],
        wordCount: 4800,
        proficiencyLevel: "Beginner",
      }),
      createBreadcrumbs([
        { name: "Home", url: "https://www.elliotjreed.com" },
        { name: "AI Guides", url: "https://www.elliotjreed.com/ai" },
        { name: "Ethical Considerations for AI in the Workplace", url: PAGE_URL },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Will AI replace jobs in my workplace?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Whilst some roles may change, historical trends suggest new jobs are created when others are transformed by technology. AI is more likely to change how we work rather than eliminate jobs entirely. Entry-level positions in data entry and administrative work may be more affected, but AI typically augments human work rather than replacing it completely.",
            },
          },
          {
            "@type": "Question",
            name: "How much energy does an AI prompt use?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A standard text prompt uses approximately 0.24 watt-hours (Wh) of energy, emits 0.03 grams of CO₂, and consumes 0.26 millilitres of water. This is roughly equivalent to less than 0.005% of eating a single hamburger in terms of energy impact.",
            },
          },
          {
            "@type": "Question",
            name: "Should I trust AI-generated statistics and citations?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. AI models do not have access to underlying data—they learn patterns from data. Always verify any specific numerical claims, dates, statistics, or academic citations independently. AI excels at explaining well-established concepts but should not be trusted for specific factual claims without verification.",
            },
          },
          {
            "@type": "Question",
            name: "Is using AI trained on copyrighted material legal?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "This remains a developing area of law. AI models learn patterns from data similarly to how humans learn, but many ethical and legal questions remain about using copyrighted training data without explicit consent. Lawmakers and courts are still determining the boundaries of fair use in this context.",
            },
          },
          {
            "@type": "Question",
            name: "How can I reduce the environmental impact of using AI?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Keep conversations short and start new chats for different topics instead of extending long conversations. Choose smaller models when appropriate (e.g., Claude Sonnet instead of Opus for routine tasks). Provide context files in plain text formats (.txt, .csv, .md) rather than PDFs, Word documents, or images where possible.",
            },
          },
        ],
      },
    ],
    body: `<section class="page-section">
  <div class="page-header">
    <h1 class="page-title">Ethical Considerations for AI in the Workplace</h1>
    <div class="page-meta">
      <span>By Elliot J. Reed</span>
      <span>&#8226;</span>
      <time datetime="2026-01-31">Published: 31st January 2026</time>
    </div>
    <p class="page-intro">
      A guide to using AI responsibly in the workplace, covering the benefits of AI adoption, ethical and societal
      concerns, environmental impact, and practical strategies for responsible implementation.
    </p>
  </div>
  <div class="prose">
    <section id="table-of-contents">
      <h2>Contents</h2>
      <ol>
        <li>
          <a href="#why-use-ai">Why should we use AI in the workplace?</a>
          <ol>
            <li><a href="#delivering-great-customer-service">Delivering great customer service</a></li>
            <li><a href="#freeing-people-to-focus">Freeing people to focus on what matters most</a></li>
            <li><a href="#maintaining-quality-and-innovation">Maintaining quality and innovation</a></li>
            <li><a href="#supporting-growth">Supporting people&#39;s growth and filling knowledge gaps</a></li>
          </ol>
        </li>
        <li>
          <a href="#ethical-concerns">Ethical and social concerns</a>
          <ol>
            <li><a href="#impact-on-employees">The impact on employees</a></li>
            <li><a href="#impact-on-customers">The impact on customers</a></li>
            <li><a href="#accuracy">Accuracy</a></li>
            <li><a href="#copyright">Copyright and intellectual property</a></li>
            <li><a href="#environmental-impact">Environmental impact</a></li>
          </ol>
        </li>
        <li><a href="#how-to-use-ai">How should we use AI in the workplace?</a></li>
        <li><a href="#faqs">Frequently Asked Questions</a></li>
        <li><a href="#conclusion">Conclusion</a></li>
      </ol>
    </section>

    <section>
      <p>
        It&#39;s hard to escape hearing about, and using, AI these days. Many of the applications, programmes, and
        services we all use have some element of AI functionality.
      </p>
      <p>
        Governments, businesses, and individuals around the world are utilising this new technology. With that comes a
        high potential for reward, but it is not without risk nor without social, ethical, and environmental challenges.
      </p>
      <p>
        <strong>Note:</strong> Where I refer to &#8220;AI&#8221; I am referring to &#8220;generative Artificial
        Intelligence&#8221; &#8212; the systems used to generate text, images, videos, and audio. Where I refer to
        &#8220;AI models&#8221;, I am referring to Large Language Model (LLM) AIs such as Claude, ChatGPT, and Google
        Gemini.
      </p>
    </section>

    <section>
      <h2 id="why-use-ai">Why should we use AI in the workplace?</h2>

      <p>There are four broad areas where AI has the potential to really help businesses and employees.</p>

      <h3 id="delivering-great-customer-service">1. Delivering great customer service</h3>
      <p>
        AI can help us respond to customers more quickly and more accurately, particularly outside of office hours and
        during peak periods. By having AI handle some of the more standard queries, Customer Support teams have been
        able to give more time to the more complex and sensitive queries. AI is also useful in helping us to understand
        and respond to customer feedback by classifying free-text natural language data.
      </p>

      <h3 id="freeing-people-to-focus">2. Freeing people to focus on what matters most</h3>
      <p>
        Much of our normal day-to-day tasks require quite repetitive and uninspiring administrative tasks, such as
        reading and writing reports, summarising documents, making sense of spreadsheets, and formatting documents. This
        is an area where AI can really help speed up much of that, freeing us up to focus on the areas requiring genuine
        human capabilities and innovative creativity.
      </p>
      <p>
        The real benefit with AI here is to enhance and elevate our work by allowing us to focus on what we&#39;re all
        good at, and likely what we all take more enjoyment from.
      </p>

      <h3 id="maintaining-quality-and-innovation">3. Maintaining quality and innovation whilst staying competitive</h3>
      <p>
        Competitors are already using AI. The question isn&#39;t <em>whether</em> we should be using AI, but <em>how</em>
        we can use AI in a responsible and effective way. AI allows smaller businesses to compete against the big
        corporate competitors who often have far greater resources. Maintaining quality and pushing innovative ideas
        requires us to use AI as a tool to amplify human judgement rather than replace it.
      </p>

      <h3 id="supporting-growth">4. Supporting people&#39;s growth and filling knowledge gaps</h3>
      <p>
        Every workplace has internal knowledge gaps. AI can provide tailored, personalised guidance and advice without
        the need to consult external companies or engage in generic training. AI also helps level the playing field for
        employees who might lack certain background knowledge, providing a judgement-free environment to ask questions.
      </p>
    </section>

    <section>
      <h2 id="ethical-concerns">Ethical and social concerns</h2>

      <p>
        Throughout history new technology has raised ethical concerns, and resulted in societal changes. We&#39;re now in
        the information revolution, and the 2020s has seen the popularisation of generative Artificial Intelligence. It
        remains to be seen what the medium- to long-term impact of AI will be.
      </p>

      <h3 id="impact-on-employees">The impact on employees</h3>

      <h4>Job security</h4>
      <p>
        Whilst broadly speaking this does not appear to be the case in employment data, there are reports that
        entry-level positions are becoming harder to attain, particularly in roles such as data entry, and secretarial
        and paralegal work. The trend throughout history has been that when new technologies emerge, new jobs are
        created when others are changed or lost (this is sometimes called the &#8220;lump of labour&#8221; fallacy).
      </p>
      <p>
        There is no doubt that some roles will change. Let&#39;s take software development as an example. AI can now
        write software code that can be very good. Yet only a part of the role of a software developer is writing lines
        of code, much of the role is in system design and architecture, planning, testing, and translating business
        requirements into rules-based processes.
      </p>

      <h4>Skills and Training</h4>
      <p>
        One concern that is undeniable is the potential for &#8220;skill fade&#8221; in the face of AI. There is a
        well-documented term for this: <strong>cognitive offloading</strong>. Studies have shown this effect in relation
        to smartphone cameras (photography impairs memory), search engines (people are less likely to remember
        information they know they can find online), and now AI use.
      </p>
      <p>
        The challenge will really be for individuals: what areas are people comfortable cognitively offloading to AI,
        and what should be embedded as a skill? Whilst utilising systems and tools to help with knowledge-based tasks
        will become yet more common, skills relying on human connections and creativity will become increasingly
        important.
      </p>

      <h3 id="impact-on-customers">The Impact on Customers</h3>
      <p>
        There are two primary concerns around AI for customers: biases, and a potential for relationships to become
        less human-centric. AI models are trained on huge amounts of data written by humans. This means that biases
        present in human-generated content are used to train AI models, and so those AI models can contain those same
        biases. When considering automated systems and contact points, we should prioritise humanity and customer
        experience above automation and efficiency.
      </p>

      <h3 id="accuracy">Accuracy</h3>
      <p>
        Responses given by AI Assistants will never be completely accurate all of the time. AI models are trained
        <em>on</em> data, they don&#39;t <em>have access to</em> those data. AI excels at explaining well-established
        topics &#8212; scientific principles, historical events, widely understood concepts, programming fundamentals.
        However, any specific numerical claims, dates, statistics, percentages, or quantitative information should be
        verified independently. Never trust AI-provided academic citations without verification.
      </p>

      <h3 id="copyright">Copyright and Intellectual Property</h3>
      <p>
        One of the most prominent concerns around AI relates to how AI models are trained. These systems learn from vast
        datasets containing text, images, and code scraped from across the internet &#8212; including copyrighted
        material, creative works, and content created by millions of individuals who did not explicitly consent to this
        use. Many ethical and legal issues remain over the types and sources of data used to train AI models.
      </p>

      <h3 id="environmental-impact">Environmental Impact</h3>
      <p>
        The sharp rise in AI usage has resulted in new and larger data centres being built. According to recent
        research, a standard text prompt uses 0.24 watt-hours (Wh) of energy, emits 0.03 grams of carbon dioxide
        equivalent (gCO&#8322;e), and consumes 0.26 millilitres of water. To put this into context, the energy impact
        per-prompt is roughly equivalent to eating less than 0.005% of a single hamburger.
      </p>

      <table>
        <thead>
          <tr>
            <th>Item / Activity</th>
            <th>Unit</th>
            <th>Energy (Wh)</th>
            <th>CO&#8322;e (grams)</th>
            <th>Water (Litres)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>AI Prompt</strong></td>
            <td>1 Prompt</td>
            <td><strong>0.2 &#8211; 2.9</strong></td>
            <td><strong>0.03&#8211;4</strong></td>
            <td><strong>0.0003&#8211;0.05</strong></td>
          </tr>
          <tr>
            <td><strong>Beef Burger (4oz)</strong></td>
            <td>1 Burger</td>
            <td><strong>3000 &#8211; 9000</strong></td>
            <td><strong>2100 &#8211; 3700</strong></td>
            <td><strong>2350</strong></td>
          </tr>
          <tr>
            <td><strong>Netflix Streaming</strong></td>
            <td>1 Hour</td>
            <td><strong>~70</strong></td>
            <td><strong>36</strong></td>
            <td><strong>2 &#8211; 12</strong></td>
          </tr>
        </tbody>
      </table>

      <p>To help minimise the environmental impact when prompting:</p>
      <ul>
        <li>Keep conversations short &#8212; start a new chat instead of continuing the same one for different topics</li>
        <li>Choose smaller models where appropriate (e.g. Claude Sonnet instead of Opus for routine tasks)</li>
        <li>Provide context files in plain text (.txt, .csv, .md) rather than PDFs, Word documents, or images</li>
      </ul>
    </section>

    <section>
      <h2 id="how-to-use-ai">How should we use AI in the workplace?</h2>
      <p>
        We should strive to use AI in responsible and effective ways. This means that we should be open and honest with
        customers and colleagues when using AI. We should never use AI alone to make decisions affecting people. We
        should be aware that AI responses are biased according to the underlying data used to train AI models and the
        biases in our own requests.
      </p>
      <p>
        We should use AI effectively to help ensure the responses are useful and meaningful. For this, we can broadly
        use the CAFE framework. Read the guide on the CAFE framework at
        <a href="/ai/cafe-ai-prompt-framework">www.elliotjreed.com/ai/cafe-ai-prompt-framework</a>,
        or for a more in-depth prompting guide see
        <a href="/ai/ai-prompt-engineering-guide">www.elliotjreed.com/ai/ai-prompt-engineering-guide</a>.
      </p>
    </section>

    <section>
      <h2 id="faqs">Frequently Asked Questions</h2>

      <h3>Will AI replace jobs in my workplace?</h3>
      <p>
        Whilst some roles may change, historical trends suggest new jobs are created when others are transformed by
        technology. AI is more likely to change how we work rather than eliminate jobs entirely. Entry-level positions
        in data entry and administrative work may be more affected, but AI typically augments human work rather than
        replacing it completely.
      </p>

      <h3>How much energy does an AI prompt use?</h3>
      <p>
        A standard text prompt uses approximately 0.24 watt-hours (Wh) of energy, emits 0.03 grams of CO&#8322;, and
        consumes 0.26 millilitres of water. This is roughly equivalent to less than 0.005% of eating a single
        hamburger in terms of energy impact.
      </p>

      <h3>Should I trust AI-generated statistics and citations?</h3>
      <p>
        No. AI models do not have access to underlying data &#8212; they learn patterns from data. Always verify any
        specific numerical claims, dates, statistics, or academic citations independently. AI excels at explaining
        well-established concepts but should not be trusted for specific factual claims without verification.
      </p>

      <h3>Is using AI trained on copyrighted material legal?</h3>
      <p>
        This remains a developing area of law. AI models learn patterns from data similarly to how humans learn, but
        many ethical and legal questions remain about using copyrighted training data without explicit consent.
        Lawmakers and courts are still determining the boundaries of fair use in this context.
      </p>

      <h3>How can I reduce the environmental impact of using AI?</h3>
      <p>
        Keep conversations short and start new chats for different topics instead of extending long conversations.
        Choose smaller models when appropriate (e.g., Claude Sonnet instead of Opus for routine tasks). Provide
        context files in plain text formats (.txt, .csv, .md) rather than PDFs, Word documents, or images where
        possible.
      </p>
    </section>

    <section>
      <h2 id="conclusion">Conclusion</h2>
      <p>
        AI can be a really powerful tool if used responsibly and effectively. It will allow us to focus on the work we
        find meaningful and become more productive, assist us in filling gaps in knowledge and experience, guide us in
        personalised learning and development, and give us the space to be more creative and innovative.
      </p>
      <p>
        By understanding both the opportunities and challenges AI presents, and by establishing clear ethical
        guidelines, we can harness this technology to create genuine value whilst minimising potential harms. The key
        is to use AI as a tool to amplify human judgement and creativity, not to replace human decision-making and
        relationships.
      </p>
    </section>
  </div>
</section>`,
  };
}
