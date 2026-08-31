/**
 * Monte Carlo pension simulation: repeated runs of the shared projection engine with
 * randomly sampled annual returns, exposing sequence-of-returns risk that a single
 * deterministic rate hides. Seeded (mulberry32) so results are reproducible.
 */

import type { AllocationPreset } from "./constants";
import type { AccumulationInputs, DrawdownInputs } from "./projection";
import { projectAccumulation, projectDrawdown } from "./projection";

export interface MonteCarloOptions {
  iterations?: number;
  seed?: number;
}

export interface MonteCarloResult {
  /** Age at the end of each modelled year, from the first accumulation year to the plan-to age. */
  ages: number[];
  /** 10th percentile pot value at each age across simulations. */
  p10: number[];
  /** Median pot value at each age across simulations. */
  p50: number[];
  /** 90th percentile pot value at each age across simulations. */
  p90: number[];
  /** Fraction of simulations that sustained the target income to the plan-to age. */
  successProbability: number;
}

const DEFAULT_ITERATIONS = 1_000;
const DEFAULT_SEED = 20_260_406;

/**
 * Deterministic pseudo-random number generator (mulberry32) returning values in [0, 1).
 * Dependency-free and fast enough for thousands of simulation years.
 */
export function createRng(seed: number): () => number {
  let state = seed >>> 0;

  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);

    return ((t ^ (t >>> 14)) >>> 0) / 4_294_967_296;
  };
}

/**
 * Standard normal sample via the Box-Muller transform.
 */
export function sampleNormal(rng: () => number): number {
  const u1 = 1 - rng();
  const u2 = rng();

  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

/**
 * Annual real return sampled from a lognormal distribution with the given expected
 * return and volatility, so that E[1 + return] = 1 + meanReal and zero volatility
 * reproduces the deterministic rate exactly.
 */
export function sampleLognormalReturn(meanReal: number, volatility: number, rng: () => number): number {
  const mu = Math.log(1 + meanReal) - (volatility * volatility) / 2;

  return Math.exp(mu + volatility * sampleNormal(rng)) - 1;
}

function percentileOfSorted(sorted: number[], percentile: number): number {
  const index = Math.min(sorted.length - 1, Math.floor(percentile * sorted.length));

  return sorted[index];
}

/**
 * Runs the accumulation and drawdown projection many times with sampled returns and
 * summarises pot values per year at the 10th, 50th and 90th percentiles, plus the
 * probability of sustaining the target income to the plan-to age.
 */
export function runMonteCarlo(
  accumulationInputs: AccumulationInputs,
  drawdownInputs: Omit<DrawdownInputs, "potAtRetirement">,
  preset: AllocationPreset,
  options: MonteCarloOptions = {},
): MonteCarloResult {
  const { iterations = DEFAULT_ITERATIONS, seed = DEFAULT_SEED } = options;

  if (!Number.isInteger(iterations) || iterations <= 0) {
    throw new Error("Iterations must be a positive integer");
  }

  const rng = createRng(seed);
  const potsByYear: number[][] = [];
  let successes = 0;
  let ages: number[] = [];

  for (let iteration = 0; iteration < iterations; iteration++) {
    const returnForYear = (): number => sampleLognormalReturn(preset.meanRealReturn, preset.volatility, rng);

    const accumulationRows = projectAccumulation(accumulationInputs, returnForYear);
    const potAtRetirement = accumulationRows[accumulationRows.length - 1].potEnd;
    const { rows: drawdownRows, depletionAge } = projectDrawdown({ ...drawdownInputs, potAtRetirement }, returnForYear);

    const combined = [...accumulationRows, ...drawdownRows];

    if (iteration === 0) {
      ages = combined.map((row) => row.age);
      for (let i = 0; i < combined.length; i++) {
        potsByYear.push([]);
      }
    }

    for (let i = 0; i < combined.length; i++) {
      potsByYear[i].push(combined[i].potEnd);
    }

    if (depletionAge === null) {
      successes++;
    }
  }

  const p10: number[] = [];
  const p50: number[] = [];
  const p90: number[] = [];

  for (const pots of potsByYear) {
    const sorted = [...pots].sort((a, b) => a - b);
    p10.push(percentileOfSorted(sorted, 0.1));
    p50.push(percentileOfSorted(sorted, 0.5));
    p90.push(percentileOfSorted(sorted, 0.9));
  }

  return { ages, p10, p50, p90, successProbability: successes / iterations };
}
