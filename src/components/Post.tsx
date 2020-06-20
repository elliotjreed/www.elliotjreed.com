import * as marked from "marked";
import { useEffect, useState } from "react";
import * as React from "react";
import * as ReactGA from "react-ga";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import { Loader } from "./Loader";

interface Props {
  match: { params: { category: string; post: string } };
}

export const Post = (props: Props): JSX.Element => {
  const url = props.match.params.post;
  const postWithSpaces = url.replace(/-/g, " ");
  const title = postWithSpaces.substr(11);
  const date = url.substr(0, 10);

  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({
    "@context": "",
    "@type": "BlogPosting",
    "name": title,
    "dateCreated": date,
    "datePublished": date,
    "articleBody": "",
    "wordCount": 0,
    "author": {},
    "url": "",
    "inLanguage": "en-GB",
    "copyrightHolder": {},
    "headline": "",
    "license": "MIT"
  });

  useEffect((): void => {
    ReactGA.pageview(window.location.pathname + location.search);
    fetchPost();
  }, []);

  const category = props.match.params.category;
  const description =
    new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      weekday: "long",
      year: "numeric"
    }) +
    ". " +
    title +
    ".";

  useEffect(() => {
    return (): void => {
      this.controller.abort();
    };
  }, []);

  const fetchPost = (): Promise<void> => {
    if (!("caches" in self)) {
      return updateFromNetwork();
    }

    return caches
      .open("ejr")
      .then(cache => {
        cache
          .match("https://127.0.0.1:8000/post/" + category + "/" + url)
          .then(
            (response: Response | undefined): Promise<string> => {
              return new Promise((resolve, reject): void => {
                if (response) {
                  resolve(response.clone().json());
                } else {
                  reject();
                }
              });
            }
          )
          .then((post: any): void => {
            setContent(post);
            setLoading(false);
          })
          .catch((): Promise<void> => updateFromNetwork());
      })
      .catch((): Promise<void> => updateFromNetwork());
  };

  const updateFromNetwork = (): Promise<any> => {
    return fetch("https://127.0.0.1:8000/post/" + category + "/" + url)
      .then(
        (response: Response): Promise<any> => {
          return new Promise((resolve, reject): void => {
            const clonedResponse = response.clone();
            if (clonedResponse.ok) {
              if ("caches" in self) {
                caches
                  .open("ejr")
                  .then(cache =>
                    cache.put("https://127.0.0.1:8000/post/" + category + "/" + url, clonedResponse.clone())
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
      .then((post: any): void => {
        setContent(post);
        setLoading(false);
      });
    // .catch((): void => this.controller.abort());
  };

  return (
    <main>
      <Helmet>
        <title>{title + " | Elliot J. Reed"}</title>
        <meta name="description" content={description} />
        <script type="application/ld+json">{JSON.stringify(content)}</script>
      </Helmet>

      <section className="hero is-info is-small is-bold">
        <div className="hero-body" />
      </section>

      <div className="container home">
        <article className="articles">
          <div className="column is-10 is-offset-1">
            <div className="card article">
              <div className="card-content">
                <div className="has-text-centered">
                  <h3 className="title article-title">{title}</h3>
                  <div className="tags has-addons level-item">
                    <Link to={"/category/" + category} className="tag is-rounded tag-category">
                      {category}
                    </Link>
                    <time dateTime={date} className="tag is-rounded">
                      {date}
                    </time>
                  </div>
                </div>

                <div className="content article-body">
                  {loading ? (
                    <Loader />
                  ) : (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: marked(content.articleBody.substring(content.articleBody.indexOf("\n") + 1))
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
};
