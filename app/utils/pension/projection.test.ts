import { describe, expect, it } from "vitest";
import { LUMP_SUM_ALLOWANCE } from "./constants";
import {
  type AccumulationInputs,
  type DrawdownInputs,
  annualContributionWarning,
  annuityIncome,
  projectAccumulation,
  projectDrawdown,
  realReturn,
  runDeterministicProjection,
  sustainableGrossWithdrawal,
} from "./projection";

const baseAccumulation: AccumulationInputs = {
  currentAge: 40,
  retirementAge: 65,
  currentPot: 50_000,
  annualSalary: 40_000,
  employeeContribution: { kind: "percent", value: 5 },
  employerContribution: { kind: "percent", value: 3 },
  annualFee: 0,
};

const baseDrawdown: DrawdownInputs = {
  potAtRetirement: 500_000,
  retirementAge: 65,
  planToAge: 95,
  targetNetIncome: 20_000,
  annualFee: 0,
};

const zeroReturn = (): number => 0;

describe("realReturn", () => {
  it("converts nominal to real geometrically", () => {
    expect(realReturn(0.05, 0.025)).toBeCloseTo(0.02439, 5);
  });

  it("returns zero when nominal growth equals inflation", () => {
    expect(realReturn(0.025, 0.025)).toBeCloseTo(0, 10);
  });
});

describe("projectAccumulation", () => {
  it("produces one row per year from current age to the year before retirement", () => {
    const rows = projectAccumulation(baseAccumulation, zeroReturn);

    expect(rows).toHaveLength(25);
    expect(rows[0].age).toBe(40);
    expect(rows[24].age).toBe(64);
  });

  it("sums pot and contributions exactly with zero growth and zero fees", () => {
    const rows = projectAccumulation(baseAccumulation, zeroReturn);
    const annualContribution = 40_000 * 0.08;

    expect(rows[24].potEnd).toBeCloseTo(50_000 + annualContribution * 25, 6);
  });

  it("reconciles every row: potEnd equals potStart plus contributions plus growth", () => {
    const rows = projectAccumulation(baseAccumulation, () => 0.03);

    for (const row of rows) {
      expect(row.potEnd).toBeCloseTo(row.potStart + row.contributions + row.growth, 6);
    }
  });

  it("treats equivalent percentage and fixed-amount contributions identically", () => {
    const withPercent = projectAccumulation(baseAccumulation, () => 0.02);
    const withAmounts = projectAccumulation(
      {
        ...baseAccumulation,
        employeeContribution: { kind: "annualAmount", value: 2_000 },
        employerContribution: { kind: "annualAmount", value: 1_200 },
      },
      () => 0.02,
    );

    expect(withAmounts[24].potEnd).toBeCloseTo(withPercent[24].potEnd, 6);
  });

  it("treats a monthly amount as twelve times the annual contribution", () => {
    const monthly = projectAccumulation(
      {
        ...baseAccumulation,
        employeeContribution: { kind: "monthlyAmount", value: 200 },
        employerContribution: { kind: "monthlyAmount", value: 100 },
      },
      () => 0.02,
    );
    const annual = projectAccumulation(
      {
        ...baseAccumulation,
        employeeContribution: { kind: "annualAmount", value: 2_400 },
        employerContribution: { kind: "annualAmount", value: 1_200 },
      },
      () => 0.02,
    );

    expect(monthly[0].contributions).toBeCloseTo(3_600, 6);
    expect(monthly[24].potEnd).toBeCloseTo(annual[24].potEnd, 6);
  });

  it("reduces the terminal pot when an annual fee applies", () => {
    const withoutFee = projectAccumulation(baseAccumulation, () => 0.05);
    const withFee = projectAccumulation({ ...baseAccumulation, annualFee: 0.0075 }, () => 0.05);

    expect(withFee[24].potEnd).toBeLessThan(withoutFee[24].potEnd);
  });

  it("throws when retirement age is not after current age", () => {
    expect(() => projectAccumulation({ ...baseAccumulation, retirementAge: 40 }, zeroReturn)).toThrow();
  });
});

