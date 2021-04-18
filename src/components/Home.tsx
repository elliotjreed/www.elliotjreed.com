import * as React from "react";
import { useEffect, useState } from "react";
import * as ReactGA from "react-ga";
import { Helmet } from "react-helmet";
import { animated, useSpring } from "react-spring";

import { Person } from "../interfaces/Person";
import "./../assets/scss/App.scss";

export const Home = (): JSX.Element => {
  const abortController = new AbortController();
  const signal = abortController.signal;
  const [author, setAuthor] = useState<Person>({
    additionalName: "John",
    alternateName: "Elliot Reed",
    familyName: "Reed",
    givenName: "Elliot",
    name: "Elliot J. Reed"
  });
  const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });

  useEffect((): void => {
    ReactGA.pageview(window.location.pathname + location.search);
    fetchCategories();
  }, []);

  useEffect(() => {
    return (): void => abortController.abort();
  }, []);

  const updateFromNetwork = (): Promise<void> => {
    return fetch("https://api.elliotjreed.com/blog/author", { signal: signal })
      .then(
        (response: Response): Promise<Person> => {
          return new Promise((resolve, reject): void => {
            const clonedResponse = response.clone();
            if (clonedResponse.ok) {
              if ("caches" in self) {
                caches
                  .open("ejr")
                  .then(
                    (cache): Promise<void> =>
                      cache.put("https://api.elliotjreed.com/blog/author", clonedResponse.clone())
                  )
                  .catch();
              }
              resolve(clonedResponse.clone().json());
            } else {
              reject();
            }
          });
        }
      )
      .then((author: Person): void => {
        setAuthor(author);
      })
      .catch((): void => abortController.abort());
  };

  const fetchCategories = (): Promise<void> => {
    if (!("caches" in self)) {
      return updateFromNetwork();
    }

    return caches
      .open("ejr")
      .then((cache) => {
        cache
          .match("https://api.elliotjreed.com/blog/author")
          .then(
            (response: Response | undefined): Promise<Person> => {
              return new Promise((resolve, reject): void => {
                if (response) {
                  resolve(response.clone().json());
                } else {
                  reject();
                }
              });
            }
          )
          .then((author: Person): void => {
            setAuthor(author);
          })
          .catch(() => updateFromNetwork());
      })
      .catch((): Promise<void> => updateFromNetwork());
  };

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
          content="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553434444/elliotjreed.jpg"
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
          <animated.div className="card" style={springProps}>
            <div className="columns is-vcentered has-text-centered">
              <div className="column is-3">
                <figure className="image is-square profile-picture">
                  <img
                    src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553434444/elliotjreed.jpg"
                    alt="Picture of Elliot"
                    loading="lazy"
                  />
                </figure>
              </div>

              <section className="column is-9 has-text-dark">
                <h1 className="title is-2">Elliot J. Reed</h1>
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
              </section>
            </div>
          </animated.div>
        </div>
      </section>
    </>
  );
};
