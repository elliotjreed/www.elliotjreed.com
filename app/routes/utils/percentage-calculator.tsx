import type { ReactElement } from "react";
import { PercentageCalculator } from "~/components/PercentageCalculator/PercentageCalculator";
import { createBreadcrumbs } from "~/data/schemaData";

export function meta() {
  const title = "Percentage Calculator | EJR";
  const description =
    "Free online percentage calculator with history tracking. Calculate what X% of Y is, percentage changes, and percentage differences. Mobile-friendly with dark mode support.";
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
  ].join(", ");

  return [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: keywords },

    // Open Graph tags
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:type", content: "website" },
    { property: "og:image", content: image },
    { property: "og:image:width", content: "512" },
    { property: "og:image:height", content: "512" },
    { property: "og:image:alt", content: "Percentage Calculator Icon" },
    { property: "og:site_name", content: "Elliot J. Reed" },
    { property: "og:locale", content: "en_GB" },

    // Twitter Card tags
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    { name: "twitter:image:alt", content: "Percentage Calculator Icon" },
    { name: "twitter:site", content: "@elliotjreed" },
    { name: "twitter:creator", content: "@elliotjreed" },

    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "@id": url,
        name: "Percentage Calculator",
        alternateName: "Free Percentage Calculator",
        url: url,
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        description:
          "Free online percentage calculator for calculating percentages, percentage changes, and percentage differences. Features calculation history with localStorage support, dark mode, and mobile-friendly responsive design.",
        browserRequirements: "Requires JavaScript. Requires HTML5.",
        softwareVersion: "1.0",
        author: { "@id": "https://www.elliotjreed.com/#author" },
        creator: { "@id": "https://www.elliotjreed.com/#author" },
        publisher: { "@id": "https://www.elliotjreed.com/#author" },
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
        { name: "Utils", url: "https://www.elliotjreed.com/utils" },
        { name: "Percentage Calculator", url: url },
      ]),
    },

    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How do I calculate what percentage one number is of another?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "To find what percent X is of Y, divide X by Y and multiply by 100. For example, to find what percent 50 is of 200: (50 ÷ 200) × 100 = 25%. Use the 'X is what percent of Y?' calculator for instant results.",
            },
          },
          {
            "@type": "Question",
            name: "How do I calculate X% of a number?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "To calculate X% of Y, multiply Y by X and divide by 100. For example, 25% of 200 = (200 × 25) ÷ 100 = 50. Use the 'What is X% of Y?' calculator for quick calculations.",
            },
          },
          {
            "@type": "Question",
            name: "How do I calculate percentage increase or decrease?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "To calculate percentage change, subtract the original value from the new value, divide by the absolute value of the original, and multiply by 100. For example, from 100 to 150: ((150 - 100) ÷ 100) × 100 = 50% increase. Use the 'Percentage Change' calculator for automatic calculation.",
            },
          },
          {
            "@type": "Question",
            name: "Does this calculator store my calculations?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, your calculation history is stored locally in your browser using localStorage. This means your data never leaves your device and is completely private. You can view, re-run, or delete previous calculations at any time.",
            },
          },
          {
            "@type": "Question",
            name: "Is the percentage calculator free to use?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, this percentage calculator is completely free to use. No registration, login, or payment is required. It works entirely in your browser and can even work offline after the initial load.",
            },
          },
        ],
      },
    },
  ];
}

export default function PercentageCalculatorRoute(): ReactElement {
  return <PercentageCalculator />;
}
