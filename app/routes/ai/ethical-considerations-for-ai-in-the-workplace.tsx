import type { ReactElement } from "react";
import { Link } from "react-router";
import { HeadingAnchor } from "~/components/HeadingAnchor/HeadingAnchor";
import { createBreadcrumbs, createTechArticle } from "~/data/schemaData";

export const meta = () => [
  { title: "Ethical Considerations for AI in the Workplace | EJR" },
  {
    name: "description",
    content:
      "A comprehensive guide to using AI responsibly in the workplace, covering ethical concerns, environmental impact, and practical implementation strategies.",
  },
  { property: "og:title", content: "Ethical Considerations for AI in the Workplace" },
  {
    property: "og:description",
    content:
      "A comprehensive guide to using AI responsibly in the workplace, covering ethical concerns, environmental impact, and practical implementation strategies.",
  },
  { property: "og:type", content: "article" },
  { property: "og:url", content: "https://www.elliotjreed.com/ai/ethical-considerations-for-ai-in-the-workplace" },
  { property: "og:site_name", content: "Elliot J. Reed" },
  { property: "og:locale", content: "en_GB" },
  { property: "og:image", content: "https://www.elliotjreed.com/og.png" },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: "Ethical Considerations for AI in the Workplace" },
  {
    name: "twitter:description",
    content:
      "A comprehensive guide to using AI responsibly in the workplace, covering ethical concerns, environmental impact, and practical implementation strategies.",
  },
  { name: "twitter:image", content: "https://www.elliotjreed.com/twitter-card.png" },
  { name: "twitter:site", content: "@elliotjreed" },
  { name: "twitter:creator", content: "@elliotjreed" },
  {
    "script:ld+json": createTechArticle({
      url: "https://www.elliotjreed.com/ai/ethical-considerations-for-ai-in-the-workplace",
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
  },
  {
    "script:ld+json": createBreadcrumbs([
      { name: "Home", url: "https://www.elliotjreed.com" },
      { name: "Guides", url: "https://www.elliotjreed.com" },
      { name: "AI", url: "https://www.elliotjreed.com/ai/ethical-considerations-for-ai-in-the-workplace" },
      {
        name: "Ethical Considerations for AI in the Workplace",
        url: "https://www.elliotjreed.com/ai/ethical-considerations-for-ai-in-the-workplace",
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
  },
];

export default (): ReactElement => (
  <section className="divide-y divide-gray-200 dark:divide-gray-700">
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-700 dark:text-gray-200 sm:text-4xl sm:leading-10 md:text-6xl">
        Ethical Considerations for AI in the Workplace
      </h1>

      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
        <span>By Elliot J. Reed</span>
        <span>•</span>
        <time dateTime="2026-01-31">
          Published: 31<sup>st</sup> January 2026
        </time>
      </div>

      <p className="prose dark:prose-dark max-w-none text-lg leading-7 text-gray-600 dark:text-gray-300">
        A guide to using AI responsibly in the workplace, covering the benefits of AI adoption, ethical and societal
        concerns, environmental impact, and practical strategies for responsible implementation. This article is based
        on discussions with colleagues in my workplace who had some concerns about the rise and use of AI.
      </p>
    </div>

    <div className="prose max-w-none dark:prose-dark">
      <section id="table-of-contents">
        <h2>Contents</h2>
        <ol className="space-y-2 text-gray-700 dark:text-gray-300">
          <li>
            <a href="#why-use-ai" className="text-primary-700 dark:text-primary-500 hover:underline">
              Why should we use AI in the workplace?
            </a>
            <ol className="ml-4 mt-1 space-y-1">
              <li>
                <a
                  href="#delivering-great-customer-service"
                  className="text-primary-700 dark:text-primary-500 hover:underline"
                >
                  Delivering great customer service
                </a>
              </li>
              <li>
                <a href="#freeing-people-to-focus" className="text-primary-700 dark:text-primary-500 hover:underline">
                  Freeing people to focus on what matters most
                </a>
              </li>
              <li>
                <a
                  href="#maintaining-quality-and-innovation"
                  className="text-primary-700 dark:text-primary-500 hover:underline"
                >
                  Maintaining quality and innovation
                </a>
              </li>
              <li>
                <a href="#supporting-growth" className="text-primary-700 dark:text-primary-500 hover:underline">
                  Supporting people's growth and filling knowledge gaps
                </a>
              </li>
            </ol>
          </li>
          <li>
            <a href="#ethical-concerns" className="text-primary-700 dark:text-primary-500 hover:underline">
              Ethical and social concerns
            </a>
            <ol className="ml-4 mt-1 space-y-1">
              <li>
                <a href="#impact-on-employees" className="text-primary-700 dark:text-primary-500 hover:underline">
                  The impact on employees
                </a>
              </li>
              <li>
                <a href="#impact-on-customers" className="text-primary-700 dark:text-primary-500 hover:underline">
                  The impact on customers
                </a>
              </li>
              <li>
                <a href="#accuracy" className="text-primary-700 dark:text-primary-500 hover:underline">
                  Accuracy
                </a>
              </li>
              <li>
                <a href="#copyright" className="text-primary-700 dark:text-primary-500 hover:underline">
                  Copyright and intellectual property
                </a>
              </li>
              <li>
                <a href="#environmental-impact" className="text-primary-700 dark:text-primary-500 hover:underline">
                  Environmental impact
                </a>
              </li>
            </ol>
          </li>
          <li>
            <a href="#how-to-use-ai" className="text-primary-700 dark:text-primary-500 hover:underline">
              How should we use AI in the workplace?
            </a>
          </li>
          <li>
            <a href="#faqs" className="text-primary-700 dark:text-primary-500 hover:underline">
              Frequently Asked Questions
            </a>
          </li>
          <li>
            <a href="#conclusion" className="text-primary-700 dark:text-primary-500 hover:underline">
              Conclusion
            </a>
          </li>
        </ol>
      </section>

      <section>
        <p>
          It's hard to escape hearing about, and using, AI these days. Many of the applications, programmes, and
          services we all use have some element of AI functionality.
        </p>

        <p>
          Governments, businesses, and individuals around the world are utilising this new technology. With that comes a
          high potential for reward, but it is not without risk nor without social, ethical, and environmental
          challenges.
        </p>

        <p>
          I'll go through some of the challenges that AI presents to us as a society, and as leaders and employees in
          the workplace. We cannot simply ignore AI and other similar technological advances, just as businesses could
          not ignore the rise of the Internet. What we must do is set clear standards for the use of AI, and ensure we
          utilise services in a manner that aligns with our goals and values.
        </p>

        <div className="not-prose my-6 rounded-lg border border-gray-300 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-800">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Note:</strong> Where I refer to "AI" I am referring to "generative Artificial Intelligence" — the
            systems used to generate text, images, videos, and audio. Where I refer to "AI models", I am referring to
            Large Language Model (LLM) AIs such as Claude, ChatGPT, and Google Gemini. When referring to "AI Assistants"
            I am referencing the interfaces we use to communicate with the AI models (e.g. the Claude app or website).
          </p>
        </div>
      </section>

      <section>
        <HeadingAnchor id="why-use-ai" level={2}>
          Why should we use AI in the workplace?
        </HeadingAnchor>

        <p>There are four broad areas where AI has the potential to really help businesses and employees.</p>

        <HeadingAnchor id="delivering-great-customer-service" level={3}>
          1. Delivering great customer service
        </HeadingAnchor>

        <p>
          AI can help us respond to customers more quickly and more accurately, particularly outside of office hours and
          during peak periods. One example of this is AI integration into messaging platforms where customers can ask
          for assistance and have a personalised response provided to them using existing knowledge bases. This has been
          particularly helpful for customers who make contact outside of normal support hours — customers have been able
          to get the help and advice they've needed 24/7.
        </p>

        <p>
          By having AI handle some of the more standard queries, such as "do you deliver to Northern Ireland?", Customer
          Support teams have been able to give more time to the more complex and sensitive queries such as delivery or
          quality issues.
        </p>

        <p>
          AI is also useful in helping us to understand and respond to customer feedback. We have feedback from
          customers coming in from various sources, often in "natural language" which is hard to categorise into
          measurable data. AI can read natural language and help us classify the data. For example, AI can help more
          easily classify feedback provided by customers coming in as free-text natural language.
        </p>

        <HeadingAnchor id="freeing-people-to-focus" level={3}>
          2. Freeing people to focus on what matters most - relationships and creativity
        </HeadingAnchor>

        <p>
          Much of our normal day-to-day tasks require some quite repetitive and uninspiring administrative tasks, such
          as reading and writing reports, summarising documents, making sense of spreadsheets, and formatting documents.
          This is an area where AI can really help speed up much of that, freeing us up to focus on the areas requiring
          genuine human capabilities and innovative creativity.
        </p>

        <p>
          For Software Development teams this means spending less time forming and testing complicated algorithms, and
          more time developing new and exciting systems and features. For Customer Support this means more time for
          situations requiring judgement and empathy. For Marketing this means more time on creative campaigns and
          engaging copy rather than reformatting content across multiple channels. For data analysis this means more
          time to consider what to do with the information rather than gathering and formatting the data.
        </p>

        <p>
          The real benefit with AI here is to enhance and elevate our work by allowing us to focus on what we're all
          good at, and likely what we all take more enjoyment from. It allows us to create genuine value for customers,
          colleagues, and the business by making greater use of our human capabilities.
        </p>

        <HeadingAnchor id="maintaining-quality-and-innovation" level={3}>
          3. Maintaining quality and innovation whilst staying competitive
        </HeadingAnchor>

        <p>
          Competitors are already using AI. The question isn't <em>whether</em> we should be using AI, but <em>how</em>{" "}
          we can use AI in a responsible and effective way to provide a more meaningful experience to our customers and
          potential customers.
        </p>

        <p>
          AI allows smaller businesses to compete against the big corporate competitors who often have far greater
          resources available to them. We can use AI to analyse market trends, trial different campaigns, develop new
          software ideas, improve logistics, and personalise customer experiences at scale — traditionally these areas
          have required dedicated teams or costly third-party agencies.
        </p>

        <p>
          Maintaining quality and pushing innovative ideas requires us to use AI as a tool to amplify human judgement
          rather than replace it. AI can provide us with knowledge and analysis, we must provide the wisdom and values.
        </p>

        <HeadingAnchor id="supporting-growth" level={3}>
          4. Supporting people's growth and filling knowledge gaps
        </HeadingAnchor>

        <p>
          Every workplace has internal knowledge gaps. This may be in fully utilising website analytics platforms,
          understanding the legalities of trade agreements and processes, or making the most of software such as Excel.
        </p>

        <p>
          Here AI can provide us with tailored, personalised guidance and advice without the need to consult external
          companies or engage in generic training. This doesn't replace the need for internal human expertise and
          mentoring, but can assist where otherwise we would have to wait for specific colleagues to help, or wait for
          specific training to be available.
        </p>

        <p>
          AI also helps level the playing field for employees who might lack certain background knowledge. If someone
          hasn't studied at university, or if their education didn't cover certain technical areas, AI can help fill
          those gaps in a judgement-free environment where they can ask apparently simple questions without
          embarrassment.
        </p>

        <p>
          The goal is continuous learning and development, where everyone has access to personalised support as they
          grow their skills and confidence.
        </p>
      </section>

      <section>
        <HeadingAnchor id="ethical-concerns" level={2}>
          Ethical and social concerns
        </HeadingAnchor>

        <p>
          Throughout history new technology has raised ethical concerns, and resulted in societal changes. The
          agricultural revolution caused human society to undergo huge changes to human culture and precipitated
          significant environmental changes.
        </p>

        <p>
          The industrial revolution caused widespread workplace upheaval and social evolution, whilst having a very
          negative effect on the global environment.
        </p>

        <p>
          We're now in the information revolution. Starting in the 90s with the dawn of the consumer world-wide web and
          personal computers, into the 00s with the advent of widespread smartphone usage. The 2020s has seen the latest
          stage of the information age with popularisation of generative Artificial Intelligence.
        </p>

        <p>
          It remains to be seen what the medium- to long-term impact of AI will be. We are far from having anything
          close to Artificial General Intelligence (AGI) — the hypothetical AI which would be better at most things than
          most humans — but the current iteration of Large Language Models (LLMs), such as Claude, Gemini, and ChatGPT,
          are already impacting people worldwide.
        </p>

        <HeadingAnchor id="impact-on-employees" level={3}>
          The impact on employees
        </HeadingAnchor>

        <p>
          As with any emerging technology, it is often employees of businesses who see the effects beyond simply a fad
          or passing interest. AI Assistants are particularly good at carrying out many tasks that are typically
          performed by humans in the workplace: administration, data entry, content writing, writing software code,
          summarising and analysing documents, and creating reports.
        </p>

        <p>
          In this regard there are two broad categories of concern with AI use in the workplace: the risk to jobs posed
          by AI (both directly and indirectly), and the possibility that talent and skills suffer (both for existing
          employees, and longer-term hiring requirements).
        </p>

        <HeadingAnchor id="job-security" level={4}>
          Job security
        </HeadingAnchor>

        <p>
          Not helped by somewhat dramatic headlines claiming AI is coming for all our jobs (the big news that keeps
          being put out by Big Tech firms claim that software development is dead — despite still hiring software
          engineers).
        </p>

        <p>
          Whilst broadly speaking this does not appear to be the case in employment data, there are several reports that
          entry-level positions are becoming harder to attain, particularly in roles such as data entry, and secretarial
          and paralegal work. Those likely to be seeing the greatest impact will be young graduates.
          <sup>
            <a href="#ref1" id="cite1">
              [1]
            </a>
          </sup>
        </p>

        <p>
          It remains to be seen how far AI can go in performing many of the same roles as humans currently do, and what
          impact that will have on employment globally. Similar technologies have been developed throughout history with
          similar concerns. We can go back to the industrial revolution, where jobs performed by people came to be
          performed by machines. More recently, over the past few decades computers, digital systems, and the Internet
          have been used where previously people would have been. In economics, there is something called the "lump of
          labour" fallacy
          <sup>
            <a href="#ref2" id="cite2">
              [2]
            </a>
          </sup>
          : the idea that there is a fixed unit of work to be completed by either human or machine. The trend throughout
          history has been that when new technologies emerge, new jobs are created when others are changed or lost — the
          overall employment rate has remained consistent.
        </p>

        <p>
          There is no doubt that some roles will change, and are changing. Let's take software development as an
          example. AI can now write software code that can be very good — this was not the case only a year ago. Yet
          only a part of the role of a software developer is writing lines of code, much of the role is in system design
          and architecture, planning, testing, considering dependencies, translating business requirements into
          rules-based processes, and determining medium- to long-term effects on implementation decisions. In the near
          future, the actual number of lines of code written entirely by an individual software developer will certainly
          reduce — this means the skills of developers will have a shift in focus to the other areas.
        </p>

        <p>
          When hiring in the future, employers will place more credit to those candidates who show aptitude in planning
          and understanding wider business areas over the ability to logically implement algorithms and functional
          solutions.
        </p>

        <HeadingAnchor id="skills-and-training" level={4}>
          Skills and Training
        </HeadingAnchor>

        <p>
          One concern that is undeniable is the potential for "skill fade" in the face of AI. There is a well-documented
          term for this: cognitive offloading.
        </p>

        <p>
          There have been several studies on this in relation to other technologies. Notably, smartphone cameras. People
          who photograph events remember them less accurately than those who simply observe them. This occurs because
          photography acts as a form of "cognitive offloading" - essentially, the camera becomes an external memory
          system, so the brain doesn't encode the information as deeply.
          <sup>
            <a href="#ref3" id="cite3">
              [3]
            </a>
          </sup>
          <sup>
            <a href="#ref4" id="cite4">
              [4]
            </a>
          </sup>
        </p>

        <p>
          Similarly the rise of search engines has had the effect — people are less likely to remember information they
          know they can readily find on the Internet.
          <sup>
            <a href="#ref5" id="cite5">
              [5]
            </a>
          </sup>
        </p>

        <p>
          More recently, this has been been studied in relation to AI use. Unsurprisingly, similar cognitive offloading
          effects are being seen.
          <sup>
            <a href="#ref6" id="cite6">
              [6]
            </a>
          </sup>
        </p>

        <p>
          Again, here I'll use software development as an example. Whilst knowing off the top of your head how to write
          particular solutions in code may become less useful, actually being able to write code will still be essential
          to the role — edge-cases will require human intervention, and understanding code in order to explain changes
          to an AI will still be required.
        </p>

        <p>
          The challenge will really be for individuals here, what areas are people comfortable cognitively offloading to
          AI, and what should be embedded as a skill? Whilst utilising systems and tools to help with knowledge-based
          tasks will become yet more common, skills relying on human connections and creativity will become increasingly
          important.
        </p>

        <HeadingAnchor id="impact-on-customers" level={3}>
          The Impact on Customers
        </HeadingAnchor>

        <p>
          There are two primary concerns around AI for customers: biases, and a potential for relationships to become
          less human-centric.
        </p>

        <p>
          AI models are trained on huge amounts of data. Data written by humans. This means that biases present in
          human-generated content are used to train AI models, and so those AI models can contain those same biases.
          <sup>
            <a href="#ref7" id="cite7">
              [7]
            </a>
          </sup>{" "}
          If you ask ChatGPT to generate a picture of a nurse, it will likely be female. If you ask ChatGPT to generate
          a picture of a CEO, that picture will likely be of a male.
        </p>

        <p>
          Whilst those are quite obvious examples of biases, the problem runs deeper when AI is used for automated
          decision-making without human oversight. For example, AI could be used in a hiring process — certain names or
          address locations could be prioritised over others, as the underlying data is biased towards or against
          certain demographics.
        </p>

        <p>
          Knowing this, we must all ensure that we are aware of these biases, and that we always retain a human-centred
          approach to decision-making. When considering automated systems and contact points, we should prioritise
          humanity and customer experience above automation and efficiency.
        </p>

        <HeadingAnchor id="accuracy" level={3}>
          Accuracy
        </HeadingAnchor>

        <p>
          Responses given by AI Assistants will never be completely accurate all of the time - AI models are trained{" "}
          <em>on</em> data, they don't <em>have access to</em> those data. If this is not understood or considered, it
          can lead to quite negative perceptions of AI, and responses from AI.
        </p>

        <p>
          AI models are not search engines. A search engine is like a librarian: they will point you to the content
          you're after; an AI model is like someone who has read every book in the library. When you ask them a
          question, they answer based on what they remember learning, drawing on patterns and understanding absorbed
          from everything they've read.
        </p>

        <p>
          AI excels at explaining well-established topics — scientific principles, historical events, widely understood
          concepts, programming fundamentals, grammatical rules, and similar knowledge that's stable and
          well-documented.
        </p>

        <p>
          If you ask how photosynthesis works, what the capital of France is, or how to structure a for-loop in Python,
          the response will almost certainly be accurate because these patterns are extremely consistent across its
          training data.
        </p>

        <p>
          Any specific numerical claims, dates, statistics, percentages, or quantitative information should be verified
          independently. Don't trust AI-generated numbers without checking them against reliable sources.
        </p>

        <p>
          If an AI claims "studies show 73% of customers prefer...", find the actual study. If it provides a specific
          date for an historical event, verify it. If it gives financial figures, check them. Never trust AI-provided
          academic citations, article references, or source attributions without verification. A recent example of this
          was a court case where lawyers used AI to help form arguments for a case, and the AI provided supporting case
          law that did not actually exist — the judge was less than impressed to say the least.
          <sup>
            <a href="#ref8" id="cite8">
              [8]
            </a>
          </sup>
        </p>

        <HeadingAnchor id="copyright" level={3}>
          Copyright and Intellectual Property
        </HeadingAnchor>

        <p>
          One of the most prominent concerns around AI relates to how AI models are trained. These systems learn from
          vast datasets containing text, images, and code scraped from across the internet — including copyrighted
          material, creative works, and content created by millions of individuals who did not explicitly consent to
          this use.
        </p>

        <p>
          This raises legitimate questions about intellectual property rights, fair compensation for creators, and
          whether AI models might reproduce or compete with the original works they were trained on.
        </p>

        <p>
          AI models don't store or retrieve copies of training data — they don't "look up" information like a search
          engine. They learn patterns, structures, and relationships from vast numbers of examples — fundamentally
          similar to how humans learn by reading books, viewing art, or studying others' code.
        </p>

        <p>
          When a painter studies Renaissance techniques by examining hundreds of paintings in galleries, we don't
          consider this theft, even though they're learning from others' work to develop their own capabilities. When a
          programmer learns by examining open source code, this is considered normal professional development.
        </p>

        <p>
          The critical distinction is between learning from examples (which has always been how knowledge develops) and
          copying specific works (which violates rights).
        </p>

        <p>
          Many ethical and legal issues remain over the types and sources of data used to train AI models. Copyrighted
          material that has not been intended to be in the public domain by authors and producers has been used in
          training data by all the major AI companies. Lawmakers and courts have yet to come to an agreed answer to
          this. Commercially, AI companies are partnering with specific content providers, such as Reddit, to allow
          consensual access to their data — this will likely continue to be a hot topic over the next few years.
        </p>

        <HeadingAnchor id="environmental-impact" level={3}>
          Environmental Impact
        </HeadingAnchor>

        <p>
          Data centres are what store and process data for "cloud" technologies used by websites, messaging apps, social
          media, emails, and essentially every other digital service. In combination these services use a lot of
          electricity and water, and can produce a lot of CO₂.
        </p>

        <p>
          The sharp rise in AI usage has resulted in new and larger data centres being built and used, and we often hear
          about the energy and water consumption associated with AI. These reports however often don't put energy usage
          into context.
        </p>

        <HeadingAnchor id="energy-water-impact" level={4}>
          What is the energy and water impact from a prompt?
        </HeadingAnchor>

        <p>
          According to recent research, a standard text prompt (a message to an AI model) uses 0.24 watt-hours (Wh) of
          energy, emits 0.03 grams of carbon dioxide equivalent (gCO₂e), and consumes 0.26 millilitres of water.
          <sup>
            <a href="#ref9" id="cite9">
              [9]
            </a>
          </sup>
        </p>

        <p>
          To put this into some context, the energy impact per-prompt is roughly equivalent to eating less than 0.005%
          of a single hamburger.
          <sup>
            <a href="#ref10" id="cite10">
              [10]
            </a>
          </sup>{" "}
          For water usage, a single prompt will use around 5 drops of water,
          <sup>
            <a href="#ref11" id="cite11">
              [11]
            </a>
          </sup>{" "}
          whilst a single hamburger uses around 15 bathtubs.
        </p>

        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Item / Activity</th>
                <th>Unit</th>
                <th>Energy (Wh)</th>
                <th>CO₂e (grams)</th>
                <th>Water (Litres)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>AI Prompt</strong>
                  <sup>
                    <a href="#ref12" id="cite12">
                      [12]
                    </a>
                  </sup>
                  <sup>
                    <a href="#ref13" id="cite13">
                      [13]
                    </a>
                  </sup>
                  <sup>
                    <a href="#ref14" id="cite14">
                      [14]
                    </a>
                  </sup>
                </td>
                <td>1 Prompt</td>
                <td>
                  <strong>0.2 - 2.9</strong>
                </td>
                <td>
                  <strong>0.03–4</strong>
                </td>
                <td>
                  <strong>0.0003–0.05</strong> (Blue)
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Beef Burger (4oz)</strong>
                  <sup>
                    <a href="#ref15" id="cite15">
                      [15]
                    </a>
                  </sup>
                  <sup>
                    <a href="#ref16" id="cite16">
                      [16]
                    </a>
                  </sup>
                </td>
                <td>1 Burger</td>
                <td>
                  <strong>3000 - 9000</strong>
                </td>
                <td>
                  <strong>2100 - 3700</strong>
                </td>
                <td>
                  <strong>2350</strong> (Total) / <strong>70</strong> (Blue)
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Cheddar Cheese</strong>
                  <sup>
                    <a href="#ref17" id="cite17">
                      [17]
                    </a>
                  </sup>
                  <sup>
                    <a href="#ref18" id="cite18">
                      [18]
                    </a>
                  </sup>
                </td>
                <td>1 Slice</td>
                <td>
                  <strong>~100</strong>
                </td>
                <td>
                  <strong>280</strong>
                </td>
                <td>
                  <strong>90</strong> (Total)
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Pork Sausage</strong>
                  <sup>
                    <a href="#ref19" id="cite19">
                      [19]
                    </a>
                  </sup>
                </td>
                <td>1 Sausage</td>
                <td>
                  <strong>~150</strong>
                </td>
                <td>
                  <strong>160</strong>
                </td>
                <td>
                  <strong>300</strong> (Total) / <strong>23</strong> (Blue)
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Netflix Streaming</strong>
                  <sup>
                    <a href="#ref20" id="cite20">
                      [20]
                    </a>
                  </sup>
                </td>
                <td>1 Hour</td>
                <td>
                  <strong>~70</strong>
                </td>
                <td>
                  <strong>36</strong>
                </td>
                <td>
                  <strong>2 – 12</strong> (Blue)
                  <sup>
                    <a href="#ref21" id="cite21">
                      [21]
                    </a>
                  </sup>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="not-prose my-6 rounded-lg border border-gray-300 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-800">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Note:</strong> "Blue" water is treated water, such as that used for human consumption, as opposed to
            water directly from rainfall or streams.
          </p>
        </div>

        <p>
          The amount of energy, CO₂, and water varies quite considerably with AI use given the range of models, specific
          use-cases, and energy sources.
        </p>

        <HeadingAnchor id="reduce-impact" level={4}>
          How can we reduce the impact when prompting?
        </HeadingAnchor>

        <p>
          The longer the prompt, the more energy it will consume. To help minimise the environmental impact of prompting
          you can try to ensure that you do not keep long conversations with AI Assistants running — if you are starting
          a new or changed topic, start a new chat instead of continuing the same one.
        </p>

        <p>
          The "model" you choose also has an effect. For example on Claude AI you can switch between Opus and Sonnet.
          Opus is a much larger model, and can be useful for quite niche tasks. For most tasks Sonnet will be what you
          need, and it'll also normally be quicker given it requires fewer resources.
        </p>

        <p>
          When providing context to an AI Assistant in the form of files, the types of files will make a difference to
          energy consumption. Plain text files (ending in .txt, .csv, or .md for example) consume the least. PDFs, Word
          documents, and Excel spreadsheets take more resources to process. Images, especially photographs with a
          reasonable resolution, are quite intensive to process. Where possible, provide context files in plain text
          (for example, by copying your Word document into a Notepad text file). This is more relevant to files which
          will be repeatedly accessed, such as using Claude's "Projects" feature.
        </p>
      </section>

      <section>
        <HeadingAnchor id="how-to-use-ai" level={2}>
          How should we use AI in the workplace?
        </HeadingAnchor>

        <p>
          When considering AI tools we should consider whether the AI company aligns with our values, just as we would
          when choosing which suppliers and partners we work with. I won't make specific recommendation as to which AI
          provider or providers may be appropriate here, as specific requirements will vary depending on the aims and
          values of individual businesses.
        </p>

        <p>
          We should strive to use AI in responsible and effective ways. This means that we should be open and honest
          with customers and colleagues when using AI. For example, when a customer has a query answered by AI we should
          inform the customer that it is an AI responding; when we use AI internally to conduct research we should
          inform colleagues that AI was used.
        </p>

        <p>
          We should never use AI alone to make decisions affecting people. We should be aware that AI responses are
          biased according to both the underlying data used to train AI models, and the biases in our own requests to AI
          models.
        </p>

        <p>
          We should use AI effectively to help ensure the responses are useful and meaningful, and not wasteful of
          resources. For this, we can broadly use the CAFE framework for remembering how to effectively prompt an AI.
          Read my guide on the CAFE framework at{" "}
          <Link to="/ai/cafe-ai-prompt-framework" prefetch="render" className="text-primary-700 dark:text-primary-500">
            www.elliotjreed.com/ai/cafe-ai-prompt-framework
          </Link>
          , or for a more in-depth prompting guide see{" "}
          <Link
            to="/ai/ai-prompt-engineering-guide"
            prefetch="render"
            className="text-primary-700 dark:text-primary-500"
          >
            www.elliotjreed.com/ai/ai-prompt-engineering-guide
          </Link>
          .
        </p>

        <p>
          This is all still very new technology, and it's undeniable that it will have a significant impact on the way
          we work, and on wider human society. We should keep talking to one another about it, sharing both challenges
          and successes openly. We must verify the responses, especially when using AI output in decision-making and
          communication.
        </p>
      </section>

      <section>
        <HeadingAnchor id="faqs" level={2}>
          Frequently Asked Questions
        </HeadingAnchor>

        <HeadingAnchor id="faq-jobs" level={3}>
          Will AI replace jobs in my workplace?
        </HeadingAnchor>

        <p>
          Whilst some roles may change, historical trends suggest new jobs are created when others are transformed by
          technology. AI is more likely to change how we work rather than eliminate jobs entirely. Entry-level positions
          in data entry and administrative work may be more affected, but AI typically augments human work rather than
          replacing it completely.
        </p>

        <HeadingAnchor id="faq-energy" level={3}>
          How much energy does an AI prompt use?
        </HeadingAnchor>

        <p>
          A standard text prompt uses approximately 0.24 watt-hours (Wh) of energy, emits 0.03 grams of CO₂, and
          consumes 0.26 millilitres of water. This is roughly equivalent to less than 0.005% of eating a single
          hamburger in terms of energy impact.
        </p>

        <HeadingAnchor id="faq-trust" level={3}>
          Should I trust AI-generated statistics and citations?
        </HeadingAnchor>

        <p>
          No. AI models do not have access to underlying data - they learn patterns from data. Always verify any
          specific numerical claims, dates, statistics, or academic citations independently. AI excels at explaining
          well-established concepts but should not be trusted for specific factual claims without verification.
        </p>

        <HeadingAnchor id="faq-copyright" level={3}>
          Is using AI trained on copyrighted material legal?
        </HeadingAnchor>

        <p>
          This remains a developing area of law. AI models learn patterns from data similarly to how humans learn, but
          many ethical and legal questions remain about using copyrighted training data without explicit consent.
          Lawmakers and courts are still determining the boundaries of fair use in this context.
        </p>

        <HeadingAnchor id="faq-reduce-impact" level={3}>
          How can I reduce the environmental impact of using AI?
        </HeadingAnchor>

        <p>
          Keep conversations short and start new chats for different topics instead of extending long conversations.
          Choose smaller models when appropriate (e.g., Claude Sonnet instead of Opus for routine tasks). Provide
          context files in plain text formats (.txt, .csv, .md) rather than PDFs, Word documents, or images where
          possible.
        </p>
      </section>

      <section>
        <HeadingAnchor id="conclusion" level={2}>
          Conclusion
        </HeadingAnchor>

        <p>
          AI can be a really powerful tool if used responsibly and effectively. It will allow us to focus on the work we
          find meaningful and become more productive, assist us in filling gaps in knowledge and experience, guide us in
          personalised learning and development, help us to personalise customer experiences and invest more time
          assisting with complex queries, and give us the space to be more creative and innovative.
        </p>

        <p>
          By understanding both the opportunities and challenges AI presents, and by establishing clear ethical
          guidelines, we can harness this technology to create genuine value whilst minimising potential harms. The key
          is to use AI as a tool to amplify human judgment and creativity, not to replace human decision-making and
          relationships.
        </p>
      </section>

      <section>
        <HeadingAnchor id="references" level={2}>
          References
        </HeadingAnchor>

        <ol className="text-sm">
          <li id="ref1">
            <a
              href="https://www.mckinsey.com/uk/our-insights/the-mckinsey-uk-blog/ai-uneven-effects-on-uk-jobs-and-talent"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-700 dark:text-primary-500"
            >
              McKinsey - AI's uneven effects on UK jobs and talent
            </a>{" "}
            <a href="#cite1" aria-label="Return to reference 1">
              ↩
            </a>
          </li>
          <li id="ref2">
            <a
              href="https://www.investopedia.com/terms/l/lump-of-labour-fallacy.asp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-700 dark:text-primary-500"
            >
              Investopedia - Lump of Labour Fallacy
            </a>{" "}
            <a href="#cite2" aria-label="Return to reference 2">
              ↩
            </a>
          </li>
          <li id="ref3">
            <a
              href="https://journals.sagepub.com/doi/10.1177/0956797613504438"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-700 dark:text-primary-500"
            >
              Sage Journals - Photo-Taking Impairs Memory
            </a>{" "}
            <a href="#cite3" aria-label="Return to reference 3">
              ↩
            </a>
          </li>
          <li id="ref4">
            <a
              href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12466594/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-700 dark:text-primary-500"
            >
              PMC - Camera Effects on Memory
            </a>{" "}
            <a href="#cite4" aria-label="Return to reference 4">
              ↩
            </a>
          </li>
          <li id="ref5">
            <a
              href="https://pubmed.ncbi.nlm.nih.gov/21764755/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-700 dark:text-primary-500"
            >
              PubMed - Google Effects on Memory
            </a>{" "}
            <a href="#cite5" aria-label="Return to reference 5">
              ↩
            </a>
          </li>
          <li id="ref6">
            <a
              href="https://arxiv.org/abs/2601.20245"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-700 dark:text-primary-500"
            >
              arXiv - AI Cognitive Offloading Study
            </a>{" "}
            <a href="#cite6" aria-label="Return to reference 6">
              ↩
            </a>
          </li>
          <li id="ref7">
            <a
              href="https://www.sciencedirect.com/science/article/pii/S2949761224000208"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-700 dark:text-primary-500"
            >
              ScienceDirect - AI Bias Study
            </a>{" "}
            <a href="#cite7" aria-label="Return to reference 7">
              ↩
            </a>
          </li>
          <li id="ref8">
            <a
              href="https://www.theguardian.com/technology/2025/jun/06/high-court-tells-uk-lawyers-to-urgently-stop-misuse-of-ai-in-legal-work"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-700 dark:text-primary-500"
            >
              The Guardian - High Court warns lawyers about AI misuse
            </a>{" "}
            <a href="#cite8" aria-label="Return to reference 8">
              ↩
            </a>
          </li>
          <li id="ref9">
            <a
              href="https://arxiv.org/abs/2508.15734"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-700 dark:text-primary-500"
            >
              arXiv - AI Energy Consumption Study
            </a>{" "}
            <a href="#cite9" aria-label="Return to reference 9">
              ↩
            </a>
          </li>
          <li id="ref10">
            <a
              href="https://pubmed.ncbi.nlm.nih.gov/29853680/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-700 dark:text-primary-500"
            >
              PubMed - Food Energy Study
            </a>{" "}
            <a href="#cite10" aria-label="Return to reference 10">
              ↩
            </a>
          </li>
          <li id="ref11">
            <a
              href="https://arxiv.org/abs/2508.15734"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-700 dark:text-primary-500"
            >
              arXiv - AI Water Usage Study
            </a>{" "}
            <a href="#cite11" aria-label="Return to reference 11">
              ↩
            </a>
          </li>
          <li id="ref12">
            <a
              href="https://www.nature.com/articles/s41598-024-54271-x"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-700 dark:text-primary-500"
            >
              Nature - AI Environmental Impact
            </a>{" "}
            <a href="#cite12" aria-label="Return to reference 12">
              ↩
            </a>
          </li>
          <li id="ref13">
            <a
              href="https://blog.samaltman.com/the-gentle-singularity"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-700 dark:text-primary-500"
            >
              Sam Altman - The Gentle Singularity
            </a>{" "}
            <a href="#cite13" aria-label="Return to reference 13">
              ↩
            </a>
          </li>
          <li id="ref14">
            <a
              href="https://cloud.google.com/blog/products/infrastructure/measuring-the-environmental-impact-of-ai-inference"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-700 dark:text-primary-500"
            >
              Google Cloud - Measuring AI Environmental Impact
            </a>{" "}
            <a href="#cite14" aria-label="Return to reference 14">
              ↩
            </a>
          </li>
          <li id="ref15">
            <a
              href="https://www.sciencedirect.com/science/article/pii/S0308521X18305675"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-700 dark:text-primary-500"
            >
              ScienceDirect - Beef Environmental Impact
            </a>{" "}
            <a href="#cite15" aria-label="Return to reference 15">
              ↩
            </a>
          </li>
          <li id="ref16">
            <a
              href="https://www.science.org/doi/10.1126/science.aaq0216"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-700 dark:text-primary-500"
            >
              Science - Food Production Environmental Impact
            </a>{" "}
            <a href="#cite16" aria-label="Return to reference 16">
              ↩
            </a>
          </li>
          <li id="ref17">
            <a
              href="https://www.researchgate.net/publication/303031899_Life_Cycle_Assessment_of_Cheese_and_Whey_Production_in_the_USA"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-700 dark:text-primary-500"
            >
              ResearchGate - Cheese Production LCA
            </a>{" "}
            <a href="#cite17" aria-label="Return to reference 17">
              ↩
            </a>
          </li>
          <li id="ref18">
            <a
              href="https://www.science.org/doi/10.1126/science.aaq0216"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-700 dark:text-primary-500"
            >
              Science - Dairy Environmental Impact
            </a>{" "}
            <a href="#cite18" aria-label="Return to reference 18">
              ↩
            </a>
          </li>
          <li id="ref19">
            <a
              href="https://www.compleatfood.com/case-studies/net-zero-sausage-roll/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-700 dark:text-primary-500"
            >
              Compleat Food - Sausage Environmental Impact
            </a>{" "}
            <a href="#cite19" aria-label="Return to reference 19">
              ↩
            </a>
          </li>
          <li id="ref20">
            <a
              href="https://www.carbonbrief.org/factcheck-what-is-the-carbon-footprint-of-streaming-video-on-netflix/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-700 dark:text-primary-500"
            >
              Carbon Brief - Streaming Video Carbon Footprint
            </a>{" "}
            <a href="#cite20" aria-label="Return to reference 20">
              ↩
            </a>
          </li>
          <li id="ref21">
            <a
              href="https://www.carbonbrief.org/factcheck-what-is-the-carbon-footprint-of-streaming-video-on-netflix/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-700 dark:text-primary-500"
            >
              Carbon Brief - Streaming Water Usage
            </a>{" "}
            <a href="#cite21" aria-label="Return to reference 21">
              ↩
            </a>
          </li>
        </ol>
      </section>
    </div>
  </section>
);
