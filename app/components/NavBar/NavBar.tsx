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
  const menuButtonRef: RefObject<HTMLButtonElement | null> = useRef<HTMLButtonElement>(null);
  const closeButtonRef: RefObject<HTMLButtonElement | null> = useRef<HTMLButtonElement>(null);
  const previousFocusRef: RefObject<HTMLElement | null> = useRef<HTMLElement | null>(null);

  const toggleMenu = (): void => setIsMenuOpen((open: boolean): boolean => !open);
  const closeMenu = (): void => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
    setOpenSubDropdown(null);
  };
  const toggleDropdown = (title: string): void => {
    setOpenDropdown((c: string | null): string | null => (c === title ? null : title));
    setOpenSubDropdown(null);
  };
  const toggleSubDropdown = (title: string): void => setOpenSubDropdown((c) => (c === title ? null : title));

  // biome-ignore lint/correctness/useExhaustiveDependencies: closeMenu doesn't need to be a dependency
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

  // biome-ignore lint/correctness/useExhaustiveDependencies: closeMenu doesn't need to be a dependency
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === "Escape" && isMenuOpen) {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return (): void => document.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen]);

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

  useEffect(() => {
    const pageContent = document.getElementById("page-content");
    if (!pageContent) return;

    if (isMenuOpen) {
      pageContent.setAttribute("inert", "");
      pageContent.setAttribute("aria-hidden", "true");
    } else {
      pageContent.removeAttribute("inert");
      pageContent.removeAttribute("aria-hidden");
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
        previousFocusRef.current = null;
      }
      return;
    }

    previousFocusRef.current = document.activeElement as HTMLElement | null;

    const menu = mobileMenuRef.current;
    const getFocusableElements = (): HTMLElement[] => {
      if (!menu) return [];
      return Array.from(
        menu.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])",
        ),
      );
    };

    const focusable = getFocusableElements();
    const firstFocusable = closeButtonRef.current ?? focusable[0];
    firstFocusable?.focus();

    const handleTab = (event: KeyboardEvent): void => {
      if (event.key !== "Tab") return;

      const items = getFocusableElements();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;

      if (event.shiftKey && activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleTab);
    return (): void => {
      document.removeEventListener("keydown", handleTab);
    };
  }, [isMenuOpen]);

  const navigationLinks: StaticLink[] = staticLinks.filter((link: StaticLink): boolean => link.showInNavigation);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/95 print:hidden">
        <div ref={navWrapperRef} className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-4">
          <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse" prefetch="render">
            <span
              className="text-primary-900 hover:text-primary-700 text-4xl font-bold transition-colors dark:text-gray-300 dark:hover:text-white"
              style={{ fontFamily: "Fira Sans" }}
            >
              EJR
            </span>
          </NavLink>

          <div className="flex items-center gap-2">
            <nav className="hidden items-center space-x-1 md:flex">
              <ul className="flex items-center space-x-1">
                {navigationLinks.map((link) => {
                  if (link.children?.length) {
                    const validChildren = link.children.filter((child) => child.showInNavigation);
                    const desktopMenuId = `desktop-menu-${link.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

                    return (
                      <li
                        key={link.title}
                        className="group relative"
                        onMouseEnter={() => setHoveredDropdown(link.title)}
                        onMouseLeave={(event) => {
                          const activeElement = document.activeElement as Node | null;
                          if (activeElement && event.currentTarget.contains(activeElement)) {
                            return;
                          }
                          setHoveredDropdown(null);
                        }}
                        onFocus={() => setHoveredDropdown(link.title)}
                        onBlur={(event) => {
                          const nextTarget = event.relatedTarget as Node | null;
                          if (!nextTarget || !event.currentTarget.contains(nextTarget)) {
                            setHoveredDropdown(null);
                          }
                        }}
                      >
                        <button
                          type="button"
                          aria-haspopup="menu"
                          aria-expanded={hoveredDropdown === link.title}
                          aria-controls={desktopMenuId}
                          onClick={() => setHoveredDropdown((current) => (current === link.title ? null : link.title))}
                          className="flex items-center gap-1 rounded-lg px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                        >
                          {link.title}
                          <DropdownMenuIcon isOpen={hoveredDropdown === link.title} />
                        </button>

                        <div
                          id={desktopMenuId}
                          className={`absolute top-full right-0 pt-2 transition-[opacity,visibility] duration-200 ${
                            hoveredDropdown === link.title
                              ? "visible opacity-100"
                              : "pointer-events-none invisible opacity-0"
                          }`}
                        >
                          <div className="max-w-[320px] min-w-[280px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800">
                            <div className="max-h-[70vh] overflow-y-auto">
                              {validChildren.map((child, childIndex) => (
                                <div key={child.title || child.href}>
                                  {child.children?.length ? (
                                    // Category with subcategories
                                    <div
                                      className={childIndex > 0 ? "border-t border-gray-200 dark:border-gray-700" : ""}
                                    >
                                      <div className="bg-gray-50 px-4 py-2 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:bg-gray-900 dark:text-gray-400">
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
                                                  className="hover:text-primary-700 dark:hover:text-primary-400 block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
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
                                      className="hover:text-primary-700 dark:hover:text-primary-400 block px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
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
              ref={menuButtonRef}
              className="focus:ring-primary-500 dark:focus:ring-primary-600 inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 focus:ring-2 focus:outline-none md:hidden dark:text-gray-400 dark:hover:bg-gray-800"
            >
              <HamburgerIcon isOpen={isMenuOpen} />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <nav
        ref={mobileMenuRef}
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-navigation-title"
        className={`fixed top-0 right-0 z-[70] h-full w-[280px] transform bg-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden dark:bg-gray-900 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto">
          <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
            <span id="mobile-navigation-title" className="text-xl font-bold text-gray-900 dark:text-white">
              Menu
            </span>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              ref={closeButtonRef}
              className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <title>Close icon</title>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="border-b border-gray-200 p-4 dark:border-gray-700">
            <MobileSearch onNavigate={closeMenu} />
          </div>

          <ul className="flex-1 space-y-2 p-4">
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
                      className="flex w-full items-center justify-between rounded-lg px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                    >
                      {link.title}
                      <DropdownMenuIcon isOpen={openDropdown === link.title} />
                    </button>

                    <div
                      className={`mt-1 ml-2 space-y-1 overflow-hidden transition-[max-height,opacity] duration-200 ${
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
                                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                                >
                                  {child.title}
                                  <DropdownMenuIcon isOpen={openSubDropdown === child.title} />
                                </button>
                                <ul
                                  className={`mt-1 ml-3 space-y-1 overflow-hidden transition-[max-height,opacity] duration-200 ${
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
                                            className="hover:text-primary-700 dark:hover:text-primary-400 block rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800"
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
                                className="hover:text-primary-700 dark:hover:text-primary-400 block rounded-lg px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800"
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
