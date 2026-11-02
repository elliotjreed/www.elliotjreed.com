import type { FC, ReactElement } from "react";

export interface QuestionOption {
  value: string;
  label: string;
}

interface FlowchartQuestionProps {
  question: string;
  help?: string;
  options: QuestionOption[];
  onAnswer: (value: string) => void;
  /** Shown above the question, e.g. "Question 3 of 8". */
  progressLabel?: string;
}

export const FlowchartQuestion: FC<FlowchartQuestionProps> = ({
  question,
  help,
  options,
  onAnswer,
  progressLabel,
}): ReactElement => (
  <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
    {progressLabel !== undefined && (
      <p className="text-primary-700 dark:text-primary-300 mb-2 text-sm font-semibold tracking-wide uppercase">
        {progressLabel}
      </p>
    )}

    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{question}</h2>

    {help !== undefined && <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{help}</p>}

    <div className="mt-6 flex flex-wrap gap-3">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={(): void => onAnswer(option.value)}
          className="border-primary-600 text-primary-700 hover:bg-primary-600 focus:ring-primary-500 dark:border-primary-400 dark:text-primary-200 dark:hover:bg-primary-700 flex-1 rounded border-2 px-4 py-3 font-semibold hover:text-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
        >
          {option.label}
        </button>
      ))}
    </div>
  </div>
);
