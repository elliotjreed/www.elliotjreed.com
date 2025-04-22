import type { ReactElement } from "react";
import { CodeSnippet } from "~/components/CodeSnippet";

export const meta = () => [
  { title: "Detecting Disposable Email Addresses in PHP | EJR" },
  {
    name: "description",
    content: "A guide on detecting disposable / temporary email addresses in PHP.",
  },
  {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "Detecting disposable / temporary email addresses in PHP",
      name: "A guide on detecting disposable / temporary email addresses in PHP.",
      dateCreated: "2019-03-29T19:00:00+01:00",
      datePublished: "2019-03-29T19:00:00+01:00",
      inLanguage: "en-GB",
      author: {
        "@type": "Person",
        additionalName: "John",
        alternateName: "Elliot Reed",
        familyName: "Reed",
        givenName: "Elliot",
        name: "Elliot J. Reed",
        url: "https://www.elliotjreed.com",
      },
      copyrightHolder: {
        "@type": "Person",
        additionalName: "John",
        alternateName: "Elliot Reed",
        familyName: "Reed",
        givenName: "Elliot",
        name: "Elliot J. Reed",
        url: "https://www.elliotjreed.com",
      },
    },
  },
];

export default (): ReactElement => (
  <section className="divide-y divide-gray-200 dark:divide-gray-700">
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-700 dark:text-gray-200 sm:text-4xl sm:leading-10 md:text-6xl">
        Detecting disposable / temporary email addresses in PHP
      </h1>
      <p className="text-lg leading-7 text-gray-600 dark:text-gray-300">
        If you run a competition page or a voucher service for example, you might want to detect whether the email
        address is a "real" one and not a temporary or disposable one.
      </p>
    </div>

    <div className="prose max-w-none dark:prose-dark">
      <p>
        There is an excellent list curated by Martin Cech at{" "}
        <a
          href="https://github.com/disposable-email-domains/disposable-email-domains"
          target="_blank"
          rel="noreferrer noopener"
        >
          github.com/disposable-email-domains/disposable-email-domains
        </a>{" "}
        which I've used in a PHP package for anyone to use.
      </p>
      <p>To install the package simply add it via Composer:</p>
      <CodeSnippet code="composer require elliotjreed/disposable-emails-filter" title="Install" />

      <p>And use it like the following:</p>
      <CodeSnippet
        code={`<?php
require 'vendor/autoload.php';

use ElliotJReed\\DisposableEmail\\Email;

if ((new Email())->isDisposable('email@temporarymailaddress.com')) {
    echo 'This is a disposable / temporary email address';
}`}
        title="Usage"
      />

      <p>
        If an invalid email address is provided then an InvalidEmailException is thrown, so it is advisable to check
        that the email address is valid first. For example:
      </p>
      <CodeSnippet
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

      <p>
        The source code is available at{" "}
        <a href="https://github.com/elliotjreed/disposable-emails-filter-php" target="_blank" rel="noreferrer noopener">
          github.com/elliotjreed/disposable-emails-filter-php
        </a>
        .
      </p>
    </div>
  </section>
);
