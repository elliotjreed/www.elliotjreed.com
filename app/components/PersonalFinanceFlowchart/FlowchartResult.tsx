import type { FC, ReactElement } from "react";
import type { FlowchartOutcome } from "~/utils/personalFinance/flowchart";
import { FLOWCHART_STEPS } from "~/utils/personalFinance/flowchart";

interface FlowchartResultProps {
  outcome: FlowchartOutcome;
  refinementGuidance?: string;
}

export const FlowchartResult: FC<FlowchartResultProps> = ({ outcome, refinementGuidance }): ReactElement => {
  const headerClassName = outcome.urgent
    ? "border-red-300 bg-red-50 dark:border-red-600 dark:bg-red-900"
    : "border-secondary-300 bg-secondary-50 dark:border-secondary-600 dark:bg-secondary-900";
  const headerTextClassName = outcome.urgent
    ? "text-red-900 dark:text-red-100"
    : "text-secondary-900 dark:text-secondary-100";

  return (
    <section aria-labelledby="result-heading" className="space-y-6">
      <div className={`rounded-lg border p-6 ${headerClassName}`}>
        <p className={`text-sm font-semibold tracking-wide uppercase ${headerTextClassName}`}>
          Step {outcome.stepNumber} of {FLOWCHART_STEPS.length}
        </p>
        <h2 id="result-heading" className={`mt-1 text-2xl font-bold ${headerTextClassName}`}>
          {outcome.title}
        </h2>
        <p className={`mt-3 text-lg ${headerTextClassName}`}>{outcome.summary}</p>
      </div>

      {refinementGuidance !== undefined && (
        <div className="border-primary-300 bg-primary-50 dark:border-primary-600 dark:bg-primary-900 rounded-lg border p-6">
          <h3 className="text-primary-900 dark:text-primary-100 font-semibold">Based on your answer</h3>
          <p className="text-primary-900 dark:text-primary-100 mt-2">{refinementGuidance}</p>
        </div>
      )}

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">What to do</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700 dark:text-gray-300">
          {outcome.actions.map((action) => (
            <li key={action}>{action}</li>
          ))}
        </ul>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Why this comes first</h3>
        <p className="mt-3 text-gray-700 dark:text-gray-300">{outcome.why}</p>
      </div>
    </section>
  );
};
