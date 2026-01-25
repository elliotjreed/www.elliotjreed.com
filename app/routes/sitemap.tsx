import type { ReactElement } from "react";
import { Link } from "react-router";

import { type StaticLink, staticLinks } from "~/data/staticLinks";

export const meta = () => [
  { title: "Sitemap | EJR" },
  {
    name: "description",
    content: "A list of all the links on this website, including ones I don't link directly to in the main navigation.",
  },
];

const renderLinks = (links: StaticLink[]): ReactElement => (
  <ul>
    {links
      .filter((link: StaticLink) => link.href || link.children?.length)
      .map(
        (link: StaticLink): ReactElement => (
          <li key={link.href ?? link.title} className="mb-1">
            {link.href ? (
              <Link to={link.href} className="text-gray-700 dark:text-gray-200">
                {link.title}
              </Link>
            ) : (
              <span className="font-semibold text-gray-700 dark:text-gray-200">{link.title}</span>
            )}
            {link.children && renderLinks(link.children)}
          </li>
        ),
      )}
  </ul>
);

export default (): ReactElement => (
  <section className="divide-y divide-gray-200 dark:divide-gray-700">
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-700 dark:text-gray-200 sm:text-4xl sm:leading-10 md:text-6xl">
        Sitemap
      </h1>
      <p className="prose dark:prose-dark max-w-none text-lg leading-7 text-gray-600 dark:text-gray-300">
        All the links on this site, including ones I don't keep in the navigation.
      </p>
    </div>

    <div className="prose max-w-none dark:prose-dark">{renderLinks(staticLinks)}</div>
  </section>
);
