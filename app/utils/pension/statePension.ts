/**
 * UK new State Pension calculations.
 *
 * The triple lock upratings are assumed to at least match inflation, so the
 * real-terms (today's money) value of the state pension is treated as constant.
 */

import {
  STATE_PENSION_ANNUAL,
  STATE_PENSION_FULL_QUALIFYING_YEARS,
  STATE_PENSION_MINIMUM_QUALIFYING_YEARS,
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
 * Annual new State Pension for a given number of National Insurance qualifying years:
 * nothing below 10 years, the full amount at 35 years, pro-rated in between.
 *
 * @example
 * annualStatePension(35) // returns 12547.60
 * annualStatePension(20) // returns 7170.06 (20/35 of the full amount)
 */
export function annualStatePension(qualifyingYears: number): number {
  assertNonNegativeFinite(qualifyingYears, "Qualifying years");

  if (qualifyingYears < STATE_PENSION_MINIMUM_QUALIFYING_YEARS) {
    return 0;
  }

  const cappedYears = Math.min(qualifyingYears, STATE_PENSION_FULL_QUALIFYING_YEARS);

  return (STATE_PENSION_ANNUAL * cappedYears) / STATE_PENSION_FULL_QUALIFYING_YEARS;
}

/**
 * Approximate state pension age from current age, based on the legislated rise to 67
 * (2026-2028) and the planned rise to 68 for those born from April 1977. This is a
 * banded approximation; the exact age depends on date of birth.
 *
 * @example
 * statePensionAge(60) // returns 67
 * statePensionAge(30) // returns 68
 */
export function statePensionAge(currentAge: number): 66 | 67 | 68 {
  assertNonNegativeFinite(currentAge, "Current age");

  if (currentAge >= 65) {
    return 66;
  }
  if (currentAge >= 49) {
    return 67;
  }

  return 68;
}
