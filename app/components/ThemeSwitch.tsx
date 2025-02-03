import { type FC, type ReactElement, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useLocalStorage } from "~/hooks/useLocalStorage";
import { faSun } from "@fortawesome/free-solid-svg-icons/faSun";
import { faMoon } from "@fortawesome/free-solid-svg-icons/faMoon";

export const ThemeSwitch: FC = (): ReactElement => {
  const [theme, setTheme] = useLocalStorage<"dark" | "light">(
    "theme",
    (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)")?.matches && "dark") || "light"
  );

  useEffect((): void => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <button
      aria-label="Toggle dark mode"
      title={"Switch to " + (theme === "dark" ? "light" : "dark") + " theme"}
      type="button"
      className="ml-1 mr-1 h-8 w-8 rounded p-1 sm:ml-4"
      onClick={(): void => setTheme(theme === "dark" ? "light" : "dark")}
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
