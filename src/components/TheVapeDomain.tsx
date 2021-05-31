import { useEffect } from "react";
import * as ReactGA from "react-ga";
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
        <animated.main id="main-content" className="card" style={springProps}>
          <div className="card-content">
            <h1 className="title has-text-centered">TheVape.co.uk</h1>
            <div className="content">
              <p>
                The domain name &ldquo;TheVape.co.uk&rdquo; is available for purchase should you be interested.{" "}
                <Link to="/contact">Contact me</Link> to make an enquiry.
              </p>
            </div>
          </div>
        </animated.main>
      </div>
    </section>
  );
};
