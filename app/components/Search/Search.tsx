import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type FC, type ReactElement, type RefObject, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useSearch } from "~/hooks/useSearch";
import { SearchResults } from "./SearchResults";

export const Search: FC = (): ReactElement => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const { search, results, clearResults } = useSearch();
  const searchRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);
  const inputRef: RefObject<HTMLInputElement | null> = useRef<HTMLInputElement>(null);

  const handleToggle = (): void => {
    setIsExpanded((prev) => {
      if (!prev) {
        setTimeout(() => inputRef.current?.focus(), 100);
      } else {
        setQuery("");
        clearResults();
        setActiveIndex(-1);
      }
      return !prev;
    });
  };

  const handleClose = (): void => {
    setIsExpanded(false);
    setQuery("");
    clearResults();
    setActiveIndex(-1);
  };

  const handleInputChange = (value: string): void => {
    setQuery(value);
    search(value);
    setActiveIndex(-1);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (!isExpanded) return;

    switch (event.key) {
      case "Escape":
        event.preventDefault();
        handleClose();
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
          handleClose();
        }
        break;
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: handleClose doesn't need to be a dependency
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as Node;
      if (searchRef.current && !searchRef.current.contains(target)) {
        handleClose();
      }
    };

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return (): void => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  useEffect(() => {
    if (activeIndex >= 0) {
      const element = document.getElementById(`search-result-${activeIndex}`);
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      element?.scrollIntoView({ block: "nearest", behavior: prefersReducedMotion ? "auto" : "smooth" });
    }
  }, [activeIndex]);

  const isResultsVisible = isExpanded && query.length > 0;
  const statusMessage =
    isResultsVisible && results.length > 0
      ? `${results.length} result${results.length === 1 ? "" : "s"} available.`
      : isResultsVisible
        ? "No results found."
        : "";

  return (
    <div ref={searchRef} className="relative flex items-center">
      <output className="sr-only" aria-live="polite" aria-atomic="true">
        {statusMessage}
      </output>
      <div className="flex items-center gap-1">
        <input
          ref={inputRef}
          type="search"
          role="combobox"
          aria-expanded={isResultsVisible}
          aria-controls="search-results"
          aria-activedescendant={activeIndex >= 0 ? `search-result-${activeIndex}` : undefined}
          aria-label="Search guides and articles"
          placeholder="Search&hellip;"
          name="Search"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`focus:border-primary-500 focus:ring-primary-500 rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 transition-[width,opacity] duration-300 focus:ring-2 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 ${
            isExpanded ? "w-64 opacity-100" : "pointer-events-none w-0 opacity-0"
          }`}
        />

        <button
          type="button"
          onClick={handleToggle}
          aria-label={isExpanded ? "Close search" : "Open search"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
        >
          <FontAwesomeIcon icon={isExpanded ? faXmark : faMagnifyingGlass} className="h-5 w-5" />
        </button>
      </div>

      {isExpanded && query && <SearchResults results={results} onClose={handleClose} activeIndex={activeIndex} />}
    </div>
  );
};
