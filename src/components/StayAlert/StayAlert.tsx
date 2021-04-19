import * as React from "react";
import { useEffect, useRef, useState } from "react";
import * as ReactGA from "react-ga";
import { Helmet } from "react-helmet";
import { animated, useSpring } from "react-spring";
import domtoimage from "dom-to-image-more";

import { YellowBox } from "./YellowBox";

export const StayAlert = (): JSX.Element => {
  const props = useSpring({ opacity: 1, from: { opacity: 0 } });
  const { x } = useSpring({ from: { x: 0 }, x: 1, config: { duration: 1000 } });

  const [lineOne, setLineOne] = useState<string>("STAY ALERT.");
  const [lineTwo, setLineTwo] = useState<string>("CONTROL THE VIRUS.");
  const [lineThree, setLineThree] = useState<string>("SAVE LIVES.");
  const [downloadUrl, setDownloadUrl] = useState<string>("");

  const contentContainerRef = useRef<HTMLElement | null>(null);

  const handleMemeGeneration = (): void => {
    domtoimage.toPng(contentContainerRef.current).then((dataUrl) => {
      setDownloadUrl(dataUrl);
    });
  };

  useEffect((): void => {
    ReactGA.pageview(window.location.pathname + location.search);
    handleMemeGeneration();
  }, []);

  return (
    <>
      <Helmet>
        <title>Stay Alert Meme Generator | Elliot J. Reed</title>
        <meta
          name="description"
          content="Create your own 'Stay alert. Control the virus. Save lives.' Coronavirus poster."
        />
      </Helmet>

      <section className="container">
        <div className="column is-10 is-offset-1">
          <animated.div className="card" style={props}>
            <div className="card-content">
              <h2 className="title has-text-centered">&ldquo;Stay alert&rdquo; poster generator</h2>
              <h3 className="subtitle has-text-centered">
                Fill in the box below, and click the <strong>download</strong> button when you&apos;re done.
              </h3>
            </div>

            <div className="columns">
              <div className="column is-7-tablet is-6-fullhd">
                <YellowBox
                  lineOne={lineOne}
                  lineTwo={lineTwo}
                  lineThree={lineThree}
                  contentContainerRef={contentContainerRef}
                />
              </div>
              <div className="column is-5-tablet is-5-fullhd">
                <div className="field">
                  <div className="control">
                    <input
                      className="input is-medium"
                      placeholder="Stay alert."
                      onChange={(event: React.ChangeEvent<HTMLInputElement>): void => setLineOne(event.target.value)}
                      onKeyUp={handleMemeGeneration}
                      title="First line"
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className="input is-medium"
                      placeholder="Control the virus."
                      onChange={(event: React.ChangeEvent<HTMLInputElement>): void => setLineTwo(event.target.value)}
                      onKeyUp={handleMemeGeneration}
                      title="Second line"
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className="input is-medium"
                      placeholder="Save lives."
                      onChange={(event: React.ChangeEvent<HTMLInputElement>): void => setLineThree(event.target.value)}
                      onKeyUp={handleMemeGeneration}
                      title="Third line"
                    />
                  </div>
                </div>
                <a download="stayalert.png" className="button is-medium submit-button" href={downloadUrl}>
                  <animated.div
                    style={{
                      opacity: x.to({ range: [0, 1], output: [0.3, 1] }),
                      transform: x
                        .to({
                          range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                          output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1]
                        })
                        .to((x) => `scale(${x})`)
                    }}
                  >
                    Download
                  </animated.div>
                </a>
              </div>
            </div>
          </animated.div>
        </div>
      </section>
    </>
  );
};

export default StayAlert;
