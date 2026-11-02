import type { ReactElement } from "react";
import { PersonalFinanceFlowchart } from "~/components/PersonalFinanceFlowchart/PersonalFinanceFlowchart";
import { createBreadcrumbs } from "~/data/schemaData";
import { FLOWCHART_STEPS } from "~/utils/personalFinance/flowchart";
import { createMeta } from "~/utils/seo";

export function meta() {
  const title = "Where Should I Put My Money? UK Personal Finance Flowchart | EJR";
  const description =
    "An interactive version of the UK Personal Finance flowchart. Answer a few questions to find out whether to clear debt, build an emergency fund, claim your pension match, save or invest next.";
  const url = "https://www.elliotjreed.com/finance/personal-finance";
  const image = "https://www.elliotjreed.com/icon-512.png";
  const keywords = [
    "uk personal finance flowchart",
    "where should i put my money",
    "order of operations personal finance",
    "emergency fund",
    "pay off debt or save",
    "employer pension match",
    "lifetime isa",
    "stocks and shares isa",
    "ukpersonalfinance",
    "money priorities uk",
    "budgeting",
    "financial planning uk",
  ];

  return [
    ...createMeta({
      title,
      description,
      url,
      type: "website",
      image,
      imageAlt: "UK Personal Finance Flowchart Icon",
      keywords,
      twitterCreator: "@elliotjreed",
    }),

    // Open Graph tags
    { property: "og:image:width", content: "512" },
    { property: "og:image:height", content: "512" },

    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "@id": url,
        name: "Where Should I Put My Money?",
        alternateName: "Interactive UK Personal Finance Flowchart",
        url: url,
        applicationCategory: "FinanceApplication",
        operatingSystem: "Any",
        description:
          "An interactive adaptation of the UK Personal Finance flowchart. It asks a question at each step of the order of operations and tells you which step to act on now, from covering essentials and clearing expensive debt through to investing for the long term.",
        browserRequirements: "Requires JavaScript. Requires HTML5.",
        softwareVersion: "1.0",
        author: { "@id": "https://www.elliotjreed.com/#author" },
        creator: { "@id": "https://www.elliotjreed.com/#author" },
        publisher: { "@id": "https://www.elliotjreed.com/#author" },
        datePublished: "2026-08-31",
        dateModified: "2026-08-31",
        inLanguage: "en-GB",
        isAccessibleForFree: true,
        license: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
        isBasedOn: "https://ukpersonal.finance/flowchart/",
        featureList: [
          "Answer a short series of questions to find the step that applies to you",
          "Covers the full UK order of operations, from essential bills to long-term investing",
          "Tailored emergency fund target based on how stable your income is",
          "Lifetime ISA guidance for first-time buyers, including the bonus and property price cap",
          "Signposts free debt charities when borrowing is needed for essentials",
          "Explains why each step comes where it does, not just what to do",
          "Your answers stay in your browser and are never sent anywhere",
        ],
        image: image,
      },
    },

    {
      "script:ld+json": createBreadcrumbs([
        { name: "Home", url: "https://www.elliotjreed.com" },
        { name: "Finance Tools", url: "https://www.elliotjreed.com/finance" },
        { name: "Where Should I Put My Money?", url: url },
      ]),
    },

    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "The UK personal finance order of operations",
        description:
          "The order in which to use your money, from covering essential bills through to investing for the long term.",
        step: FLOWCHART_STEPS.map((step) => ({
          "@type": "HowToStep",
          position: step.number,
          name: step.title,
          text: step.description,
        })),
      },
    },

    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Should I pay off debt or save first?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Clear debt charging more than about 10% APR before saving beyond a small buffer, because clearing a debt at 25% APR is a guaranteed 25% return that no savings account matches. Below that rate, a starter emergency fund and your employer pension match come first, then the remaining debt.",
            },
          },
          {
            "@type": "Question",
            name: "How big should my emergency fund be?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Start with one to three months of essential outgoings, then build towards three to twelve months once your expensive debt is gone and you are claiming your pension match. Two stable incomes need less, around three months; self-employed or irregular income needs more, around nine to twelve months.",
            },
          },
          {
            "@type": "Question",
            name: "Why does the employer pension match come before paying off debt?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "An employer match is often a 100% return on your contribution, immediately and with no risk. That beats the interest saved on almost any debt, so it is claimed before the cheaper debts are cleared. Expensive debt above roughly 10% APR is the exception and is dealt with earlier.",
            },
          },
          {
            "@type": "Question",
            name: "Should I save in cash or invest?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "It depends on when you need the money. Under five years, keep it in cash: investments can fall for years and may not recover in time. Five years or more, investing through a pension, stocks and shares ISA or Lifetime ISA has historically beaten cash comfortably.",
            },
          },
          {
            "@type": "Question",
            name: "Is a Lifetime ISA worth it for a first home?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "For most first-time buyers, yes. The government adds a 25% bonus on up to £4,000 a year, turning £4,000 into £5,000. You must be 18 to 39 to open one, the property must cost £450,000 or less, and the account must be open at least 12 months before you buy. Withdrawing for anything else before age 60 costs a 25% charge, which takes back more than the bonus.",
            },
          },
          {
            "@type": "Question",
            name: "Where can I get free help with debt?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "StepChange, National Debtline and Citizens Advice all give free debt advice, and MoneyHelper offers free impartial money guidance. Never pay a company for debt advice, as the free charities offer the same help and more.",
            },
          },
        ],
      },
    },
  ];
}

export default function PersonalFinanceRoute(): ReactElement {
  return <PersonalFinanceFlowchart />;
}
