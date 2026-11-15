import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  ProjectionChart,
  ageTickStep,
  bandPath,
  chartHeight,
  linePath,
  niceTicks,
  scaleLinear,
} from "./ProjectionChart";

const median = [
  { age: 40, value: 100_000 },
  { age: 50, value: 200_000 },
  { age: 60, value: 300_000 },
  { age: 70, value: 150_000 },
];

describe("niceTicks", () => {
  it("produces rounded ticks spanning the range", () => {
    const ticks = niceTicks(0, 987_654);

    expect(ticks[0]).toBe(0);
    expect(ticks[ticks.length - 1]).toBeGreaterThanOrEqual(987_654);
    for (const tick of ticks) {
      expect(Number.isFinite(tick)).toBe(true);
    }
  });

  it("returns ascending unique values", () => {
    const ticks = niceTicks(0, 500_000);

    for (let i = 1; i < ticks.length; i++) {
      expect(ticks[i]).toBeGreaterThan(ticks[i - 1]);
    }
  });

  it("handles a zero range without dividing by zero", () => {
    const ticks = niceTicks(0, 0);

    expect(ticks.length).toBeGreaterThan(0);
    expect(ticks.every(Number.isFinite)).toBe(true);
  });
});

describe("scaleLinear", () => {
  it("maps the domain onto the range", () => {
    const scale = scaleLinear([0, 100], [0, 500]);

    expect(scale(0)).toBe(0);
    expect(scale(50)).toBe(250);
    expect(scale(100)).toBe(500);
  });

  it("supports an inverted range as used for SVG y axes", () => {
    const scale = scaleLinear([0, 100], [300, 0]);

    expect(scale(0)).toBe(300);
    expect(scale(100)).toBe(0);
  });

  it("returns the range midpoint for a degenerate domain", () => {
    const scale = scaleLinear([5, 5], [0, 100]);

    expect(Number.isFinite(scale(5))).toBe(true);
  });
});

describe("linePath", () => {
  it("starts with a move command and draws one line per subsequent point", () => {
    const path = linePath(
      median,
      (age) => age,
      (value) => value,
    );

    expect(path.startsWith("M")).toBe(true);
    expect(path.match(/L/g)).toHaveLength(median.length - 1);
  });

  it("returns an empty string for no points", () => {
    expect(
      linePath(
        [],
        (age) => age,
        (value) => value,
      ),
    ).toBe("");
  });
});

describe("bandPath", () => {
  it("returns a closed path covering both bounds", () => {
    const lower = median.map((point) => ({ ...point, value: point.value * 0.8 }));
    const upper = median.map((point) => ({ ...point, value: point.value * 1.2 }));
    const path = bandPath(
      lower,
      upper,
      (age) => age,
      (value) => value,
    );

    expect(path.startsWith("M")).toBe(true);
    expect(path.endsWith("Z")).toBe(true);
  });

  it("returns an empty string when either bound is empty", () => {
    expect(
      bandPath(
        [],
        [],
        (age) => age,
        (value) => value,
      ),
    ).toBe("");
  });
});

describe("chartHeight", () => {
  it("keeps a 16:9 shape between the minimum and maximum heights", () => {
    expect(chartHeight(480)).toBe(270);
  });

  it("never goes below 240px on narrow screens", () => {
    expect(chartHeight(300)).toBe(240);
  });

  it("never goes above 360px on wide screens", () => {
    expect(chartHeight(1200)).toBe(360);
  });
});

describe("ageTickStep", () => {
  it("labels every five years when there is room", () => {
    expect(ageTickStep(560, 55)).toBe(5);
  });

  it("labels every ten years when five-year labels would be crowded", () => {
    expect(ageTickStep(240, 55)).toBe(10);
  });
});

