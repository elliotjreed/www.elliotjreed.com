import { FC, ReactElement, ReactNode, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { animated, useSpring } from "react-spring";

import { BlogPosting } from "../interfaces/BlogPosting";
import { Blog } from "../interfaces/Blog";
import { Spinner } from "./Spinner";
import { useFetch } from "../hooks/useFetch";
import { staticLinks } from "../data/staticLinks";
import { StaticLink } from "../interfaces/StaticLink";

export const Sitemap: FC = (): ReactElement => {
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Blog>({ blogPosts: [] });

  const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });

  const [response, responseErrors] = useFetch<Blog>({
    url: "https://api.elliotjreed.com/blog/posts",
    cacheResponse: true
  });

  useEffect((): void => {
    if (response !== null && response !== undefined) {
      response.blogPosts.sort((a: BlogPosting, b: BlogPosting): number => b.dateCreated.localeCompare(a.dateCreated));
      setPosts(response);
      setLoading(false);
    }
  }, [response]);

  useEffect((): void => {
    if (responseErrors.length > 0) {
      console.error(responseErrors);
    }
  }, [responseErrors]);

  const postsInCategory = (posts: Blog): ReactNode => {
    return (
      <>
        <h2 className="text-lg font-bold leading-8 tracking-tight">Blog Posts</h2>
        <ul>
          {posts.blogPosts.map(
            (post: BlogPosting, index: number): ReactNode => (
              <li key={index}>
                <Link
                  to={"/blog/" + post.dateCreated.substring(0, 10) + "/" + post.name.replace(/\s+/g, "-").toLowerCase()}
                  className="text-gray-900 dark:text-gray-100"
                >
                  {post.headline}
                </Link>
              </li>
            )
          )}
        </ul>
      </>
    );
  };

  return (
    <>
      <Helmet>
        <title>Posts | Elliot J. Reed</title>
        <meta name="description" content="Various posts, guides, and how-tos" />
        <script type="application/ld+json">{JSON.stringify(posts)}</script>
      </Helmet>

      <animated.section className="divide-y" style={springProps}>
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Sitemap
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">Find all the links on this site here!</p>
        </div>

        <div className="prose max-w-none dark:prose-dark">
          <ul>
            {staticLinks.map(
              (link: StaticLink, index: number): ReactNode => (
                <li key={index}>
                  <Link to={link.href} className="text-gray-900 dark:text-gray-100">
                    {link.title}
                  </Link>
                </li>
              )
            )}
          </ul>

          {loading ? <Spinner /> : postsInCategory(posts)}
        </div>
      </animated.section>
    </>
  );
};
