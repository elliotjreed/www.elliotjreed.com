import type Fuse from "fuse.js";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const fuseRef = useRef<Fuse<SearchableItem> | null>(null);
  const fuseLoadingRef = useRef<Promise<void> | null>(null);

  const loadFuse = useCallback(async (): Promise<void> => {
    if (fuseRef.current) return;
    if (fuseLoadingRef.current) {
      await fuseLoadingRef.current;
      return;
    }

    fuseLoadingRef.current = (async () => {
      const { default: FuseClass } = await import("fuse.js");
      fuseRef.current = new FuseClass(searchIndex, {
        keys: [
          { name: "title", weight: 0.4 },
          { name: "description", weight: 0.3 },
          { name: "keywords", weight: 0.2 },
          { name: "category", weight: 0.1 },
        ],
        threshold: 0.4,
        includeScore: true,
        minMatchCharLength: 2,
      });
    })();

    await fuseLoadingRef.current;
  }, []);

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

      debounceTimerRef.current = setTimeout(async () => {
        await loadFuse();
        if (fuseRef.current) {
          const searchResults = fuseRef.current.search(sanitisedQuery);
          setResults(searchResults.map((result) => result.item));
        }
      }, DEBOUNCE_DELAY);
    },
    [loadFuse],
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
