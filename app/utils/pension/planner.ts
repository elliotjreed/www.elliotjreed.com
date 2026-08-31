/**
 * Turns the planner form's raw string inputs into a validated projection.
 *
 * Keeping parsing, validation and model selection here means the container
 * component holds only state and rendering.
 */

import type { AllocationPreset, GrowthPreset } from "./constants";
import {
  DEFAULT_PLAN_TO_AGE,
  FCA_PRESETS,
  MONTE_CARLO_PRESETS,
  PLSA_STANDARDS,
  PRIVATE_PENSION_ACCESS_AGE,
  TM1_PRESETS,
} from "./constants";
import {
  assessFireAtAge,
  earliestViableRetirementAge,
  type FireAssessment,
  fireNumber,
  runFireMonteCarlo,
} from "./fire";
import { runMonteCarlo } from "./monteCarlo";
import type { AccumulationInputs, ContributionInput, DrawdownInputs, YearRow } from "./projection";
import {
  annualContributionWarning,
  annuityIncome,
  projectAccumulation,
  projectDrawdown,
  realReturn,
} from "./projection";
import { annualStatePension, statePensionAge } from "./statePension";

export interface ProjectionPoint {
  age: number;
  value: number;
}

/** How a contribution figure should be read: a share of salary, or pounds per year or month. */
export type ContributionKind = ContributionInput["kind"];

export interface PlannerInputs {
  currentAge: string;
  retirementAge: string;
  currentPot: string;
  annualSalary: string;
  employeeContribution: string;
  employeeContributionKind: ContributionKind;
  employerContribution: string;
  employerContributionKind: ContributionKind;
  growthModel: string;
  customGrowth: string;
  customInflation: string;
  annualFee: string;
  allocationPreset: "cautious" | "balanced" | "adventurous";
  includeStatePension: boolean;
  niQualifyingYears: string;
  decumulationMode: "drawdown" | "annuity";
  withdrawalRate: string;
  annuityRate: string;
  planToAge: string;
  targetIncomePreset: "minimum" | "moderate" | "comfortable" | "custom";
  targetIncome: string;
  fireEnabled: boolean;
  bridgePot: string;
  annualBridgeSaving: string;
}

export interface PlannerResults {
  modelLabel: string;
  potAtRetirement: number;
  netRetirementIncome: number;
  depletionAge: number | null;
  retirementAge: number;
  planToAge: number;
  statePensionAge?: number;
  chartMedian: ProjectionPoint[];
  chartBand?: { lower: ProjectionPoint[]; upper: ProjectionPoint[] };
  rows: YearRow[];
  successProbability?: number;
  annuity?: { grossAnnual: number; lumpSum: number };
  fire?: {
    assessment: FireAssessment;
    earliestAge: number | null;
    targetPot: number;
    successProbability?: number;
  };
  annualAllowanceWarning: string | null;
}

export const DEFAULT_PLANNER_INPUTS: PlannerInputs = {
  currentAge: "40",
  retirementAge: "67",
  currentPot: "50000",
  annualSalary: "35000",
  employeeContribution: "5",
  employeeContributionKind: "percent",
  employerContribution: "3",
  employerContributionKind: "percent",
  growthModel: "tm1-3",
  customGrowth: "5",
  customInflation: "2.5",
  annualFee: "0.75",
  allocationPreset: "balanced",
  includeStatePension: true,
  niQualifyingYears: "35",
  decumulationMode: "drawdown",
  withdrawalRate: "4",
  annuityRate: "6.5",
  planToAge: String(DEFAULT_PLAN_TO_AGE),
  targetIncomePreset: "moderate",
  targetIncome: "31700",
  fireEnabled: false,
  bridgePot: "0",
  annualBridgeSaving: "0",
};

/** Iterations used for the on-page simulation; enough for a stable percentile fan. */
const MONTE_CARLO_ITERATIONS = 500;

const ALL_GROWTH_PRESETS: GrowthPreset[] = [...TM1_PRESETS, ...FCA_PRESETS];

interface ParsedInputs {
  currentAge: number;
  retirementAge: number;
  planToAge: number;
  currentPot: number;
  annualSalary: number;
  employeeContribution: number;
  employerContribution: number;
  annualFee: number;
  niQualifyingYears: number;
  withdrawalRate: number;
  annuityRate: number;
  targetIncome: number;
  bridgePot: number;
  annualBridgeSaving: number;
  customGrowth: number;
  customInflation: number;
}

const targetIncomeFor = (inputs: PlannerInputs): number =>
  inputs.targetIncomePreset === "custom"
    ? Number.parseFloat(inputs.targetIncome)
    : PLSA_STANDARDS[inputs.targetIncomePreset];

