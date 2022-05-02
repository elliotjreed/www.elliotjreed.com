import { FC, ReactElement } from "react";
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
  const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });

  const { response } = useFetch<Person>({
    url: "https://api.elliotjreed.com/blog/author",
    cacheResponse: true
  });

  return (
    <>
      <Helmet>
        <title>Elliot J. Reed</title>
        <meta
          name="description"
          content="Hi, I'm Elliot, a software developer from Nottingham. This website has guides on PHP, Symfony, Javascript, React, Python, and Linux / DevOps."
        />
        <link rel="amphtml" href="https://amp.elliotjreed.com" />
        {response !== undefined && <script type="application/ld+json">{JSON.stringify(response)}</script>}
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
            />
            <h1 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">Elliot Reed</h1>
            <div className="text-gray-500 dark:text-gray-400">Technical Lead, Software Development</div>
            <div className="text-gray-500 dark:text-gray-400">Nottingham, United Kingdom</div>
            <div className="flex space-x-3 pt-6">
              <a href="https://github.com/elliotjreed" rel="noreferrer noopener" title="GitHub">
                <span className="icon">
                  <FontAwesomeIcon className="fa-lg" icon={faGithub} aria-label="GitHub Profile" />
                </span>
              </a>
              <a href="https://www.linkedin.com/in/elliotjreed/" rel="noreferrer noopener" title="LinkedIn">
                <span className="icon">
                  <FontAwesomeIcon className="fa-lg" icon={faLinkedin} aria-label="LinkedIn Profile" />
                </span>
              </a>
              <a href="https://twitter.com/elliotjreed" rel="noreferrer noopener" title="Twitter">
                <span className="icon">
                  <FontAwesomeIcon className="fa-lg" icon={faTwitter} aria-label="Twitter Profile" />
                </span>
              </a>
              <a href="https://t.me/elliotjreed" rel="noreferrer noopener" title="Telegram">
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
              <a href="https://github.com/elliotjreed/www.elliotjreed.com/" rel="noreferrer noopener">
                github.com/elliotjreed/www.elliotjreed.com
              </a>{" "}
              and the backend API at{" "}
              <a href="https://github.com/elliotjreed/api.elliotjreed.com/" rel="noreferrer noopener">
                github.com/elliotjreed/api.elliotjreed.com
              </a>
              . It&apos;s basically getting the content via the GitHub API from the{" "}
              <a href="https://github.com/elliotjreed" rel="noreferrer noopener">
                github.com/elliotjreed
              </a>{" "}
              profile repository, which is nice.
            </p>
          </div>
        </div>
      </animated.section>
    </>
  );
};
