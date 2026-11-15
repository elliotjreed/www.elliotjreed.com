import { useEffect, useState } from "react";

export const useElementWidth = <T extends Element>(
  fallback: number,
): readonly [(element: T | null) => void, number] => {
  const [element, setElement] = useState<T | null>(null);
  const [width, setWidth] = useState(fallback);

  useEffect((): (() => void) | undefined => {
    if (element === null || typeof ResizeObserver === "undefined") {
      return undefined;
    }

    const observer = new ResizeObserver((entries): void => {
      const measured = Math.floor(entries[0]?.contentRect.width ?? 0);
      if (measured > 0) {
        setWidth(measured);
      }
    });
    observer.observe(element);

    return (): void => observer.disconnect();
  }, [element]);

  return [setElement, width] as const;
};
