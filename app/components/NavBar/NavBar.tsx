import { type FC, type ReactElement, type RefObject, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";
import { DropdownMenuIcon } from "~/components/DropdownMenuIcon/DropdownMenuIcon";
import { HamburgerIcon } from "~/components/HamburgerIcon/HamburgerIcon";
import { NavLinkItem } from "~/components/NavLinkItem/NavLinkItem";
import { MobileSearch } from "~/components/Search/MobileSearch";
import { Search } from "~/components/Search/Search";
import { ThemeSwitch } from "~/components/ThemeSwitch/ThemeSwitch";
import { type StaticLink, staticLinks } from "~/data/staticLinks";

export const NavBar: FC = (): ReactElement => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openSubDropdown, setOpenSubDropdown] = useState<string | null>(null);
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);

  const navWrapperRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);
  const mobileMenuRef: RefObject<HTMLElement | null> = useRef<HTMLElement>(null);

  const toggleMenu = (): void => setIsMenuOpen((open: boolean): boolean => !open);
  const closeMenu = (): void => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
    setOpenSubDropdown(null);
  };
  const toggleDropdown = (title: string): void => {
    setOpenDropdown((c: string | null): string | null => (c === title ? null : title));
    setOpenSubDropdown(null); // Close sub-dropdowns when toggling main dropdown
  };
  const toggleSubDropdown = (title: string): void => setOpenSubDropdown((c) => (c === title ? null : title));

  // biome-ignore lint/correctness/useExhaustiveDependencies: incorrectly reports closeMenu as missing dependency
  useEffect(() => {
    const handleClick = (event: MouseEvent): void => {
      const target = event.target as Node;
      const clickedInsideNav: boolean | undefined = navWrapperRef.current?.contains(target);
      const clickedInsideMobileMenu: boolean | undefined = mobileMenuRef.current?.contains(target);

      if (!clickedInsideNav && !clickedInsideMobileMenu) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClick);

    return (): void => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === "Escape" && isMenuOpen) {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return (): void => document.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen, closeMenu]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return (): void => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const navigationLinks: StaticLink[] = staticLinks.filter((link: StaticLink): boolean => link.showInNavigation);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 print:hidden">
        <div ref={navWrapperRef} className="max-w-screen-xl flex items-center justify-between mx-auto py-4 px-4">
          <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse" prefetch="render">
            <span className="text-4xl font-bold text-primary-900 dark:text-gray-300 hover:text-primary-700 dark:hover:text-white transition-colors">
              EJR
            </span>
          </NavLink>

          <div className="flex items-center gap-2">
            <nav className="hidden md:flex items-center space-x-1">
              <ul className="flex items-center space-x-1">
                {navigationLinks.map((link) => {
                  if (link.children?.length) {
                    const validChildren = link.children.filter((child) => child.showInNavigation);

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

                        <div
                          className={`absolute right-0 top-full pt-2 transition-all duration-200 ${
                            hoveredDropdown === link.title
                              ? "opacity-100 visible"
                              : "opacity-0 invisible pointer-events-none"
                          }`}
                        >
                          <div className="min-w-[280px] max-w-[320px] bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <div className="max-h-[70vh] overflow-y-auto">
                              {validChildren.map((child, childIndex) => (
                                <div key={child.title || child.href}>
                                  {child.children?.length ? (
                                    // Category with subcategories
                                    <div
                                      className={childIndex > 0 ? "border-t border-gray-200 dark:border-gray-700" : ""}
                                    >
                                      <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-900">
                                        {child.title}
                                      </div>
                                      <ul>
                                        {child.children
                                          .filter((subChild: StaticLink) => subChild.showInNavigation && subChild.href)
                                          .map(
                                            (subChild: StaticLink): ReactElement => (
                                              <li key={subChild.href}>
                                                <NavLink
                                                  to={subChild.href as string}
                                                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary-700 dark:hover:text-primary-400 transition-colors"
                                                  prefetch="intent"
                                                >
                                                  {subChild.title}
                                                </NavLink>
                                              </li>
                                            ),
                                          )}
                                      </ul>
                                    </div>
                                  ) : child.href ? (
                                    <NavLink
                                      to={child.href}
                                      className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary-700 dark:hover:text-primary-400 transition-colors"
                                      prefetch="intent"
                                    >
                                      {child.title}
                                    </NavLink>
                                  ) : null}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
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

            <Search />

            <ThemeSwitch />

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

      <div
        className={`md:hidden fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <nav
        ref={mobileMenuRef}
        id="mobile-navigation"
        className={`md:hidden fixed top-0 right-0 h-full w-[280px] z-[70] bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
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

          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <MobileSearch onNavigate={closeMenu} />
          </div>

          <ul className="flex-1 p-4 space-y-2">
            {navigationLinks.map((link: StaticLink): ReactElement => {
              if (link.children?.length) {
                const validChildren: StaticLink[] = link.children.filter(
                  (child: StaticLink): boolean => child.showInNavigation,
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

                    <div
                      className={`mt-1 ml-2 space-y-1 overflow-hidden transition-all duration-200 ${
                        openDropdown === link.title ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      {validChildren.map(
                        (child: StaticLink): ReactElement => (
                          <div key={child.title || child.href}>
                            {child.children?.length ? (
                              <div className="mt-1">
                                <button
                                  type="button"
                                  onClick={(): void => toggleSubDropdown(child.title)}
                                  className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                  {child.title}
                                  <DropdownMenuIcon isOpen={openSubDropdown === child.title} />
                                </button>
                                <ul
                                  className={`mt-1 ml-3 space-y-1 overflow-hidden transition-all duration-200 ${
                                    openSubDropdown === child.title ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                                  }`}
                                >
                                  {child.children
                                    .filter((subChild: StaticLink) => subChild.showInNavigation && subChild.href)
                                    .map(
                                      (subChild: StaticLink): ReactElement => (
                                        <li key={subChild.href}>
                                          <NavLink
                                            to={subChild.href as string}
                                            onClick={closeMenu}
                                            className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-700 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                            prefetch="intent"
                                          >
                                            {subChild.title}
                                          </NavLink>
                                        </li>
                                      ),
                                    )}
                                </ul>
                              </div>
                            ) : child.href ? (
                              <NavLink
                                to={child.href}
                                onClick={closeMenu}
                                className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-700 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                prefetch="intent"
                              >
                                {child.title}
                              </NavLink>
                            ) : null}
                          </div>
                        ),
                      )}
                    </div>
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
