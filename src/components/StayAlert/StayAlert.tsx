import domtoimage from "dom-to-image-more";
import { ChangeEvent, FC, ReactElement, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { animated, useSpring } from "react-spring";

import { YellowBox } from "./YellowBox";

export const StayAlert: FC = (): ReactElement => {
  const [lineOne, setLineOne] = useState<string>("STAY ALERT.");
  const [lineTwo, setLineTwo] = useState<string>("CONTROL THE VIRUS.");
  const [lineThree, setLineThree] = useState<string>("SAVE LIVES.");
  const [downloadUrl, setDownloadUrl] = useState<string>("");

  const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });
  const { x } = useSpring({ from: { x: 0 }, x: 1, config: { duration: 1000 } });

  const contentContainerRef = useRef<HTMLDivElement | null>(null);

  const handleMemeGeneration = (): void => {
    domtoimage.toPng(contentContainerRef.current).then((dataUrl: string): void => setDownloadUrl(dataUrl));
  };

  useEffect((): void => {
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

      <animated.section className="divide-y divide-gray-200 dark:divide-gray-700" style={springProps}>
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            &ldquo;Stay alert&rdquo; poster generator
          </h1>

          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Fill in the box below, and click the <strong>download</strong> button when you&apos;re done.
          </p>
        </div>

        <div className="container py-12">
          <div className="grid grid-cols-4 gap-4">
            <div className="md:col-span-2 col-span-4">
              <YellowBox
                lineOne={lineOne}
                lineTwo={lineTwo}
                lineThree={lineThree}
                contentContainerRef={contentContainerRef}
              />
            </div>

            <div className="md:col-span-2 col-span-4">
              <form>
                <div className="mb-4">
                  <input
                    type="text"
                    className="w-full rounded-md px-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-black"
                    placeholder="Stay alert."
                    aria-label="First line of the poster text"
                    onChange={(event: ChangeEvent<HTMLInputElement>): void => setLineOne(event.target.value)}
                    onKeyUp={handleMemeGeneration}
                    title="First line"
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    className="w-full rounded-md px-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-black"
                    placeholder="Control the virus."
                    aria-label="Second line of the poster text"
                    onChange={(event: ChangeEvent<HTMLInputElement>): void => setLineTwo(event.target.value)}
                    onKeyUp={handleMemeGeneration}
                    title="Second line"
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    className="w-full rounded-md px-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-black"
                    placeholder="Save lives."
                    aria-label="Third line of the poster text"
                    onChange={(event: ChangeEvent<HTMLInputElement>): void => setLineThree(event.target.value)}
                    onKeyUp={handleMemeGeneration}
                    title="Third line"
                  />
                </div>

                <animated.a
                  download="stayalert.png"
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
