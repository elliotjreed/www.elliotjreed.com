import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type FC, type ReactElement, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import type { SearchableItem } from "~/data/searchIndex";
import { useSearch } from "~/hooks/useSearch";

interface MobileSearchProps {
  onNavigate?: () => void;
}

export const MobileSearch: FC<MobileSearchProps> = ({ onNavigate }): ReactElement => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const { search, results, clearResults } = useSearch();

  const handleInputChange = (value: string): void => {
    setQuery(value);
    search(value);
    setActiveIndex(-1);
  };

  const handleResultClick = (): void => {
    setQuery("");
    clearResults();
    setActiveIndex(-1);
    onNavigate?.();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (!query) return;

    switch (event.key) {
      case "Escape":
        event.preventDefault();
        setQuery("");
        clearResults();
        setActiveIndex(-1);
        break;
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        event.preventDefault();
        if (activeIndex >= 0 && activeIndex < results.length) {
          const result = results[activeIndex];
          navigate(result.href);
          setQuery("");
          clearResults();
          setActiveIndex(-1);
          onNavigate?.();
        }
        break;
    }
  };

  useEffect(() => {
    if (activeIndex >= 0) {
      const element = document.getElementById(`mobile-search-result-${activeIndex}`);
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      element?.scrollIntoView({ block: "nearest", behavior: prefersReducedMotion ? "auto" : "smooth" });
    }
  }, [activeIndex]);

  const statusMessage =
    query.length > 0 && results.length > 0
      ? `${results.length} result${results.length === 1 ? "" : "s"} available.`
      : query.length > 0
        ? "No results found."
        : "";

  return (
    <div className="relative">
      <output className="sr-only" aria-live="polite" aria-atomic="true">
        {statusMessage}
      </output>
      <div className="relative">
        <input
          type="text"
          role="combobox"
          aria-expanded={results.length > 0}
          aria-controls="mobile-search-results"
          aria-activedescendant={activeIndex >= 0 ? `mobile-search-result-${activeIndex}` : undefined}
          aria-label="Search guides and articles"
          placeholder="Search&hellip;"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 pl-10 pr-3 py-2 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
        />
      </div>

      {query && results.length > 0 && (
        <div
          id="mobile-search-results"
          role="listbox"
          className="mt-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg max-h-80 overflow-y-auto"
        >
          {results.map((result: SearchableItem, index: number) => (
            <NavLink
              key={result.href}
              to={result.href}
              onClick={handleResultClick}
              role="option"
              aria-selected={index === activeIndex}
              id={`mobile-search-result-${index}`}
              className={`block px-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-colors ${
                index === activeIndex
                  ? "bg-primary-50 dark:bg-primary-900/20"
                  : "hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
              prefetch="intent"
            >
              <div className="font-medium text-gray-900 dark:text-gray-100">{result.title}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{result.category}</div>
            </NavLink>
          ))}
        </div>
      )}

      {query && results.length === 0 && (
        <div className="mt-2 px-4 py-8 text-center text-gray-500 dark:text-gray-400 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          No results found
        </div>
      )}
    </div>
  );
};
