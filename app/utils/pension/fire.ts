/**
 * FIRE (Financial Independence, Retire Early) viability modelling for the UK.
 *
 * Retiring before the private pension access age needs two pots. A "bridge" pot
 * (ISAs or general investments, accessible at any age and free of income tax) funds
 * spending from the early retirement age until the pension can be touched at 57.
 * The pension then funds spending, topped up by the state pension once it starts.
 */

import type { AllocationPreset } from "./constants";
import { PRIVATE_PENSION_ACCESS_AGE } from "./constants";
import { createRng, sampleLognormalReturn } from "./monteCarlo";
import type { AccumulationInputs, StatePensionInput, YearRow } from "./projection";
import { projectAccumulation, projectDrawdown } from "./projection";

export interface FireInputs {
  currentAge: number;
  /** Net annual spending the plan must support, in today's money. */
  targetNetAnnualSpend: number;
  withdrawalRate: number;
  /** Current ISA or general investment account balance available before pension access age. */
  bridgePot: number;
  /** Annual saving into the bridge pot while still working. */
  annualBridgeSaving: number;
  pension: AccumulationInputs;
  statePension?: StatePensionInput;
  /** Assumed constant real return used by the deterministic assessment. */
  realReturn: number;
  planToAge: number;
}

export interface FireYearRow extends YearRow {
  /** Bridge pot balance at the end of the year. */
  bridgePot: number;
  /** Pension pot balance at the end of the year. */
  pensionPot: number;
}

export interface FireAssessment {
  viable: boolean;
  /** Total net spending the bridge pot could not cover before the pension access age. */
  bridgeShortfall: number;
  /** First age at which the pension could not fund the target income, or null. */
  pensionShortfallAge: number | null;
  /** Years from the current age up to retirement, while both pots are still being built. */
  accumulationRows: FireYearRow[];
  /** Years from the retirement age to the plan-to age. */
  rows: FireYearRow[];
}

/**
 * The pot needed to sustain a level of spending at a given withdrawal rate;
 * 25 times annual spending at the classic 4% rate.
 *
 * @example
 * fireNumber(20000, 0.04) // returns 500000
 */
export function fireNumber(targetAnnualSpend: number, withdrawalRate: number): number {
  if (!Number.isFinite(targetAnnualSpend) || targetAnnualSpend < 0) {
    throw new Error("Target annual spend must be a non-negative finite number");
  }
  if (!Number.isFinite(withdrawalRate) || withdrawalRate <= 0) {
    throw new Error("Withdrawal rate must be a positive finite number");
  }

  return targetAnnualSpend / withdrawalRate;
}

/** Grows the bridge pot with annual savings up to the retirement age, one balance per year. */
function accumulateBridgePot(
  inputs: FireInputs,
  retireAge: number,
  returnForYear: (yearIndex: number) => number,
): number[] {
  const balances: number[] = [];
  let pot = inputs.bridgePot;

  for (let yearIndex = 0; yearIndex < retireAge - inputs.currentAge; yearIndex++) {
    pot = Math.max(0, (pot + inputs.annualBridgeSaving) * (1 + returnForYear(yearIndex)));
    balances.push(pot);
  }

  return balances;
}

/** Grows an untouched pension pot across a number of years. */
function growPot(pot: number, years: number, returnForYear: (yearIndex: number) => number, yearOffset: number): number {
  let balance = pot;

  for (let year = 0; year < years; year++) {
    balance *= 1 + returnForYear(yearOffset + year);
  }

  return balance;
}

