import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { animated, useSpring } from "react-spring";
import domtoimage from "dom-to-image-more";
import * as ReactGA from "react-ga";

import { TweetBox } from "./TweetBox";

export const GovernmentTwitter = (): JSX.Element => {
  const props = useSpring({ opacity: 1, from: { opacity: 0 } });
  const { x } = useSpring({ from: { x: 0 }, x: 1, config: { duration: 1000 } });

  const [tweet, setTweet] = useState<string>("Stay alert by making your own Government tweet.\n\n#StayAlert.");
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
        <title>#StayAlert @10DowningStreet Meme Generator | Elliot J. Reed</title>
        <meta name="description" content="Generate your own Number 10 Downing Street UK Government Tweet" />
      </Helmet>

      <animated.section className="container" style={props}>
        <div className="column is-10 is-offset-1">
          <div className="card">
            <div className="column is-12">
              <h2 className="title has-text-centered">
                Create your own &ldquo;@10DowningStreet&rdquo; tweet
              </h2>
              <p className="has-text-centered">
                Fill in the box below, and click the <strong>download</strong> button when you&apos;re done.
              </p>
            </div>

            <div className="columns is-multiline">
              <div className="column is-12 is-inline-flex-desktop is-7-desktop">
                <TweetBox content={tweet} contentContainerRef={contentContainerRef} />
              </div>

              <div className="column is-12 is-inline-flex-desktop is-5-desktop">
                <div className="field">
                  <div className="control">
                    <textarea
                      className="textarea"
                      rows={3}
                      placeholder="Stay alert by making your own government tweet."
                      onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => setTweet(event.target.value)}
                      title="Stay alert by making your own government tweet."
                      onKeyUp={handleMemeGeneration}
                    />
                  </div>
                </div>
                <a download="tweet.png" className="button is-medium submit-button" href={downloadUrl}>
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
          </div>
        </div>
      </animated.section>
    </>
  );
};

export default GovernmentTwitter;
