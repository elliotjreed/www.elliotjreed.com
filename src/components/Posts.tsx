import { ChangeEvent, FC, ReactElement, ReactNode, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { animated, useSpring } from "react-spring";

import { BlogPosting } from "../interfaces/BlogPosting";
import { Blog } from "../interfaces/Blog";
import { Spinner } from "./Spinner";
import { useFetch } from "../hooks/useFetch";

export const Posts: FC = (): ReactElement => {
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Blog>({ blogPosts: [] });
  const [searchTerm, setSearchTerm] = useState<string>("");

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

  const handleSearch = (event: ChangeEvent): void => {
    event.preventDefault();

    const target: HTMLInputElement = event.target as HTMLInputElement;

    setSearchTerm(target.value);
  };

  const postsInCategory = (posts: Blog): ReactNode => {
    return (
      <ul>
        {posts.blogPosts
          .filter((post: BlogPosting) => post.headline.toLowerCase().includes(searchTerm.toLowerCase()))
          .map(
            (post: BlogPosting, index: number): ReactNode => (
              <li key={index} className="py-4">
                <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={post.dateCreated}>
                        {new Date(post.dateCreated).toLocaleDateString("en-GB", {
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        })}
                      </time>
                    </dd>
                  </dl>
                  <div className="space-y-3 xl:col-span-3">
                    <div>
                      <h3 className="text-2xl font-bold leading-8 tracking-tight">
                        <Link
                          to={
                            "/blog/" +
                            post.dateCreated.substring(0, 10) +
                            "/" +
                            post.name.replace(/\s+/g, "-").toLowerCase()
                          }
                          className="text-gray-900 dark:text-gray-100"
                        >
                          {post.headline}
                        </Link>
                      </h3>
                      <div className="flex flex-wrap">{post.wordCount} words</div>
                    </div>
                  </div>
                </article>
              </li>
            )
          )}
      </ul>
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
            Posts
          </h1>
          <div className="relative max-w-lg">
            <input
              aria-label="Search articles"
              type="search"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search"
              className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
            />

            <svg
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {loading ? <Spinner /> : postsInCategory(posts)}
      </animated.section>
    </>
  );
};
