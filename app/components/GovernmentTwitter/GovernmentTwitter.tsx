// @ts-expect-error
import domtoimage from "dom-to-image-more";
import { type ChangeEvent, type FC, type ReactElement, type RefObject, useEffect, useRef, useState } from "react";

import { TweetBox } from "./TweetBox";

export const GovernmentTwitter: FC = (): ReactElement => {
  const [tweet, setTweet] = useState<string>("Stay alert by making your own Government tweet.\n\n#StayAlert.");
  const [downloadUrl, setDownloadUrl] = useState<string>("");

  const contentContainerRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);

  const handleMemeGeneration = (): void => {
    domtoimage.toPng(contentContainerRef.current).then((dataUrl: string) => {
      setDownloadUrl(dataUrl);
    });
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: incorrectly reports handleMemeGeneration as missing dependency
  useEffect((): void => handleMemeGeneration(), []);

  return (
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
            <a
              download="tweet.png"
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
