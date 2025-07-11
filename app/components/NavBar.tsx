import { type FC, type ReactElement, type RefObject, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";
import { DropdownMenuIcon } from "~/components/DropdownMenuIcon";
import { HamburgerIcon } from "~/components/HamburgerIcon";
import { NavLinkItem } from "~/components/NavLinkItem";
import { type StaticLink, staticLinks } from "~/data/staticLinks";
import { ThemeSwitch } from "./ThemeSwitch";

export const NavBar: FC = (): ReactElement => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navWrapperRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);

  const toggleMenu = (): void => setIsMenuOpen((open: boolean): boolean => !open);
  const closeMenu = (): void => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };
  const toggleDropdown = (title: string): void => setOpenDropdown((c) => (c === title ? null : title));

  // biome-ignore lint/correctness/useExhaustiveDependencies: incorrectly reports closeMenu as missing dependency
  useEffect(() => {
    const handleClick = (event: MouseEvent): void => {
      if (navWrapperRef.current && !navWrapperRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const navigationLinks: StaticLink[] = staticLinks.filter((link: StaticLink): boolean => link.showInNavigation);

  return (
    <header className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 print:hidden">
      <div ref={navWrapperRef} className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4">
        <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse" prefetch="render">
          <span className="text-4xl text-primary-900 dark:text-gray-300">EJR</span>
        </NavLink>

        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <ThemeSwitch />

          <button
            type="button"
            aria-controls="primary-navigation"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
            className="inline-flex items-center justify-center w-10 h-10 p-2 rounded-sm text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <HamburgerIcon isOpen={isMenuOpen} />
          </button>
        </div>

        <nav id="primary-navigation" className={`${isMenuOpen ? "block" : "hidden"} w-full mt-4`}>
          <ul className="flex flex-col p-4 border border-gray-100 rounded-sm bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            {navigationLinks.map((link) => {
              if (link.children?.length) {
                const validChildren = link.children.filter(
                  (child) => child.showInNavigation && child.href !== undefined,
                );

                return (
                  <li key={link.title} className="relative">
                    <button
                      type="button"
                      onClick={() => toggleDropdown(link.title)}
                      className="flex items-center justify-between w-full py-2 px-3 rounded-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {link.title}
                      <DropdownMenuIcon isOpen={openDropdown === link.title} />
                    </button>

                    <ul
                      className={`${
                        openDropdown === link.title ? "block" : "hidden"
                      } w-full mt-1 border border-gray-200 bg-gray-100 rounded-sm shadow-sm divide-y divide-gray-200 dark:bg-gray-700 dark:divide-gray-600 dark:border-gray-600`}
                    >
                      {validChildren.map((child) => (
                        <li key={child.href}>
                          <NavLink
                            to={child.href as string}
                            onClick={closeMenu}
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            prefetch="intent"
                          >
                            {child.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }

              if (link.href) {
                return <NavLinkItem key={link.href} link={link} closeMenu={closeMenu} />;
              }

              return <li key={link.title}>{link.title}</li>;
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};
