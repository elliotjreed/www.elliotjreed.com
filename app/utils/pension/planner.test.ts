import { describe, expect, it } from "vitest";
import { DEFAULT_PLANNER_INPUTS, calculatePlan } from "./planner";

const resultsOf = (inputs = DEFAULT_PLANNER_INPUTS) => {
  const outcome = calculatePlan(inputs);

  if ("errors" in outcome) {
    throw new Error(`Expected results but got errors: ${outcome.errors.join(", ")}`);
  }

  return outcome.results;
};

describe("calculatePlan validation", () => {
  it("accepts the default inputs", () => {
    expect(calculatePlan(DEFAULT_PLANNER_INPUTS)).not.toHaveProperty("errors");
  });

  it("rejects a retirement age at or before the current age", () => {
    const outcome = calculatePlan({ ...DEFAULT_PLANNER_INPUTS, currentAge: "50", retirementAge: "50" });

    expect(outcome).toHaveProperty("errors");
    expect((outcome as { errors: string[] }).errors[0]).toMatch(/retirement age/i);
  });

  it("rejects a plan-to age before the retirement age", () => {
    const outcome = calculatePlan({ ...DEFAULT_PLANNER_INPUTS, retirementAge: "67", planToAge: "60" });

    expect(outcome).toHaveProperty("errors");
    expect((outcome as { errors: string[] }).errors[0]).toMatch(/plan/i);
  });

  it("rejects ages outside a sensible range", () => {
    expect(calculatePlan({ ...DEFAULT_PLANNER_INPUTS, currentAge: "10" })).toHaveProperty("errors");
    expect(calculatePlan({ ...DEFAULT_PLANNER_INPUTS, currentAge: "105" })).toHaveProperty("errors");
  });

  it("rejects non-numeric and negative amounts", () => {
    expect(calculatePlan({ ...DEFAULT_PLANNER_INPUTS, currentPot: "abc" })).toHaveProperty("errors");
    expect(calculatePlan({ ...DEFAULT_PLANNER_INPUTS, currentPot: "-100" })).toHaveProperty("errors");
  });

  it("rejects retiring before the private pension access age without early retirement planning", () => {
    const outcome = calculatePlan({ ...DEFAULT_PLANNER_INPUTS, currentAge: "40", retirementAge: "50" });

    expect(outcome).toHaveProperty("errors");
    expect((outcome as { errors: string[] }).errors[0]).toMatch(/57|early retirement/i);
  });

  it("allows retiring before the access age when early retirement planning is enabled", () => {
    const outcome = calculatePlan({
      ...DEFAULT_PLANNER_INPUTS,
      currentAge: "40",
      retirementAge: "50",
      fireEnabled: true,
      bridgePot: "300000",
    });

    expect(outcome).not.toHaveProperty("errors");
  });

  it("rejects a custom target income that is not a positive number", () => {
    const outcome = calculatePlan({
      ...DEFAULT_PLANNER_INPUTS,
      targetIncomePreset: "custom",
      targetIncome: "0",
    });

    expect(outcome).toHaveProperty("errors");
  });
});

