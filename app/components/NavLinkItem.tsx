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
          "block py-2 px-3 rounded-sm",
          navIsActive || isActive
            ? "font-semibold text-gray-700 dark:text-gray-200"
            : "text-gray-700 dark:text-gray-200",
          "hover:bg-gray-100 dark:hover:bg-gray-700",
        ].join(" ")
      }
      prefetch="intent"
    >
      {link.title}
    </NavLink>
  </li>
);
