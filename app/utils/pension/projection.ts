/**
 * Pension projection engine.
 *
 * All monetary values are annual and in today's money (real terms); nominal growth
 * rates are converted once via realReturn. Both the deterministic and Monte Carlo
 * models drive the same two year-loops below, parameterised by a returnForYear
 * callback supplying each year's real investment return.
 */

import { ANNUAL_ALLOWANCE, LUMP_SUM_ALLOWANCE, TAX_FREE_FRACTION } from "./constants";
import { grossPensionWithdrawalForNet, incomeTaxDue, netFromPensionWithdrawal } from "./tax";

export interface ContributionInput {
  kind: "percent" | "annualAmount" | "monthlyAmount";
  /** Percentage of salary (e.g. 5 for 5%), or a fixed amount in pounds per year or per month. */
  value: number;
}

export interface AccumulationInputs {
  currentAge: number;
  retirementAge: number;
  currentPot: number;
  annualSalary: number;
  employeeContribution: ContributionInput;
  employerContribution: ContributionInput;
  /** Annual charge as a fraction, e.g. 0.0075 for 0.75%. */
  annualFee: number;
}

export interface StatePensionInput {
  annual: number;
  fromAge: number;
}

export interface DrawdownInputs {
  potAtRetirement: number;
  retirementAge: number;
  /** Final age modelled, inclusive. */
  planToAge: number;
  /** Net (after tax) annual income the withdrawals should provide, in today's money. */
  targetNetIncome: number;
  statePension?: StatePensionInput;
  annualFee: number;
  /** Withdrawals from a tax-exempt pot (e.g. an ISA) incur no income tax. */
  taxExempt?: boolean;
}

export interface YearRow {
  age: number;
  potStart: number;
  contributions: number;
  growth: number;
  grossWithdrawal: number;
  taxPaid: number;
  statePension: number;
  netIncome: number;
  potEnd: number;
}

export interface DrawdownResult {
  rows: YearRow[];
  /** First age at which the pot could not fund the target income, or null if it always could. */
  depletionAge: number | null;
  /** Cumulative tax-free cash taken, capped at the Lump Sum Allowance. */
  taxFreeCashUsed: number;
}

export interface DeterministicResult {
  accumulation: YearRow[];
  drawdown: YearRow[];
  potAtRetirement: number;
  /** Net income achieved in the first year of retirement. */
  netRetirementIncome: number;
  depletionAge: number | null;
}

function assertFinite(value: number, name: string): void {
  if (!Number.isFinite(value)) {
    throw new Error(`${name} must be a finite number`);
  }
}

function assertNonNegativeFinite(value: number, name: string): void {
  assertFinite(value, name);
  if (value < 0) {
    throw new Error(`${name} cannot be negative`);
  }
}

function roundToPrecision(value: number, decimalPlaces: number): number {
  const multiplier = 10 ** decimalPlaces;
  return Math.round(value * multiplier) / multiplier;
}

/**
 * Real (after inflation) return from a nominal return, compounded geometrically.
 *
 * @example
 * realReturn(0.05, 0.025) // returns 0.02439...
 */
export function realReturn(nominal: number, inflation: number): number {
  assertFinite(nominal, "Nominal return");
  assertFinite(inflation, "Inflation");

  return (1 + nominal) / (1 + inflation) - 1;
}

const MONTHS_PER_YEAR = 12;

function annualContribution(salary: number, contribution: ContributionInput): number {
  assertNonNegativeFinite(contribution.value, "Contribution value");

  switch (contribution.kind) {
    case "percent":
      return (salary * contribution.value) / 100;
    case "monthlyAmount":
      return contribution.value * MONTHS_PER_YEAR;
    default:
      return contribution.value;
  }
}

/** Return net of the annual fee: growth is applied, then the charge is deducted. */
function returnAfterFee(grossReturn: number, annualFee: number): number {
  return (1 + grossReturn) * (1 - annualFee) - 1;
}

/**
 * Projects pension pot growth year by year from the current age to the year before
 * retirement. Contributions are added at the start of each year and growth (net of
 * fees) applies to the whole balance.
 */