describe("calculatePlan deterministic models", () => {
  it("projects a pot and income using the selected AS TM1 preset", () => {
    const results = resultsOf();

    expect(results.potAtRetirement).toBeGreaterThan(0);
    expect(results.netRetirementIncome).toBeGreaterThan(0);
    expect(results.modelLabel).toMatch(/AS TM1/);
  });

  it("produces a higher pot under a higher growth preset", () => {
    const low = resultsOf({ ...DEFAULT_PLANNER_INPUTS, growthModel: "tm1-1" });
    const high = resultsOf({ ...DEFAULT_PLANNER_INPUTS, growthModel: "tm1-4" });

    expect(high.potAtRetirement).toBeGreaterThan(low.potAtRetirement);
  });

  it("uses the custom growth and inflation rates when custom is selected", () => {
    const results = resultsOf({
      ...DEFAULT_PLANNER_INPUTS,
      growthModel: "custom",
      customGrowth: "6",
      customInflation: "2",
    });

    expect(results.modelLabel).toMatch(/custom/i);
    expect(results.potAtRetirement).toBeGreaterThan(0);
  });

  it("charts every year from the current age to the plan-to age", () => {
    const results = resultsOf();

    expect(results.chartMedian[0].age).toBe(Number(DEFAULT_PLANNER_INPUTS.currentAge));
    expect(results.chartMedian[results.chartMedian.length - 1].age).toBe(Number(DEFAULT_PLANNER_INPUTS.planToAge));
    expect(results.chartBand).toBeUndefined();
  });

  it("includes the state pension when enabled and excludes it when not", () => {
    const withStatePension = resultsOf({ ...DEFAULT_PLANNER_INPUTS, includeStatePension: true });
    const withoutStatePension = resultsOf({ ...DEFAULT_PLANNER_INPUTS, includeStatePension: false });

    expect(withStatePension.statePensionAge).toBeDefined();
    expect(withoutStatePension.statePensionAge).toBeUndefined();
    expect(withStatePension.rows.some((row) => row.statePension > 0)).toBe(true);
    expect(withoutStatePension.rows.every((row) => row.statePension === 0)).toBe(true);
  });

  it("reduces the state pension for an incomplete National Insurance record", () => {
    const full = resultsOf({ ...DEFAULT_PLANNER_INPUTS, niQualifyingYears: "35" });
    const partial = resultsOf({ ...DEFAULT_PLANNER_INPUTS, niQualifyingYears: "20" });

    const fullPension = full.rows.find((row) => row.statePension > 0)!.statePension;
    const partialPension = partial.rows.find((row) => row.statePension > 0)!.statePension;

    expect(partialPension).toBeLessThan(fullPension);
  });

  it("reports the annuity income when the annuity option is selected", () => {
    const results = resultsOf({ ...DEFAULT_PLANNER_INPUTS, decumulationMode: "annuity" });

    expect(results.annuity).toBeDefined();
    expect(results.annuity!.grossAnnual).toBeGreaterThan(0);
    expect(results.annuity!.lumpSum).toBeGreaterThan(0);
  });

  it("omits annuity figures in drawdown mode", () => {
    expect(resultsOf().annuity).toBeUndefined();
  });

  it("treats monthly contributions as twelve times the annual equivalent", () => {
    const monthly = resultsOf({
      ...DEFAULT_PLANNER_INPUTS,
      employeeContributionKind: "monthlyAmount",
      employeeContribution: "250",
      employerContributionKind: "monthlyAmount",
      employerContribution: "150",
    });
    const annual = resultsOf({
      ...DEFAULT_PLANNER_INPUTS,
      employeeContributionKind: "annualAmount",
      employeeContribution: "3000",
      employerContributionKind: "annualAmount",
      employerContribution: "1800",
    });

    expect(monthly.potAtRetirement).toBeCloseTo(annual.potAtRetirement, 4);
  });

  it("builds a bigger pot from a larger monthly contribution", () => {
    const smaller = resultsOf({
      ...DEFAULT_PLANNER_INPUTS,
      employeeContributionKind: "monthlyAmount",
      employeeContribution: "100",
    });
    const larger = resultsOf({
      ...DEFAULT_PLANNER_INPUTS,
      employeeContributionKind: "monthlyAmount",
      employeeContribution: "500",
    });

    expect(larger.potAtRetirement).toBeGreaterThan(smaller.potAtRetirement);
  });

  it("passes through the annual allowance warning", () => {
    const results = resultsOf({
      ...DEFAULT_PLANNER_INPUTS,
      annualSalary: "200000",
      employeeContribution: "25",
      employerContribution: "15",
    });

    expect(results.annualAllowanceWarning).toMatch(/annual allowance/i);
  });
});

