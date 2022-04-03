import { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/fontawesome-free-solid/faEye";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import { MobileNavigation } from "./MobileNavigation";
import { NavigationLink, navigationLinks } from "../data/navigationLinks";
import { ThemeSwitch } from "./ThemeSwitch";

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

        <ThemeSwitch />

        <span
          className="icon"
          onClick={(): void => {
            typeof document !== "undefined" &&
              (document.body.style.fontFamily === "OpenDyslexic"
                ? (document.body.style.fontFamily =
                    "InterVariable,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji")
                : (document.body.style.fontFamily = "OpenDyslexic"));
          }}
          title="Toggle dyslexia-friendly font"
        >
          <FontAwesomeIcon className="fas fa-lg" icon={faEye as IconProp} aria-label="Toggle dyslexia-friendly font" />
        </span>

        <MobileNavigation />
      </div>
    </header>
  );
};
