import type { ReactElement } from "react";
import { Link } from "react-router";
import { PageHeader } from "~/components/PageHeader/PageHeader";
import { type StaticLink, staticLinks } from "~/data/staticLinks";
import { createMeta } from "~/utils/seo";

export const meta = () => [
  ...createMeta({
    title: "Sitemap | EJR",
    description:
      "A list of all the links on this website, including ones I don't link directly to in the main navigation.",
    url: "https://www.elliotjreed.com/sitemap",
    type: "website",
    image: "https://www.elliotjreed.com/og.png",
  }),
];

const renderLinks = (links: StaticLink[]): ReactElement => (
  <ul>
    {links
      .filter((link: StaticLink) => link.href || link.children?.length)
      .map((link: StaticLink): ReactElement => (
        <li key={link.href ?? link.title} className="mb-1">
          {link.href ? (
            <Link to={link.href} className="text-ink">
              {link.title}
            </Link>
          ) : (
            <span className="text-ink font-semibold">{link.title}</span>
          )}
          {link.children && renderLinks(link.children)}
        </li>
      ))}
  </ul>
);

export default (): ReactElement => (
  <section className="ejr-article divide-line divide-y">
    <PageHeader title="Sitemap">
      <p className="prose ejr-lead">All the links on this site, including ones I don't keep in the navigation.</p>
    </PageHeader>

    <div className="prose ejr-prose">{renderLinks(staticLinks)}</div>
  </section>
);
