import * as React from "react";
import { useEffect, useState } from "react";
import * as ReactGA from "react-ga";
import { Helmet } from "react-helmet";
import { animated, useSpring } from "react-spring";
import { Post } from "../interfaces/Post";

import { PostCard } from "./PostCard";
import { Spinner } from "./Spinner";

interface Posts {
  blogPosts: Post[];
}

export const Posts = (): JSX.Element => {
  const abortController = new AbortController();
  const signal = abortController.signal;
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState({ blogPosts: [] });
  const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });

  useEffect((): void => {
    ReactGA.pageview(window.location.pathname + location.search);
    fetchPosts();
  }, []);

  useEffect(() => {
    return (): void => abortController.abort();
  }, []);

  const fetchPosts = (): Promise<void> => {
    if (!("caches" in self)) {
      return updateFromNetwork();
    }

    return caches
      .open("ejr")
      .then((cache): void => {
        cache
          .match("https://api.elliotjreed.com/blog/posts")
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
    return fetch("https://api.elliotjreed.com/blog/posts", { signal: signal })
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
                      cache.put("https://api.elliotjreed.com/blog/posts", clonedResponse.clone())
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
          <PostCard key={index} post={post} />
        ))}
      </ul>
    );
  };

  const noPosts = (): JSX.Element => {
    return (
      <div className="has-text-centered">
        <div className="subtitle is-warning">
          Sorry, it looks like I&apos;m having trouble fetching the posts from the GitHub API right now. You should
          hopefully still be able to view them directly on GitHub at{" "}
          <a href="https://github.com/elliotjreed/elliotjreed" rel="noreferrer noopener">
            github.com/elliotjreed/elliotjreed
          </a>
          .
        </div>
        <hr />
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Posts | Elliot J. Reed</title>
        <meta name="description" content="Various posts, guides, and how-tos" />
        <script type="application/ld+json">{JSON.stringify(posts)}</script>
      </Helmet>

      <section className="container">
        <div className="column is-10 is-offset-1">
          <animated.div className="card" style={springProps}>
            <div className="column is-12">
              <h2 className="title has-text-centered">Posts</h2>
              <p className="has-text-centered">
                Here are some small blog posts on various PHP, Docker, Linux, Javascript, and other tech-related
                subjects. They&apos;re essentially fixes and guides I make and occasionally remember to upload to{" "}
                <a href="https://github.com/elliotjreed/elliotjreed" rel="noreferrer noopener">
                  GitHub
                </a>{" "}
                (which then get automagically pulled in here).
              </p>
            </div>
            {loading ? <Spinner /> : postsInCategory(posts)}
          </animated.div>
        </div>
      </section>
    </>
  );
};