function parseAndValidate(inputs: PlannerInputs): { errors: string[] } | { parsed: ParsedInputs } {
  const errors: string[] = [];

  const numeric = (value: string, label: string, { min = 0, max = Number.POSITIVE_INFINITY } = {}): number => {
    const parsed = Number.parseFloat(value);

    if (!Number.isFinite(parsed)) {
      errors.push(`${label} must be a number.`);
      return Number.NaN;
    }
    if (parsed < min || parsed > max) {
      errors.push(
        max === Number.POSITIVE_INFINITY
          ? `${label} must be at least ${min}.`
          : `${label} must be between ${min} and ${max}.`,
      );
      return Number.NaN;
    }

    return parsed;
  };

  const parsed: ParsedInputs = {
    currentAge: numeric(inputs.currentAge, "Current age", { min: 16, max: 100 }),
    retirementAge: numeric(inputs.retirementAge, "Retirement age", { min: 16, max: 100 }),
    planToAge: numeric(inputs.planToAge, "Plan-to age", { min: 16, max: 120 }),
    currentPot: numeric(inputs.currentPot, "Current pension pot"),
    annualSalary: numeric(inputs.annualSalary, "Annual salary"),
    employeeContribution: numeric(inputs.employeeContribution, "Your contribution"),
    employerContribution: numeric(inputs.employerContribution, "Employer contribution"),
    annualFee: numeric(inputs.annualFee, "Annual charges", { min: 0, max: 100 }),
    niQualifyingYears: inputs.includeStatePension
      ? numeric(inputs.niQualifyingYears, "National Insurance qualifying years", { min: 0, max: 50 })
      : 0,
    withdrawalRate:
      inputs.decumulationMode === "drawdown"
        ? numeric(inputs.withdrawalRate, "Withdrawal rate", { min: 0.1, max: 100 })
        : 0,
    annuityRate:
      inputs.decumulationMode === "annuity" ? numeric(inputs.annuityRate, "Annuity rate", { min: 0.1, max: 100 }) : 0,
    targetIncome: 0,
    bridgePot: inputs.fireEnabled ? numeric(inputs.bridgePot, "ISA and other savings") : 0,
    annualBridgeSaving: inputs.fireEnabled ? numeric(inputs.annualBridgeSaving, "Annual saving into those") : 0,
    customGrowth:
      inputs.growthModel === "custom" ? numeric(inputs.customGrowth, "Growth rate", { min: -20, max: 30 }) : 0,
    customInflation:
      inputs.growthModel === "custom" ? numeric(inputs.customInflation, "Inflation", { min: -10, max: 30 }) : 0,
  };

  const targetIncome = targetIncomeFor(inputs);
  if (!Number.isFinite(targetIncome) || targetIncome <= 0) {
    errors.push("Target income must be a positive number.");
  } else {
    parsed.targetIncome = targetIncome;
  }

  if (
    Number.isFinite(parsed.currentAge) &&
    Number.isFinite(parsed.retirementAge) &&
    parsed.retirementAge <= parsed.currentAge
  ) {
    errors.push("Retirement age must be after your current age.");
  }
  if (
    Number.isFinite(parsed.retirementAge) &&
    Number.isFinite(parsed.planToAge) &&
    parsed.planToAge <= parsed.retirementAge
  ) {
    errors.push("Plan-to age must be after your retirement age.");
  }
  if (
    Number.isFinite(parsed.retirementAge) &&
    parsed.retirementAge < PRIVATE_PENSION_ACCESS_AGE &&
    !inputs.fireEnabled
  ) {
    errors.push(
      `Private pensions cannot normally be accessed before age ${PRIVATE_PENSION_ACCESS_AGE}. Tick "Check whether I can retire early" to model the bridge years using savings held outside a pension.`,
    );
  }

  return errors.length > 0 ? { errors } : { parsed };
}

function growthModelFor(inputs: PlannerInputs, parsed: ParsedInputs): { label: string; realRate: number } {
  if (inputs.growthModel === "custom") {
    return {
      label: `Custom (${parsed.customGrowth}% growth, ${parsed.customInflation}% inflation)`,
      realRate: realReturn(parsed.customGrowth / 100, parsed.customInflation / 100),
    };
  }

  const preset = ALL_GROWTH_PRESETS.find((candidate) => candidate.id === inputs.growthModel) ?? TM1_PRESETS[2];

  return { label: preset.label, realRate: realReturn(preset.nominalGrowth, preset.inflation) };
}

const allocationFor = (inputs: PlannerInputs): AllocationPreset =>
  MONTE_CARLO_PRESETS.find((preset) => preset.id === inputs.allocationPreset) ?? MONTE_CARLO_PRESETS[1];

const toPoints = (rows: YearRow[]): ProjectionPoint[] => rows.map((row) => ({ age: row.age, value: row.potEnd }));

/**
 * Validates the form inputs and runs the selected projection models.
 *
 * @returns Either the validation errors, or the results to display.
 */
