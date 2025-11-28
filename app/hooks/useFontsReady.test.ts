import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useFontsReady } from "./useFontsReady";

describe("useFontsReady", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return false initially and true when fonts are ready", async () => {
    let resolveReady: () => void;
    const readyPromise = new Promise<void>((resolve) => {
      resolveReady = resolve;
    });

    const mockFonts = {
      ready: readyPromise,
    };

    Object.defineProperty(document, "fonts", {
      value: mockFonts,
      writable: true,
      configurable: true,
    });

    const { result } = renderHook(() => useFontsReady());

    expect(result.current).toBe(false);

    // Resolve the promise
    resolveReady?.();

    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });

  it("should handle when document.fonts is not available", () => {
    const originalFonts = document.fonts;
    // @ts-expect-error - Testing when fonts API is not available
    delete document.fonts;

    const { result } = renderHook(() => useFontsReady());

    expect(result.current).toBe(true);

    // Restore
    Object.defineProperty(document, "fonts", {
      value: originalFonts,
      writable: true,
      configurable: true,
    });
  });

  it("should set ready to true after fonts.ready promise resolves", async () => {
    const { result } = renderHook(() => useFontsReady());

    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });
});
