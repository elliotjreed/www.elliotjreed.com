import { marked } from "marked";
import { useEffect, useState } from "react";
import * as ReactGA from "react-ga";
import { Helmet } from "react-helmet";
import { animated, useSpring } from "react-spring";
import { Spinner } from "./Spinner";

export const Cv = (): JSX.Element => {
  const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });
  const abortController: AbortController = new AbortController();
  const signal: AbortSignal = abortController.signal;
  const [loading, setLoading] = useState<boolean>(true);
  const [content, setContent] = useState<string>("");

  useEffect((): void => {
    ReactGA.pageview(window.location.pathname + location.search);
    fetchCv();
  }, []);

  useEffect(() => {
    return (): void => abortController.abort();
  }, []);

  const fetchCv = (): Promise<void> => {
    if (!("caches" in self)) {
      return updateFromNetwork();
    }

    return caches
      .open("ejr")
      .then((cache: Cache): void => {
        cache
          .match("https://api.elliotjreed.com/cv")
          .then((response: Response | undefined): Promise<string> => {
            return new Promise((resolve, reject): void => {
              if (response) {
                resolve(response.clone().text());
              } else {
                reject();
              }
            });
          })
          .then((markdown: string): Promise<void> => {
            setContent(markdown);
            setLoading(false);
            return updateFromNetwork();
          })
          .catch((): Promise<void> => updateFromNetwork());
      })
      .catch((): Promise<void> => updateFromNetwork());
  };

  const updateFromNetwork = (): Promise<void> => {
    return fetch("https://api.elliotjreed.com/cv", { signal: signal })
      .then((response: Response): Promise<string> => {
        return new Promise((resolve, reject): void => {
          const clonedResponse: Response = response.clone();
          if (clonedResponse.ok) {
            if ("caches" in self) {
              caches
                .open("ejr")
                .then((cache: Cache) => cache.put("https://api.elliotjreed.com/cv", clonedResponse.clone()))
                .catch();
            }
            resolve(clonedResponse.clone().text());
          } else {
            reject();
          }
        });
      })
      .then((markdown: string): void => {
        setContent(markdown);
        setLoading(false);
      })
      .catch((): void => abortController.abort());
  };

  return (
    <>
      <Helmet>
        <title>Curriculum Vitae / Résumé | Elliot J. Reed</title>
        <meta
          name="description"
          content="The curriculum vitae of Elliot J. Reed, software developer based in Nottingham. Specialising in PHP, e-commerce, Javascript, Linux, DevOps, SQL, and other web and application technologies."
        />
        <meta property="og:type" content="profile" />
        <meta property="og:title" content="Elliot J. Reed's Curriculum Vitae / Résumé" />
        <meta
          property="og:description"
          content="A brief overview of my work, projects, experience, education, and skillset."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553434444/elliotjreed.jpg"
        />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@elliotjreed" />
        <meta name="twitter:title" content="Elliot J. Reed's Curriculum Vitae / Résumé" />
        <meta
          name="twitter:description"
          content="A brief overview of my work, projects, experience, education, and skillset."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553434444/elliotjreed.jpg"
        />
      </Helmet>

      <section className="container cv">
        <div className="column is-10 is-offset-1">
          <animated.main id="main-content" className="card" style={springProps}>
            <div className="card-content">
              <h1 className="title has-text-centered">Curriculum Vitae / Résumé</h1>
              {loading ? (
                <Spinner />
              ) : (
                <div className="content">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: marked(content.substring(content.indexOf("\n") + 1))
                    }}
                  />
                </div>
              )}
            </div>
          </animated.main>
        </div>
      </section>
    </>
  );
};
