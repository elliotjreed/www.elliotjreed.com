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
  <div className="bg-surface-200 rounded-lg p-6">
    {progressLabel !== undefined && <p className="text-caption text-ink-subtle mb-2">{progressLabel}</p>}

    <h2 className="text-heading-3 text-ink font-semibold">{question}</h2>

    {help !== undefined && <p className="text-caption text-ink-muted mt-2">{help}</p>}

    <div className="mt-6 flex flex-wrap gap-3">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={(): void => onAnswer(option.value)}
          className="ejr-btn ejr-btn-secondary flex-1 justify-center"
        >
          {option.label}
        </button>
      ))}
    </div>
  </div>
);
