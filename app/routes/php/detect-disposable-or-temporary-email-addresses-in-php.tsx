import type { ReactElement } from "react";
import { CodeSnippet } from "~/components/CodeSnippet/CodeSnippet";
import { createBreadcrumbs, createTechArticle } from "~/data/schemaData";

export const meta = () => [
  { title: "Detecting Disposable Email Addresses in PHP | EJR" },
  {
    name: "description",
    content: "A guide on detecting disposable / temporary email addresses in PHP.",
  },
  { property: "og:title", content: "Detecting Disposable Email Addresses in PHP" },
  { property: "og:description", content: "A guide on detecting disposable / temporary email addresses in PHP." },
  { property: "og:type", content: "article" },
  {
    property: "og:url",
    content: "https://www.elliotjreed.com/php/detect-disposable-or-temporary-email-addresses-in-php",
  },
  { property: "og:site_name", content: "Elliot J. Reed" },
  { property: "og:locale", content: "en_GB" },
  { property: "og:image", content: "https://www.elliotjreed.com/og.png" },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: "Detecting Disposable Email Addresses in PHP" },
  { name: "twitter:description", content: "A guide on detecting disposable / temporary email addresses in PHP." },
  { name: "twitter:image", content: "https://www.elliotjreed.com/twitter-card.png" },
  {
    "script:ld+json": createTechArticle({
      url: "https://www.elliotjreed.com/php/detect-disposable-or-temporary-email-addresses-in-php",
      headline: "Detecting disposable / temporary email addresses in PHP",
      description: "A guide on detecting disposable / temporary email addresses in PHP.",
      datePublished: "2019-03-29T19:00:00+01:00",
      dateModified: "2026-01-30T00:00:00+00:00",
      articleSection: "PHP",
      keywords: ["PHP", "email validation", "disposable email", "security"],
      wordCount: 426,
      proficiencyLevel: "Intermediate",
    }),
  },
  {
    "script:ld+json": createBreadcrumbs([
      { name: "Home", url: "https://www.elliotjreed.com" },
      { name: "Guides", url: "https://www.elliotjreed.com" },
      {
        name: "PHP",
        url: "https://www.elliotjreed.com/php/detect-disposable-or-temporary-email-addresses-in-php",
      },
      {
        name: "Detect Disposable Emails",
        url: "https://www.elliotjreed.com/php/detect-disposable-or-temporary-email-addresses-in-php",
      },
    ]),
  },
];