describe("calculatePlan Monte Carlo model", () => {
  it("produces a percentile band and a success probability", () => {
    const results = resultsOf({ ...DEFAULT_PLANNER_INPUTS, growthModel: "monte-carlo" });

    expect(results.chartBand).toBeDefined();
    expect(results.chartBand!.lower).toHaveLength(results.chartMedian.length);
    expect(results.successProbability).toBeGreaterThanOrEqual(0);
    expect(results.successProbability).toBeLessThanOrEqual(1);
  });

  it("is deterministic across repeated runs", () => {
    const first = resultsOf({ ...DEFAULT_PLANNER_INPUTS, growthModel: "monte-carlo" });
    const second = resultsOf({ ...DEFAULT_PLANNER_INPUTS, growthModel: "monte-carlo" });

    expect(first.successProbability).toBe(second.successProbability);
    expect(first.chartMedian).toEqual(second.chartMedian);
  });
});

describe("calculatePlan FIRE assessment", () => {
  it("omits the FIRE section when early retirement is not enabled", () => {
    expect(resultsOf().fire).toBeUndefined();
  });

  it("assesses early retirement viability when enabled", () => {
    const results = resultsOf({
      ...DEFAULT_PLANNER_INPUTS,
      fireEnabled: true,
      retirementAge: "55",
      bridgePot: "200000",
      annualBridgeSaving: "15000",
    });

    expect(results.fire).toBeDefined();
    expect(results.fire!.targetPot).toBeGreaterThan(0);
    expect(results.fire!.assessment.rows.length).toBeGreaterThan(0);
  });

  it("flags a bridge shortfall for an unrealistically early retirement", () => {
    const results = resultsOf({
      ...DEFAULT_PLANNER_INPUTS,
      fireEnabled: true,
      currentAge: "40",
      retirementAge: "45",
      currentPot: "20000",
      bridgePot: "0",
      annualBridgeSaving: "0",
    });

    expect(results.fire!.assessment.viable).toBe(false);
    expect(results.fire!.assessment.bridgeShortfall).toBeGreaterThan(0);
  });

  it("keeps the headline results consistent with the FIRE assessment when retiring early", () => {
    const results = resultsOf({
      ...DEFAULT_PLANNER_INPUTS,
      currentAge: "40",
      retirementAge: "50",
      fireEnabled: true,
      currentPot: "300000",
      bridgePot: "300000",
      annualBridgeSaving: "15000",
    });

    // The headline depletion age must not contradict the FIRE verdict
    expect(results.depletionAge).toBe(results.fire!.assessment.pensionShortfallAge);
    // Total wealth at retirement is the bridge pot plus the pension, not a double count
    const atRetirement = results.fire!.assessment.accumulationRows.at(-1)!;
    expect(results.potAtRetirement).toBeCloseTo(atRetirement.bridgePot + atRetirement.pensionPot, 4);
    // The trajectory covers the bridge years rather than drawing a pension before 57
    expect(results.rows.some((row) => row.age === 55)).toBe(true);
    expect(results.chartMedian[results.chartMedian.length - 1].age).toBe(Number(DEFAULT_PLANNER_INPUTS.planToAge));
  });

  it("does not draw down the pension before the access age when retiring early", () => {
    const results = resultsOf({
      ...DEFAULT_PLANNER_INPUTS,
      currentAge: "40",
      retirementAge: "50",
      fireEnabled: true,
      currentPot: "300000",
      bridgePot: "400000",
      annualBridgeSaving: "15000",
    });

    const bridgeYears = results.fire!.assessment.rows.filter((row) => row.age >= 50 && row.age < 57);

    // The pension keeps growing untouched through the bridge years
    for (let i = 1; i < bridgeYears.length; i++) {
      expect(bridgeYears[i].pensionPot).toBeGreaterThan(bridgeYears[i - 1].pensionPot);
    }
  });

  it("includes a simulated success probability under the Monte Carlo model", () => {
    const results = resultsOf({
      ...DEFAULT_PLANNER_INPUTS,
      growthModel: "monte-carlo",
      fireEnabled: true,
      retirementAge: "58",
      bridgePot: "100000",
    });

    expect(results.fire!.successProbability).toBeGreaterThanOrEqual(0);
    expect(results.fire!.successProbability).toBeLessThanOrEqual(1);
  });
});
