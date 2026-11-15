import type { ReactElement } from "react";
import { FrequentlyAskedQuestions } from "~/components/FrequentlyAskedQuestions/FrequentlyAskedQuestions";
import { PercentageCalculator } from "~/components/PercentageCalculator/PercentageCalculator";
import { authorReference, createBreadcrumbs, createFaqPage, type FaqItem } from "~/data/schemaData";
import { createMeta } from "~/utils/seo";

const questions: FaqItem[] = [
  {
    question: "How do I calculate what percentage one number is of another?",
    answer:
      "To find what percent X is of Y, divide X by Y and multiply by 100. For example, to find what percent 50 is of 200: (50 ÷ 200) × 100 = 25%. Use the 'X is what percent of Y?' calculator for instant results.",
  },
  {
    question: "How do I calculate X% of a number?",
    answer:
      "To calculate X% of Y, multiply Y by X and divide by 100. For example, 25% of 200 = (200 × 25) ÷ 100 = 50. Use the 'What is X% of Y?' calculator for quick calculations.",
  },
  {
    question: "How do I calculate percentage increase or decrease?",
    answer:
      "To calculate percentage change, subtract the original value from the new value, divide by the absolute value of the original, and multiply by 100. For example, from 100 to 150: ((150 - 100) ÷ 100) × 100 = 50% increase. Use the 'Percentage Change' calculator for automatic calculation.",
  },
  {
    question: "Does this calculator store my calculations?",
    answer:
      "Yes, your calculation history is stored locally in your browser using localStorage. This means your data never leaves your device and is completely private. You can view, re-run, or delete previous calculations at any time.",
  },
  {
    question: "Is the percentage calculator free to use?",
    answer:
      "Yes, this percentage calculator is completely free to use. No registration, login, or payment is required. It works entirely in your browser and can even work offline after the initial load.",
  },
];

export function meta() {
  const title = "Percentage Calculator | EJR";
  const description =
    "Free online percentage calculator. Work out X% of Y, what percent one number is of another, and percentage increases or decreases, with saved history.";
  const url = "https://www.elliotjreed.com/utils/percentage-calculator";
  const image = "https://www.elliotjreed.com/icon-512.png";
  const keywords = [
    "percentage calculator",
    "calculate percentage",
    "percentage change calculator",
    "percentage difference",
    "percentage of number",
    "percent calculator",
    "online calculator",
    "percentage increase calculator",
    "percentage decrease calculator",
    "free calculator",
    "percentage tool",
    "math calculator",
  ];

  return [
    ...createMeta({
      title,
      description,
      url,
      type: "website",
      image,
      imageAlt: "Percentage Calculator Icon",
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
        name: "Percentage Calculator",
        alternateName: "Free Percentage Calculator",
        url: url,
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        description:
          "Free online percentage calculator for calculating percentages, percentage changes, and percentage differences. Features calculation history with localStorage support, dark mode, and mobile-friendly responsive design.",
        browserRequirements: "Requires JavaScript. Requires HTML5.",
        softwareVersion: "1.0",
        author: authorReference,
        offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
        datePublished: "2025-01-28",
        dateModified: "2025-01-28",
        inLanguage: "en-GB",
        isAccessibleForFree: true,
        featureList: [
          "Calculate what X% of Y is (e.g., 25% of 200 = 50)",
          "Calculate what percent X is of Y (e.g., 50 is 25% of 200)",
          "Calculate percentage change between two values (increase/decrease)",
          "Calculation history with localStorage persistence",
          "Re-run previous calculations with one click",
          "Delete individual calculations or clear all history",
          "Dark mode support with system preference detection",
          "Mobile-friendly responsive design",
          "No registration or login required",
          "Works offline after initial load",
          "Privacy-focused - all calculations stored locally",
        ],
        image: image,
      },
    },

    {
      "script:ld+json": createBreadcrumbs([
        { name: "Home", url: "https://www.elliotjreed.com" },
        { name: "Percentage Calculator", url: url },
      ]),
    },

    { "script:ld+json": createFaqPage(questions) },
  ];
}

export default function PercentageCalculatorRoute(): ReactElement {
  return (
    <>
      <PercentageCalculator />
      <FrequentlyAskedQuestions questions={questions} />
    </>
  );
}
