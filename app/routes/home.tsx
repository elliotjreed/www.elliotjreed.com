import type { ReactElement } from "react";
import { Link } from "react-router";
import { SocialLinks } from "~/components/SocialLinks";
import { emailAddress } from "~/data/emailAddress";
import { useFontsReady } from "~/hooks/useFontsReady";

export function meta() {
  return [
    { title: "Elliot J. Reed | EJR" },
    {
      name: "description",
      content:
        "The personal website of Elliot J. Reed, whose interests include e-commerce and technology management, philosophy, AI, software development, DevOps, and Linux.",
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "about": "Elliot Reed is the Head of Technology for a respected e-commerce retailer based in the United Kingdom, with over 12 years experience in management and software development. His interests include AI, philosophy and ethics, DevOps, and leadership and strategy.",
        "alternateName": "Elliot Reed",
        "alternativeHeadline": "Elliot Reed's Website",
        "author": {
          "@type": "Person",
          "additionalName": "John",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": {
              "@type": "Country",
              "name": "United Kingdom"
            },
            "addressLocality": "Nottingham",
            "addressRegion": "Nottinghamshire"
          },
          "alternateName": "Elliot Reed",
          "alumniOf": [
            {
              "@type": "CollegeOrUniversity",
              "name": "University of Nottingham",
              "url": "https://www.nottingham.ac.uk"
            },
            {
              "@type": "CollegeOrUniversity",
              "name": "Nottingham Law School, Nottingham Trent University",
              "url": "https://www.ntu.ac.uk"
            },
            {
              "@type": "EducationalOrganization",
              "name": "Stowupland High School",
              "url": "https://www.stowuplandhighschool.co.uk"
            }
          ],
          "birthDate": "1990-02-25T12:21:00+00:00",
          "birthPlace": {
            "@type": "Place",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": {
                "@type": "Country",
                "name": "United Kingdom"
              },
              "addressLocality": "Bury St. Edmunds",
              "addressRegion": "Suffolk"
            }
          },
          "description": "Technology leader based in the United Kingdom, focusing on software engineering and development for the e-commerce sector. Interested in AI, philosophy and ethics, DevOps, and leadership and strategy.",
          "familyName": "Reed",
          "gender": "https://schema.org/Male",
          "givenName": "Elliot",
          "height": {
            "@type": "QuantitativeValue",
            "unitCode": "cm",
            "value": 183
          },
          "honorificSuffix": "BA (Hons.)",
          "image": {
            "@type": "ImageObject",
            "url": "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553434444/elliotjreed.jpg"
          },
          "jobTitle": "Head of Technology",
          "knowsLanguage": "en-GB",
          "name": "Elliot J. Reed",
          "nationality": {
            "@type": "Country",
            "name": "United Kingdom"
          },
          "sameAs": [
            "https://www.elliotjreed.com",
            "https://x.com/elliotjreed",
            "https://www.linkedin.com/in/elliotjreed",
            "https://github.com/elliotjreed",
            "https://bsky.app/profile/elliotjreed.bsky.social"
          ],
          "url": "https://www.elliotjreed.com"
        },
        "dateCreated": "2010-05-15T00:00:00+01:00",
        "description": "The personal website of Elliot Reed, containing current and past projects, and guides on PHP, Symfony, Javascript, React, Python, and Linux / DevOps.",
        "headline": "Elliot J. Reed's Website",
        "inLanguage": [
          "en-GB",
          "en-US"
        ],
        "keywords": [
          "Elliot Reed",
          "Elliot J. Reed",
          "elliotjreed"
        ],
        "name": "Elliot J. Reed",
        "url": "https://www.elliotjreed.com"
      }
    }
  ];
}

export default (): ReactElement => {
  const fontsReady = useFontsReady();

  return (
    <section>
      <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
        <div className="flex flex-col items-center pt-8 text-gray-700 dark:text-gray-200">
          <img
            src="https://www.elliotjreed.com/elliot-greyscale.webp"
            alt="Photograph of Elliot"
            width={192}
            height={192}
            className="h-48 w-48 rounded-full"
            loading="lazy"
            decoding="async"
          />
          <h1 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">Elliot Reed</h1>
          {/*<div className="text-gray-600 dark:text-gray-300">Engineering Manager</div>*/}
          {/*<div className="text-gray-600 dark:text-gray-300">Nottingham, United Kingdom</div>*/}
          <div className="flex space-x-3 pt-2">
            <SocialLinks />
          </div>
        </div>
        <div className="prose max-w-none pt-8 pb-8 xl:col-span-2">
          <p className={`opacity-0 ${fontsReady ? "animate-rise" : ""}`} style={{ animationDelay: "120ms" }}>
            Hi! I&apos;m Elliot, I work in e-commerce and software development. I'm based in Nottingham in the UK. My
            interests are generally in e-commerce, AI, Linux, PHP, Javascript, Docker, and general DevOps.
          </p>
          <p className={`opacity-0 ${fontsReady ? "animate-rise" : ""}`} style={{ animationDelay: "240ms" }}>
            If you work in the non-profit or charity sector and want to explore ways of using AI or software development
            in general, please do feel free to get in touch - I will be happy to volunteer my time and provide advice.
            You
            can reach me at <a href={`mailto:${emailAddress}`}>{emailAddress}</a> or via any of my social media links.
          </p>
          <p className={`opacity-0 ${fontsReady ? "animate-rise" : ""}`} style={{ animationDelay: "360ms" }}>
            A good place to start if you want to effectively use AI Assistants such as ChatGPT, Claude, and Gemini is my
            brief guide on{" "}
            <Link to="/ai/ai-prompt-engineering-guide" prefetch="render">
              AI Prompt Engineering Guide
            </Link>
            . For an easy-to-reference guide and downloadable poster, have a look at{" "}
            <Link to="/ai/cafe-ai-prompt-framework" prefetch="render">
              CAFE Prompt Framework
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};
