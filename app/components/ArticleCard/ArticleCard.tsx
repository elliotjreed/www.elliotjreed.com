import type { ReactElement } from "react";
import { Link } from "react-router";
import { formatLongDate, toIsoDate } from "~/utils/dates";

interface ArticleCardProps {
  title: string;
  href: string;
  excerpt?: string;
  topic: string;
  updated?: string;
  lead?: boolean;
}

export const ArticleCard = ({ title, href, excerpt, topic, updated, lead = false }: ArticleCardProps): ReactElement => (
  <article className={lead ? "ejr-card ejr-card-lead" : "ejr-card"}>
    <h3>
      <Link to={href} prefetch="intent">
        {title}
      </Link>
    </h3>
    <p>{excerpt}</p>
    <div className="ejr-card-foot">
      <span className="ejr-card-topic">{topic}</span>
      {updated && <time dateTime={toIsoDate(updated)}>Updated {formatLongDate(updated)}</time>}
    </div>
  </article>
);
