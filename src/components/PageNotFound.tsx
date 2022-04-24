import { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { animated, useSpring } from "react-spring";

export const PageNotFound: FC = (): ReactElement => {
  const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });

  return (
    <>
      <Helmet>
        <title>Page Not Found! | Elliot J. Reed</title>
      </Helmet>

      <animated.section className="divide-y divide-gray-200 dark:divide-gray-700" style={springProps}>
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Page Not Found
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            It looks like the page you&apos;ve just tried to access doesn&apos;t actually exist, sorry! Try starting
            from the <Link to="/">homepage</Link> or have a look at some <Link to="/blog">blog posts</Link>.
          </p>
        </div>
      </animated.section>
    </>
  );
};
