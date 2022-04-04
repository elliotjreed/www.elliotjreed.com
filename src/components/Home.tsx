import { FC, ReactElement, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { animated, useSpring } from "react-spring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { pageview } from "react-ga";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";
import { faTelegram } from "@fortawesome/free-brands-svg-icons/faTelegram";
import { faTwitter } from "@fortawesome/free-brands-svg-icons/faTwitter";

import { fetchCache } from "../hooks/fetchCache";
import { Person } from "../interfaces/Person";

export const Home: FC = (): ReactElement => {
  const abortController = new AbortController();

  const [author, setAuthor] = useState<Person>({
    additionalName: "John",
    alternateName: "Elliot Reed",
    familyName: "Reed",
    givenName: "Elliot",
    name: "Elliot J. Reed"
  });

  const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });

  const response: Person | null = fetchCache<Person>("https://api.elliotjreed.com/blog/author", abortController);

  useEffect((): void => {
    if (response !== null) {
      setAuthor(response);
    }
  }, [response]);

  useEffect((): void => {
    pageview(window.location.pathname + location.search);
  }, []);

  useEffect(() => {
    return (): void => abortController.abort();
  }, []);

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

      <animated.section className="divide-y" style={springProps}>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center pt-8">
            <img
              src="https://res.cloudinary.com/elliotjreed/image/upload/w_384,h_384,c_scale,f_auto,q_auto/v1553434444/elliotjreed.jpg"
              alt="Photograph of Elliot"
              width={192}
              height={192}
              className="h-48 w-48 rounded-full"
            />
            <h1 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">Elliot Reed</h1>
            <div className="text-gray-500 dark:text-gray-400">Technical Lead, Software Development</div>
            <div className="text-gray-500 dark:text-gray-400">Nottingham, United Kingdom</div>
            <div className="flex space-x-3 pt-6">
              <a href="https://github.com/elliotjreed" target="noreferrer noopener" title="GitHub">
                <span className="icon">
                  <FontAwesomeIcon className="fas fa-lg" icon={faGithub} aria-label="GitHub Profile" />
                </span>
              </a>
              <a href="https://www.linkedin.com/in/elliotjreed/" target="noreferrer noopener" title="LinkedIn">
                <span className="icon">
                  <FontAwesomeIcon className="fas fa-lg" icon={faLinkedin} aria-label="LinkedIn Profile" />
                </span>
              </a>
              <a href="https://twitter.com/elliotjreed" target="noreferrer noopener" title="Twitter">
                <span className="icon">
                  <FontAwesomeIcon className="fas fa-lg" icon={faTwitter} aria-label="Twitter Profile" />
                </span>
              </a>
              <a href="https://t.me/elliotjreed" target="noreferrer noopener" title="Telegram">
                <span className="icon">
                  <FontAwesomeIcon className="fas fa-lg" icon={faTelegram} aria-label="Telegram" />
                </span>
              </a>
            </div>
          </div>
          <div className="prose max-w-none pt-8 pb-8 dark:prose-dark xl:col-span-2">
            <p>
              Hi! I&apos;m Elliot, a software developer / technical lead based in Nottingham. My interests are generally
              in E-Commerce, PHP, Javascript, Docker, and general DevOps.
            </p>
            <p>
              This website contains little mini-guides and snippets which may prove helpful, and if you&apos;re stuck on
              anything you think I may be able to help with give me a shout on{" "}
              <a href="https://twitter.com/elliotjreed" rel="noreferrer noopener">
                Twitter
              </a>
              .
            </p>
          </div>
        </div>
      </animated.section>
    </>
  );
};
