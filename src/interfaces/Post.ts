import { Image } from "./Image";
import { Organisation } from "./Organisation";
import { Person } from "./Person";

export interface Post {
  "@context": string;
  "@type": string;
  "name": string;
  "dateCreated": string;
  "datePublished": string;
  "dateModified": string;
  "wordCount": number;
  "author": Person;
  "url": string;
  "mainEntityOfPage": string;
  "inLanguage": string;
  "copyrightHolder": Person;
  "publisher": Organisation;
  "headline": string;
  "license": string;
  "image": Image;
  "sameAs": string;
  "articleBody": string;
}
