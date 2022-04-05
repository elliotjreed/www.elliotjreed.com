import { FC, ReactElement } from "react";
import { Link } from "react-router-dom";

import { MobileNavigation } from "./MobileNavigation";
import { NavigationLink, navigationLinks } from "../data/navigationLinks";
import { ThemeSwitch } from "./ThemeSwitch";
import { FontSwitch } from "./FontSwitch";

export const TopBar: FC = (): ReactElement => {
  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <Link to="/">
          <div className="flex items-center justify-between">
            <div className="mr-3 h-6 text-2xl font-semibold sm:block">Elliot J. Reed</div>
          </div>
        </Link>
      </div>

      <div className="flex items-center text-base leading-5">
        <div className="hidden sm:block">
          {navigationLinks.map(
            (link: NavigationLink, index: number): ReactElement => (
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
