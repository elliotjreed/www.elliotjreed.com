import { marked } from "marked";
import { FC, ReactElement, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { animated, useSpring } from "react-spring";

import { Spinner } from "./Spinner";
import { useFetch } from "../hooks/useFetch";
import "../assets/css/print.css";

export const Cv: FC = (): ReactElement => {
  const [loading, setLoading] = useState<boolean>(true);
  const [showContactDetails, setShowContactDetails] = useState<boolean>(true);
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
        <header className="print:hidden">
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
              <>
                <div className="hidden print:block text-center mt-0 mb-2">
                  <p className="text-lg font-bold tracking-tight text-gray-700 leading-none float-left inline mb-2">
                    <a href="https://www.elliotjreed.com?utm_source=cv">www.elliotjreed.com</a>
                    <div className={showContactDetails ? "" : " print:hidden"}>
                      <small>+44 (0) 7708 309156</small>
                    </div>
                  </p>
                  <h1
                    className="text-3xl font-extrabold tracking-tight text-gray-800 leading-none inline"
                    onClick={() => setShowContactDetails(!showContactDetails)}
                  >
                    Elliot Reed
                  </h1>
                  <p className="text-lg font-bold tracking-tight text-gray-700 leading-none float-right inline mb-2">
                    <a href="https://github.com/elliotjreed">github.com/elliotjreed</a>
                    <div className={showContactDetails ? "" : " print:hidden"}>
                      <small>
                        <a href="mail&#116;o&#58;cv%&#52;0ell%69o%&#55;4%&#54;Ar&#101;e&#100;%&#50;E%63&#111;&#37;6&#68;">
                          cv&#64;elli&#111;tjreed&#46;c&#111;m
                        </a>
                      </small>
                    </div>
                  </p>
                </div>
                <div
                  className="prose max-w-none pt-10 print:pt-2 pb-8 print:pb-0 dark:prose-dark print:leading-5"
                  dangerouslySetInnerHTML={{
                    __html: marked(content.substring(content.indexOf("\n") + 1))
                  }}
                />
              </>
            )}
          </div>
        </div>
      </animated.article>
    </>
  );
};
