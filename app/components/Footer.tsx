import type { FC, ReactElement } from "react";
import { Link } from "react-router";
import { SocialLinks } from "~/components/SocialLinks";

export const Footer: FC = (): ReactElement => {
  return (
    <footer className="text-gray-700 dark:text-gray-200 print:hidden">
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialLinks />
        </div>

        <div className="mb-2 text-sm">
          <Link to="/privacy">Privacy Policy</Link>&nbsp;|&nbsp;<Link to="/sitemap">Sitemap</Link>
        </div>

        <div className="mb-8 text-sm ">
          <Link to="/">
            © <strong>Elliot J. Reed</strong>
          </Link>
        </div>
      </div>
    </footer>
  );
};
