import React, { type FC, type ReactElement, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";
import { type StaticLink, staticLinks } from "~/data/staticLinks";
import { ThemeSwitch } from "./ThemeSwitch";

interface NavItem {
  title: string;
  href: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  {
    title: "AI",
    children: [
      { href: "/ai-prompt-engineering-guide", title: "AI Prompt Guide" },
      { href: "/cafe-ai-prompt-framework", title: "CAFE Prompt Framework" },
    ],
    href: "/ai",
  },
];

export const NavBar: FC = (): ReactElement => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navWrapperRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (): void => setIsMenuOpen((open: boolean): boolean => !open);

  const closeMenu = (): void => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  const toggleDropdown = (title: string): void => setOpenDropdown((c) => (c === title ? null : title));

  useEffect((): (() => void) => {
    const handleClick = (event: MouseEvent): void => {
      if (navWrapperRef.current && !navWrapperRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 print:hidden">
      <div ref={navWrapperRef} className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4">
        <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse" onClick={closeMenu}>
          <span className="font-mono text-4xl sm:text-4xl text-gray-400">EJR</span>
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
            <span className="sr-only">{isMenuOpen ? "Close main menu" : "Open main menu"}</span>
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <title>Close main menu</title>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <title>Open main menu</title>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>

        <nav id="primary-navigation" className={`${isMenuOpen ? "block" : "hidden"} w-full mt-4`}>
          <ul className="flex flex-col p-4 border border-gray-100 rounded-sm bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            {staticLinks
              .filter((link: StaticLink): boolean => link.showInNavigation)
              .map(
                (link: StaticLink): ReactElement =>
                  link.children ? (
                    <li key={link.title} className="relative">
                      <button
                        type="button"
                        onClick={(): void => toggleDropdown(link.title)}
                        className="flex items-center justify-between w-full py-2 px-3 rounded-sm text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {link.title}
                        <svg
                          className={`w-2.5 h-2.5 ml-2 transition-transform ${
                            openDropdown === link.title ? "rotate-180" : ""
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 10 6"
                        >
                          <title>Toggle Submenu</title>
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 4 4 4-4"
                          />
                        </svg>
                      </button>

                      <ul
                        className={`${
                          openDropdown === link.title ? "block" : "hidden"
                        } w-full mt-1 bg-white rounded-sm shadow-sm divide-y divide-gray-100 dark:bg-gray-700 dark:divide-gray-600`}
                      >
                        {link.children
                          .filter((link: StaticLink): boolean => link.showInNavigation && link.href !== undefined)
                          .map(
                            (child: StaticLink): ReactElement => (
                              <li key={child.href}>
                                <NavLink
                                  to={child.href as string}
                                  onClick={closeMenu}
                                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  {child.title}
                                </NavLink>
                              </li>
                            ),
                          )}
                      </ul>
                    </li>
                  ) : (
                    <>
                      {link.href !== undefined ? (
                        <li key={link.href}>
                          <NavLink
                            to={link.href}
                            onClick={closeMenu}
                            className={({ isActive }): string =>
                              [
                                "block py-2 px-3 rounded-sm",
                                isActive
                                  ? "font-semibold text-gray-900 dark:text-gray-100"
                                  : "text-gray-900 dark:text-gray-100",
                                "hover:bg-gray-100 dark:hover:bg-gray-700",
                              ].join(" ")
                            }
                          >
                            {link.title}
                          </NavLink>
                        </li>
                      ) : (
                        <li key={link.title}>{link.title}</li>
                      )}
                    </>
                  ),
              )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
