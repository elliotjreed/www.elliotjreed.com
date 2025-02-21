import React, { type FC, type ReactElement } from "react";
import { Link } from "react-router";
import { ThemeSwitch } from "./ThemeSwitch";

import Icon from "../images/logo.svg";

export const TopBar: FC = (): ReactElement => {
  return (
    <header className="flex items-center justify-between py-10 print:hidden">
      <div>
        <Link to="/">
          <div className="flex items-center justify-between">
            <img src={Icon} alt="EJR icon" width={48} height={48} className="h-24 w-24" />
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