describe("ProjectionChart", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("sets every label in the brand data type size", () => {
    const { container } = render(
      <ProjectionChart median={median} retirementAge={60} statePensionAge={67} depletionAge={70} ariaLabel="Chart" />,
    );

    const labels = Array.from(container.querySelectorAll("text"));
    expect(labels.length).toBeGreaterThan(0);
    for (const label of labels) {
      expect(label).toHaveClass("text-data");
      expect(label.getAttribute("class")).not.toMatch(/text-\[/);
    }
  });

  it("draws at the measured width so labels are not scaled down", () => {
    vi.stubGlobal(
      "ResizeObserver",
      class {
        constructor(private readonly callback: (entries: { contentRect: { width: number } }[]) => void) {}
        observe(): void {
          this.callback([{ contentRect: { width: 320 } }]);
        }
        disconnect(): void {}
      },
    );

    const { container } = render(<ProjectionChart median={median} retirementAge={60} ariaLabel="Chart" />);

    expect(container.querySelector("svg")).toHaveAttribute("viewBox", "0 0 320 240");
  });

  it("places the retirement and state pension labels either side of their lines", () => {
    render(<ProjectionChart median={median} retirementAge={60} statePensionAge={67} ariaLabel="Chart" />);

    expect(screen.getByText("Retire")).toHaveAttribute("text-anchor", "end");
    expect(screen.getByText("State pension")).toHaveAttribute("text-anchor", "start");
  });

  it("haloes the depletion label in the chart background so the line does not cross it", () => {
    render(<ProjectionChart median={median} retirementAge={60} depletionAge={70} ariaLabel="Chart" />);

    const label = screen.getByText("Pot runs out");
    expect(label).toHaveAttribute("paint-order", "stroke");
    expect(label).toHaveClass("stroke-surface-200");
  });

  it("caps the chart at 768px wide and centres it on desktop", () => {
    const { container } = render(<ProjectionChart median={median} retirementAge={60} ariaLabel="Chart" />);

    expect(container.firstElementChild).toHaveClass("mx-auto", "max-w-3xl");
  });

  it("centres a reference label when it is the only one", () => {
    render(<ProjectionChart median={median} retirementAge={60} ariaLabel="Chart" />);

    expect(screen.getByText("Retire")).toHaveAttribute("text-anchor", "middle");
  });

  it("renders an accessible image with a label", () => {
    render(<ProjectionChart median={median} retirementAge={60} ariaLabel="Projected pension pot" />);

    expect(screen.getByRole("img", { name: /projected pension pot/i })).toBeInTheDocument();
  });

  it("renders a percentile band only when one is supplied", () => {
    const { container, rerender } = render(<ProjectionChart median={median} retirementAge={60} ariaLabel="Chart" />);

    expect(container.querySelector("[data-testid='percentile-band']")).toBeNull();

    const lower = median.map((point) => ({ ...point, value: point.value * 0.8 }));
    const upper = median.map((point) => ({ ...point, value: point.value * 1.2 }));
    rerender(<ProjectionChart median={median} band={{ lower, upper }} retirementAge={60} ariaLabel="Chart" />);

    expect(container.querySelector("[data-testid='percentile-band']")).not.toBeNull();
  });

  it("marks the depletion age when the pot runs out", () => {
    const { container } = render(
      <ProjectionChart median={median} retirementAge={60} depletionAge={70} ariaLabel="Chart" />,
    );

    expect(container.querySelector("[data-testid='depletion-marker']")).not.toBeNull();
  });

  it("marks the state pension age when supplied", () => {
    const { container } = render(
      <ProjectionChart median={median} retirementAge={60} statePensionAge={67} ariaLabel="Chart" />,
    );

    expect(container.querySelector("[data-testid='state-pension-marker']")).not.toBeNull();
  });

  it("renders nothing when there is no data", () => {
    const { container } = render(<ProjectionChart median={[]} retirementAge={60} ariaLabel="Chart" />);

    expect(container.querySelector("svg")).toBeNull();
  });
});
