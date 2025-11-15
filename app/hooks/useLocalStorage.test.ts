import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useLocalStorage } from "./useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("should return initial value when localStorage is empty", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", "initial-value"));

    expect(result.current[0]).toBe("initial-value");
  });

  it("should return stored value from localStorage", () => {
    localStorage.setItem("test-key", JSON.stringify("stored-value"));

    const { result } = renderHook(() => useLocalStorage("test-key", "initial-value"));

    expect(result.current[0]).toBe("stored-value");
  });

  it("should update localStorage when setValue is called", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", "initial-value"));

    act(() => {
      result.current[1]("new-value");
    });

    expect(result.current[0]).toBe("new-value");
    expect(localStorage.getItem("test-key")).toBe(JSON.stringify("new-value"));
  });

  it("should handle function updater", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", 0));

    act(() => {
      result.current[1]((prev) => prev + 1);
    });

    expect(result.current[0]).toBe(1);
    expect(localStorage.getItem("test-key")).toBe(JSON.stringify(1));
  });

  it("should handle objects", () => {
    const initialObject = { name: "test", count: 0 };
    const { result } = renderHook(() => useLocalStorage("test-key", initialObject));

    const newObject = { name: "updated", count: 5 };
    act(() => {
      result.current[1](newObject);
    });

    expect(result.current[0]).toEqual(newObject);
    expect(localStorage.getItem("test-key")).toBe(JSON.stringify(newObject));
  });

  it("should handle arrays", () => {
    const initialArray = [1, 2, 3];
    const { result } = renderHook(() => useLocalStorage("test-key", initialArray));

    const newArray = [4, 5, 6];
    act(() => {
      result.current[1](newArray);
    });

    expect(result.current[0]).toEqual(newArray);
    expect(localStorage.getItem("test-key")).toBe(JSON.stringify(newArray));
  });

  it("should return initial value on localStorage parse error", () => {
    localStorage.setItem("test-key", "invalid-json{");
    const consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const { result } = renderHook(() => useLocalStorage("test-key", "default-value"));

    expect(result.current[0]).toBe("default-value");
    expect(consoleWarnSpy).toHaveBeenCalled();

    consoleWarnSpy.mockRestore();
  });

  it("should handle boolean values", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", false));

    act(() => {
      result.current[1](true);
    });

    expect(result.current[0]).toBe(true);
    expect(localStorage.getItem("test-key")).toBe(JSON.stringify(true));
  });

  it("should handle null values", () => {
    localStorage.setItem("test-key", JSON.stringify(null));

    const { result } = renderHook(() => useLocalStorage("test-key", "default"));

    expect(result.current[0]).toBeNull();
  });

  it("should warn on setValue error", () => {
    const consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { result } = renderHook(() => useLocalStorage("test-key", "initial"));

    // Mock localStorage.setItem to throw an error
    const originalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = vi.fn(() => {
      throw new Error("Storage full");
    });

    act(() => {
      result.current[1]("new-value");
    });

    expect(consoleWarnSpy).toHaveBeenCalled();

    // Restore
    Storage.prototype.setItem = originalSetItem;
    consoleWarnSpy.mockRestore();
  });
});
