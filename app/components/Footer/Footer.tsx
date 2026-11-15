import type { FC, ReactElement } from "react";
import { Link } from "react-router";
import { SocialLinks } from "~/components/SocialLinks/SocialLinks";

export const Footer: FC = (): ReactElement => {
  return (
    <footer className="bg-surface-000 text-ink-muted mt-20 print:hidden">
      <div className="mx-auto grid max-w-(--content-max) gap-8 px-4 py-16 sm:px-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:py-20">
        <Link
          to="/"
          className="font-display text-heading-3 text-ink justify-self-start rounded-sm whitespace-nowrap no-underline"
        >
          © <strong>Elliot J. Reed</strong>
        </Link>

        <div className="flex flex-col gap-4 md:items-end">
          <nav aria-label="Footer" className="text-body flex gap-6">
            <Link to="/privacy" className="ejr-link">
              Privacy policy
            </Link>
            <Link to="/sitemap" className="ejr-link">
              Sitemap
            </Link>
          </nav>

          <div className="-ml-3 flex flex-wrap md:mr-[-12px] md:ml-0">
            <SocialLinks />
          </div>
        </div>
      </div>
    </footer>
  );
};
