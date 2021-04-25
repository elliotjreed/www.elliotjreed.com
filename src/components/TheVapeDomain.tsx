import * as ReactGA from "react-ga";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { animated, useSpring } from "react-spring";

export const TheVapeDomain = (): JSX.Element => {
  const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + location.search);
  }, []);

  return (
    <section className="container">
      <div className="column is-10 is-offset-1">
        <animated.div className="card" style={springProps}>
          <div className="card-content">
            <h1 className="title has-text-centered">Not Found</h1>
            <div className="content">
              <article className="message is-warning">
                <p className="message-header">Oh no!</p>
                <div className="message-body">
                  I can&apos;t find anything here, sorry! Try starting from the <Link to="/">homepage</Link> or have a
                  look at some <Link to="/blog">blog posts</Link>.
                </div>
              </article>
            </div>
          </div>
        </animated.div>
      </div>
    </section>
  );
};
