import type { FC, ReactElement } from "react";
import { FLOWCHART_STEPS } from "~/utils/personalFinance/flowchart";

interface FlowchartRoadmapProps {
  /** Step numbers already cleared. */
  clearedSteps: number[];
  /** The step the reader is currently on, if they have reached one. */
  currentStep?: number;
}

export const FlowchartRoadmap: FC<FlowchartRoadmapProps> = ({ clearedSteps, currentStep }): ReactElement => (
  <section aria-labelledby="roadmap-heading" className="space-y-4">
    <h2 id="roadmap-heading" className="text-heading-2 text-ink font-semibold">
      The full order of operations
    </h2>

    <ol aria-label="Flowchart steps" className="space-y-3">
      {FLOWCHART_STEPS.map((step) => {
        const isCleared = clearedSteps.includes(step.number) && step.number !== currentStep;
        const isCurrent = step.number === currentStep;

        const containerClassName = isCurrent ? "bg-rhubarb-soft" : isCleared ? "bg-surface-300" : "bg-surface-200";

        const markerClassName = isCurrent
          ? "bg-rhubarb text-on-rhubarb"
          : isCleared
            ? "bg-surface-100 text-ink-muted"
            : "bg-surface-300 text-ink";

        return (
          <li key={step.number} className={`flex gap-4 rounded-lg p-4 ${containerClassName}`}>
            <span
              aria-hidden="true"
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-bold ${markerClassName}`}
            >
              {isCleared ? "✓" : step.number}
            </span>

            <div>
              <h3 className="text-ink font-semibold">
                {step.title}
                {isCurrent && (
                  <span className="bg-rhubarb font-text text-caption text-on-rhubarb ml-2 rounded-sm px-2 py-1 font-bold">
                    You are here
                  </span>
                )}
                {isCleared && <span className="sr-only"> (completed)</span>}
              </h3>
              <p className="text-caption text-ink-muted mt-1">{step.description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  </section>
);
