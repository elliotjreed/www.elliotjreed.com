import type { FC, ReactElement } from "react";
import type { FlowchartOutcome } from "~/utils/personalFinance/flowchart";
import { FLOWCHART_STEPS } from "~/utils/personalFinance/flowchart";

interface FlowchartResultProps {
  outcome: FlowchartOutcome;
  refinementGuidance?: string;
}

export const FlowchartResult: FC<FlowchartResultProps> = ({ outcome, refinementGuidance }): ReactElement => {
  const headerClassName = outcome.urgent ? "bg-danger-soft" : "bg-info-soft";
  const headerTextClassName = outcome.urgent ? "text-ink" : "text-ink";

  return (
    <section aria-labelledby="result-heading" className="space-y-6">
      <div className={`rounded-lg p-6 ${headerClassName}`}>
        <p className={`text-caption font-semibold ${headerTextClassName}`}>
          Step {outcome.stepNumber} of {FLOWCHART_STEPS.length}
        </p>
        <h2 id="result-heading" className={`text-heading-2 mt-1 font-bold ${headerTextClassName}`}>
          {outcome.title}
        </h2>
        <p className={`text-body-long mt-3 ${headerTextClassName}`}>{outcome.summary}</p>
      </div>

      {refinementGuidance !== undefined && (
        <div className="bg-surface-300 rounded-lg p-6">
          <h3 className="text-ink font-semibold">Based on your answer</h3>
          <p className="text-ink mt-2">{refinementGuidance}</p>
        </div>
      )}

      <div className="bg-surface-200 rounded-lg p-6">
        <h3 className="text-body-long text-ink font-semibold">What to do</h3>
        <ul className="text-ink mt-3 list-disc space-y-2 pl-6">
          {outcome.actions.map((action) => (
            <li key={action}>{action}</li>
          ))}
        </ul>
      </div>

      <div className="bg-surface-200 rounded-lg p-6">
        <h3 className="text-body-long text-ink font-semibold">Why this comes first</h3>
        <p className="text-ink mt-3">{outcome.why}</p>
      </div>
    </section>
  );
};
