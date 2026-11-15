import type { FC, ReactElement } from "react";
import { useId } from "react";
import { useElementWidth } from "~/hooks/useElementWidth";
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

const DEFAULT_WIDTH = 640;
const MINIMUM_HEIGHT = 240;
const MAXIMUM_HEIGHT = 360;
const MARGIN = { top: 28, right: 16, bottom: 48, left: 64 };
const MINIMUM_AGE_LABEL_SPACING = 40;
const LABEL_CLASS_NAME = "fill-ink-muted text-data";

/**
 * Chart height for a given drawn width: 16:9, clamped so it stays legible on phones and compact on desktops.
 */
export function chartHeight(width: number): number {
  return Math.round(Math.min(MAXIMUM_HEIGHT, Math.max(MINIMUM_HEIGHT, (width * 9) / 16)));
}

/**
 * Years between age labels: every five when they fit, otherwise every ten.
 */
export function ageTickStep(plotWidth: number, ageSpan: number): number {
  return (plotWidth / ageSpan) * 5 >= MINIMUM_AGE_LABEL_SPACING ? 5 : 10;
}

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
  const [containerRef, width] = useElementWidth<HTMLDivElement>(DEFAULT_WIDTH);

  if (median.length === 0) {
    return null;
  }

  const height = chartHeight(width);
  const plotWidth = width - MARGIN.left - MARGIN.right;
  const plotHeight = height - MARGIN.top - MARGIN.bottom;

  const ages = median.map((point) => point.age);
  const minimumAge = Math.min(...ages);
  const maximumAge = Math.max(...ages);
  const maximumValue = Math.max(
    ...median.map((point) => point.value),
    ...(band?.upper.map((point) => point.value) ?? [0]),
  );

  const ticks = niceTicks(0, maximumValue);
  const x = scaleLinear([minimumAge, maximumAge], [MARGIN.left, MARGIN.left + plotWidth]);
  const y = scaleLinear([0, ticks[ticks.length - 1]], [MARGIN.top + plotHeight, MARGIN.top]);

  const ageStep = ageTickStep(plotWidth, maximumAge - minimumAge);
  const ageTicks = ages.filter((age) => age % ageStep === 0);
  const peak = median.reduce((highest, point) => (point.value > highest.value ? point : highest), median[0]);
  const finalPoint = median[median.length - 1];

  const description = `Projected pot of ${formatAxisValue(median[0].value)} at age ${minimumAge}, peaking at ${formatAxisValue(peak.value)} around age ${peak.age}, and ${depletionAge != null ? `running out at age ${depletionAge}` : `ending at ${formatAxisValue(finalPoint.value)} at age ${finalPoint.age}`}.`;

  const referenceLine = (
    age: number,
    label: string,
    testId: string,
    anchor: "start" | "middle" | "end",
  ): ReactElement | null => {
    if (age < minimumAge || age > maximumAge) {
      return null;
    }

    const labelOffset = anchor === "start" ? 4 : anchor === "end" ? -4 : 0;

    return (
      <g data-testid={testId}>
        <line
          x1={x(age)}
          x2={x(age)}
          y1={MARGIN.top}
          y2={MARGIN.top + plotHeight}
          strokeDasharray="4 4"
          className="stroke-line-strong"
        />
        <text x={x(age) + labelOffset} y={MARGIN.top - 8} textAnchor={anchor} className={LABEL_CLASS_NAME}>
          {label}
        </text>
      </g>
    );
  };

  const hasBothReferenceLines = statePensionAge !== undefined;
  const retirementAnchor = hasBothReferenceLines ? (retirementAge <= statePensionAge ? "end" : "start") : "middle";
  const statePensionAnchor = retirementAnchor === "end" ? "start" : "end";

  return (
    <div ref={containerRef} className="mx-auto max-w-3xl">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full"
        role="img"
        aria-labelledby={`${titleId} ${descriptionId}`}
      >
        <title id={titleId}>{ariaLabel}</title>
        <desc id={descriptionId}>{description}</desc>

        {ticks.map((tick) => (
          <g key={tick}>
            <line x1={MARGIN.left} x2={MARGIN.left + plotWidth} y1={y(tick)} y2={y(tick)} className="stroke-line" />
            <text
              x={MARGIN.left - 8}
              y={y(tick)}
              textAnchor="end"
              dominantBaseline="middle"
              className={LABEL_CLASS_NAME}
            >
              {formatAxisValue(tick)}
            </text>
          </g>
        ))}

        {ageTicks.map((age) => (
          <text key={age} x={x(age)} y={MARGIN.top + plotHeight + 20} textAnchor="middle" className={LABEL_CLASS_NAME}>
            {age}
          </text>
        ))}

        <text x={MARGIN.left + plotWidth / 2} y={height - 4} textAnchor="middle" className={LABEL_CLASS_NAME}>
          Age
        </text>

        {band !== undefined && (
          <path d={bandPath(band.lower, band.upper, x, y)} data-testid="percentile-band" className="fill-damson-soft" />
        )}

        <path d={linePath(median, x, y)} className="stroke-rhubarb" fill="none" strokeWidth={2} />

        {referenceLine(retirementAge, "Retire", "retirement-marker", retirementAnchor)}
        {statePensionAge !== undefined &&
          referenceLine(statePensionAge, "State pension", "state-pension-marker", statePensionAnchor)}

        {depletionAge != null && depletionAge >= minimumAge && depletionAge <= maximumAge && (
          <g data-testid="depletion-marker">
            <circle cx={x(depletionAge)} cy={y(0)} r={4} className="fill-danger" />
            <text
              x={x(depletionAge)}
              y={y(0) - 8}
              textAnchor="middle"
              paintOrder="stroke"
              strokeWidth={4}
              strokeLinejoin="round"
              className="fill-danger stroke-surface-200 text-data"
            >
              Pot runs out
            </text>
          </g>
        )}
      </svg>

      <div className="text-caption text-ink-muted mt-2 flex flex-wrap items-center justify-center gap-4">
        <span className="flex items-center gap-2">
          <span className="bg-rhubarb inline-block h-0.5 w-4" aria-hidden="true" />
          Projected pot
        </span>
        {band !== undefined && (
          <span className="flex items-center gap-2">
            <span className="bg-damson-soft inline-block h-3 w-4" aria-hidden="true" />
            10th to 90th percentile
          </span>
        )}
      </div>

      <p className="sr-only">Full year-by-year figures are available in the table below the chart.</p>
    </div>
  );
};
