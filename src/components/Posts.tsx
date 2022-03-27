import { FC, ReactElement, ReactNode, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { animated, useSpring } from "react-spring";
import { pageview } from "react-ga";

import { BlogPosting } from "../interfaces/BlogPosting";
import { PostCard } from "./PostCard";
import { Spinner } from "./Spinner";
import { fetchCache } from "../hooks/fetchCache";

interface Blog {
  blogPosts: BlogPosting[];
}

export const Posts: FC = (): ReactElement => {
  const abortController = new AbortController();

  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Blog>({ blogPosts: [] });

  const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });

  const response: Blog | null = fetchCache<Blog>("https://api.elliotjreed.com/blog/posts", abortController);

  useEffect((): void => {
    if (response !== null) {
      response.blogPosts.sort((a: BlogPosting, b: BlogPosting): number => b.dateCreated.localeCompare(a.dateCreated));
      setPosts(response);
      setLoading(false);
    }
  }, [response]);

  useEffect((): void => {
    pageview(window.location.pathname + location.search);
  }, []);

  useEffect(() => {
    return (): void => abortController.abort();
  }, []);

  const postsInCategory = (posts: Blog): ReactNode => {
    if (posts.blogPosts.length < 1) {
      return noPosts();
    }

    return (
      <>
        {posts.blogPosts.map((post, index) => (
          <PostCard key={index} post={post} />
        ))}
      </>
    );
  };

  const noPosts = (): ReactNode => {
    return (
      <article className="message is-warning">
        <p className="message-header">Oh no!</p>
        <div className="message-body">
          Sorry, it looks like I&apos;m having trouble fetching the posts from the GitHub API right now. You should
          hopefully still be able to view them directly on GitHub at{" "}
          <a href="https://github.com/elliotjreed/elliotjreed" rel="noreferrer noopener">
            github.com/elliotjreed/elliotjreed
          </a>
          .
        </div>
      </article>
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
          <animated.main id="main-content" className="card" style={springProps}>
            <div className="card-content">
              <h1 className="title has-text-centered">Posts</h1>
              <div className="content">
                <p>
                  Here are some small blog posts on various PHP, Docker, Linux, Javascript, and other tech-related
                  subjects. They&apos;re essentially fixes and guides I make and occasionally remember to upload to{" "}
                  <a href="https://github.com/elliotjreed/elliotjreed" rel="noreferrer noopener">
                    GitHub
                  </a>{" "}
                  (which then get automagically pulled in here).
                </p>
              </div>
              <div className="content">{loading ? <Spinner /> : postsInCategory(posts)}</div>
            </div>
          </animated.main>
        </div>
      </section>
    </>
  );
};
