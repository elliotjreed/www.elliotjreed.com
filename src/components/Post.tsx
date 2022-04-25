import { marked } from "marked";
import { FC, ReactElement, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, Params, useParams } from "react-router-dom";
import { animated, useSpring } from "react-spring";

import { BlogPosting as PostInterface } from "../interfaces/BlogPosting";
import { useFetch } from "../hooks/useFetch";
import { Spinner } from "./Spinner";

export const Post: FC = (): ReactElement => {
  const params: Readonly<Params> = useParams();
  const date: string = params.date;
  const url: string = date + "/" + params.post;

  const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });

  const [content, responseErrors] = useFetch<PostInterface>({
    url: "https://api.elliotjreed.com/blog/post/" + url,
    cacheResponse: true
  });

  return (
    <>
      {content !== undefined && (
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
      )}

      <animated.article style={springProps}>
        <header>
          <div className="space-y-1 border-b border-gray-200 pb-10 text-center dark:border-gray-700">
            <dl>
              <div>
                <dt className="sr-only">Published on</dt>
                {content !== undefined && (
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={content.dateCreated}>
                      {new Date(content.dateCreated).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })}
                    </time>
                    &nbsp;<em>{content.wordCount} words</em>
                  </dd>
                )}
              </div>
            </dl>
            <div>
              <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
                {content !== undefined && content.headline}
              </h1>
            </div>
          </div>
        </header>
        <div
          className="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:divide-y-0"
          style={{ gridTemplateRows: "auto 1fr" }}
        >
          <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
            {content === undefined ? (
              <Spinner />
            ) : (
              <div
                className="prose max-w-none pt-10 pb-8 dark:prose-dark"
                dangerouslySetInnerHTML={{
                  __html: marked(content.articleBody.substring(content.articleBody.indexOf("\n") + 1))
                }}
              />
            )}
          </div>
          <footer className="print:hidden">
            <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
              <div className="pt-4 xl:pt-8">
                <Link to="/blog" className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                  &larr; Back to the blog
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </animated.article>
    </>
  );
};
