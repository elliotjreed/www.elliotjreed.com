import { FC, ReactElement } from "react";
import { Helmet } from "react-helmet";
import { animated, useSpring } from "react-spring";
import { TitledPhotograph, travellingPhotographs } from "../data/travellingPhotographs";

export const Travelling: FC = (): ReactElement => {
  const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });

  return (
    <>
      <Helmet>
        <title>Travelling | Elliot J. Reed</title>
        <meta name="description" content="A few photographs from my travels over the years." />
      </Helmet>

      <animated.section className="divide-y divide-gray-200 dark:divide-gray-700" style={springProps}>
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Travelling
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            A few photographs from some of the places I&apos;ve visited (and remembered to take a photo!).
          </p>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {travellingPhotographs.map(
              (photo: TitledPhotograph, index: number): ReactElement => (
                <div key={index} className="md p-4 md:w-1/2" style={{ maxWidth: "544px" }}>
                  <div className="h-full overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700">
                    <img
                      alt={"Photograph from my visit to " + photo.title}
                      src={photo.source}
                      className="object-cover object-center md:h-36 lg:h-48"
                      width={544}
                      height={306}
                      loading="lazy"
                    />
                    <div className="p-6">
                      <h2 className="text-xl font-bold leading-8 tracking-tight">{photo.title}</h2>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </animated.section>
    </>
  );
};
