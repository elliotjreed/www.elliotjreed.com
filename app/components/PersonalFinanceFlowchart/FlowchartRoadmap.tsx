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
    <h2 id="roadmap-heading" className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
      The full order of operations
    </h2>

    <ol aria-label="Flowchart steps" className="space-y-3">
      {FLOWCHART_STEPS.map((step) => {
        const isCleared = clearedSteps.includes(step.number) && step.number !== currentStep;
        const isCurrent = step.number === currentStep;

        const containerClassName = isCurrent
          ? "border-secondary-400 bg-secondary-50 dark:border-secondary-500 dark:bg-secondary-900"
          : isCleared
            ? "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
            : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800";

        const markerClassName = isCurrent
          ? "bg-secondary-600 text-white dark:bg-secondary-500"
          : isCleared
            ? "bg-gray-400 text-white dark:bg-gray-600"
            : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300";

        return (
          <li key={step.number} className={`flex gap-4 rounded-lg border p-4 ${containerClassName}`}>
            <span
              aria-hidden="true"
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-bold ${markerClassName}`}
            >
              {isCleared ? "✓" : step.number}
            </span>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                {step.title}
                {isCurrent && (
                  <span className="bg-secondary-600 dark:bg-secondary-500 ml-2 rounded px-2 py-0.5 text-xs font-semibold tracking-wide text-white uppercase">
                    You are here
                  </span>
                )}
                {isCleared && <span className="sr-only"> (completed)</span>}
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  </section>
);