export function projectAccumulation(
  inputs: AccumulationInputs,
  returnForYear: (yearIndex: number) => number,
): YearRow[] {
  assertNonNegativeFinite(inputs.currentPot, "Current pot");
  assertNonNegativeFinite(inputs.annualSalary, "Annual salary");
  assertNonNegativeFinite(inputs.annualFee, "Annual fee");
  assertFinite(inputs.currentAge, "Current age");
  assertFinite(inputs.retirementAge, "Retirement age");
  if (inputs.retirementAge <= inputs.currentAge) {
    throw new Error("Retirement age must be after current age");
  }

  const contributions =
    annualContribution(inputs.annualSalary, inputs.employeeContribution) +
    annualContribution(inputs.annualSalary, inputs.employerContribution);

  const rows: YearRow[] = [];
  let pot = inputs.currentPot;

  for (let yearIndex = 0; yearIndex < inputs.retirementAge - inputs.currentAge; yearIndex++) {
    const potStart = pot;
    const growth = (potStart + contributions) * returnAfterFee(returnForYear(yearIndex), inputs.annualFee);
    const potEnd = Math.max(0, potStart + contributions + growth);

    rows.push({
      age: inputs.currentAge + yearIndex,
      potStart,
      contributions,
      growth,
      grossWithdrawal: 0,
      taxPaid: 0,
      statePension: 0,
      netIncome: 0,
      potEnd,
    });

    pot = potEnd;
  }

  return rows;
}

interface WithdrawalPlan {
  grossWithdrawal: number;
  taxFreeCash: number;
  taxPaid: number;
  netFromWithdrawal: number;
}

/**
 * Solves the gross withdrawal needed for a target net amount, honouring the
 * remaining Lump Sum Allowance. When the required tax-free cash would exceed the
 * remaining allowance, the tax-free fraction is reduced and the withdrawal re-solved.
 */
function planWithdrawal(
  requiredNet: number,
  lsaRemaining: number,
  otherTaxableIncome: number,
  taxExempt: boolean,
): WithdrawalPlan {
  if (requiredNet <= 0) {
    return { grossWithdrawal: 0, taxFreeCash: 0, taxPaid: 0, netFromWithdrawal: 0 };
  }

  if (taxExempt) {
    return { grossWithdrawal: requiredNet, taxFreeCash: 0, taxPaid: 0, netFromWithdrawal: requiredNet };
  }

  let fraction = lsaRemaining > 0 ? TAX_FREE_FRACTION : 0;
  let gross = grossPensionWithdrawalForNet(requiredNet, fraction, otherTaxableIncome);

  if (gross * fraction > lsaRemaining) {
    fraction = lsaRemaining / gross;
    gross = grossPensionWithdrawalForNet(requiredNet, fraction, otherTaxableIncome);
  }

  const taxFreeCash = Math.min(gross * fraction, lsaRemaining);
  const netFromWithdrawal = netFromPensionWithdrawal(gross, fraction, otherTaxableIncome);

  return { grossWithdrawal: gross, taxFreeCash, taxPaid: gross - netFromWithdrawal, netFromWithdrawal };
}

/** Net received when withdrawing a whole remaining pot (used in the depletion year). */
function partialWithdrawal(
  potStart: number,
  lsaRemaining: number,
  otherTaxableIncome: number,
  taxExempt: boolean,
): WithdrawalPlan {
  if (taxExempt) {
    return { grossWithdrawal: potStart, taxFreeCash: 0, taxPaid: 0, netFromWithdrawal: potStart };
  }

  const fraction = potStart > 0 ? Math.min(TAX_FREE_FRACTION, lsaRemaining / potStart) : 0;
  const netFromWithdrawal = netFromPensionWithdrawal(potStart, fraction, otherTaxableIncome);

  return {
    grossWithdrawal: potStart,
    taxFreeCash: Math.min(potStart * fraction, lsaRemaining),
    taxPaid: potStart - netFromWithdrawal,
    netFromWithdrawal,
  };
}

/**
 * Projects drawdown year by year from retirement age to the plan-to age (inclusive).
 * Each year the state pension (if payable) is received first and a gross withdrawal is
 * solved to top net income up to the target. Withdrawals happen at the start of the
 * year; growth (net of fees) applies to the remaining balance.
 */
