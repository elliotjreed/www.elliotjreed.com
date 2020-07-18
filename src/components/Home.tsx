import * as React from "react";
import { useEffect, useState } from "react";
import * as ReactGA from "react-ga";
import { Helmet } from "react-helmet";

import "./../assets/scss/App.scss";

export const Home = (): JSX.Element => {
  const abortController = new AbortController();
  const signal = abortController.signal;
  const [author, setAuthor] = useState("");

  useEffect((): void => {
    ReactGA.pageview(window.location.pathname + location.search);
    fetchCategories();
  }, []);

  useEffect(() => {
    return (): void => abortController.abort();
  }, []);

  const updateFromNetwork = (): Promise<void> => {
    return fetch("https://127.0.0.1:8000/person/elliotreed", { signal: signal })
      .then(
        (response: Response): Promise<string> => {
          return new Promise((resolve, reject): void => {
            const clonedResponse = response.clone();
            if (clonedResponse.ok) {
              if ("caches" in self) {
                caches
                  .open("ejr")
                  .then(
                    (cache): Promise<void> =>
                      cache.put("https://127.0.0.1:8000/person/elliotreed", clonedResponse.clone())
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
      .then((author: string): void => {
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
          .match("https://127.0.0.1:8000/person/elliotreed")
          .then(
            (response: Response | undefined): Promise<string> => {
              return new Promise((resolve, reject): void => {
                if (response) {
                  resolve(response.clone().text());
                } else {
                  reject();
                }
              });
            }
          )
          .then((author: string): void => {
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
        <script type="application/ld+json">{author}</script>
      </Helmet>

      <section className="hero is-info is-small is-bold">
        <div className="hero-body main-banner" />
      </section>

      <section className="container home">
        <div className="articles">
          <div className="column is-10 is-offset-1">
            <div className="card">
              <div className="columns is-vcentered has-text-centered">
                <div className="column is-4">
                  <figure className="image is-square profile-picture">
                    <img
                      src="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553434444/elliotjreed.jpg"
                      alt="Picture of Elliot"
                    />
                  </figure>
                </div>

                <section className="column is-8 has-text-dark">
                  <h1 className="title is-2">Elliot J. Reed</h1>
                  <p>
                    Hi! I&apos;m Elliot, a software developer / technical lead based in Nottingham. My interests are
                    generally in E-Commerce, PHP, Javascript, Docker, and general DevOps.
                  </p>
                  <p>
                    This website contains little mini-guides and snippets which may prove helpful, and if you&apos;re
                    stuck on anything you think I may be able to help with give me a shout on{" "}
                    <a href="https://twitter.com/elliotjreed">Twitter</a>.
                  </p>
                  <p>
                    This website is built with React JS on the frontend, and Symfony / PHP on the backend. The code is
                    available on <a href="https://github.com/elliotjreed">GitHub</a>.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
