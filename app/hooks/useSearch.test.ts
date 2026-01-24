import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useSearch } from "./useSearch";

describe("useSearch", () => {
  it("should return empty results initially", () => {
    const { result } = renderHook(() => useSearch());

    expect(result.current.results).toEqual([]);
  });

  it("should find results for 'docker' query", async () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.search("docker");
    });

    await waitFor(
      () => {
        expect(result.current.results.length).toBeGreaterThan(0);
      },
      { timeout: 500 },
    );

    expect(result.current.results[0].category).toBe("Docker Guides");
  });

  it("should find results for 'ai' query", async () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.search("ai");
    });

    await waitFor(
      () => {
        expect(result.current.results.length).toBeGreaterThan(0);
      },
      { timeout: 500 },
    );

    const categories = result.current.results.map((r) => r.category);
    expect(categories).toContain("AI Guides");
  });

  it("should perform fuzzy search for typos", async () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.search("promt"); // typo for "prompt"
    });

    await waitFor(
      () => {
        expect(result.current.results.length).toBeGreaterThan(0);
      },
      { timeout: 500 },
    );

    const titles = result.current.results.map((r) => r.title.toLowerCase());
    expect(titles.some((t) => t.includes("prompt"))).toBe(true);
  });

  it("should clear results", async () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.search("docker");
    });

    await waitFor(
      () => {
        expect(result.current.results.length).toBeGreaterThan(0);
      },
      { timeout: 500 },
    );

    act(() => {
      result.current.clearResults();
    });

    expect(result.current.results).toEqual([]);
  });

  it("should return empty results for empty query", () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.search("");
    });

    expect(result.current.results).toEqual([]);
  });

  it("should return empty results for whitespace-only query", () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.search("   ");
    });

    expect(result.current.results).toEqual([]);
  });

  it("should find results by keywords", async () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.search("chatgpt");
    });

    await waitFor(
      () => {
        expect(result.current.results.length).toBeGreaterThan(0);
      },
      { timeout: 500 },
    );

    const titles = result.current.results.map((r) => r.title);
    expect(titles).toContain("AI Prompt Guide");
  });

  it("should find results by category", async () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.search("PHP");
    });

    await waitFor(
      () => {
        expect(result.current.results.length).toBeGreaterThan(0);
      },
      { timeout: 500 },
    );

    expect(result.current.results[0].category).toBe("PHP Guides");
  });
});