export function calculatePlan(inputs: PlannerInputs): { errors: string[] } | { results: PlannerResults } {
  const validation = parseAndValidate(inputs);

  if ("errors" in validation) {
    return validation;
  }

  const { parsed } = validation;

  const accumulation: AccumulationInputs = {
    currentAge: parsed.currentAge,
    retirementAge: parsed.retirementAge,
    currentPot: parsed.currentPot,
    annualSalary: parsed.annualSalary,
    employeeContribution: { kind: inputs.employeeContributionKind, value: parsed.employeeContribution },
    employerContribution: { kind: inputs.employerContributionKind, value: parsed.employerContribution },
    annualFee: parsed.annualFee / 100,
  };

  const pensionAge = statePensionAge(parsed.currentAge);
  const statePension = inputs.includeStatePension
    ? { annual: annualStatePension(parsed.niQualifyingYears), fromAge: pensionAge }
    : undefined;

  const drawdown: Omit<DrawdownInputs, "potAtRetirement"> = {
    retirementAge: parsed.retirementAge,
    planToAge: parsed.planToAge,
    targetNetIncome: parsed.targetIncome,
    statePension,
    annualFee: parsed.annualFee / 100,
  };

  const { label: modelLabel, realRate } = growthModelFor(inputs, parsed);
  const isMonteCarlo = inputs.growthModel === "monte-carlo";
  const allocation = allocationFor(inputs);

  const accumulationRows = projectAccumulation(accumulation, () =>
    isMonteCarlo ? allocation.meanRealReturn : realRate,
  );
  const potAtRetirement = accumulationRows[accumulationRows.length - 1].potEnd;
  const { rows: drawdownRows, depletionAge } = projectDrawdown({ ...drawdown, potAtRetirement }, () =>
    isMonteCarlo ? allocation.meanRealReturn : realRate,
  );

  const rows = [...accumulationRows, ...drawdownRows];

  let chartMedian = toPoints(rows);
  let chartBand: PlannerResults["chartBand"];
  let successProbability: number | undefined;

  if (isMonteCarlo) {
    const simulation = runMonteCarlo(accumulation, drawdown, allocation, { iterations: MONTE_CARLO_ITERATIONS });

    chartMedian = simulation.ages.map((age, index) => ({ age, value: simulation.p50[index] }));
    chartBand = {
      lower: simulation.ages.map((age, index) => ({ age, value: simulation.p10[index] })),
      upper: simulation.ages.map((age, index) => ({ age, value: simulation.p90[index] })),
    };
    successProbability = simulation.successProbability;
  }

  const results: PlannerResults = {
    modelLabel: isMonteCarlo ? `Monte Carlo simulation — ${allocation.label}` : modelLabel,
    potAtRetirement,
    netRetirementIncome: drawdownRows[0].netIncome,
    depletionAge,
    retirementAge: parsed.retirementAge,
    planToAge: parsed.planToAge,
    statePensionAge: statePension === undefined ? undefined : pensionAge,
    chartMedian,
    chartBand,
    rows,
    successProbability,
    annuity:
      inputs.decumulationMode === "annuity"
        ? annuityIncome(potAtRetirement, parsed.annuityRate / 100, true)
        : undefined,
    annualAllowanceWarning: annualContributionWarning(accumulation),
  };

  if (inputs.fireEnabled) {
    const fireInputs = {
      currentAge: parsed.currentAge,
      targetNetAnnualSpend: parsed.targetIncome,
      withdrawalRate: (parsed.withdrawalRate > 0 ? parsed.withdrawalRate : 4) / 100,
      bridgePot: parsed.bridgePot,
      annualBridgeSaving: parsed.annualBridgeSaving,
      pension: accumulation,
      statePension,
      realReturn: isMonteCarlo ? allocation.meanRealReturn : realRate,
      planToAge: parsed.planToAge,
    };

    const assessment = assessFireAtAge(parsed.retirementAge, fireInputs);

    results.fire = {
      assessment,
      earliestAge: earliestViableRetirementAge(fireInputs).age,
      targetPot: fireNumber(parsed.targetIncome, fireInputs.withdrawalRate),
      successProbability: isMonteCarlo
        ? runFireMonteCarlo(parsed.retirementAge, fireInputs, allocation, { iterations: MONTE_CARLO_ITERATIONS })
        : undefined,
    };

    // Retiring before the pension access age means the bridge pot funds the early
    // years, so the FIRE trajectory is the accurate one to headline.
    if (parsed.retirementAge < PRIVATE_PENSION_ACCESS_AGE) {
      const fireRows = [...assessment.accumulationRows, ...assessment.rows];

      results.rows = fireRows;
      results.depletionAge = assessment.pensionShortfallAge;
      results.potAtRetirement = assessment.accumulationRows[assessment.accumulationRows.length - 1].potEnd;
      results.netRetirementIncome = assessment.rows[0].netIncome;

      if (!isMonteCarlo) {
        results.chartMedian = toPoints(fireRows);
      }
    }
  }

  return { results };
}
