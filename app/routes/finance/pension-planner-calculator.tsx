import type { ReactElement } from "react";
import { Link } from "react-router";
import { FrequentlyAskedQuestions } from "~/components/FrequentlyAskedQuestions/FrequentlyAskedQuestions";
import { PensionPlanner } from "~/components/PensionPlanner/PensionPlanner";
import { authorReference, createBreadcrumbs, createFaqPage, type FaqItem } from "~/data/schemaData";
import { createMeta } from "~/utils/seo";

const questions: FaqItem[] = [
  {
    question: "How is my pension pot projected?",
    answer:
      "Your current pot and future contributions are grown each year at your chosen rate, with annual charges deducted. Results are shown in today's money, so they already allow for inflation and can be compared directly with what you spend now.",
  },
  {
    question: "Which growth rates does the calculator use?",
    answer:
      "You can choose the AS TM1 rates set by the Financial Reporting Council, which are the standard behind annual pension statements and the Pensions Dashboards and range from 1% to 7% depending on how volatile your fund is. You can also use the FCA Key Features Illustration rates of 2%, 5% and 8%, set your own assumptions, or run a Monte Carlo simulation that varies returns each year.",
  },
  {
    question: "Why does the Monte Carlo model give a different answer?",
    answer:
      "A single fixed growth rate hides sequence-of-returns risk: two portfolios with the same average return can end very differently depending on when the bad years fall. The Monte Carlo model runs hundreds of random return sequences and reports the range of outcomes plus the probability your pot lasts.",
  },
  {
    question: "How much state pension will I get?",
    answer:
      "The full new State Pension is £241.30 a week in 2026/27, which needs 35 qualifying National Insurance years. Ten years is the minimum for any payment, and anything between is pro-rated. Check your own record with the state pension forecast on GOV.UK.",
  },
  {
    question: "How is pension drawdown income taxed?",
    answer:
      "A quarter of what you take is normally tax-free, up to a Lump Sum Allowance of £268,275, and the rest is taxed as income. The calculator applies the 2026/27 personal allowance and the 20%, 40% and 45% bands for England, Wales and Northern Ireland, and counts the state pension towards your taxable income.",
  },
  {
    question: "What is a FIRE number and how does early retirement work in the UK?",
    answer:
      "Your FIRE number is the pot needed to sustain your spending at your chosen withdrawal rate, commonly 25 times annual spending at a 4% rate. In the UK you cannot touch a private pension until age 57 from April 2028, so retiring earlier needs a bridge pot such as ISAs to cover the years in between. The calculator models those bridge years separately and flags any shortfall.",
  },
  {
    question: "Is my data stored or sent anywhere?",
    answer:
      "No. Every calculation runs in your browser, and your figures are saved only in your own browser's local storage so the form is still filled in when you return. Nothing is uploaded or shared.",
  },
  {
    question: "Is this financial advice?",
    answer:
      "No. This is a guidance tool using simplified assumptions, and its projections are not a promise of what you will receive. Investment returns are not guaranteed and tax rules change. For advice on your own circumstances speak to a regulated financial adviser; free impartial guidance is available from MoneyHelper and Pension Wise.",
  },
];

export function meta() {
  const title = "UK Pension Calculator and Retirement Planner | EJR";
  const description =
    "Free UK pension calculator using AS TM1 and FCA growth rates and Monte Carlo simulation, with state pension, income tax, drawdown, annuity and FIRE planning.";
  const url = "https://www.elliotjreed.com/finance/pension-planner-calculator";
  const image = "https://www.elliotjreed.com/icon-512.png";
  const keywords = [
    "pension calculator",
    "uk pension planner",
    "retirement calculator",
    "pension forecast",
    "state pension calculator",
    "pension drawdown calculator",
    "annuity calculator",
    "fire calculator uk",
    "early retirement calculator",
    "monte carlo pension",
    "as tm1",
    "retirement planning",
  ];

  return [
    ...createMeta({
      title,
      description,
      url,
      type: "website",
      image,
      imageAlt: "UK Pension Planner Calculator Icon",
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
        "@id": `${url}#webapp`,
        mainEntityOfPage: { "@id": url },
        name: "UK Pension Planner Calculator",
        alternateName: "UK Pension Forecaster and FIRE Calculator",
        url: url,
        applicationCategory: "FinanceApplication",
        operatingSystem: "Any",
        description:
          "Free UK pension planner that forecasts your pension pot and retirement income using recognised financial models, including the AS TM1 standard used on annual pension statements, FCA Key Features Illustration rates, and Monte Carlo simulation. Models the state pension, income tax, drawdown and annuity options, and early retirement (FIRE) viability.",
        browserRequirements: "Requires JavaScript. Requires HTML5.",
        softwareVersion: "1.0",
        author: authorReference,
        offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
        datePublished: "2026-08-31",
        dateModified: "2026-08-31",
        inLanguage: "en-GB",
        isAccessibleForFree: true,
        featureList: [
          "Forecast your pension pot in today's money to your chosen retirement age",
          "Choose between AS TM1 volatility group rates, FCA projection rates, or your own assumptions",
          "Monte Carlo simulation showing the range of outcomes and the chance your pot lasts",
          "Optional state pension based on your National Insurance qualifying years",
          "UK income tax modelled on retirement income, including the tax-free lump sum allowance",
          "Compare flexi-access drawdown against buying an annuity",
          "FIRE early retirement viability, including the bridge years before pension access age",
          "Retirement Living Standards presets for minimum, moderate and comfortable income",
          "Year-by-year breakdown of contributions, growth, withdrawals and tax",
          "All calculations run in your browser; your figures are never sent anywhere",
        ],
        image: image,
      },
    },

    {
      "script:ld+json": createBreadcrumbs([
        { name: "Home", url: "https://www.elliotjreed.com" },
        { name: "Finance Tools", url: "https://www.elliotjreed.com/finance" },
        { name: "Pension Planner Calculator", url: url },
      ]),
    },

    { "script:ld+json": createFaqPage(questions) },
  ];
}

export default function PensionPlannerCalculatorRoute(): ReactElement {
  return (
    <>
      <PensionPlanner />
      <section aria-labelledby="how-it-works" className="prose ejr-prose mx-auto max-w-6xl p-4">
        <h2 id="how-it-works">How this calculator works</h2>
        <p>
          The planner grows your current pot and future contributions each year at the rate you choose, takes off annual
          charges, and shows every figure in today's money so you can compare it with what you spend now. You can use
          the AS TM1 rates behind annual pension statements, the FCA Key Features Illustration rates, your own
          assumptions, or a Monte Carlo simulation that runs hundreds of different return sequences.
        </p>
        <p>
          It uses 2026/27 figures: the full new State Pension of £241.30 a week, the personal allowance and income tax
          bands for England, Wales and Northern Ireland, and the £268,275 Lump Sum Allowance. It then compares
          flexi-access drawdown with an annuity and, if you plan to retire early, checks whether you have enough to
          bridge the years before you can access your pension.
        </p>
        <p>
          Every calculation runs in your browser and nothing is sent anywhere. Not sure whether to pay more into your
          pension, clear debt or save first? Try the{" "}
          <Link to="/finance/personal-finance" prefetch="render" className="text-custard-ink underline">
            Where should I put my money? flowchart
          </Link>
          .
        </p>
      </section>
      <FrequentlyAskedQuestions questions={questions} />
    </>
  );
}
