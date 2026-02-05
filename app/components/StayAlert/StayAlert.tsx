// @ts-expect-error
import domtoimage from "dom-to-image-more";
import { type ChangeEvent, type FC, type ReactElement, type RefObject, useEffect, useRef, useState } from "react";
import { YellowBox } from "~/components/StayAlert/YellowBox";

export const StayAlert: FC = (): ReactElement => {
  const [lineOne, setLineOne] = useState<string>("STAY ALERT.");
  const [lineTwo, setLineTwo] = useState<string>("CONTROL THE VIRUS.");
  const [lineThree, setLineThree] = useState<string>("SAVE LIVES.");
  const [downloadUrl, setDownloadUrl] = useState<string>("");

  const contentContainerRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);

  const handleMemeGeneration = (): void => {
    domtoimage.toPng(contentContainerRef.current).then((dataUrl: string): void => setDownloadUrl(dataUrl));
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: incorrectly reports handleMemeGeneration as missing dependency
  useEffect((): void => handleMemeGeneration(), []);

  return (
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
              <label htmlFor="stay-alert-line-one" className="sr-only">
                First line of the poster text
              </label>
              <input
                id="stay-alert-line-one"
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
              <label htmlFor="stay-alert-line-two" className="sr-only">
                Second line of the poster text
              </label>
              <input
                id="stay-alert-line-two"
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
              <label htmlFor="stay-alert-line-three" className="sr-only">
                Third line of the poster text
              </label>
              <input
                id="stay-alert-line-three"
                type="text"
                className="w-full rounded-md px-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-black"
                placeholder="Save lives."
                aria-label="Third line of the poster text"
                onChange={(event: ChangeEvent<HTMLInputElement>): void => setLineThree(event.target.value)}
                onKeyUp={handleMemeGeneration}
                title="Third line"
              />
            </div>

            <a
              download="stayalert.png"
              className="inline-flex items-center px-6 py-2 bg-gray-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out"
              href={downloadUrl}
            >
              Download
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};
