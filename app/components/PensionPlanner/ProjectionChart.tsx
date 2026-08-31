import type { FC, ReactElement } from "react";
import { useId } from "react";
import type { ProjectionPoint } from "~/utils/pension/planner";

export type ChartPoint = ProjectionPoint;

interface ProjectionChartProps {
  /** The central projection: the deterministic trajectory or the Monte Carlo median. */
  median: ChartPoint[];
  /** Optional 10th to 90th percentile range drawn as a shaded band. */
  band?: { lower: ChartPoint[]; upper: ChartPoint[] };
  retirementAge: number;
  statePensionAge?: number;
  depletionAge?: number | null;
  ariaLabel: string;
}

const WIDTH = 640;
const HEIGHT = 360;
const MARGIN = { top: 16, right: 16, bottom: 40, left: 64 };
const PLOT_WIDTH = WIDTH - MARGIN.left - MARGIN.right;
const PLOT_HEIGHT = HEIGHT - MARGIN.top - MARGIN.bottom;

/**
 * Rounded axis tick values spanning zero to the maximum, using a 1/2/5 step progression.
 */
export function niceTicks(minimum: number, maximum: number, targetCount = 5): number[] {
  if (!Number.isFinite(maximum) || maximum <= minimum) {
    return [minimum, minimum + 1];
  }

  const roughStep = (maximum - minimum) / targetCount;
  const magnitude = 10 ** Math.floor(Math.log10(roughStep));
  const normalised = roughStep / magnitude;
  const niceStep = (normalised <= 1 ? 1 : normalised <= 2 ? 2 : normalised <= 5 ? 5 : 10) * magnitude;

  const ticks: number[] = [];
  for (let tick = Math.floor(minimum / niceStep) * niceStep; tick < maximum + niceStep; tick += niceStep) {
    ticks.push(Number(tick.toFixed(10)));
  }

  return ticks;
}

/**
 * Linear scale mapping a domain onto a pixel range.
 */
export function scaleLinear(domain: [number, number], range: [number, number]): (value: number) => number {
  const [domainStart, domainEnd] = domain;
  const [rangeStart, rangeEnd] = range;
  const domainSpan = domainEnd - domainStart;

  if (domainSpan === 0) {
    return () => (rangeStart + rangeEnd) / 2;
  }

  return (value: number) => rangeStart + ((value - domainStart) / domainSpan) * (rangeEnd - rangeStart);
}

/**
 * SVG path data for a line through the given points.
 */
export function linePath(points: ChartPoint[], x: (age: number) => number, y: (value: number) => number): string {
  if (points.length === 0) {
    return "";
  }

  return points
    .map((point, index) => `${index === 0 ? "M" : "L"}${x(point.age).toFixed(2)} ${y(point.value).toFixed(2)}`)
    .join(" ");
}

/**
 * SVG path data for a closed band between a lower and an upper bound.
 */
export function bandPath(
  lower: ChartPoint[],
  upper: ChartPoint[],
  x: (age: number) => number,
  y: (value: number) => number,
): string {
  if (lower.length === 0 || upper.length === 0) {
    return "";
  }

  const upwards = upper.map(
    (point, index) => `${index === 0 ? "M" : "L"}${x(point.age).toFixed(2)} ${y(point.value).toFixed(2)}`,
  );
  const downwards = [...lower].reverse().map((point) => `L${x(point.age).toFixed(2)} ${y(point.value).toFixed(2)}`);

  return `${[...upwards, ...downwards].join(" ")} Z`;
}

const formatAxisValue = (value: number): string => {
  if (value >= 1_000_000) {
    return `£${(value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1)}m`;
  }
  if (value >= 1_000) {
    return `£${Math.round(value / 1_000)}k`;
  }

  return `£${Math.round(value)}`;
};

