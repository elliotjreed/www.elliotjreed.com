import type { ReactElement } from "react";
import { PercentageCalculator } from "~/components/PercentageCalculator/PercentageCalculator";

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

    // Additional meta tags
    { name: "author", content: "Elliot Reed" },
    { name: "robots", content: "index, follow" },
    { name: "googlebot", content: "index, follow" },
    { name: "theme-color", content: "#12233f" },
    { name: "mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "default" },
    { name: "apple-mobile-web-app-title", content: "Percentage Calculator" },
    { name: "application-name", content: "Percentage Calculator" },

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
        author: {
          "@type": "Person",
          name: "Elliot Reed",
          givenName: "Elliot",
          familyName: "Reed",
          url: "https://www.elliotjreed.com",
          sameAs: [
            "https://twitter.com/elliotjreed",
            "https://x.com/elliotjreed",
            "https://github.com/elliotjreed",
            "https://www.linkedin.com/in/elliotjreed",
          ],
        },
        creator: {
          "@type": "Person",
          name: "Elliot Reed",
          url: "https://www.elliotjreed.com",
        },
        publisher: {
          "@type": "Person",
          name: "Elliot Reed",
          url: "https://www.elliotjreed.com",
        },
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
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.elliotjreed.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Utils",
            item: "https://www.elliotjreed.com/utils",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Percentage Calculator",
            item: url,
          },
        ],
      },
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
