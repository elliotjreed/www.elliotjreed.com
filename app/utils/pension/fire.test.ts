import { describe, expect, it } from "vitest";
import { assessFireAtAge, earliestViableRetirementAge, type FireInputs, fireNumber, runFireMonteCarlo } from "./fire";

const baseInputs: FireInputs = {
  currentAge: 40,
  targetNetAnnualSpend: 25_000,
  withdrawalRate: 0.04,
  bridgePot: 100_000,
  annualBridgeSaving: 10_000,
  pension: {
    currentAge: 40,
    retirementAge: 57,
    currentPot: 150_000,
    annualSalary: 60_000,
    employeeContribution: { kind: "percent", value: 10 },
    employerContribution: { kind: "percent", value: 5 },
    annualFee: 0,
  },
  statePension: { annual: 12_547.6, fromAge: 68 },
  realReturn: 0.035,
  planToAge: 95,
};

describe("fireNumber", () => {
  it("returns 25 times annual spending at a 4% withdrawal rate", () => {
    expect(fireNumber(20_000, 0.04)).toBe(500_000);
  });

  it("returns a larger number at a more conservative withdrawal rate", () => {
    expect(fireNumber(20_000, 0.035)).toBeCloseTo(571_428.57, 2);
  });

  it("throws for a non-positive withdrawal rate", () => {
    expect(() => fireNumber(20_000, 0)).toThrow();
    expect(() => fireNumber(20_000, -0.01)).toThrow();
  });
});

describe("assessFireAtAge", () => {
  it("covers every year from the retirement age to the plan-to age", () => {
    const assessment = assessFireAtAge(50, baseInputs);

    expect(assessment.rows[0].age).toBe(50);
    expect(assessment.rows[assessment.rows.length - 1].age).toBe(95);
    for (let i = 1; i < assessment.rows.length; i++) {
      expect(assessment.rows[i].age).toBe(assessment.rows[i - 1].age + 1);
    }
  });

  it("reports total wealth as the sum of the bridge and pension pots", () => {
    const assessment = assessFireAtAge(50, baseInputs);

    for (const row of assessment.rows) {
      expect(row.potEnd).toBeCloseTo(row.bridgePot + row.pensionPot, 6);
    }
  });

  it("leaves the pension untouched until the private pension access age", () => {
    const assessment = assessFireAtAge(45, { ...baseInputs, bridgePot: 10_000, annualBridgeSaving: 0 });

    const beforeAccess = assessment.rows.filter((row) => row.age < 57);

    // The bridge pot runs dry, but the pension keeps growing rather than being raided
    for (let i = 1; i < beforeAccess.length; i++) {
      expect(beforeAccess[i].pensionPot).toBeGreaterThan(beforeAccess[i - 1].pensionPot);
    }
  });

  it("flags a bridge shortfall when the bridge pot cannot cover the years before access age", () => {
    const assessment = assessFireAtAge(45, { ...baseInputs, bridgePot: 10_000, annualBridgeSaving: 0 });

    expect(assessment.viable).toBe(false);
    expect(assessment.bridgeShortfall).toBeGreaterThan(0);
  });

  it("has no bridge shortfall when retiring at or after the access age", () => {
    const assessment = assessFireAtAge(60, baseInputs);

    expect(assessment.bridgeShortfall).toBe(0);
  });

  it("reports a viable plan when both pots comfortably cover the spending", () => {
    const assessment = assessFireAtAge(55, {
      ...baseInputs,
      bridgePot: 500_000,
      pension: { ...baseInputs.pension, currentPot: 900_000 },
    });

    expect(assessment.viable).toBe(true);
    expect(assessment.bridgeShortfall).toBe(0);
    expect(assessment.pensionShortfallAge).toBeNull();
  });

  it("reports a pension shortfall age when the pension runs out before the plan-to age", () => {
    const assessment = assessFireAtAge(57, {
      ...baseInputs,
      bridgePot: 0,
      annualBridgeSaving: 0,
      pension: { ...baseInputs.pension, currentPot: 10_000 },
      statePension: undefined,
    });

    expect(assessment.pensionShortfallAge).not.toBeNull();
    expect(assessment.viable).toBe(false);
  });

  it("throws when the retirement age is not after the current age", () => {
    expect(() => assessFireAtAge(40, baseInputs)).toThrow();
  });
});

describe("earliestViableRetirementAge", () => {
  it("finds the first age at which retirement is viable", () => {
    const { age, assessment } = earliestViableRetirementAge(baseInputs);

    expect(age).not.toBeNull();
    expect(assessment!.viable).toBe(true);
    // The age immediately before must not be viable
    expect(assessFireAtAge(age! - 1, baseInputs).viable).toBe(false);
  });

  it("returns null when retirement is never viable", () => {
    const { age, assessment } = earliestViableRetirementAge({
      ...baseInputs,
      targetNetAnnualSpend: 60_000,
      bridgePot: 0,
      annualBridgeSaving: 0,
      statePension: undefined,
      pension: {
        ...baseInputs.pension,
        currentPot: 1_000,
        employeeContribution: { kind: "annualAmount", value: 0 },
        employerContribution: { kind: "annualAmount", value: 0 },
      },
    });

    expect(age).toBeNull();
    expect(assessment).toBeNull();
  });
});

describe("runFireMonteCarlo", () => {
  const preset = { id: "balanced" as const, label: "Balanced", meanRealReturn: 0.035, volatility: 0.11 };

  it("is deterministic for the same seed", () => {
    const first = runFireMonteCarlo(55, baseInputs, preset, { iterations: 30, seed: 42 });
    const second = runFireMonteCarlo(55, baseInputs, preset, { iterations: 30, seed: 42 });

    expect(first).toBe(second);
  });

  it("returns a probability between zero and one", () => {
    const probability = runFireMonteCarlo(55, baseInputs, preset, { iterations: 50, seed: 3 });

    expect(probability).toBeGreaterThanOrEqual(0);
    expect(probability).toBeLessThanOrEqual(1);
  });

  it("reports certain success for a generously funded early retirement", () => {
    const probability = runFireMonteCarlo(
      55,
      { ...baseInputs, bridgePot: 2_000_000, pension: { ...baseInputs.pension, currentPot: 5_000_000 } },
      preset,
      { iterations: 50, seed: 8 },
    );

    expect(probability).toBe(1);
  });
});
