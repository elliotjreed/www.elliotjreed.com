import { FC, ReactElement } from "react";
import { Link } from "react-router-dom";

import { MobileNavigation } from "./MobileNavigation";
import { staticLinks } from "../data/staticLinks";
import { ThemeSwitch } from "./ThemeSwitch";
import { FontSwitch } from "./FontSwitch";
import { StaticLink } from "../interfaces/StaticLink";

export const TopBar: FC = (): ReactElement => {
  return (
    <header className="flex items-center justify-between py-10 print:hidden">
      <div>
        <Link to="/">
          <div className="flex items-center justify-between">
            <div className="mr-3 h-6 text-2xl font-bold sm:block">
              <u className="text-green-800 font-extrabold">&gt;</u>{" "}
              <span className="text-purple-800">Elliot J. Reed</span>
            </div>
          </div>
        </Link>
      </div>

      <div className="flex items-center text-base leading-5">
        <div className="hidden sm:block">
          {staticLinks
            .filter((link: StaticLink) => link.showInNavigation === true)
            .map(
              (link: StaticLink, index: number): ReactElement => (
                <Link key={index} to={link.href} className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4">
                  {link.title}
                </Link>
              )
            )}
        </div>

        <FontSwitch />

        <ThemeSwitch />

        <MobileNavigation />
      </div>
    </header>
  );
};