export default (): ReactElement => (
  <section className="divide-y divide-gray-200 dark:divide-gray-700">
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-700 dark:text-gray-200 sm:text-4xl sm:leading-10 md:text-6xl">
        Detecting disposable / temporary email addresses in PHP
      </h1>

      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
        <span>By Elliot J. Reed</span>
        <span>•</span>
        <time dateTime="2019-03-29">
          Published: 29<sup>th</sup> March 2019
        </time>
        <span>•</span>
        <time dateTime="2026-01-30">
          Last updated: 30<sup>th</sup> January 2026
        </time>
      </div>

      <p className="prose dark:prose-dark max-w-none text-lg leading-7 text-gray-600 dark:text-gray-300">
        Use the <code>elliotjreed/disposable-emails-filter</code> PHP package to detect temporary and disposable email
        addresses in your applications, preventing abuse in competitions, voucher systems, and newsletter signups.
      </p>
    </div>

    <div className="prose max-w-none dark:prose-dark">
      <section>
        <h2>Installation</h2>
        <p>
          The <code>disposable-emails-filter</code> package uses a curated list of disposable email domains maintained
          by Martin Cech at{" "}
          <a
            href="https://github.com/disposable-email-domains/disposable-email-domains"
            target="_blank"
            rel="noreferrer noopener"
          >
            github.com/disposable-email-domains/disposable-email-domains
          </a>
          .
        </p>
        <p>Install the package via Composer:</p>
        <CodeSnippet language="bash" code="composer require elliotjreed/disposable-emails-filter" title="Install" />

        <h2>Basic Usage</h2>
        <p>Use the package to check if an email address is disposable:</p>
        <CodeSnippet
          language="php"
          code={`<?php
require 'vendor/autoload.php';

use ElliotJReed\\DisposableEmail\\Email;

if ((new Email())->isDisposable('email@temporarymailaddress.com')) {
    echo 'This is a disposable / temporary email address';
}`}
          title="Usage"
        />

        <h2>Handling Invalid Emails</h2>
        <p>
          If an invalid email address is provided, an <code>InvalidEmailException</code> is thrown. Always validate the
          email format first using PHP's built-in <code>filter_var()</code> function:
        </p>
        <CodeSnippet
          language="php"
          code={`$email = 'not-a-real-email-address#example.net'

if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    if ((new Email())->isDisposable($email)) {
        echo 'This is a disposable / temporary email address';
    }
} else {
    echo 'This is not a valid email address';
}`}
          title="Handling invalid emails"
        />

        <h2>Exception Handling with Try-Catch</h2>
        <p>
          For more robust error handling, especially in production applications, use a try-catch block to handle the{" "}
          <code>InvalidEmailException</code>:
        </p>
        <CodeSnippet
          language="php"
          code={`<?php
require 'vendor/autoload.php';

use ElliotJReed\\DisposableEmail\\Email;
use ElliotJReed\\DisposableEmail\\Exception\\InvalidEmailException;

try {
    $email = new Email();
    if ($email->isDisposable('user@example.com')) {
        echo 'This is a disposable email address';
    } else {
        echo 'This is a valid, non-disposable email address';
    }
} catch (InvalidEmailException $exception) {
    echo 'Invalid email address provided: ' . $exception->getMessage();
}`}
          title="Try-Catch Example"
        />

        <h2>Package Information</h2>
        <p>
          The <code>disposable-emails-filter</code> package is actively maintained and compatible with PHP 7.4 and
          above, including PHP 8.x. The underlying disposable email domain list is regularly updated to include new
          temporary email services as they appear. The package uses semantic versioning and is production-ready for use
          in commercial applications.
        </p>
        <p>
          Source code and contributions are available at{" "}
          <a
            href="https://github.com/elliotjreed/disposable-emails-filter-php"
            target="_blank"
            rel="noreferrer noopener"
          >
            github.com/elliotjreed/disposable-emails-filter-php
          </a>
          .
        </p>

        <h2>Frequently Asked Questions</h2>

        <h3>How often is the disposable email list updated?</h3>
        <p>
          The package uses the{" "}
          <a
            href="https://github.com/disposable-email-domains/disposable-email-domains"
            target="_blank"
            rel="noreferrer noopener"
          >
            disposable-email-domains
          </a>{" "}
          repository maintained by Martin Cech, which is updated regularly as new disposable email services are
          discovered. When you install or update the package via Composer, you'll get the latest version of the domain
          list. For the most current protection, keep your dependencies updated with <code>composer update</code>.
        </p>

        <h3>What if a legitimate domain is flagged?</h3>
        <p>
          Whilst false positives are rare, if a legitimate domain is incorrectly flagged as disposable, you have two
          options: (1) Report the issue to the{" "}
          <a
            href="https://github.com/disposable-email-domains/disposable-email-domains"
            target="_blank"
            rel="noreferrer noopener"
          >
            upstream repository
          </a>{" "}
          for review and correction, or (2) implement custom logic in your application to whitelist specific domains
          before checking with the package. Remember that the list is community-maintained and corrections are typically
          made quickly.
        </p>

        <h3>Can I whitelist specific domains?</h3>
        <p>
          The package itself doesn't provide a built-in whitelist feature, but you can easily implement this in your
          application logic. Before calling <code>isDisposable()</code>, check if the email domain is in your custom
          whitelist array. For example: if your organisation uses a domain that's incorrectly flagged, add it to an
          array of allowed domains and skip the disposable check for those addresses. This gives you flexibility whilst
          still benefiting from the package's comprehensive detection.
        </p>
      </section>
    </div>
  </section>
);
