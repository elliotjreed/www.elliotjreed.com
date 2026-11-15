import { act, render, screen } from "@testing-library/react";
import type { FC, ReactElement } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useElementWidth } from "./useElementWidth";

type ResizeCallback = (entries: { contentRect: { width: number } }[]) => void;

const observers: { callback: ResizeCallback; disconnected: boolean }[] = [];

class FakeResizeObserver {
  private readonly record: { callback: ResizeCallback; disconnected: boolean };

  constructor(callback: ResizeCallback) {
    this.record = { callback, disconnected: false };
    observers.push(this.record);
  }

  observe(): void {}

  disconnect(): void {
    this.record.disconnected = true;
  }
}

const resizeTo = (width: number): void => {
  act(() => {
    for (const observer of observers) {
      observer.callback([{ contentRect: { width } }]);
    }
  });
};

const Measured: FC = (): ReactElement => {
  const [ref, width] = useElementWidth<HTMLDivElement>(640);

  return <div ref={ref}>{width}</div>;
};

describe("useElementWidth", () => {
  afterEach(() => {
    observers.length = 0;
    vi.unstubAllGlobals();
  });

  it("should return the fallback width when ResizeObserver is unavailable", () => {
    vi.stubGlobal("ResizeObserver", undefined);

    render(<Measured />);

    expect(screen.getByText("640")).toBeInTheDocument();
  });

  it("should return the element's measured width, rounded down", () => {
    vi.stubGlobal("ResizeObserver", FakeResizeObserver);
    render(<Measured />);

    resizeTo(320.6);

    expect(screen.getByText("320")).toBeInTheDocument();
  });

  it("should stop observing when unmounted", () => {
    vi.stubGlobal("ResizeObserver", FakeResizeObserver);
    const { unmount } = render(<Measured />);

    unmount();

    expect(observers.every((observer) => observer.disconnected)).toBe(true);
  });
});
