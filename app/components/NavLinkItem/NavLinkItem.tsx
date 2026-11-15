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
          "block rounded-md px-4 py-3 font-medium transition-colors md:py-2",
          navIsActive || isActive ? "bg-rhubarb text-on-rhubarb" : "text-ink hover:bg-surface-300",
        ].join(" ")
      }
      prefetch="intent"
    >
      {link.title}
    </NavLink>
  </li>
);
