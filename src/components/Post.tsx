import { marked } from "marked";
import { useEffect, useState } from "react";
import * as ReactGA from "react-ga";
import { Helmet } from "react-helmet";
import { Params, useParams } from "react-router-dom";
import { animated, useSpring } from "react-spring";

import { BlogPosting as PostInterface } from "../interfaces/BlogPosting";
import { Person } from "../interfaces/Person";
import { Spinner } from "./Spinner";

export const Post = (): JSX.Element => {
  const abortController: AbortController = new AbortController();
  const signal: AbortSignal = abortController.signal;

  const params: Readonly<Params> = useParams();
  const date: string = params.date;
  const url: string = date + "/" + params.post;

  const title: string = url
    .substr(11)
    .replace(/-/g, " ")
    .replace(/(^\w)|(\s\w)/g, (match: string): string => match.toUpperCase());
  const author: Person = {
    name: "Elliot J. Reed",
    alternateName: "Elliot Reed",
    givenName: "Elliot",
    additionalName: "John",
    familyName: "Reed"
  };
  const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });
  const [loading, setLoading] = useState<boolean>(true);
  const [content, setContent] = useState<PostInterface>({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": "https://www.elliotjreed.com/blog/" + url,
    "publisher": { name: "", logo: { url: "" } },
    "sameAs": "",
    "name": title,
    "dateModified": date,
    "dateCreated": date,
    "datePublished": date,
    "articleBody": "",
    "wordCount": 0,
    "author": author,
    "url": "https://www.elliotjreed.com/" + url,
    "inLanguage": "en-GB",
    "copyrightHolder": author,
    "headline": title,
    "license": "",
    "image": { url: "" }
  });

  useEffect((): void => {
    ReactGA.pageview(window.location.pathname + location.search);
    fetchPost();
  }, []);

  useEffect(() => {
    return (): void => abortController.abort();
  }, []);

  const fetchPost = (): Promise<void> => {
    if (!("caches" in self)) {
      return updateFromNetwork();
    }

    return caches
      .open("ejr")
      .then((cache: Cache): void => {
        cache
          .match("https://api.elliotjreed.com/blog/post/" + url)
          .then((response: Response | undefined): Promise<PostInterface> => {
            return new Promise((resolve, reject): void => {
              if (response) {
                resolve(response.clone().json());
              } else {
                reject();
              }
            });
          })
          .then((post: PostInterface): Promise<void> => {
            setContent(post);
            setLoading(false);
            return updateFromNetwork();
          })
          .catch((): Promise<void> => updateFromNetwork());
      })
      .catch((): Promise<void> => updateFromNetwork());
  };

  const updateFromNetwork = (): Promise<void> => {
    return fetch("https://api.elliotjreed.com/blog/post/" + url, { signal: signal })
      .then((response: Response): Promise<PostInterface> => {
        return new Promise((resolve, reject): void => {
          const clonedResponse: Response = response.clone();
          if (clonedResponse.ok) {
            if ("caches" in self) {
              caches
                .open("ejr")
                .then((cache: Cache) =>
                  cache.put("https://api.elliotjreed.com/blog/post/" + url, clonedResponse.clone())
                )
                .catch();
            }
            resolve(clonedResponse.clone().json());
          } else {
            reject();
          }
        });
      })
      .then((post: PostInterface): void => {
        setContent(post);
        setLoading(false);
      })
      .catch((): void => abortController.abort());
  };

  return (
    <>
      <Helmet>
        <title>{content.name + " | Elliot J. Reed"}</title>
        <meta name="description" content={content.headline} />
        <script type="application/ld+json">{JSON.stringify(content)}</script>
        <meta property="og:url" content={content.url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={content.name} />
        <meta property="og:description" content={content.headline} />
        <meta property="og:image" content={content.image.url} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@elliotjreed" />
        <meta name="twitter:title" content={content.name} />
        <meta name="twitter:description" content={content.headline} />
        <meta name="twitter:image" content={content.url} />
      </Helmet>

      <section className="container">
        <div className="column is-10 is-offset-1">
          <animated.main id="main-content" className="card" style={springProps}>
            {loading ? (
              <Spinner />
            ) : (
              <div className="card-content">
                <h1 className="title has-text-centered">{content.headline}</h1>

                <div className="tags level-item">
                  <time dateTime={content.dateCreated} className="tag is-rounded">
                    {new Date(content.dateCreated).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })}
                  </time>
                  <span className="tag is-rounded">{content.wordCount} words</span>
                </div>

                <div className="content">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: marked(content.articleBody.substring(content.articleBody.indexOf("\n") + 1))
                    }}
                  />
                </div>
              </div>
            )}
          </animated.main>
        </div>
      </section>
    </>
  );
};