function assessWithReturns(
  retireAge: number,
  inputs: FireInputs,
  returnForYear: (yearIndex: number) => number,
): FireAssessment {
  if (retireAge <= inputs.currentAge) {
    throw new Error("Retirement age must be after current age");
  }
  if (inputs.planToAge < retireAge) {
    throw new Error("Plan-to age must not be before retirement age");
  }

  const yearsToRetirement = retireAge - inputs.currentAge;

  const pensionAtRetirement = projectAccumulation(
    { ...inputs.pension, currentAge: inputs.currentAge, retirementAge: retireAge },
    returnForYear,
  );
  const bridgeBalances = accumulateBridgePot(inputs, retireAge, returnForYear);
  const bridgeAtRetirement = bridgeBalances.length > 0 ? bridgeBalances[bridgeBalances.length - 1] : inputs.bridgePot;

  const accumulationRows: FireYearRow[] = pensionAtRetirement.map((row, index) => ({
    ...row,
    bridgePot: bridgeBalances[index],
    pensionPot: row.potEnd,
    potEnd: row.potEnd + bridgeBalances[index],
  }));

  const accessAge = Math.max(retireAge, PRIVATE_PENSION_ACCESS_AGE);
  const bridgeYears = accessAge - retireAge;

  const rows: FireYearRow[] = [];
  let bridgeShortfall = 0;

  // Phase one: the bridge pot funds spending while the pension is untouchable.
  let pensionPot = pensionAtRetirement[pensionAtRetirement.length - 1].potEnd;

  if (bridgeYears > 0) {
    const { rows: bridgeRows } = projectDrawdown(
      {
        potAtRetirement: bridgeAtRetirement,
        retirementAge: retireAge,
        planToAge: accessAge - 1,
        targetNetIncome: inputs.targetNetAnnualSpend,
        annualFee: inputs.pension.annualFee,
        taxExempt: true,
      },
      (yearIndex) => returnForYear(yearsToRetirement + yearIndex),
    );

    for (const [index, row] of bridgeRows.entries()) {
      bridgeShortfall += Math.max(0, inputs.targetNetAnnualSpend - row.netIncome);
      pensionPot = growPot(pensionPot, 1, returnForYear, yearsToRetirement + index);

      rows.push({ ...row, bridgePot: row.potEnd, pensionPot, potEnd: row.potEnd + pensionPot });
    }
  }

  const bridgeRemaining = bridgeYears > 0 ? rows[rows.length - 1].bridgePot : bridgeAtRetirement;

  // Phase two: the pension funds spending, joined by the state pension once it starts.
  const { rows: pensionRows, depletionAge } = projectDrawdown(
    {
      potAtRetirement: pensionPot + bridgeRemaining,
      retirementAge: accessAge,
      planToAge: inputs.planToAge,
      targetNetIncome: inputs.targetNetAnnualSpend,
      statePension: inputs.statePension,
      annualFee: inputs.pension.annualFee,
    },
    (yearIndex) => returnForYear(yearsToRetirement + bridgeYears + yearIndex),
  );

  for (const row of pensionRows) {
    rows.push({ ...row, bridgePot: 0, pensionPot: row.potEnd });
  }

  return {
    viable: bridgeShortfall === 0 && depletionAge === null,
    bridgeShortfall,
    pensionShortfallAge: depletionAge,
    accumulationRows,
    rows,
  };
}

/**
 * Assesses whether retiring at a given age is viable, modelling the bridge years
 * before the pension access age and the pension drawdown that follows.
 */
export function assessFireAtAge(retireAge: number, inputs: FireInputs): FireAssessment {
  return assessWithReturns(retireAge, inputs, () => inputs.realReturn);
}

/**
 * Scans upwards from the current age for the earliest age at which retirement is viable.
 */
export function earliestViableRetirementAge(inputs: FireInputs): {
  age: number | null;
  assessment: FireAssessment | null;
} {
  for (let age = inputs.currentAge + 1; age <= inputs.planToAge; age++) {
    const assessment = assessFireAtAge(age, inputs);

    if (assessment.viable) {
      return { age, assessment };
    }
  }

  return { age: null, assessment: null };
}

/**
 * Probability that retiring at a given age remains viable across simulated return
 * sequences, exposing the sequence-of-returns risk a single fixed rate cannot show.
 */
export function runFireMonteCarlo(
  retireAge: number,
  inputs: FireInputs,
  preset: AllocationPreset,
  options: { iterations?: number; seed?: number } = {},
): number {
  const { iterations = 1_000, seed = 20_260_406 } = options;

  if (!Number.isInteger(iterations) || iterations <= 0) {
    throw new Error("Iterations must be a positive integer");
  }

  const rng = createRng(seed);
  let successes = 0;

  for (let iteration = 0; iteration < iterations; iteration++) {
    const assessment = assessWithReturns(retireAge, inputs, () =>
      sampleLognormalReturn(preset.meanRealReturn, preset.volatility, rng),
    );

    if (assessment.viable) {
      successes++;
    }
  }

  return successes / iterations;
}
