import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Fuse from "fuse.js";
import { type SearchableItem, searchIndex } from "~/data/searchIndex";

const MAX_QUERY_LENGTH = 100;
const DEBOUNCE_DELAY = 300;

interface UseSearchReturn {
  search: (query: string) => void;
  results: SearchableItem[];
  clearResults: () => void;
}

export const useSearch = (): UseSearchReturn => {
  const [results, setResults] = useState<SearchableItem[]>([]);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fuse = useMemo(
    () =>
      new Fuse(searchIndex, {
        keys: [
          { name: "title", weight: 0.4 },
          { name: "description", weight: 0.3 },
          { name: "keywords", weight: 0.2 },
          { name: "category", weight: 0.1 },
        ],
        threshold: 0.4,
        includeScore: true,
        minMatchCharLength: 2,
      }),
    [],
  );

  const search = useCallback(
    (query: string): void => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      const sanitisedQuery = query.trim().slice(0, MAX_QUERY_LENGTH);

      if (!sanitisedQuery) {
        setResults([]);
        return;
      }

      debounceTimerRef.current = setTimeout(() => {
        const searchResults = fuse.search(sanitisedQuery);
        setResults(searchResults.map((result) => result.item));
      }, DEBOUNCE_DELAY);
    },
    [fuse],
  );

  const clearResults = useCallback((): void => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    setResults([]);
  }, []);

  useEffect(() => {
    return (): void => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return { search, results, clearResults };
};
