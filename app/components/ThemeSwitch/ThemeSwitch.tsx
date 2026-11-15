import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faMoon } from "@fortawesome/free-solid-svg-icons/faMoon";
import { faSun } from "@fortawesome/free-solid-svg-icons/faSun";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type FC, type ReactElement, useEffect, useState } from "react";
import { useLocalStorage } from "~/hooks/useLocalStorage";

type Theme = "dark" | "light";

const systemTheme = (): Theme =>
  typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)")?.matches ? "dark" : "light";

export const ThemeSwitch: FC = (): ReactElement => {
  const [chosenTheme, setChosenTheme] = useLocalStorage<Theme | null>("theme", null);
  const [isHydrated, setIsHydrated] = useState(false);
  const theme: Theme = isHydrated ? (chosenTheme ?? systemTheme()) : "light";

  useEffect((): void => setIsHydrated(true), []);

  useEffect((): void => {
    if (chosenTheme) {
      document.documentElement.dataset.theme = chosenTheme;
    }
  }, [chosenTheme]);

  return (
    <button
      aria-label="Toggle dark mode"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      type="button"
      className="text-ink-muted hover:bg-surface-300 hover:text-ink inline-flex h-11 w-11 items-center justify-center rounded-md transition-colors"
      onClick={(): void => setChosenTheme(theme === "dark" ? "light" : "dark")}
    >
      <span className="icon">
        {theme === "dark" ? (
          <FontAwesomeIcon className="fa-lg" icon={faSun as IconProp} />
        ) : (
          <FontAwesomeIcon className="fa-lg" icon={faMoon as IconProp} />
        )}
      </span>
    </button>
  );
};