describe("projectDrawdown", () => {
  it("produces one row per year from retirement age to the plan-to age inclusive", () => {
    const { rows } = projectDrawdown(baseDrawdown, zeroReturn);

    expect(rows).toHaveLength(31);
    expect(rows[0].age).toBe(65);
    expect(rows[30].age).toBe(95);
  });

  it("meets the target net income each year while the pot lasts", () => {
    const { rows, depletionAge } = projectDrawdown(baseDrawdown, () => 0.03);

    expect(depletionAge).toBeNull();
    for (const row of rows) {
      expect(row.netIncome).toBeCloseTo(20_000, 1);
    }
  });

  it("flags depletion when the pot cannot sustain the target income", () => {
    const { rows, depletionAge } = projectDrawdown({ ...baseDrawdown, potAtRetirement: 50_000 }, zeroReturn);

    expect(depletionAge).not.toBeNull();
    expect(depletionAge).toBeLessThan(70);
    // Rows continue to the plan-to age even after depletion
    expect(rows[rows.length - 1].age).toBe(95);
    // After depletion with no state pension there is no income
    expect(rows[rows.length - 1].netIncome).toBe(0);
    // The pot never goes negative
    for (const row of rows) {
      expect(row.potEnd).toBeGreaterThanOrEqual(0);
    }
  });

  it("reduces pension withdrawals once the state pension starts", () => {
    const { rows } = projectDrawdown({ ...baseDrawdown, statePension: { annual: 12_547.6, fromAge: 67 } }, () => 0.02);

    const beforeStatePension = rows.find((row) => row.age === 66);
    const afterStatePension = rows.find((row) => row.age === 68);

    expect(afterStatePension!.statePension).toBeCloseTo(12_547.6, 2);
    expect(beforeStatePension!.statePension).toBe(0);
    expect(afterStatePension!.grossWithdrawal).toBeLessThan(beforeStatePension!.grossWithdrawal);
    expect(afterStatePension!.netIncome).toBeCloseTo(20_000, 1);
  });

  it("caps cumulative tax-free cash at the Lump Sum Allowance", () => {
    const { rows, taxFreeCashUsed, depletionAge } = projectDrawdown(
      { ...baseDrawdown, potAtRetirement: 4_000_000, targetNetIncome: 100_000 },
      () => 0.02,
    );

    expect(depletionAge).toBeNull();
    expect(taxFreeCashUsed).toBeLessThanOrEqual(LUMP_SUM_ALLOWANCE + 0.01);
    expect(taxFreeCashUsed).toBeGreaterThan(LUMP_SUM_ALLOWANCE - 1);
    // Once tax-free cash runs out, the same net income needs more tax
    expect(rows[rows.length - 1].taxPaid).toBeGreaterThan(rows[0].taxPaid);
  });

  it("pays no tax on withdrawals when the pot is tax-exempt", () => {
    const { rows } = projectDrawdown({ ...baseDrawdown, taxExempt: true }, zeroReturn);

    for (const row of rows) {
      expect(row.taxPaid).toBe(0);
    }
    expect(rows[0].grossWithdrawal).toBeCloseTo(20_000, 2);
  });

  it("throws when the plan-to age is before retirement age", () => {
    expect(() => projectDrawdown({ ...baseDrawdown, planToAge: 60 }, zeroReturn)).toThrow();
  });
});

describe("annuityIncome", () => {
  it("applies the annuity rate to the whole pot without a lump sum", () => {
    expect(annuityIncome(100_000, 0.065, false)).toEqual({ grossAnnual: 6_500, lumpSum: 0 });
  });

  it("takes 25% tax-free cash before buying the annuity", () => {
    expect(annuityIncome(100_000, 0.065, true)).toEqual({ grossAnnual: 4_875, lumpSum: 25_000 });
  });

  it("caps the lump sum at the Lump Sum Allowance", () => {
    const { lumpSum } = annuityIncome(2_000_000, 0.065, true);

    expect(lumpSum).toBe(LUMP_SUM_ALLOWANCE);
  });
});

describe("sustainableGrossWithdrawal", () => {
  it("applies the withdrawal rate to the pot", () => {
    expect(sustainableGrossWithdrawal(500_000, 0.04)).toBe(20_000);
  });
});

describe("annualContributionWarning", () => {
  it("warns when combined monthly contributions exceed the annual allowance", () => {
    const warning = annualContributionWarning({
      ...baseAccumulation,
      employeeContribution: { kind: "monthlyAmount", value: 4_000 },
      employerContribution: { kind: "monthlyAmount", value: 2_000 },
    });

    expect(warning).toContain("annual allowance");
  });

  it("warns when combined contributions exceed the annual allowance", () => {
    const warning = annualContributionWarning({
      ...baseAccumulation,
      annualSalary: 200_000,
      employeeContribution: { kind: "percent", value: 20 },
      employerContribution: { kind: "percent", value: 15 },
    });

    expect(warning).toContain("annual allowance");
  });

  it("returns null when contributions are within the annual allowance", () => {
    expect(annualContributionWarning(baseAccumulation)).toBeNull();
  });
});

describe("runDeterministicProjection", () => {
  it("feeds the accumulated pot into the drawdown phase", () => {
    const result = runDeterministicProjection(
      baseAccumulation,
      { retirementAge: 65, planToAge: 95, targetNetIncome: 6_000, annualFee: 0 },
      0.02,
    );

    expect(result.potAtRetirement).toBeCloseTo(result.accumulation[24].potEnd, 6);
    expect(result.drawdown[0].potStart).toBeCloseTo(result.potAtRetirement, 6);
    expect(result.netRetirementIncome).toBeCloseTo(6_000, 1);
    expect(result.depletionAge).toBeNull();
  });
});
