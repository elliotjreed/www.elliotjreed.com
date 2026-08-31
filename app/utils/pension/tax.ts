/**
 * UK income tax calculations for retirement income (England, Wales and Northern Ireland bands).
 * All figures come from constants.ts so annual updates happen in one place.
 */

import {
  ADDITIONAL_RATE,
  ADDITIONAL_RATE_THRESHOLD,
  BASIC_RATE,
  BASIC_RATE_BAND,
  HIGHER_RATE,
  PERSONAL_ALLOWANCE,
  PERSONAL_ALLOWANCE_TAPER_THRESHOLD,
} from "./constants";

function assertNonNegativeFinite(value: number, name: string): void {
  if (!Number.isFinite(value)) {
    throw new Error(`${name} must be a finite number`);
  }
  if (value < 0) {
    throw new Error(`${name} cannot be negative`);
  }
}

/**
 * Personal allowance for a given gross income, tapered by £1 for every £2 above £100,000.
 *
 * @example
 * personalAllowanceFor(50000) // returns 12570
 * personalAllowanceFor(110000) // returns 7570
 */
export function personalAllowanceFor(grossIncome: number): number {
  assertNonNegativeFinite(grossIncome, "Gross income");

  if (grossIncome <= PERSONAL_ALLOWANCE_TAPER_THRESHOLD) {
    return PERSONAL_ALLOWANCE;
  }

  const taper = (grossIncome - PERSONAL_ALLOWANCE_TAPER_THRESHOLD) / 2;

  return Math.max(0, PERSONAL_ALLOWANCE - taper);
}

/**
 * Income tax due on gross non-savings income under the 2026/27 bands.
 *
 * @example
 * incomeTaxDue(30000) // returns 3486
 */
export function incomeTaxDue(grossIncome: number): number {
  assertNonNegativeFinite(grossIncome, "Gross income");

  const taxableIncome = Math.max(0, grossIncome - personalAllowanceFor(grossIncome));

  const basicRatePortion = Math.min(taxableIncome, BASIC_RATE_BAND);
  const higherRatePortion = Math.min(
    Math.max(0, taxableIncome - BASIC_RATE_BAND),
    ADDITIONAL_RATE_THRESHOLD - BASIC_RATE_BAND,
  );
  const additionalRatePortion = Math.max(0, taxableIncome - ADDITIONAL_RATE_THRESHOLD);

  return basicRatePortion * BASIC_RATE + higherRatePortion * HIGHER_RATE + additionalRatePortion * ADDITIONAL_RATE;
}

/**
 * Net (after tax) income from a gross income.
 */
export function netFromGross(grossIncome: number): number {
  return grossIncome - incomeTaxDue(grossIncome);
}

/**
 * Finds a value where an increasing function meets a target, by bisection.
 * Used to invert the tax schedule, which is piecewise but strictly increasing.
 */
function solveIncreasing(fn: (input: number) => number, target: number, tolerance: number): number {
  let lower = 0;
  let upper = Math.max(target * 2, 100_000);

  while (fn(upper) < target) {
    upper *= 2;
  }

  while (upper - lower > tolerance) {
    const midpoint = (lower + upper) / 2;

    if (fn(midpoint) < target) {
      lower = midpoint;
    } else {
      upper = midpoint;
    }
  }

  return (lower + upper) / 2;
}

/**
 * Gross income required to achieve a target net income.
 *
 * @example
 * grossFromNet(10000) // returns 10000 (below the personal allowance)
 */
export function grossFromNet(targetNet: number): number {
  assertNonNegativeFinite(targetNet, "Target net income");

  if (targetNet === 0) {
    return 0;
  }

  return solveIncreasing(netFromGross, targetNet, 0.005);
}

function assertFraction(value: number, name: string): void {
  if (!Number.isFinite(value) || value < 0 || value > 1) {
    throw new Error(`${name} must be between 0 and 1`);
  }
}

/**
 * Net amount received from a gross pension withdrawal where a fraction is tax-free
 * (UFPLS-style) and other taxable income (such as the state pension) already uses
 * some of the personal allowance and bands.
 *
 * @example
 * netFromPensionWithdrawal(20000, 0.25, 0) // returns 19514
 */
export function netFromPensionWithdrawal(
  grossWithdrawal: number,
  taxFreeFraction: number,
  otherTaxableIncome: number,
): number {
  assertNonNegativeFinite(grossWithdrawal, "Gross withdrawal");
  assertFraction(taxFreeFraction, "Tax-free fraction");
  assertNonNegativeFinite(otherTaxableIncome, "Other taxable income");

  const taxablePart = grossWithdrawal * (1 - taxFreeFraction);
  const taxOnWithdrawal = incomeTaxDue(otherTaxableIncome + taxablePart) - incomeTaxDue(otherTaxableIncome);

  return grossWithdrawal - taxOnWithdrawal;
}

/**
 * Gross pension withdrawal required to achieve a target net amount, given the
 * tax-free fraction and other taxable income.
 */
export function grossPensionWithdrawalForNet(
  targetNet: number,
  taxFreeFraction: number,
  otherTaxableIncome: number,
): number {
  assertNonNegativeFinite(targetNet, "Target net income");
  assertFraction(taxFreeFraction, "Tax-free fraction");
  assertNonNegativeFinite(otherTaxableIncome, "Other taxable income");

  if (targetNet === 0) {
    return 0;
  }

  return solveIncreasing(
    (gross) => netFromPensionWithdrawal(gross, taxFreeFraction, otherTaxableIncome),
    targetNet,
    0.005,
  );
}
