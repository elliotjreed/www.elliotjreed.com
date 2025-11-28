import type { FC } from "react";
import { NavLink } from "react-router";

import type { StaticLink } from "~/data/staticLinks";

export const NavLinkItem: FC<{
  link: StaticLink;
  closeMenu: () => void;
  isActive?: boolean;
}> = ({ link, closeMenu, isActive = false }) => (
  <li key={link.href}>
    <NavLink
      to={link.href as string}
      onClick={closeMenu}
      className={({ isActive: navIsActive }): string =>
        [
          "block px-4 py-3 md:py-2 rounded-lg transition-colors font-medium",
          navIsActive || isActive
            ? "text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-gray-800"
            : "text-gray-700 dark:text-gray-200",
          "hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary-700 dark:hover:text-primary-400",
        ].join(" ")
      }
      prefetch="intent"
    >
      {link.title}
    </NavLink>
  </li>
);
