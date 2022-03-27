import { marked } from "marked";
import { FC, ReactElement, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { animated, useSpring } from "react-spring";
import { pageview } from "react-ga";

import { Spinner } from "./Spinner";
import { fetchCache } from "../hooks/fetchCache";

export const Cv: FC = (): ReactElement => {
  const abortController: AbortController = new AbortController();

  const [loading, setLoading] = useState<boolean>(true);
  const [content, setContent] = useState<string>("");

  const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });

  const response: string | null = fetchCache<string>("https://api.elliotjreed.com/cv", abortController);

  useEffect((): void => {
    if (response !== null) {
      setContent(response);
      setLoading(false);
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
          content="A brief overview of my work, projects, experience, education, and skills."
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
