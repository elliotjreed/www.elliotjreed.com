import { FC, ReactElement } from "react";
import { Helmet } from "react-helmet";
import { animated, useSpring } from "react-spring";
import { Link } from "react-router-dom";

export const Projects: FC = (): ReactElement => {
  const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });

  return (
    <>
      <Helmet>
        <title>Projects | Elliot J. Reed</title>
        <meta name="description" content="Links to projects I've created or worked on." />
      </Helmet>

      <animated.section className="divide-y divide-gray-200 dark:divide-gray-700" style={springProps}>
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Projects
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            A selection of projects I&apos;ve created or worked on.
          </p>
        </div>

        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            <div className="md p-4 md:w-1/2" style={{ maxWidth: "544px" }}>
              <div className="h-full overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700">
                <Link to="/stay-alert">
                  <img
                    alt="Screenshot of my Stay Alert fun mini app"
                    src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1648992556/stay-alert.png"
                    className="object-cover object-center md:h-36 lg:h-48"
                    width={544}
                    height={306}
                    loading="lazy"
                  />
                </Link>
                <div className="p-6">
                  <Link to="/stay-alert">
                    <h2 className="text-xl font-bold leading-8 tracking-tight">&ldquo;Stay Alert&rdquo; generator</h2>
                  </Link>
                  <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">
                    A small Javascript experiment to generate custom &ldquo;Stay Alert&rdquo; posters. It was a mildly
                    entertaining means of sending messages to friends for all of about five minutes.
                  </p>
                </div>
              </div>
            </div>

            <div className="md p-4 md:w-1/2" style={{ maxWidth: "544px" }}>
              <div className="h-full overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700">
                <Link to="/government-tweet">
                  <img
                    alt="Screenshot of my Stay Alert fun mini app"
                    src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1648992556/government-tweet.png"
                    className="object-cover object-center md:h-36 lg:h-48"
                    width={544}
                    height={306}
                    loading="lazy"
                  />
                </Link>
                <div className="p-6">
                  <Link to="/government-tweet">
                    <h2 className="text-xl font-bold leading-8 tracking-tight">No. 10 Government tweet generator</h2>
                  </Link>
                  <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">
                    A small Javascript experiment to generate custom UK government tweets.
                  </p>
                </div>
              </div>
            </div>

            <div className="md p-4 md:w-1/2" style={{ maxWidth: "544px" }}>
              <div className="h-full overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700">
                <a href="https://www.bunches.co.uk" rel="noreferrer noopener">
                  <img
                    alt="Screenshot of Bunches' website"
                    src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1648992556/bunches.png"
                    className="object-cover object-center md:h-36 lg:h-48"
                    width={544}
                    height={306}
                    loading="lazy"
                  />
                </a>
                <div className="p-6">
                  <a href="https://www.bunches.co.uk" rel="noreferrer noopener">
                    <h2 className="text-xl font-bold leading-8 tracking-tight">Bunches&apos; website</h2>
                  </a>
                  <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">
                    The primary B2C website of Bunches, it&apos;s had something of an almighty rewrite over the past few
                    years.
                  </p>
                </div>
              </div>
            </div>

            <div className="md p-4 md:w-1/2" style={{ maxWidth: "544px" }}>
              <div className="h-full overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700">
                <a href="https://www.joekozak.co.uk/" rel="noreferrer noopener">
                  <img
                    alt="Screenshot of www.joekozak.com"
                    src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1648992556/joe-kozak.png"
                    className="object-cover object-center md:h-36 lg:h-48"
                    width={544}
                    height={306}
                    loading="lazy"
                  />
                </a>
                <div className="p-6">
                  <a href="https://www.joekozak.co.uk/" rel="noreferrer noopener">
                    <h2 className="text-xl font-bold leading-8 tracking-tight">Joe Kozak&apos;s website</h2>
                  </a>
                  <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">
                    The website of comedian and performer Joe Kozak.
                  </p>
                </div>
              </div>
            </div>

            <div className="md p-4 md:w-1/2" style={{ maxWidth: "544px" }}>
              <div className="h-full overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700">
                <a href="https://www.charismahair.co.uk" rel="noreferrer noopener">
                  <img
                    alt="Screenshot of the Charisma Hair website"
                    src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1648992556/charisma-hair.png"
                    className="object-cover object-center md:h-36 lg:h-48"
                    width={544}
                    height={306}
                    loading="lazy"
                  />
                </a>
                <div className="p-6">
                  <a href="https://www.charismahair.co.uk" rel="noreferrer noopener">
                    <h2 className="text-xl font-bold leading-8 tracking-tight">Charisma Hair website</h2>
                  </a>
                  <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">
                    The website for Charisma Hair, hair stylists in Suffolk.
                  </p>
                </div>
              </div>
            </div>

            <div className="md p-4 md:w-1/2" style={{ maxWidth: "544px" }}>
              <div className="h-full overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700">
                <a href="https://github.com/elliotjreed/haveibeenpwned" rel="noreferrer noopener">
                  <img
                    alt="Screenshot of the package GitHub repository"
                    src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1648992556/github.png"
                    className="object-cover object-center md:h-36 lg:h-48"
                    width={544}
                    height={306}
                    loading="lazy"
                  />
                </a>
                <div className="p-6">
                  <a href="https://github.com/elliotjreed/haveibeenpwned" rel="noreferrer noopener">
                    <h2 className="text-xl font-bold leading-8 tracking-tight">
                      <em>Have I Been Pwned</em> PHP GitHub repository
                    </h2>
                  </a>
                  <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">
                    A PHP package for querying the <em>HIBP</em> API. It can be installed via{" "}
                    <a href="https://getcomposer.org/" rel="noreferrer noopener">
                      Composer
                    </a>{" "}
                    by running <code>composer require elliotjreed/haveibeenpwned</code>.
                  </p>
                </div>
              </div>
            </div>

            <div className="md p-4 md:w-1/2" style={{ maxWidth: "544px" }}>
              <div className="h-full overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700">
                <a href="https://github.com/elliotjreed/disposable-emails-filter-php" rel="noreferrer noopener">
                  <img
                    alt="Screenshot of the package GitHub repository"
                    src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1648992556/github.png"
                    className="object-cover object-center md:h-36 lg:h-48"
                    width={544}
                    height={306}
                    loading="lazy"
                  />
                </a>
                <div className="p-6">
                  <a href="https://github.com/elliotjreed/disposable-emails-filter-php" rel="noreferrer noopener">
                    <h2 className="text-xl font-bold leading-8 tracking-tight">
                      Disposable Emails Filter PHP repository
                    </h2>
                  </a>
                  <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">
                    A PHP package for detecting whether an email address is disposable / temporary. It can be installed
                    via{" "}
                    <a href="https://getcomposer.org/" rel="noreferrer noopener">
                      Composer
                    </a>{" "}
                    by running <code>composer require elliotjreed/disposable-emails-filter</code>.
                  </p>
                </div>
              </div>
            </div>

            <div className="md p-4 md:w-1/2" style={{ maxWidth: "544px" }}>
              <div className="h-full overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700">
                <a href="https://github.com/elliotjreed/database-anonymiser" rel="noreferrer noopener">
                  <img
                    alt="Screenshot of the package GitHub repository"
                    src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1648992556/github.png"
                    className="object-cover object-center md:h-36 lg:h-48"
                    width={544}
                    height={306}
                    loading="lazy"
                  />
                </a>
                <div className="p-6">
                  <a href="https://github.com/elliotjreed/database-anonymiser" rel="noreferrer noopener">
                    <h2 className="text-xl font-bold leading-8 tracking-tight">
                      Database anonymisation tool repository
                    </h2>
                  </a>
                  <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">
                    A PHP package for anonymising database (MySQL, MariaDB, Postgres, SQLite) data. It can be used as
                    part of an automated process to have an up-to-date development database with fake data.
                  </p>
                </div>
              </div>
            </div>

            <div className="md p-4 md:w-1/2" style={{ maxWidth: "544px" }}>
              <div className="h-full overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700">
                <a href="https://github.com/elliotjreed/cloudflare-cache-purge-php" rel="noreferrer noopener">
                  <img
                    alt="Screenshot of the package GitHub repository"
                    src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1648992556/github.png"
                    className="object-cover object-center md:h-36 lg:h-48"
                    width={544}
                    height={306}
                    loading="lazy"
                  />
                </a>
                <div className="p-6">
                  <a href="https://github.com/elliotjreed/cloudflare-cache-purge-php" rel="noreferrer noopener">
                    <h2 className="text-xl font-bold leading-8 tracking-tight">
                      Cloudflare cache purging tool repository
                    </h2>
                  </a>
                  <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">
                    A PHP package for clearing / purging the Cloudflare assets cache (eg. on deployment, or when an
                    asset it changed via a CMS). It can be installed via{" "}
                    <a href="https://getcomposer.org/" rel="noreferrer noopener">
                      Composer
                    </a>{" "}
                    by running <code>composer require elliotjreed/cloudflare-cache-purge</code>.
                  </p>
                </div>
              </div>
            </div>

            <div className="md p-4 md:w-1/2" style={{ maxWidth: "544px" }}>
              <div className="h-full overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700">
                <a href="https://github.com/elliotjreed/php-package-template" rel="noreferrer noopener">
                  <img
                    alt="Screenshot of the package GitHub repository"
                    src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1648992556/github.png"
                    className="object-cover object-center md:h-36 lg:h-48"
                    width={544}
                    height={306}
                    loading="lazy"
                  />
                </a>
                <div className="p-6">
                  <a href="https://github.com/elliotjreed/php-package-template" rel="noreferrer noopener">
                    <h2 className="text-xl font-bold leading-8 tracking-tight">
                      PHP package boilerplate / template repository
                    </h2>
                  </a>
                  <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">
                    A PHP template / boilerplate with an installation script. It includes a PHPUnit setup, code
                    formatting, etc. It&apos;s mostly useful as a starter for small PHP packages or libraries.
                  </p>
                </div>
              </div>
            </div>

            <div className="md p-4 md:w-1/2" style={{ maxWidth: "544px" }}>
              <div className="h-full overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700">
                <a href="https://github.com/elliotjreed/api.elliotjreed.com" rel="noreferrer noopener">
                  <img
                    alt="Screenshot of the package GitHub repository"
                    src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1648992556/github.png"
                    className="object-cover object-center md:h-36 lg:h-48"
                    width={544}
                    height={306}
                    loading="lazy"
                  />
                </a>
                <div className="p-6">
                  <a href="https://github.com/elliotjreed/api.elliotjreed.com" rel="noreferrer noopener">
                    <h2 className="text-xl font-bold leading-8 tracking-tight">The API backend for this website</h2>
                  </a>
                  <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">
                    A Symfony application which returns (mostly) JSON Linked Data to provide the data for this website.
                    The blog posts and CV are markdown filed parsed from{" "}
                    <a href="https://github.com/elliotjreed" rel="noreferrer noopener">
                      my GitHub profile repository
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>

            <div className="md p-4 md:w-1/2" style={{ maxWidth: "544px" }}>
              <div className="h-full overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700">
                <a href="https://github.com/elliotjreed/www.elliotjreed.com" rel="noreferrer noopener">
                  <img
                    alt="Screenshot of the package GitHub repository"
                    src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1648992556/github.png"
                    className="object-cover object-center md:h-36 lg:h-48"
                    width={544}
                    height={306}
                    loading="lazy"
                  />
                </a>
                <div className="p-6">
                  <a href="https://github.com/elliotjreed/www.elliotjreed.com" rel="noreferrer noopener">
                    <h2 className="text-xl font-bold leading-8 tracking-tight">
                      The source code for the frontend (React) of this website
                    </h2>
                  </a>
                  <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">
                    The frontend code with Tailwind, SCSS, Webpack, and various tools and packages which make up this
                    (server-side rendered) React-based website.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </animated.section>
    </>
  );
};
