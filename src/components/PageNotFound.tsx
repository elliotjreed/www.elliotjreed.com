import * as React from "react";
import * as ReactGA from "react-ga";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { animated, useSpring } from "react-spring";

export const PageNotFound = (): JSX.Element => {
  const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + location.search);
  }, []);

  return (
    <section className="container">
      <div className="column is-10 is-offset-1">
        <animated.div className="card" style={springProps}>
          <div className="column is-12">
            <h2 className="title has-text-centered">Not Found</h2>
            <p className="has-text-centered">
              I can&apos;t find anything here, sorry! Try starting from the <Link to="/">homepage</Link> or have a look
              at some <Link to="/blog">blog posts</Link>.
            </p>
          </div>
        </animated.div>
      </div>
    </section>
  );
};
