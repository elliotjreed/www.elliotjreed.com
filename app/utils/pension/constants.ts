/**
 * UK pension planning constants for the 2026/27 tax year.
 *
 * This is the single file to update each tax year. Every figure cites its source.
 * All rates are fractions (0.2 = 20%) and all monetary amounts are pounds sterling.
 */

/** Tax year the figures below apply to; printed in the on-page assumptions disclosure. */
export const TAX_YEAR = "2026/27";

// Income tax (England, Wales and Northern Ireland; Scottish bands are out of scope).
// Source: HMRC income tax rates and allowances 2026/27.
export const PERSONAL_ALLOWANCE = 12_570;
/** Personal allowance reduces by £1 for every £2 of income above this. */
export const PERSONAL_ALLOWANCE_TAPER_THRESHOLD = 100_000;
/** Width of the basic-rate band, applied to taxable income (after the personal allowance). */
export const BASIC_RATE_BAND = 37_700;
/** Taxable income above this is taxed at the additional rate. */
export const ADDITIONAL_RATE_THRESHOLD = 125_140;
export const BASIC_RATE = 0.2;
export const HIGHER_RATE = 0.4;
export const ADDITIONAL_RATE = 0.45;

// Pension allowances. Source: HMRC pension tax rules 2026/27.
/** Standard annual allowance for tax-relieved pension contributions (exceeding it is a warning, not an error). */
export const ANNUAL_ALLOWANCE = 60_000;
/** Lump Sum Allowance: cap on total tax-free cash taken from pensions. */
export const LUMP_SUM_ALLOWANCE = 268_275;
/** Fraction of each pension withdrawal that is tax-free (UFPLS-style) until the Lump Sum Allowance is used. */
export const TAX_FREE_FRACTION = 0.25;
/** Normal minimum pension age: private pensions are accessible from this age (57 from April 2028). */
export const PRIVATE_PENSION_ACCESS_AGE = 57;

// State pension. Source: full new State Pension rate 2026/27 (£241.30/week after the 4.8% triple-lock uprating).
export const STATE_PENSION_WEEKLY = 241.3;
export const STATE_PENSION_ANNUAL = STATE_PENSION_WEEKLY * 52;
/** Minimum National Insurance qualifying years to receive any new State Pension. */
export const STATE_PENSION_MINIMUM_QUALIFYING_YEARS = 10;
/** Qualifying years required for the full new State Pension; fewer years are pro-rated. */
export const STATE_PENSION_FULL_QUALIFYING_YEARS = 35;

// Planner defaults.
export const DEFAULT_PLAN_TO_AGE = 95;
/** Default safe withdrawal rate (the "4% rule"; Morningstar UK research suggests circa 3.7-3.9%). */
export const DEFAULT_WITHDRAWAL_RATE = 0.04;
/** Typical level single-life annuity rate at age 65 (2026 market rates are roughly 6.5-7%). */
export const DEFAULT_ANNUITY_RATE = 0.065;

/** Inflation assumption prescribed by AS TM1 v5.2 (Financial Reporting Council). */
export const TM1_INFLATION = 0.025;

export interface GrowthPreset {
  id: string;
  label: string;
  /** Assumed nominal (before inflation) annual growth rate. */
  nominalGrowth: number;
  /** Assumed annual inflation rate used to express results in today's money. */
  inflation: number;
}

/**
 * AS TM1 v5.2 accumulation rates (Financial Reporting Council) — the standard behind
 * annual pension statements and the Pensions Dashboards. Funds are assigned a
 * volatility group; each group has a prescribed nominal accumulation rate.
 */
export const TM1_PRESETS: GrowthPreset[] = [
  {
    id: "tm1-1",
    label: "AS TM1 group 1 — lowest volatility (1% growth)",
    nominalGrowth: 0.01,
    inflation: TM1_INFLATION,
  },
  { id: "tm1-2", label: "AS TM1 group 2 — low volatility (3% growth)", nominalGrowth: 0.03, inflation: TM1_INFLATION },
  {
    id: "tm1-3",
    label: "AS TM1 group 3 — medium volatility (5% growth)",
    nominalGrowth: 0.05,
    inflation: TM1_INFLATION,
  },
  {
    id: "tm1-4",
    label: "AS TM1 group 4 — highest volatility (7% growth)",
    nominalGrowth: 0.07,
    inflation: TM1_INFLATION,
  },
];

/**
 * FCA COBS 13 Annex 2 maximum projection rates used in Key Features Illustrations
 * for tax-advantaged products: lower 2%, intermediate 5%, higher 8% (nominal).
 */
export const FCA_PRESETS: GrowthPreset[] = [
  { id: "fca-low", label: "FCA lower rate (2% growth)", nominalGrowth: 0.02, inflation: TM1_INFLATION },
  { id: "fca-mid", label: "FCA intermediate rate (5% growth)", nominalGrowth: 0.05, inflation: TM1_INFLATION },
  { id: "fca-high", label: "FCA higher rate (8% growth)", nominalGrowth: 0.08, inflation: TM1_INFLATION },
];

export interface AllocationPreset {
  id: "cautious" | "balanced" | "adventurous";
  label: string;
  /** Expected annual real (after inflation) return of the allocation. */
  meanRealReturn: number;
  /** Annual volatility (standard deviation of returns). */
  volatility: number;
}

/**
 * Monte Carlo allocation presets: indicative long-run real return and volatility
 * for cautious (bond-heavy), balanced, and adventurous (equity-heavy) portfolios.
 */
export const MONTE_CARLO_PRESETS: AllocationPreset[] = [
  { id: "cautious", label: "Cautious (roughly 20% equities)", meanRealReturn: 0.015, volatility: 0.08 },
  { id: "balanced", label: "Balanced (roughly 60% equities)", meanRealReturn: 0.035, volatility: 0.11 },
  { id: "adventurous", label: "Adventurous (roughly 100% equities)", meanRealReturn: 0.05, volatility: 0.16 },
];

/**
 * Retirement Living Standards for a single person (Pensions UK, formerly PLSA),
 * expressed as net annual income in today's money. 2025 update figures.
 */
export const PLSA_STANDARDS = {
  minimum: 13_400,
  moderate: 31_700,
  comfortable: 43_900,
} as const;
