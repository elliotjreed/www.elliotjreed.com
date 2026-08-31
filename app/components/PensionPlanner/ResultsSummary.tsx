import type { FC, ReactElement, ReactNode } from "react";
import type { PlannerResults } from "~/utils/pension/planner";
import { formatGBP, formatPercentage } from "./formatting";

interface ResultsSummaryProps {
  results: PlannerResults;
}

const cardClassName = "rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800";

const SummaryCard: FC<{ label: string; value: ReactNode; detail?: string }> = ({
  label,
  value,
  detail,
}): ReactElement => (
  <div className={cardClassName}>
    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</p>
    <p className="text-secondary-800 dark:text-secondary-100 mt-2 text-3xl font-bold">{value}</p>
    {detail !== undefined && <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{detail}</p>}
  </div>
);

export const ResultsSummary: FC<ResultsSummaryProps> = ({ results }): ReactElement => (
  <section aria-labelledby="results-heading" className="space-y-4">
    <h2 id="results-heading" className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
      Your projection
    </h2>

    {results.annualAllowanceWarning !== null && (
      <p className="rounded border border-amber-300 bg-amber-100 p-3 text-sm text-amber-900 dark:border-amber-600 dark:bg-amber-900 dark:text-amber-100">
        {results.annualAllowanceWarning}
      </p>
    )}

    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <SummaryCard
        label={`Projected pot at age ${results.retirementAge}`}
        value={formatGBP(results.potAtRetirement)}
        detail="In today's money, after inflation."
      />

      <SummaryCard
        label="Net annual income"
        value={formatGBP(results.netRetirementIncome)}
        detail="After income tax, including any state pension."
      />

      <SummaryCard
        label="How long the pot lasts"
        value={
          results.depletionAge === null
            ? `Lasts beyond age ${results.planToAge}`
            : `Runs out at age ${results.depletionAge}`
        }
        detail={
          results.depletionAge === null
            ? "The pot still has money left at the end of the plan."
            : "Consider lower spending, later retirement, or higher contributions."
        }
      />

      {results.successProbability !== undefined && (
        <SummaryCard
          label={`Chance of lasting to age ${results.planToAge}`}
          value={formatPercentage(results.successProbability)}
          detail="Across simulated return sequences, allowing for sequence-of-returns risk."
        />
      )}

      {results.annuity !== undefined && (
        <>
          <SummaryCard
            label="Annuity income a year"
            value={formatGBP(results.annuity.grossAnnual)}
            detail="Gross level single-life annuity, before income tax."
          />
          <SummaryCard
            label="Tax-free lump sum"
            value={formatGBP(results.annuity.lumpSum)}
            detail="Taken before buying the annuity."
          />
        </>
      )}
    </div>
  </section>
);
