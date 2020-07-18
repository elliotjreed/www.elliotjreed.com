import * as React from "react";
import { useEffect, useState } from "react";
import * as ReactGA from "react-ga";
import { Helmet } from "react-helmet";

import { PostCard } from "./PostCard";
import { PostContentSpinner } from "./PostContentSpinner";

interface Posts {
  blogPosts: Post[];
}

interface Post {
  dateCreated: string;
  name: string;
  sameAs: string;
  articleBody: string;
}

interface Props {
  match: { params: { category: string } };
}

const capitalise = (category: string): string => {
  return category.charAt(0).toUpperCase() + category.slice(1);
};

export const Posts = (props: Props): JSX.Element => {
  const abortController = new AbortController();
  const signal = abortController.signal;
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(props.match.params.category.replace("-", " "));
  const [posts, setPosts] = useState({ blogPosts: [] });

  useEffect((): void => {
    ReactGA.pageview(window.location.pathname + location.search);
    fetchPostsInCategory();
  }, []);

  useEffect(() => {
    return (): void => abortController.abort();
  }, []);

  useEffect((): void => {
    if (category !== props.match.params.category) {
      setLoading(true);
      console.log("setting category from " + category + " to " + props.match.params.category);
      setCategory(props.match.params.category.replace("-", " "));
    }
  }, [props.match.params.category]);

  useEffect((): void => {
    fetchPostsInCategory();
  }, [category]);

  const fetchPostsInCategory = (): Promise<void> => {
    if (!("caches" in self)) {
      return updateFromNetwork();
    }

    return caches
      .open("ejr")
      .then((cache): void => {
        cache
          .match("https://127.0.0.1:8000/posts/" + category)
          .then(
            (response: Response | undefined): Promise<Posts> => {
              return new Promise((resolve, reject): void => {
                if (response) {
                  resolve(response.clone().json());
                } else {
                  reject();
                }
              });
            }
          )
          .then((posts: Posts): void => {
            setPosts(posts);
            setLoading(false);
          })
          .catch((): Promise<void> => updateFromNetwork());
      })
      .catch((): Promise<void> => updateFromNetwork());
  };

  const updateFromNetwork = (): Promise<void> => {
    return fetch("https://127.0.0.1:8000/posts/" + category, { signal: signal })
      .then(
        (response: Response): Promise<Posts> => {
          return new Promise((resolve, reject): void => {
            const clonedResponse = response.clone();
            if (clonedResponse.ok) {
              if ("caches" in self) {
                caches
                  .open("ejr")
                  .then(
                    (cache): Promise<void> =>
                      cache.put("https://127.0.0.1:8000/posts/" + category, clonedResponse.clone())
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
      .then((posts: Posts): void => {
        setPosts(posts);
        setLoading(false);
      })
      .catch((): void => abortController.abort());
  };

  const postsInCategory = (posts: Posts): React.ReactNode => {
    if (posts.blogPosts.length < 1) {
      return noPosts();
    }
    return (
      <ul>
        {posts.blogPosts.map((post, index) => (
          <PostCard key={index} category={category.toLowerCase()} post={post} />
        ))}
      </ul>
    );
  };

  const noPosts = (): JSX.Element => {
    return (
      <div className="card">
        <div className="card-content has-text-centered">
          <h3 className="title article-title">No Posts Found</h3>
          <div className="content">
            Sorry, it doesn&apos;t look like I&apos;ve written any posts on the topic of &ldquo;{category}&rdquo; yet.
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>{capitalise(category) + " | Elliot J. Reed"}</title>
        <meta name="description" content={"Various posts, guides, and how-tos on " + capitalise(category)} />
        <script type="application/ld+json">{JSON.stringify(posts)}</script>
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
          <div className="column is-10 is-offset-1">{loading ? <PostContentSpinner /> : postsInCategory(posts)}</div>
        </div>
      </section>
    </>
  );
};
