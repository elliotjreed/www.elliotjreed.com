import { FC, ReactElement } from "react";
import { animated, useSpring } from "react-spring";

export const Packages: FC = (): ReactElement => {
  const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });

  return (
    <animated.section className="divide-y divide-gray-200 dark:divide-gray-700" style={springProps}>
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Packages and Libraries
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Some packages and libraries I maintain, more information can be found on{" "}
          <a href="https://github.com/elliotjreed" rel="noreferrer noopener">
            my GitHub profile
          </a>
          .
        </p>
      </div>
      <div className="prose max-w-none dark:prose-dark">
        <section>
          <h3 className="text-lg font-bold leading-8 tracking-tight">
            <a href="https://github.com/elliotjreed/haveibeenpwned" rel="noreferrer noopener">
              Have I Been Pwned PHP
            </a>
          </h3>
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
          <h3 className="text-lg font-bold leading-8 tracking-tight">
            <a href="https://github.com/elliotjreed/disposable-emails-filter-php" rel="noreferrer noopener">
              Disposable Email Filter / Checker
            </a>
          </h3>
          <p>
            A PHP package for checking whether a provided email address is likely to be a temporary / disposable one. It
            gets automatically updated frequently too, so that&apos;s nice. It can be installed via{" "}
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
            , but basically you just provide an email address and it will return <code>true</code> if it is likely to be
            a temporary one:
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
          <h3 className="text-lg font-bold leading-8 tracking-tight">
            <a href="https://github.com/elliotjreed/database-anonymiser" rel="noreferrer noopener">
              Database Anonymiser
            </a>
          </h3>
          <p>
            A PHP package for anonymising database (MySQL, MariaDB, Postgres, SQLite) data. It can be used as part of an
            automated process to have an up-to-date development database with fake data.
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
          <h3 className="text-lg font-bold leading-8 tracking-tight">
            <a href="https://github.com/elliotjreed/cloudflare-cache-purge-php" rel="noreferrer noopener">
              Cloudflare Cache Purge PHP
            </a>
          </h3>
          <p>
            A PHP package for checking whether a provided email address is likely to be a temporary / disposable one. It
            gets automatically updated frequently too, so that&apos;s nice. It can be installed via{" "}
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
            , but essentially you just provide yur Cloudflare API token and a Zone ID (i.e. a domain) and it will purge
            the cache for the files / URLs provided:
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
    </animated.section>
  );
};