export const ProjectionChart: FC<ProjectionChartProps> = ({
  median,
  band,
  retirementAge,
  statePensionAge,
  depletionAge,
  ariaLabel,
}): ReactElement | null => {
  const titleId = useId();
  const descriptionId = useId();

  if (median.length === 0) {
    return null;
  }

  const ages = median.map((point) => point.age);
  const minimumAge = Math.min(...ages);
  const maximumAge = Math.max(...ages);
  const maximumValue = Math.max(
    ...median.map((point) => point.value),
    ...(band?.upper.map((point) => point.value) ?? [0]),
  );

  const ticks = niceTicks(0, maximumValue);
  const x = scaleLinear([minimumAge, maximumAge], [MARGIN.left, MARGIN.left + PLOT_WIDTH]);
  const y = scaleLinear([0, ticks[ticks.length - 1]], [MARGIN.top + PLOT_HEIGHT, MARGIN.top]);

  const ageTicks = ages.filter((age) => age % 5 === 0);
  const peak = median.reduce((highest, point) => (point.value > highest.value ? point : highest), median[0]);
  const finalPoint = median[median.length - 1];

  const description = `Projected pot of ${formatAxisValue(median[0].value)} at age ${minimumAge}, peaking at ${formatAxisValue(peak.value)} around age ${peak.age}, and ${depletionAge != null ? `running out at age ${depletionAge}` : `ending at ${formatAxisValue(finalPoint.value)} at age ${finalPoint.age}`}.`;

  const referenceLine = (age: number, label: string, testId: string): ReactElement | null => {
    if (age < minimumAge || age > maximumAge) {
      return null;
    }

    return (
      <g data-testid={testId}>
        <line
          x1={x(age)}
          x2={x(age)}
          y1={MARGIN.top}
          y2={MARGIN.top + PLOT_HEIGHT}
          strokeDasharray="4 4"
          className="stroke-gray-400 dark:stroke-gray-500"
        />
        <text
          x={x(age)}
          y={MARGIN.top - 4}
          textAnchor="middle"
          className="fill-gray-600 text-[10px] dark:fill-gray-400"
        >
          {label}
        </text>
      </g>
    );
  };

  return (
    <div>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="h-auto w-full"
        role="img"
        aria-labelledby={`${titleId} ${descriptionId}`}
      >
        <title id={titleId}>{ariaLabel}</title>
        <desc id={descriptionId}>{description}</desc>

        {ticks.map((tick) => (
          <g key={tick}>
            <line
              x1={MARGIN.left}
              x2={MARGIN.left + PLOT_WIDTH}
              y1={y(tick)}
              y2={y(tick)}
              className="stroke-gray-200 dark:stroke-gray-700"
            />
            <text
              x={MARGIN.left - 8}
              y={y(tick)}
              textAnchor="end"
              dominantBaseline="middle"
              className="fill-gray-600 text-[10px] dark:fill-gray-400"
            >
              {formatAxisValue(tick)}
            </text>
          </g>
        ))}

        {ageTicks.map((age) => (
          <text
            key={age}
            x={x(age)}
            y={MARGIN.top + PLOT_HEIGHT + 20}
            textAnchor="middle"
            className="fill-gray-600 text-[10px] dark:fill-gray-400"
          >
            {age}
          </text>
        ))}

        <text
          x={MARGIN.left + PLOT_WIDTH / 2}
          y={HEIGHT - 4}
          textAnchor="middle"
          className="fill-gray-600 text-[11px] dark:fill-gray-400"
        >
          Age
        </text>

        {band !== undefined && (
          <path
            d={bandPath(band.lower, band.upper, x, y)}
            data-testid="percentile-band"
            className="fill-secondary-300/40 dark:fill-secondary-600/30"
          />
        )}

        <path
          d={linePath(median, x, y)}
          className="stroke-primary-600 dark:stroke-primary-400"
          fill="none"
          strokeWidth={2}
        />

        {referenceLine(retirementAge, "Retire", "retirement-marker")}
        {statePensionAge !== undefined && referenceLine(statePensionAge, "State pension", "state-pension-marker")}

        {depletionAge != null && depletionAge >= minimumAge && depletionAge <= maximumAge && (
          <g data-testid="depletion-marker">
            <circle cx={x(depletionAge)} cy={y(0)} r={4} className="fill-red-600 dark:fill-red-400" />
            <text
              x={x(depletionAge)}
              y={y(0) - 8}
              textAnchor="middle"
              className="fill-red-600 text-[10px] dark:fill-red-400"
            >
              Pot runs out
            </text>
          </g>
        )}
      </svg>

      <div className="mt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-600 dark:text-gray-400">
        <span className="flex items-center gap-2">
          <span className="bg-primary-600 dark:bg-primary-400 inline-block h-0.5 w-4" aria-hidden="true" />
          Projected pot
        </span>
        {band !== undefined && (
          <span className="flex items-center gap-2">
            <span className="bg-secondary-300 dark:bg-secondary-600 inline-block h-3 w-4" aria-hidden="true" />
            10th to 90th percentile
          </span>
        )}
      </div>

      <p className="sr-only">Full year-by-year figures are available in the table below the chart.</p>
    </div>
  );
};
