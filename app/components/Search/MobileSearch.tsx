import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
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
          type="search"
          role="combobox"
          aria-expanded={results.length > 0}
          aria-controls="mobile-search-results"
          aria-activedescendant={activeIndex >= 0 ? `mobile-search-result-${activeIndex}` : undefined}
          aria-label="Search guides and articles"
          placeholder="Search&hellip;"
          name="Search"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="ejr-input w-full pl-12"
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="text-ink-subtle absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
        />
      </div>

      {query && results.length > 0 && (
        <div
          id="mobile-search-results"
          role="listbox"
          className="bg-surface-200 shadow-overlay mt-2 max-h-80 overflow-y-auto rounded-lg"
        >
          {results.map((result: SearchableItem, index: number) => (
            <NavLink
              key={result.href}
              to={result.href}
              onClick={handleResultClick}
              role="option"
              aria-selected={index === activeIndex}
              id={`mobile-search-result-${index}`}
              className={`border-line block border-b px-4 py-3 transition-colors last:border-b-0 ${
                index === activeIndex ? "bg-rhubarb-soft" : "hover:bg-surface-300"
              }`}
              prefetch="intent"
            >
              <div className="text-ink font-medium">{result.title}</div>
              <div className="text-caption text-ink-subtle mt-1">{result.category}</div>
            </NavLink>
          ))}
        </div>
      )}

      {query && results.length === 0 && (
        <div className="bg-surface-300 text-ink-muted mt-2 rounded-lg px-4 py-8 text-center">No results found</div>
      )}
    </div>
  );
};
