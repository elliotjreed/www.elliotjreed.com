import { FC, ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { animated, useSpring } from "react-spring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";
import { faTelegram } from "@fortawesome/free-brands-svg-icons/faTelegram";
import { faTwitter } from "@fortawesome/free-brands-svg-icons/faTwitter";

import { useFetch } from "../hooks/useFetch";
import { Person } from "../interfaces/Person";

export const Home: FC = (): ReactElement => {
  const [author, setAuthor] = useState<Person>({
    additionalName: "John",
    alternateName: "Elliot Reed",
    familyName: "Reed",
    givenName: "Elliot",
    name: "Elliot J. Reed"
  });

  const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });

  const [response, responseErrors] = useFetch<Person>({
    url: "https://api.elliotjreed.com/blog/author",
    cacheResponse: true
  });

  useEffect((): void => {
    if (response !== null && response !== undefined) {
      setAuthor(response);
    }
  }, [response]);

  useEffect((): void => {
    if (responseErrors.length > 0) {
      console.error(responseErrors);
    }
  }, [responseErrors]);

  return (
    <>
      <Helmet>
        <title>Elliot J. Reed</title>
        <meta
          name="description"
          content="Hi, I'm Elliot, a software developer from Nottingham. This website has guides on PHP, Symfony, Javascript, React, Python, and Linux / DevOps."
        />
        <script type="application/ld+json">{JSON.stringify(author)}</script>
      </Helmet>

      <animated.section style={springProps}>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center pt-8">
            <img
              src="https://res.cloudinary.com/elliotjreed/image/upload/w_384,h_384,c_scale,f_auto,q_auto/v1553434444/elliotjreed.jpg"
              alt="Photograph of Elliot"
              width={192}
              height={192}
              className="h-48 w-48 rounded-full"
              loading="lazy"
            />
            <h1 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">Elliot Reed</h1>
            <div className="text-gray-500 dark:text-gray-400">Technical Lead, Software Development</div>
            <div className="text-gray-500 dark:text-gray-400">Nottingham, United Kingdom</div>
            <div className="flex space-x-3 pt-6">
              <a href="https://github.com/elliotjreed" target="noreferrer noopener" title="GitHub">
                <span className="icon">
                  <FontAwesomeIcon className="fa-lg" icon={faGithub} aria-label="GitHub Profile" />
                </span>
              </a>
              <a href="https://www.linkedin.com/in/elliotjreed/" target="noreferrer noopener" title="LinkedIn">
                <span className="icon">
                  <FontAwesomeIcon className="fa-lg" icon={faLinkedin} aria-label="LinkedIn Profile" />
                </span>
              </a>
              <a href="https://twitter.com/elliotjreed" target="noreferrer noopener" title="Twitter">
                <span className="icon">
                  <FontAwesomeIcon className="fa-lg" icon={faTwitter} aria-label="Twitter Profile" />
                </span>
              </a>
              <a href="https://t.me/elliotjreed" target="noreferrer noopener" title="Telegram">
                <span className="icon">
                  <FontAwesomeIcon className="fa-lg" icon={faTelegram} aria-label="Telegram" />
                </span>
              </a>
            </div>
          </div>
          <div className="prose max-w-none pt-8 pb-8 dark:prose-dark xl:col-span-2">
            <p>
              Hi! I&apos;m Elliot, a software developer / technical lead based in Nottingham. My interests are generally
              in E-Commerce, Linux, PHP, Javascript, Docker, and general DevOps.
            </p>
            <p>
              My (current) favourite frameworks of choice are Symfony for PHP and React for Javascript. Professionally I
              use AWS more than any other cloud provider, but personally I am quite a fan of DigitalOcean.
            </p>
            <p>
              This website and the backend API serve mostly as my little playground for trying out different packages
              and tools, but also contains little mini-guides and snippets which may prove helpful, and if you&apos;re
              stuck on anything you think I may be able to help with <Link to="/contact">give me a shout</Link>. The
              source code for the frontend is available at{" "}
              <a href="https://github.com/elliotjreed/www.elliotjreed.com/" target="noreferrer noopener">
                github.com/elliotjreed/www.elliotjreed.com
              </a>{" "}
              and the backend API at{" "}
              <a href="https://github.com/elliotjreed/api.elliotjreed.com/" target="noreferrer noopener">
                github.com/elliotjreed/api.elliotjreed.com
              </a>
              . It&apos;s basically getting the content via the GitHub API from the{" "}
              <a href="https://github.com/elliotjreed" target="noreferrer noopener">
                github.com/elliotjreed
              </a>{" "}
              profile repository, which is nice.
            </p>
          </div>
        </div>
        <div>
          <div className="prose max-w-none pt-8 pb-8 dark:prose-dark">
            <section>
              <h2 className="text-lg font-bold leading-8 tracking-tight">
                <a href="https://github.com/elliotjreed/haveibeenpwned" rel="noreferrer noopener">
                  Have I Been Pwned PHP
                </a>
              </h2>
              <p>
                A PHP package for accessing the{" "}
                <a href="https://haveibeenpwned.com" rel="noreferrer noopener">
                  HIBP
                </a>{" "}
                API, to check for leaked email addresses and passwords in a secure manner. It can be installed via{" "}
                <a href="https://getcomposer.org/" rel="noreferrer noopener">
                  Composer
                </a>{" "}
                by running <code>composer require elliotjreed/haveibeenpwned</code>.
              </p>
              <p>
                Documentation can be found in the{" "}
                <a href="https://github.com/elliotjreed/haveibeenpwned" rel="noreferrer noopener">
                  GitHub repository
                </a>
                , but it&apos;s as simple as providing your HIBP API key and a Guzzle client and using as follows:
              </p>
              <pre className="whitespace-pre-wrap">
                {`$guzzle = new \\GuzzleHttp\\Client();
$apiKey = 'HIBP-API-KEY';

/**
   Return a count of all breaches for a specified email address (int)
*/
$count = (new \\ElliotJReed\\HaveIBeenPwned\\BreachedAccount($guzzle, $apiKey))->count('email@example.com');

/**
   Return details of all breaches for a specified email address
   (ElliotJReed\\HaveIBeenPwned\\Entity\\Breach[])
*/
$breaches = (new \\ElliotJReed\\HaveIBeenPwned\\BreachedAccount($guzzle, $apiKey))->breaches('email@example.com');

/**
   Return the names of the breaches for a specified email address (string[])
*/
$breachNames = (new \\ElliotJReed\\HaveIBeenPwned\\BreachedAccount($guzzle, $apiKey))->breachNames('email@example.com');

/**
   Return a count of exposed passwords for a specified password (int).
   This API call DOES NOT send the actual password to the Have I Been Pwned API.
*/
$passwordCount = (new \\ElliotJReed\\HaveIBeenPwned\\Password($guzzle, $apiKey))->count('password123');`}
              </pre>
            </section>

            <section>
              <h2 className="text-lg font-bold leading-8 tracking-tight">
                <a href="https://github.com/elliotjreed/disposable-emails-filter-php" rel="noreferrer noopener">
                  Disposable Email Filter / Checker
                </a>
              </h2>
              <p>
                A PHP package for checking whether a provided email address is likely to be a temporary / disposable
                one. It gets automatically updated frequently too, so that&apos;s nice. It can be installed via{" "}
                <a href="https://getcomposer.org/" rel="noreferrer noopener">
                  Composer
                </a>{" "}
                by running <code>composer require elliotjreed/disposable-emails-filter</code>.
              </p>
              <p>
                Documentation can be found in the{" "}
                <a href="https://github.com/elliotjreed/disposable-emails-filter-php" rel="noreferrer noopener">
                  GitHub repository
                </a>
                , but basically you just provide an email address and it will return <code>true</code> if it is likely
                to be a temporary one:
              </p>
              <pre className="whitespace-pre-wrap">
                {`$guzzle = new \\GuzzleHttp\\Client();
use ElliotJReed\\DisposableEmail\\Email;

if ((new Email())->isDisposable('email@temporarymailaddress.com')) {
    echo 'This is a disposable / temporary email address';
}`}
              </pre>
            </section>

            <section>
              <h2 className="text-lg font-bold leading-8 tracking-tight">
                <a href="https://github.com/elliotjreed/database-anonymiser" rel="noreferrer noopener">
                  Database Anonymiser
                </a>
              </h2>
              <p>
                A PHP package for anonymising database (MySQL, MariaDB, Postgres, SQLite) data. It can be used as part
                of an automated process to have an up-to-date development database with fake data.
              </p>
              <p>
                Documentation can be found in the{" "}
                <a href="https://github.com/elliotjreed/database-anonymiser" rel="noreferrer noopener">
                  GitHub repository
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold leading-8 tracking-tight">
                <a href="https://github.com/elliotjreed/cloudflare-cache-purge-php" rel="noreferrer noopener">
                  Cloudflare Cache Purge PHP
                </a>
              </h2>
              <p>
                A PHP package for checking whether a provided email address is likely to be a temporary / disposable
                one. It gets automatically updated frequently too, so that&apos;s nice. It can be installed via{" "}
                <a href="https://getcomposer.org/" rel="noreferrer noopener">
                  Composer
                </a>{" "}
                by running <code>composer require elliotjreed/cloudflare-cache-purge</code>.
              </p>
              <p>
                Documentation can be found in the{" "}
                <a href="https://github.com/elliotjreed/cloudflare-cache-purge-php" rel="noreferrer noopener">
                  GitHub repository
                </a>
                , but essentially you just provide yur Cloudflare API token and a Zone ID (i.e. a domain) and it will
                purge the cache for the files / URLs provided:
              </p>
              <pre className="whitespace-pre-wrap">
                {`use ElliotJReed\\Cache;
use ElliotJReed\\Exception\\Cloudflare;
use GuzzleHttp\\Client;

$urls = [
    'https://www.example.com.com/image1.png',
    'https://www.example.com.com/image2.png'
];

try {
    $cacheResponse = (new Cache(new Client(), 'SECRET CLOUDFLARE API TOKEN'))
        ->purgeFiles('zone-id-from-api-or-dashboard', $urls);

    foreach ($cacheResponse->getResults() as $result) {
        echo 'Cache Purge Response ID: ' . $result->getId() . \\PHP_EOL;
    }
} catch (Cloudflare $exception) {
    echo $exception->getMessage() . \\PHP_EOL;
    echo $exception->getPrevious()->getMessage() . \\PHP_EOL;
}`}
              </pre>
            </section>
          </div>
        </div>
      </animated.section>
    </>
  );
};
