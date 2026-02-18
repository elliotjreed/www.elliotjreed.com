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
        className="absolute top-full right-0 z-50 mt-2 max-h-96 w-80 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800"
      >
        <output
          className="block border-b border-gray-100 px-4 py-3 transition-colors last:border-b-0 dark:border-gray-700"
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
      className="absolute top-full right-0 z-50 mt-2 max-h-96 w-80 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800"
    >
      {results.map((result, index) => (
        <NavLink
          key={result.href}
          to={result.href}
          onClick={onClose}
          role="option"
          aria-selected={index === activeIndex}
          id={`search-result-${index}`}
          className={`block border-b border-gray-100 px-4 py-3 transition-colors last:border-b-0 dark:border-gray-700 ${
            index === activeIndex ? "bg-primary-50 dark:bg-primary-900/20" : "hover:bg-gray-50 dark:hover:bg-gray-700"
          }`}
          prefetch="intent"
        >
          <div className="font-medium text-gray-900 dark:text-gray-100">{result.title}</div>
          <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">{result.category}</div>
        </NavLink>
      ))}
    </output>
  );
};
