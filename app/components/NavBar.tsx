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
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);

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

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === "Escape" && isMenuOpen) {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const navigationLinks: StaticLink[] = staticLinks.filter((link: StaticLink): boolean => link.showInNavigation);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 print:hidden shadow-sm">
        <div ref={navWrapperRef} className="max-w-screen-xl flex items-center justify-between mx-auto py-4 px-4">
          <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse" prefetch="render">
            <span className="text-4xl font-bold text-primary-900 dark:text-gray-300 hover:text-primary-700 dark:hover:text-white transition-colors">
              EJR
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
          <ul className="flex items-center space-x-1">
            {navigationLinks.map((link) => {
              if (link.children?.length) {
                const validChildren = link.children.filter(
                  (child) => child.showInNavigation && child.href !== undefined,
                );

                return (
                  <li
                    key={link.title}
                    className="relative group"
                    onMouseEnter={() => setHoveredDropdown(link.title)}
                    onMouseLeave={() => setHoveredDropdown(null)}
                  >
                    <button
                      type="button"
                      className="flex items-center gap-1 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium"
                    >
                      {link.title}
                      <DropdownMenuIcon isOpen={hoveredDropdown === link.title} />
                    </button>

                    {/* Desktop Dropdown */}
                    <ul
                      className={`absolute left-0 mt-2 min-w-[240px] bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-200 ${
                        hoveredDropdown === link.title
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2 pointer-events-none"
                      }`}
                    >
                      {validChildren.map((child) => (
                        <li key={child.href}>
                          <NavLink
                            to={child.href as string}
                            className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary-700 dark:hover:text-primary-400 transition-colors"
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

          {/* Right side controls */}
          <div className="flex items-center gap-2">
            <ThemeSwitch />

            {/* Mobile Menu Button */}
            <button
              type="button"
              aria-controls="mobile-navigation"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
              onClick={toggleMenu}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 p-2 rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:ring-primary-600 transition-colors"
            >
              <HamburgerIcon isOpen={isMenuOpen} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      <div
        className={`md:hidden fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile Menu */}
      <nav
        id="mobile-navigation"
        className={`md:hidden fixed top-0 right-0 h-full w-[280px] z-[70] bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <span className="text-xl font-bold text-gray-900 dark:text-white">Menu</span>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Items */}
          <ul className="flex-1 p-4 space-y-2">
            {navigationLinks.map((link) => {
              if (link.children?.length) {
                const validChildren = link.children.filter(
                  (child) => child.showInNavigation && child.href !== undefined,
                );

                return (
                  <li key={link.title}>
                    <button
                      type="button"
                      onClick={() => toggleDropdown(link.title)}
                      className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium"
                    >
                      {link.title}
                      <DropdownMenuIcon isOpen={openDropdown === link.title} />
                    </button>

                    <ul
                      className={`mt-1 ml-4 space-y-1 overflow-hidden transition-all duration-200 ${
                        openDropdown === link.title ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      {validChildren.map((child) => (
                        <li key={child.href}>
                          <NavLink
                            to={child.href as string}
                            onClick={closeMenu}
                            className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-700 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
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
        </div>
      </nav>
    </>
  );
};
