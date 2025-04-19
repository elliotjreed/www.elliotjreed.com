import type { ReactElement } from "react";

export const meta = () => [
  { title: "Travelling" },
  {
    name: "description",
    content: "A few photos from various travels and trips.",
  },
];

interface TitledPhotograph {
  title: string;
  source: string;
}

const travellingPhotographs: TitledPhotograph[] = [
  {
    title: "Budapest, Hungary",
    source:
      "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890663/Travelling/Budapest_Hungary.jpg",
  },
  {
    title: "Lutsk, Ukraine",
    source:
      "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890679/Travelling/Lutsk_Ukraine.jpg",
  },
  {
    title: "Strathmore, Canada",
    source:
      "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890693/Travelling/Strathmore_Canada.jpg",
  },
  {
    title: "Berlin, Germany",
    source:
      "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890674/Travelling/Berlin_Germany.jpg",
  },
  {
    title: "Bragg Creek, Canada",
    source:
      "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890684/Travelling/Bragg_Creek_Canada.jpg",
  },
  {
    title: "Košice, Slovakia",
    source:
      "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890710/Travelling/Kosice_Slovakia.jpg",
  },
  {
    title: "Reutte, Austria",
    source:
      "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553892154/Travelling/Reutte_Austria.jpg",
  },
  {
    title: "Zagreb, Croatia",
    source:
      "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890698/Travelling/Zagreb_Croatia.jpg",
  },
  {
    title: "Ljubljana, Slovenia",
    source:
      "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890666/Travelling/Ljubljana_Slovenia.jpg",
  },
  {
    title: "Bratislava, Slovakia",
    source:
      "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890671/Travelling/Bratislava_Slovakia.jpg",
  },
  {
    title: "Neuschwanstein, Germany",
    source:
      "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890691/Travelling/Neuschwanstein_Austria.jpg",
  },
  {
    title: "Rome, Italy",
    source: "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890686/Travelling/Rome_Italy.jpg",
  },
  {
    title: "Calgary, Canada",
    source:
      "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890684/Travelling/Calgary_Canada.jpg",
  },
  {
    title: "Prague, Czechia",
    source: "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890681/Travelling/Prague_Czech.jpg",
  },
  {
    title: "Vienna, Austria",
    source:
      "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890692/Travelling/Vienna_Austria.jpg",
  },
  {
    title: "Oswiecim, Poland",
    source:
      "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890680/Travelling/Oswiecim_Poland.jpg",
  },
  {
    title: "Venice, Italy",
    source: "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890692/Travelling/Venice_Italy.jpg",
  },
  {
    title: "Žilina, Slovakia",
    source:
      "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890698/Travelling/Zilina_Slovakia.jpg",
  },
  {
    title: "Krakow, Poland",
    source:
      "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890708/Travelling/Krakow_Poland.jpg",
  },
  {
    title: "Mijas, Spain",
    source: "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890673/Travelling/Mijas_Spain.jpg",
  },
  {
    title: "Amsterdam, Netherlands",
    source:
      "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890671/Travelling/Amsterdam_Netherlands.jpg",
  },
  {
    title: "Rotterdam, Netherlands",
    source:
      "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890686/Travelling/Rotterdamn_Netherlands.jpg",
  },
  {
    title: "Salzburg, Austria",
    source:
      "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890703/Travelling/Salzburg_Austria.jpg",
  },
  {
    title: "Kyiv, Ukraine",
    source: "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553893508/Travelling/Kyiv_Ukraine.jpg",
  },
  {
    title: "Canmore, Canada",
    source:
      "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890700/Travelling/Canmore_Canada.jpg",
  },
  {
    title: "Nürnberg, Germany",
    source:
      "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890700/Travelling/Nuremberg_Germany.jpg",
  },
  {
    title: "Bamberg, Germany",
    source:
      "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890700/Travelling/Bamberg_Germany.jpg",
  },
  {
    title: "Rothemberg, Germany",
    source:
      "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890700/Travelling/Rothemberg_Germany.jpg",
  },
];

export default function Index() {
  return (
    <section className="divide-y divide-gray-200 dark:divide-gray-700">
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
            (photo: TitledPhotograph): ReactElement => (
              <div key={photo.source} className="md p-4 md:w-1/2" style={{ maxWidth: "544px" }}>
                <div className="h-full overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700">
                  <img
                    alt={`Photograph from my visit to ${photo.title}`}
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
            ),
          )}
        </div>
      </div>
    </section>
  );
}
