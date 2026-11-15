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
        className="bg-surface-200 shadow-overlay absolute top-full right-0 z-50 mt-2 max-h-96 w-80 overflow-y-auto rounded-lg"
      >
        <output className="border-line block border-b px-4 py-3 transition-colors last:border-b-0" aria-live="polite">
          No results found
        </output>
      </div>
    );
  }

  return (
    <output
      id="search-results"
      aria-label="Search results"
      className="bg-surface-200 shadow-overlay absolute top-full right-0 z-50 mt-2 max-h-96 w-80 overflow-y-auto rounded-lg"
    >
      {results.map((result, index) => (
        <NavLink
          key={result.href}
          to={result.href}
          onClick={onClose}
          role="option"
          aria-selected={index === activeIndex}
          id={`search-result-${index}`}
          className={`border-line block border-b px-4 py-3 transition-colors last:border-b-0 ${
            index === activeIndex ? "bg-rhubarb-soft" : "hover:bg-surface-300"
          }`}
          prefetch="intent"
        >
          <div className="text-ink font-medium">{result.title}</div>
          <div className="text-caption text-ink-subtle mt-1">{result.category}</div>
        </NavLink>
      ))}
    </output>
  );
};
