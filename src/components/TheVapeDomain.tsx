import { FC, ReactElement, useEffect } from "react";
import { Link } from "react-router-dom";
import { animated, useSpring } from "react-spring";
import { pageview } from "react-ga";

export const TheVapeDomain: FC = (): ReactElement => {
  const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });

  useEffect((): void => {
    pageview(window.location.pathname + location.search);
  }, []);

  return (
    <animated.section className="divide-y divide-gray-200 dark:divide-gray-700" style={springProps}>
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          TheVape.co.uk
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          The domain name &ldquo;TheVape.co.uk&rdquo; is available for purchase should you be interested.{" "}
          <Link to="/contact">Contact me</Link> to make an enquiry.
        </p>
      </div>
    </animated.section>
  );
};
