import * as React from "react";
import { animated, useSpring } from "react-spring";

import { Spinner } from "./Spinner";

export const RouteLoading = (): JSX.Element => {
  const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });

  return (
    <>
      <section className="container">
        <div className="column is-10 is-offset-1">
          <animated.div className="card" style={springProps}>
            <div className="card-content">
              <Spinner />
            </div>
          </animated.div>
        </div>
      </section>
    </>
  );
};
