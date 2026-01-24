import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
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
  }, [isExpanded, handleClose]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
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

    document.addEventListener("keydown", handleKeyDown);
    return (): void => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isExpanded, results, activeIndex, navigate, handleClose]);

  useEffect(() => {
    if (activeIndex >= 0) {
      const element = document.getElementById(`search-result-${activeIndex}`);
      element?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [activeIndex]);

  return (
    <div ref={searchRef} className="relative flex items-center">
      <div className="flex items-center gap-1">
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={isExpanded && results.length > 0}
          aria-controls="search-results"
          aria-activedescendant={activeIndex >= 0 ? `search-result-${activeIndex}` : undefined}
          aria-label="Search guides and articles"
          placeholder="Search&hellip;"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          className={`rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 ${
            isExpanded ? "w-64 opacity-100" : "w-0 opacity-0 pointer-events-none"
          }`}
        />

        <button
          type="button"
          onClick={handleToggle}
          aria-label={isExpanded ? "Close search" : "Open search"}
          className="inline-flex items-center justify-center w-10 h-10 p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
        >
          <FontAwesomeIcon icon={isExpanded ? faXmark : faMagnifyingGlass} className="w-5 h-5" />
        </button>
      </div>

      {isExpanded && query && <SearchResults results={results} onClose={handleClose} activeIndex={activeIndex} />}
    </div>
  );
};
