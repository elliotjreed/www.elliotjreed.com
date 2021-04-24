import * as marked from "marked";
import { useEffect, useState } from "react";
import * as ReactGA from "react-ga";
import { Helmet } from "react-helmet";
import { animated, useSpring } from "react-spring";

import { Person } from "../interfaces/Person";
import { BlogPosting as PostInterface } from "../interfaces/BlogPosting";
import { Spinner } from "./Spinner";

interface Props {
  match: { params: { date: string; post: string } };
}

export const Post = (props: Props): JSX.Element => {
  const abortController: AbortController = new AbortController();
  const signal: AbortSignal = abortController.signal;
  const date: string = props.match.params.date;
  const url: string = date + "/" + props.match.params.post;
  const title: string = url.replace(/-/g, " ");
  const author: Person = {
    name: "Elliot J. Reed",
    alternateName: "Elliot Reed",
    givenName: "Elliot",
    additionalName: "John",
    familyName: "Reed"
  };
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
  const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });
  const [loading, setLoading] = useState<boolean>(true);

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
          .then(
            (response: Response | undefined): Promise<PostInterface> => {
              return new Promise((resolve, reject): void => {
                if (response) {
                  resolve(response.clone().json());
                } else {
                  reject();
                }
              });
            }
          )
          .then(
            (post: PostInterface): Promise<void> => {
              setContent(post);
              setLoading(false);
              return updateFromNetwork();
            }
          )
          .catch((): Promise<void> => updateFromNetwork());
      })
      .catch((): Promise<void> => updateFromNetwork());
  };

  const updateFromNetwork = (): Promise<void> => {
    return fetch("https://api.elliotjreed.com/blog/post/" + url, { signal: signal })
      .then(
        (response: Response): Promise<PostInterface> => {
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
        }
      )
      .then((post: PostInterface): void => {
        setContent(post);
        setLoading(false);
      })
      .catch((): void => abortController.abort());
  };

  return (
    <>
      <Helmet>
        <title>{title + " | Elliot J. Reed"}</title>
        <meta name="description" content={content.headline} />
        <script type="application/ld+json">{JSON.stringify(content)}</script>
        <meta property="og:url" content={content.url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={content.headline} />
        <meta property="og:image" content={content.image.url} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@elliotjreed" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={content.headline} />
        <meta name="twitter:image" content={content.url} />
      </Helmet>

      <section className="container">
        <div className="column is-10 is-offset-1">
          <animated.div className="card" style={springProps}>
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
          </animated.div>
        </div>
      </section>
    </>
  );
};
