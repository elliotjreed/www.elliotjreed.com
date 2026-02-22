import { createBreadcrumbs, createTechArticle } from "../../../app/data/schemaData.js";
import { codeBlock } from "../../components/codeBlock.js";
import type { AmpPageData } from "../../layout.js";

const PAGE_URL = "https://www.elliotjreed.com/php/detect-disposable-or-temporary-email-addresses-in-php";

export function renderPage(): AmpPageData {
  return {
    title: "Detecting Disposable Email Addresses in PHP | EJR",
    description: "A guide on detecting disposable / temporary email addresses in PHP.",
    canonicalPath: "/php/detect-disposable-or-temporary-email-addresses-in-php",
    type: "article",
    schemas: [
      createTechArticle({
        url: PAGE_URL,
        headline: "Detecting disposable / temporary email addresses in PHP",
        description: "A guide on detecting disposable / temporary email addresses in PHP.",
        datePublished: "2019-03-29T19:00:00+01:00",
        dateModified: "2026-01-30T00:00:00+00:00",
        articleSection: "PHP",
        keywords: ["PHP", "email validation", "disposable email", "security"],
        wordCount: 426,
        proficiencyLevel: "Intermediate",
      }),
      createBreadcrumbs([
        { name: "Home", url: "https://www.elliotjreed.com" },
        { name: "PHP Guides", url: "https://www.elliotjreed.com/php" },
        { name: "Detect Disposable Emails", url: PAGE_URL },
      ]),
    ],
    body: `<section class="page-section">
  <div class="page-header">
    <h1 class="page-title">Detecting disposable / temporary email addresses in PHP</h1>
    <div class="page-meta">
      <span>By Elliot J. Reed</span>
      <span>&#8226;</span>
      <time datetime="2019-03-29">Published: 29th March 2019</time>
      <span>&#8226;</span>
      <time datetime="2026-01-30">Last updated: 30th January 2026</time>
    </div>
    <p class="page-intro">
      Use the <code>elliotjreed/disposable-emails-filter</code> PHP package to detect temporary and disposable email
      addresses in your applications, preventing abuse in competitions, voucher systems, and newsletter signups.
    </p>
  </div>
  <div class="prose">
    <section>
      <h2>Installation</h2>
      <p>
        The <code>disposable-emails-filter</code> package uses a curated list of disposable email domains maintained
        by Martin Cech at
        <a href="https://github.com/disposable-email-domains/disposable-email-domains" rel="noopener noreferrer">
          github.com/disposable-email-domains/disposable-email-domains
        </a>.
      </p>
      <p>Install the package via Composer:</p>
      ${codeBlock("composer require elliotjreed/disposable-emails-filter", "Install", "bash")}

      <h2>Basic Usage</h2>
      <p>Use the package to check if an email address is disposable:</p>
      ${codeBlock(
        `<?php
require 'vendor/autoload.php';

use ElliotJReed\\DisposableEmail\\Email;

if ((new Email())->isDisposable('email@temporarymailaddress.com')) {
    echo 'This is a disposable / temporary email address';
}`,
        "Usage",
        "php",
      )}

      <h2>Handling Invalid Emails</h2>
      <p>
        If an invalid email address is provided, an <code>InvalidEmailException</code> is thrown. Always validate the
        email format first using PHP&#39;s built-in <code>filter_var()</code> function:
      </p>
      ${codeBlock(
        `$email = 'not-a-real-email-address#example.net'

if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    if ((new Email())->isDisposable($email)) {
        echo 'This is a disposable / temporary email address';
    }
} else {
    echo 'This is not a valid email address';
}`,
        "Handling invalid emails",
        "php",
      )}

      <h2>Exception Handling with Try-Catch</h2>
      <p>
        For more robust error handling, especially in production applications, use a try-catch block to handle the
        <code>InvalidEmailException</code>:
      </p>
      ${codeBlock(
        `<?php
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
}`,
        "Try-Catch Example",
        "php",
      )}

      <h2>Package Information</h2>
      <p>
        The <code>disposable-emails-filter</code> package is actively maintained and compatible with PHP 7.4 and
        above, including PHP 8.x. The underlying disposable email domain list is regularly updated to include new
        temporary email services as they appear.
      </p>
      <p>
        Source code and contributions are available at
        <a href="https://github.com/elliotjreed/disposable-emails-filter-php" rel="noopener noreferrer">
          github.com/elliotjreed/disposable-emails-filter-php
        </a>.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>How often is the disposable email list updated?</h3>
      <p>
        The package uses the
        <a href="https://github.com/disposable-email-domains/disposable-email-domains" rel="noopener noreferrer">
          disposable-email-domains
        </a>
        repository maintained by Martin Cech, which is updated regularly as new disposable email services are
        discovered. When you install or update the package via Composer, you&#39;ll get the latest version of the
        domain list. For the most current protection, keep your dependencies updated with <code>composer update</code>.
      </p>

      <h3>What if a legitimate domain is flagged?</h3>
      <p>
        Whilst false positives are rare, if a legitimate domain is incorrectly flagged as disposable, you have two
        options: (1) Report the issue to the upstream repository for review and correction, or (2) implement custom
        logic in your application to whitelist specific domains before checking with the package.
      </p>

      <h3>Can I whitelist specific domains?</h3>
      <p>
        The package itself doesn&#39;t provide a built-in whitelist feature, but you can easily implement this in your
        application logic. Before calling <code>isDisposable()</code>, check if the email domain is in your custom
        whitelist array. This gives you flexibility whilst still benefiting from the package&#39;s comprehensive
        detection.
      </p>
    </section>
  </div>
</section>`,
  };
}
