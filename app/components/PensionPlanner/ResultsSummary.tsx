import type { FC, ReactElement, ReactNode } from "react";
import type { PlannerResults } from "~/utils/pension/planner";
import { formatGBP, formatPercentage } from "./formatting";

interface ResultsSummaryProps {
  results: PlannerResults;
}

const SummaryCard: FC<{ label: string; value: ReactNode; detail?: string }> = ({
  label,
  value,
  detail,
}): ReactElement => (
  <div className="ejr-stat">
    <p className="ejr-stat-label">{label}</p>
    <p className="ejr-stat-value">{value}</p>
    {detail !== undefined && <p className="ejr-stat-delta">{detail}</p>}
  </div>
);

export const ResultsSummary: FC<ResultsSummaryProps> = ({ results }): ReactElement => (
  <section aria-labelledby="results-heading" className="space-y-4">
    <h2 id="results-heading" className="text-heading-2 text-ink font-semibold">
      Your projection
    </h2>

    {results.annualAllowanceWarning !== null && (
      <p className="bg-warning-soft text-caption text-ink rounded-md p-3">{results.annualAllowanceWarning}</p>
    )}

    <div className="ejr-stats">
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
