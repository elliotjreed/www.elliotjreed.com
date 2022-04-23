import domtoimage from "dom-to-image-more";
import { ChangeEvent, FC, ReactElement, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { animated, useSpring } from "react-spring";

import { TweetBox } from "./TweetBox";

export const GovernmentTwitter: FC = (): ReactElement => {
  const [tweet, setTweet] = useState<string>("Stay alert by making your own Government tweet.\n\n#StayAlert.");
  const [downloadUrl, setDownloadUrl] = useState<string>("");

  const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });
  const { x } = useSpring({ from: { x: 0 }, x: 1, config: { duration: 1000 } });

  const contentContainerRef = useRef<HTMLDivElement | null>(null);

  const handleMemeGeneration = (): void => {
    domtoimage.toPng(contentContainerRef.current).then((dataUrl) => {
      setDownloadUrl(dataUrl);
    });
  };

  useEffect((): void => {
    handleMemeGeneration();
  }, []);

  return (
    <>
      <Helmet>
        <title>@10DowningStreet Meme Generator | Elliot J. Reed</title>
        <meta name="description" content="Generate your own Number 10 Downing Street UK Government Tweet." />
      </Helmet>

      <animated.section className="divide-y divide-gray-200 dark:divide-gray-700" style={springProps}>
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            UK Prime Minister tweet generator
          </h1>

          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Fill in the box below, and click the <strong>download</strong> button when you&apos;re done.
          </p>
        </div>

        <div className="container py-12">
          <div className="grid grid-cols-4 gap-4">
            <div className="md:col-span-2 col-span-4">
              <TweetBox content={tweet} contentContainerRef={contentContainerRef} />
            </div>

            <div className="md:col-span-2 col-span-4">
              <form>
                <div className="mb-4">
                  <textarea
                    className="w-full rounded-md px-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-black"
                    rows={3}
                    placeholder="Stay alert by making your own government tweet."
                    onChange={(event: ChangeEvent<HTMLTextAreaElement>): void => setTweet(event.target.value)}
                    title="Stay alert by making your own government tweet."
                    onKeyUp={handleMemeGeneration}
                  />
                </div>
                <animated.a
                  download="tweet.png"
                  className="inline-flex items-center px-6 py-2 bg-gray-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out"
                  href={downloadUrl}
                  style={{
                    opacity: x.to({ range: [0, 1], output: [0.3, 1] }),
                    transform: x
                      .to({
                        range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                        output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1]
                      })
                      .to((x: number): string => `scale(${x})`)
                  }}
                >
                  Download
                </animated.a>
              </form>
            </div>
          </div>
        </div>
      </animated.section>
    </>
  );
};
