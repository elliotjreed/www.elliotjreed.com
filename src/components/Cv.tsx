import { marked } from "marked";
import { FC, ReactElement, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { animated, useSpring } from "react-spring";
import { pageview } from "react-ga";

import { Spinner } from "./Spinner";
import { useFetch } from "../hooks/useFetch";
import "../assets/css/print.css";

export const Cv: FC = (): ReactElement => {
  const [loading, setLoading] = useState<boolean>(true);
  const [content, setContent] = useState<string>("");

  const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });

  const [response, responseErrors] = useFetch<string>({
    url: "https://api.elliotjreed.com/cv",
    cacheResponse: true
  });

  useEffect((): void => {
    if (response !== null && response !== undefined) {
      setContent(response);
      setLoading(false);
    }
  }, [response]);

  useEffect((): void => {
    if (responseErrors.length > 0) {
      console.error(responseErrors);
    }
  }, [responseErrors]);

  useEffect((): void => pageview(window.location.pathname + location.search), []);

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
          content="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1648588302/og-no-number.png"
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
          content="https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1648588302/og-no-number.png"
        />
      </Helmet>

      <animated.article className="cv" style={springProps}>
        <header>
          <div className="space-y-1 border-b border-gray-200 pb-10 text-center dark:border-gray-700">
            <div>
              <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
                Curriculum Vitae / Résumé
              </h1>
            </div>
          </div>
        </header>

        <div
          className="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:divide-y-0"
          style={{ gridTemplateRows: "auto 1fr" }}
        >
          <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
            {loading ? (
              <Spinner />
            ) : (
              <div
                className="prose max-w-none pt-10 pb-8 dark:prose-dark"
                dangerouslySetInnerHTML={{
                  __html: marked(content.substring(content.indexOf("\n") + 1))
                }}
              />
            )}
          </div>
        </div>
      </animated.article>
    </>
  );
};
