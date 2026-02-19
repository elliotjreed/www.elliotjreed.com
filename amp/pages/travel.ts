import { createBreadcrumbs } from "../../app/data/schemaData.js";
import type { AmpPageData } from "../layout.js";

interface TitledPhotograph {
  title: string;
  source: string;
}

const travellingPhotographs: TitledPhotograph[] = [
  { title: "Budapest, Hungary", source: "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890663/Travelling/Budapest_Hungary.jpg" },
  { title: "Lutsk, Ukraine", source: "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890679/Travelling/Lutsk_Ukraine.jpg" },
  { title: "Strathmore, Canada", source: "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890693/Travelling/Strathmore_Canada.jpg" },
  { title: "Berlin, Germany", source: "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890674/Travelling/Berlin_Germany.jpg" },
  { title: "Bragg Creek, Canada", source: "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890684/Travelling/Bragg_Creek_Canada.jpg" },
  { title: "Ko&#353;ice, Slovakia", source: "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890710/Travelling/Kosice_Slovakia.jpg" },
  { title: "Reutte, Austria", source: "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553892154/Travelling/Reutte_Austria.jpg" },
  { title: "Zagreb, Croatia", source: "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890698/Travelling/Zagreb_Croatia.jpg" },
  { title: "Ljubljana, Slovenia", source: "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890666/Travelling/Ljubljana_Slovenia.jpg" },
  { title: "Bratislava, Slovakia", source: "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890671/Travelling/Bratislava_Slovakia.jpg" },
  { title: "Neuschwanstein, Germany", source: "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890691/Travelling/Neuschwanstein_Austria.jpg" },
  { title: "Rome, Italy", source: "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890686/Travelling/Rome_Italy.jpg" },
  { title: "Calgary, Canada", source: "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890684/Travelling/Calgary_Canada.jpg" },
  { title: "Prague, Czechia", source: "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890681/Travelling/Prague_Czech.jpg" },
  { title: "Vienna, Austria", source: "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890692/Travelling/Vienna_Austria.jpg" },
  { title: "Oswiecim, Poland", source: "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890680/Travelling/Oswiecim_Poland.jpg" },
  { title: "Venice, Italy", source: "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890692/Travelling/Venice_Italy.jpg" },
  { title: "&#381;ilina, Slovakia", source: "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890698/Travelling/Zilina_Slovakia.jpg" },
  { title: "Krakow, Poland", source: "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890708/Travelling/Krakow_Poland.jpg" },
  { title: "Mijas, Spain", source: "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890673/Travelling/Mijas_Spain.jpg" },
  { title: "Amsterdam, Netherlands", source: "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890671/Travelling/Amsterdam_Netherlands.jpg" },
  { title: "Rotterdam, Netherlands", source: "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890686/Travelling/Rotterdamn_Netherlands.jpg" },
  { title: "Salzburg, Austria", source: "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890703/Travelling/Salzburg_Austria.jpg" },
  { title: "Kyiv, Ukraine", source: "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553893508/Travelling/Kyiv_Ukraine.jpg" },
  { title: "Canmore, Canada", source: "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890700/Travelling/Canmore_Canada.jpg" },
  { title: "N&#252;rnberg, Germany", source: "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890700/Travelling/Nuremberg_Germany.jpg" },
  { title: "Bamberg, Germany", source: "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890700/Travelling/Bamberg_Germany.jpg" },
  { title: "Rothemberg, Germany", source: "https://res.cloudinary.com/elliotjreed/image/upload/f_auto,q_auto/v1553890700/Travelling/Rothemberg_Germany.jpg" },
];

export function renderPage(): AmpPageData {
  const photoCards = travellingPhotographs
    .map(
      (photo) => `<div class="photo-card">
  <div class="photo-card-inner">
    <amp-img
      alt="Photograph from my visit to ${photo.title}"
      src="${photo.source}"
      width="544"
      height="306"
      layout="responsive"
    ></amp-img>
    <div class="photo-caption"><h2>${photo.title}</h2></div>
  </div>
</div>`,
    )
    .join("\n");

  return {
    title: "Travelling | EJR",
    description: "A few photos from various travels and trips.",
    canonicalPath: "/travel",
    type: "website",
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": "https://www.elliotjreed.com/travel#webpage",
        url: "https://www.elliotjreed.com/travel",
        name: "Travelling",
        description: "A few photos from various travels and trips.",
        isPartOf: { "@id": "https://www.elliotjreed.com/#website" },
        author: { "@id": "https://www.elliotjreed.com/#author" },
        inLanguage: "en-GB",
      },
      createBreadcrumbs([
        { name: "Home", url: "https://www.elliotjreed.com" },
        { name: "Travel", url: "https://www.elliotjreed.com/travel" },
      ]),
    ],
    body: `<section class="page-section">
  <div class="page-header">
    <h1 class="page-title">Travelling</h1>
    <p class="page-intro">A few photographs from some of the places I&#39;ve visited (and remembered to take a photo!).</p>
  </div>
  <div class="photo-grid">
    ${photoCards}
  </div>
</section>`,
  };
}
