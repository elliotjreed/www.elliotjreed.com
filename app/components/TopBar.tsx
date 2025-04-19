import React, { type FC, type ReactElement } from "react";
import { Link } from "react-router";

import { MobileNavigation } from "~/components/MobileNavigation";
import { ThemeSwitch } from "./ThemeSwitch";

import { type StaticLink, staticLinks } from "~/data/staticLinks";

export const TopBar: FC = (): ReactElement => {
  return (
    <header className="flex items-center justify-between print:hidden">
      <div>
        <Link to="/">
          <div className="flex items-center justify-between">
            <span className="font-mono text-7xl text-gray-400">EJR</span>
          </div>
        </Link>
      </div>

      <div className="flex items-center text-base leading-5">
        <div className="hidden sm:block">
          {staticLinks
            .filter((link: StaticLink): boolean => link.showInNavigation)
            .map(
              (link: StaticLink): ReactElement => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
                >
                  {link.title}
                </Link>
              ),
            )}
        </div>

        <ThemeSwitch />

        <MobileNavigation />
      </div>
    </header>
  );
};
