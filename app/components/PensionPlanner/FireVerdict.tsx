import type { FC, ReactElement } from "react";
import { PRIVATE_PENSION_ACCESS_AGE } from "~/utils/pension/constants";
import type { FireAssessment } from "~/utils/pension/fire";
import { formatGBP, formatPercentage } from "./formatting";

interface FireVerdictProps {
  retirementAge: number;
  assessment: FireAssessment;
  earliestAge: number | null;
  /** The pot needed to sustain the target spending at the chosen withdrawal rate. */
  targetPot: number;
  successProbability?: number;
}

export const FireVerdict: FC<FireVerdictProps> = ({
  retirementAge,
  assessment,
  earliestAge,
  targetPot,
  successProbability,
}): ReactElement => {
  const verdictClassName = assessment.viable
    ? "border-secondary-300 bg-secondary-50 text-secondary-900 dark:border-secondary-600 dark:bg-secondary-900 dark:text-secondary-100"
    : "border-red-300 bg-red-50 text-red-900 dark:border-red-600 dark:bg-red-900 dark:text-red-100";

  return (
    <section aria-labelledby="fire-heading" className="space-y-4">
      <h2 id="fire-heading" className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Early retirement (FIRE) viability
      </h2>

      <div className={`rounded-lg border p-6 ${verdictClassName}`}>
        <p className="text-xl font-bold">
          {assessment.viable
            ? `You are on track to retire at ${retirementAge}.`
            : `Retiring at ${retirementAge} does not work on these assumptions.`}
        </p>

        {assessment.bridgeShortfall > 0 && (
          <p className="mt-3">
            Your bridge savings fall short by {formatGBP(assessment.bridgeShortfall)} across the years between{" "}
            {retirementAge} and {PRIVATE_PENSION_ACCESS_AGE}, when private pensions become accessible. Bridge savings
            held outside a pension (such as ISAs) need to cover that gap.
          </p>
        )}

        {assessment.pensionShortfallAge !== null && (
          <p className="mt-3">
            Your pension runs out at age {assessment.pensionShortfallAge}, before the end of the plan.
          </p>
        )}

        <p className="mt-3">
          {earliestAge === null
            ? "On these assumptions no retirement age in this plan is viable. Consider spending less, saving more, or a longer working life."
            : `The earliest age this plan supports is ${earliestAge}.`}
        </p>

        {successProbability !== undefined && (
          <p className="mt-3">
            Simulated return sequences support this plan {formatPercentage(successProbability)} of the time.
          </p>
        )}
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Your FIRE number</p>
        <p className="text-secondary-800 dark:text-secondary-100 mt-2 text-3xl font-bold">{formatGBP(targetPot)}</p>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Total savings needed to sustain your target spending at your chosen withdrawal rate.
        </p>
      </div>
    </section>
  );
};