export function projectDrawdown(inputs: DrawdownInputs, returnForYear: (yearIndex: number) => number): DrawdownResult {
  assertNonNegativeFinite(inputs.potAtRetirement, "Pot at retirement");
  assertNonNegativeFinite(inputs.targetNetIncome, "Target net income");
  assertNonNegativeFinite(inputs.annualFee, "Annual fee");
  if (inputs.planToAge < inputs.retirementAge) {
    throw new Error("Plan-to age must not be before retirement age");
  }

  const rows: YearRow[] = [];
  let pot = inputs.potAtRetirement;
  let lsaRemaining = LUMP_SUM_ALLOWANCE;
  let depletionAge: number | null = null;

  for (let yearIndex = 0; yearIndex <= inputs.planToAge - inputs.retirementAge; yearIndex++) {
    const age = inputs.retirementAge + yearIndex;
    const potStart = pot;

    const statePension =
      inputs.statePension !== undefined && age >= inputs.statePension.fromAge ? inputs.statePension.annual : 0;
    const taxOnStatePension = incomeTaxDue(statePension);
    const netStatePension = statePension - taxOnStatePension;
    const requiredNet = Math.max(0, inputs.targetNetIncome - netStatePension);

    let plan = planWithdrawal(requiredNet, lsaRemaining, statePension, inputs.taxExempt === true);

    if (plan.grossWithdrawal > potStart) {
      plan = partialWithdrawal(potStart, lsaRemaining, statePension, inputs.taxExempt === true);
      if (depletionAge === null) {
        depletionAge = age;
      }
    }

    lsaRemaining -= plan.taxFreeCash;

    const remaining = potStart - plan.grossWithdrawal;
    const growth = remaining * returnAfterFee(returnForYear(yearIndex), inputs.annualFee);
    const potEnd = Math.max(0, remaining + growth);

    rows.push({
      age,
      potStart,
      contributions: 0,
      growth,
      grossWithdrawal: plan.grossWithdrawal,
      taxPaid: taxOnStatePension + plan.taxPaid,
      statePension,
      netIncome: netStatePension + plan.netFromWithdrawal,
      potEnd,
    });

    pot = potEnd;
  }

  return { rows, depletionAge, taxFreeCashUsed: LUMP_SUM_ALLOWANCE - lsaRemaining };
}

/**
 * Annual income from buying a level single-life annuity with the pot, optionally
 * after taking 25% tax-free cash (capped at the Lump Sum Allowance) first.
 *
 * @example
 * annuityIncome(100000, 0.065, true) // returns { grossAnnual: 4875, lumpSum: 25000 }
 */
export function annuityIncome(
  pot: number,
  annuityRate: number,
  takeTaxFreeLumpSum: boolean,
): { grossAnnual: number; lumpSum: number } {
  assertNonNegativeFinite(pot, "Pot");
  assertNonNegativeFinite(annuityRate, "Annuity rate");

  const lumpSum = takeTaxFreeLumpSum ? Math.min(pot * TAX_FREE_FRACTION, LUMP_SUM_ALLOWANCE) : 0;

  return {
    grossAnnual: roundToPrecision((pot - lumpSum) * annuityRate, 2),
    lumpSum: roundToPrecision(lumpSum, 2),
  };
}

/**
 * Gross annual withdrawal implied by a withdrawal rate (e.g. the 4% rule).
 */
export function sustainableGrossWithdrawal(pot: number, withdrawalRate: number): number {
  assertNonNegativeFinite(pot, "Pot");
  assertNonNegativeFinite(withdrawalRate, "Withdrawal rate");

  return roundToPrecision(pot * withdrawalRate, 2);
}

/**
 * Warning message when combined annual contributions exceed the annual allowance,
 * or null when they are within it. Informational only; carry-forward is not modelled.
 */
export function annualContributionWarning(inputs: AccumulationInputs): string | null {
  const total =
    annualContribution(inputs.annualSalary, inputs.employeeContribution) +
    annualContribution(inputs.annualSalary, inputs.employerContribution);

  if (total <= ANNUAL_ALLOWANCE) {
    return null;
  }

  return `Combined contributions of £${Math.round(total).toLocaleString("en-GB")} a year exceed the £${ANNUAL_ALLOWANCE.toLocaleString("en-GB")} pension annual allowance; contributions above it do not receive tax relief.`;
}

/**
 * Runs a full deterministic projection: accumulation to retirement, then drawdown,
 * both at a constant real return.
 */
export function runDeterministicProjection(
  accumulationInputs: AccumulationInputs,
  drawdownInputs: Omit<DrawdownInputs, "potAtRetirement">,
  constantRealReturn: number,
): DeterministicResult {
  const accumulation = projectAccumulation(accumulationInputs, () => constantRealReturn);
  const potAtRetirement = accumulation[accumulation.length - 1].potEnd;
  const { rows: drawdown, depletionAge } = projectDrawdown(
    { ...drawdownInputs, potAtRetirement },
    () => constantRealReturn,
  );

  return {
    accumulation,
    drawdown,
    potAtRetirement,
    netRetirementIncome: drawdown[0].netIncome,
    depletionAge,
  };
}
