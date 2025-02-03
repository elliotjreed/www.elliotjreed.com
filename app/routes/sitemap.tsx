import React, { type ReactNode } from "react";
import { Link } from "react-router";

import type { Route } from "./+types/home";
import { type StaticLink, staticLinks } from "~/data/staticLinks";

export const meta = ({}: Route.MetaArgs) => [
  { title: "Sitemap" },
  {
    name: "description",
    content: "A list of all the links on this website, including ones I don't link directly to in the main navigation."
  }
];

export default function Index() {
  return (
    <section className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Sitemap
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          All the links on this site, including the old stuff I don't keep in the navigation.
        </p>
      </div>

      <div className="prose max-w-none dark:prose-dark">
        <ul>
          {staticLinks.map((link: StaticLink, index: number): ReactNode => {
            return (
              <li key={index}>
                <Link to={link.href} className="text-gray-900 dark:text-gray-100">
                  {link.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
