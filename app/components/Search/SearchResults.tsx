import type { FC, ReactElement } from "react";
import { NavLink } from "react-router";
import type { SearchableItem } from "~/data/searchIndex";

interface SearchResultsProps {
  results: SearchableItem[];
  onClose: () => void;
  activeIndex: number;
}

export const SearchResults: FC<SearchResultsProps> = ({ results, onClose, activeIndex }): ReactElement => {
  if (results.length === 0) {
    return (
      <div
        id="search-results"
        role="listbox"
        aria-label="Search results"
        className="absolute top-full right-0 mt-2 w-80 max-h-96 overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xl z-50"
      >
        <output
          className="block px-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-colors "
          aria-live="polite"
        >
          No results found
        </output>
      </div>
    );
  }

  return (
    <output
      id="search-results"
      aria-label="Search results"
      className="absolute top-full right-0 mt-2 w-80 max-h-96 overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xl z-50"
    >
      {results.map((result, index) => (
        <NavLink
          key={result.href}
          to={result.href}
          onClick={onClose}
          role="option"
          aria-selected={index === activeIndex}
          id={`search-result-${index}`}
          className={`block px-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-colors ${
            index === activeIndex ? "bg-primary-50 dark:bg-primary-900/20" : "hover:bg-gray-50 dark:hover:bg-gray-700"
          }`}
          prefetch="intent"
        >
          <div className="font-medium text-gray-900 dark:text-gray-100">{result.title}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{result.category}</div>
        </NavLink>
      ))}
    </output>
  );
};
