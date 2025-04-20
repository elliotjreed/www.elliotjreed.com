import type { FC, ReactElement } from "react";
import { Link } from "react-router";
import { SocialLinks } from "~/components/SocialLinks";

export const Footer: FC = (): ReactElement => {
  return (
    <footer className="print:hidden">
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialLinks />
        </div>

        <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/privacy">Privacy Policy</Link>&nbsp;|&nbsp;<Link to="/sitemap">Sitemap</Link>
        </div>

        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/">
            © <strong>Elliot J. Reed</strong>
          </Link>
        </div>
      </div>
    </footer>
  );
};
