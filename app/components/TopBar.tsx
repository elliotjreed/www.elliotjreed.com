import type { FC, ReactElement } from "react";
import { Link } from "react-router";

import { MobileNavigation } from "./MobileNavigation";
import { ThemeSwitch } from "./ThemeSwitch";
import { type StaticLink, staticLinks } from "~/data/staticLinks";

export const TopBar: FC = (): ReactElement => {
  return (
    <header className="flex items-center justify-between py-10 print:hidden">
      <div>
        <Link to="/">
          <div className="flex items-center justify-between">
            <div className="mr-3 h-6 text-2xl font-bold sm:block">
              <u className="text-green-800 font-extrabold" aria-hidden={true}>
                &gt;
              </u>{" "}
              <span className="text-purple-800">Elliot J. Reed</span>
            </div>
          </div>
        </Link>
      </div>

      <div className="flex items-center text-base leading-5">
        {/*<div className="hidden sm:block">*/}
        {/*  {staticLinks*/}
        {/*    .filter((link: StaticLink): boolean => link.showInNavigation)*/}
        {/*    .map(*/}
        {/*      (link: StaticLink, index: number): ReactElement => (*/}
        {/*        <Link key={index} to={link.href} className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4">*/}
        {/*          {link.title}*/}
        {/*        </Link>*/}
        {/*      )*/}
        {/*    )}*/}
        {/*</div>*/}

        <ThemeSwitch />

        {/*<MobileNavigation />*/}
      </div>
    </header>
  );
};
