import * as React from "react";
import { useEffect, useState } from "react";
import * as ReactGA from "react-ga";
import { Helmet } from "react-helmet";
import "./../assets/scss/App.scss";

import { PostCard } from "./PostCard";
import { Spinner } from "./Spinner";

interface Props {
  match: { params: { category: string } };
}

export const Posts = (props: Props): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(props.match.params.category.replace("-", " "));
  const [posts, setPosts] = useState([]);

  useEffect((): void => {
    ReactGA.pageview(window.location.pathname + location.search);

    fetchPostsInCategory();
  }, []);

  useEffect(() => {
    return (): void => {
      this.controller.abort();
    };
  }, []);

  const capitalise = (category: string): string => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  useEffect(() => {
    if (category !== props.match.params.category) {
      setCategory(props.match.params.category.replace("-", " "));
    }
  }, [props.match.params.category]);

  useEffect(() => {
    fetchPostsInCategory();
  }, [category]);

  const fetchPostsInCategory = (): Promise<void> => {
    if (!("caches" in self)) {
      return updateFromNetwork();
    }

    return caches.open("ejr").then((cache) => {
      cache
        .match("https://127.0.0.1:8000/posts/" + category)
        .then(
          (response: Response | undefined): Promise<string[]> => {
            return new Promise((resolve, reject): void => {
              if (response) {
                resolve(response.clone().json());
              } else {
                reject();
              }
            });
          }
        )
        .then((posts): void => {
          setPosts(posts);
          setLoading(false);
        })
        .catch((): Promise<void> => updateFromNetwork());
    });
    // .catch((): Promise<void> => updateFromNetwork());
  };

  const updateFromNetwork = (): Promise<void> => {
    return fetch("https://127.0.0.1:8000/posts/" + category)
      .then(
        (response: Response): Promise<string[]> => {
          return new Promise((resolve, reject): void => {
            const clonedResponse = response.clone();
            if (clonedResponse.ok) {
              if ("caches" in self) {
                caches
                  .open("ejr")
                  .then((cache) => cache.put("https://127.0.0.1:8000/posts/" + category, clonedResponse.clone()))
                  .catch();
              }
              resolve(clonedResponse.clone().json());
            } else {
              reject();
            }
          });
        }
      )
      .then((posts): void => {
        setPosts(posts);
        setLoading(false);
      });
    // .catch((): void => this.controller.abort());
  };

  const postsInCategory = (posts: string[]): React.ReactNode => {
    return (
      <ul>
        {posts.reverse().map((post) => (
          <PostCard key={post} category={category.toLowerCase()} post={post} />
        ))}
      </ul>
    );
  };

  return (
    <>
      <Helmet>
        <title>{capitalise(category) + " | Elliot J. Reed"}</title>
        <meta name="description" content={"Various posts, guides, and how-tos on " + capitalise(category)} />
      </Helmet>
      <section className="hero is-info is-small is-bold">
        <div className="hero-body main-banner">
          <div className="container has-text-centered">
            <h1 className="title">{capitalise(category)}</h1>
          </div>
        </div>
      </section>
      <section className="container home">
        <div className="articles">
          <div className="column is-10 is-offset-1">
            {loading ? <Spinner /> : postsInCategory(posts[Object.keys(posts)[0]])}
          </div>
        </div>
      </section>
    </>
  );
};
