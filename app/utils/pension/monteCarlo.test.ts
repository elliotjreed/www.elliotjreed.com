import { describe, expect, it } from "vitest";
import { createRng, runMonteCarlo, sampleLognormalReturn, sampleNormal } from "./monteCarlo";
import type { AccumulationInputs, DrawdownInputs } from "./projection";
import { runDeterministicProjection } from "./projection";

const accumulation: AccumulationInputs = {
  currentAge: 50,
  retirementAge: 65,
  currentPot: 200_000,
  annualSalary: 50_000,
  employeeContribution: { kind: "percent", value: 8 },
  employerContribution: { kind: "percent", value: 4 },
  annualFee: 0,
};

const drawdown: Omit<DrawdownInputs, "potAtRetirement"> = {
  retirementAge: 65,
  planToAge: 95,
  targetNetIncome: 18_000,
  statePension: { annual: 12_547.6, fromAge: 67 },
  annualFee: 0,
};

describe("createRng", () => {
  it("produces an identical sequence for the same seed", () => {
    const first = createRng(42);
    const second = createRng(42);

    for (let i = 0; i < 10; i++) {
      expect(first()).toBe(second());
    }
  });

  it("produces different sequences for different seeds", () => {
    const first = createRng(1);
    const second = createRng(2);
    const firstValues = [first(), first(), first()];
    const secondValues = [second(), second(), second()];

    expect(firstValues).not.toEqual(secondValues);
  });

  it("produces values in the half-open interval [0, 1)", () => {
    const rng = createRng(7);

    for (let i = 0; i < 1_000; i++) {
      const value = rng();
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });
});

describe("sampleNormal", () => {
  it("approximates a standard normal distribution", () => {
    const rng = createRng(123);
    const samples: number[] = [];

    for (let i = 0; i < 10_000; i++) {
      samples.push(sampleNormal(rng));
    }

    const mean = samples.reduce((sum, value) => sum + value, 0) / samples.length;
    const variance = samples.reduce((sum, value) => sum + (value - mean) ** 2, 0) / samples.length;

    expect(mean).toBeCloseTo(0, 1);
    expect(Math.sqrt(variance)).toBeCloseTo(1, 1);
  });
});

describe("sampleLognormalReturn", () => {
  it("returns exactly the mean return at zero volatility", () => {
    const rng = createRng(9);

    expect(sampleLognormalReturn(0.035, 0, rng)).toBeCloseTo(0.035, 10);
  });

  it("averages close to the mean return over many samples", () => {
    const rng = createRng(11);
    let total = 0;
    const iterations = 20_000;

    for (let i = 0; i < iterations; i++) {
      total += sampleLognormalReturn(0.035, 0.11, rng);
    }

    expect(total / iterations).toBeCloseTo(0.035, 2);
  });
});

describe("runMonteCarlo", () => {
  const preset = { id: "balanced" as const, label: "Balanced", meanRealReturn: 0.035, volatility: 0.11 };

  it("is deterministic for the same seed", () => {
    const first = runMonteCarlo(accumulation, drawdown, preset, { iterations: 50, seed: 42 });
    const second = runMonteCarlo(accumulation, drawdown, preset, { iterations: 50, seed: 42 });

    expect(first).toEqual(second);
  });

  it("covers every year from current age to the plan-to age", () => {
    const result = runMonteCarlo(accumulation, drawdown, preset, { iterations: 20, seed: 1 });

    expect(result.ages[0]).toBe(50);
    expect(result.ages[result.ages.length - 1]).toBe(95);
    expect(result.p10).toHaveLength(result.ages.length);
    expect(result.p50).toHaveLength(result.ages.length);
    expect(result.p90).toHaveLength(result.ages.length);
  });

  it("orders the percentiles correctly", () => {
    const result = runMonteCarlo(accumulation, drawdown, preset, { iterations: 100, seed: 3 });

    for (let i = 0; i < result.ages.length; i++) {
      expect(result.p10[i]).toBeLessThanOrEqual(result.p50[i]);
      expect(result.p50[i]).toBeLessThanOrEqual(result.p90[i]);
    }
  });

  it("matches the deterministic projection at zero volatility", () => {
    const zeroVolatility = { ...preset, volatility: 0 };
    const result = runMonteCarlo(accumulation, drawdown, zeroVolatility, { iterations: 10, seed: 5 });
    const deterministic = runDeterministicProjection(accumulation, drawdown, 0.035);

    const potAtRetirementIndex = accumulation.retirementAge - accumulation.currentAge - 1;
    expect(result.p50[potAtRetirementIndex]).toBeCloseTo(deterministic.potAtRetirement, 4);
    expect(result.p10[potAtRetirementIndex]).toBeCloseTo(result.p90[potAtRetirementIndex], 4);
  });

  it("reports certain success for a generously funded plan", () => {
    const generous = { ...accumulation, currentPot: 5_000_000 };
    const result = runMonteCarlo(generous, drawdown, preset, { iterations: 100, seed: 8 });

    expect(result.successProbability).toBe(1);
  });

  it("reports a probability between zero and one for a marginal plan", () => {
    const marginal = { ...accumulation, currentPot: 0, annualSalary: 30_000 };
    const result = runMonteCarlo(marginal, { ...drawdown, targetNetIncome: 25_000 }, preset, {
      iterations: 100,
      seed: 13,
    });

    expect(result.successProbability).toBeGreaterThanOrEqual(0);
    expect(result.successProbability).toBeLessThanOrEqual(1);
  });

  it("throws for a non-positive iteration count", () => {
    expect(() => runMonteCarlo(accumulation, drawdown, preset, { iterations: 0, seed: 1 })).toThrow();
  });
});
