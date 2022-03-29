import { FC, ReactElement, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { animated, useSpring } from "react-spring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { pageview } from "react-ga";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";

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
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Elliot J. Reed" />
        <meta
          property="og:description"
          content="Elliot's website - a little bit about me, my work, system administration and programming articles, and projects I'm working on."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1648587259/og.png"
        />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@elliotjreed" />
        <meta name="twitter:title" content="Elliot J. Reed" />
        <meta
          name="twitter:description"
          content="Elliot's website - a little bit about me, my work, system administration and programming articles, and projects I'm working on."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553434444/elliotjreed.jpg"
        />
        <script type="application/ld+json">{JSON.stringify(author)}</script>
      </Helmet>

      <section className="container">
        <div className="column is-10 is-offset-1">
          <animated.main id="main-content" className="card" style={springProps}>
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <figure className="image is-128x128">
                    <img
                      src="https://res.cloudinary.com/elliotjreed/image/upload/w_256,h_256,c_scale,f_auto,q_auto/v1553434444/elliotjreed.jpg"
                      alt="Placeholder image"
                      width={128}
                      height={128}
                    />
                  </figure>
                </div>
                <div className="media-content">
                  <h1 className="is-size-1 has-text-weight-semibold is-size-3-mobile">{author.name}</h1>

                  <a
                    className="icon-text subtitle is-size-5 is-size-6-mobile"
                    href="https://github.com/elliotjreed"
                    rel="noreferrer noopener"
                  >
                    <span className="icon">
                      <FontAwesomeIcon className="fas fa-lg" icon={faGithub} />
                    </span>
                    <span> @elliotjreed</span>
                  </a>
                </div>
              </div>
              <div className="content">
                <p>
                  Hi! I&apos;m Elliot, a software developer / technical lead based in Nottingham. My interests are
                  generally in E-Commerce, PHP, Javascript, Docker, and general DevOps.
                </p>
                <p>
                  This website contains little mini-guides and snippets which may prove helpful, and if you&apos;re
                  stuck on anything you think I may be able to help with give me a shout on{" "}
                  <a href="https://twitter.com/elliotjreed" rel="noreferrer noopener">
                    Twitter
                  </a>
                  .
                </p>
              </div>
            </div>
          </animated.main>
        </div>
      </section>
    </>
  );
};
