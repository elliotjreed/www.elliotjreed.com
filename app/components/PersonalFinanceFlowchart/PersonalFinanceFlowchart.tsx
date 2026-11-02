import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faSitemap } from "@fortawesome/free-solid-svg-icons/faSitemap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type FC, type ReactElement, useEffect, useState } from "react";
import type { Answers } from "~/utils/personalFinance/advisor";
import { clearedStepNumbers, progress, resolveAdvice } from "~/utils/personalFinance/advisor";
import { FLOWCHART_LICENCE_URL, FLOWCHART_SOURCE_URL, FLOWCHART_VERSION } from "~/utils/personalFinance/flowchart";
import { FlowchartQuestion } from "./FlowchartQuestion";
import { FlowchartResult } from "./FlowchartResult";
import { FlowchartRoadmap } from "./FlowchartRoadmap";

const STORAGE_KEY = "personal-finance-flowchart-answers";

const YES_NO_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

const secondaryButtonClassName =
  "rounded border border-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-primary-500 focus:outline-none dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700";

export const PersonalFinanceFlowchart: FC = (): ReactElement => {
  // Answers start empty so the server-rendered markup matches the first client
  // render; anything saved previously is loaded straight afterwards.
  const [answers, setAnswers] = useState<Answers>({});
  const [answeredOrder, setAnsweredOrder] = useState<string[]>([]);

  useEffect((): void => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);

      if (saved !== null) {
        const parsed = JSON.parse(saved) as { answers: Answers; answeredOrder: string[] };

        setAnswers(parsed.answers ?? {});
        setAnsweredOrder(parsed.answeredOrder ?? []);
      }
    } catch (error: unknown) {
      console.warn(error, STORAGE_KEY);
    }
  }, []);

  const persist = (nextAnswers: Answers, nextOrder: string[]): void => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers: nextAnswers, answeredOrder: nextOrder }));
    } catch (error: unknown) {
      console.warn(error, STORAGE_KEY);
    }
  };

  const handleAnswer = (questionId: string, value: string): void => {
    const nextAnswers = { ...answers, [questionId]: value };
    const nextOrder = [...answeredOrder.filter((id) => id !== questionId), questionId];

    setAnswers(nextAnswers);
    setAnsweredOrder(nextOrder);
    persist(nextAnswers, nextOrder);
  };

  const handleBack = (): void => {
    const previousId = answeredOrder[answeredOrder.length - 1];

    if (previousId === undefined) {
      return;
    }

    const { [previousId]: _removed, ...nextAnswers } = answers;
    const nextOrder = answeredOrder.slice(0, -1);

    setAnswers(nextAnswers);
    setAnsweredOrder(nextOrder);
    persist(nextAnswers, nextOrder);
  };

  const handleRestart = (): void => {
    setAnswers({});
    setAnsweredOrder([]);
    persist({}, []);
  };

  const advice = resolveAdvice(answers);
  const { answered, total } = progress(answers);
  const clearedSteps = clearedStepNumbers(answers);
  const currentStep = advice.status === "outcome" ? advice.outcome.stepNumber : undefined;

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-4">
      <div className="text-center">
        <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-gray-100">
          <FontAwesomeIcon icon={faSitemap as IconProp} className="mr-3" />
          Where Should I Put My Money?
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Answer a few questions to find the one thing worth doing next with your money, based on the UK Personal
          Finance flowchart.
        </p>
      </div>

      {advice.status === "question" && (
        <FlowchartQuestion
          question={advice.gate.question}
          help={advice.gate.help}
          options={YES_NO_OPTIONS}
          onAnswer={(value): void => handleAnswer(advice.gate.id, value)}
          progressLabel={`Question ${answered + 1} of ${total}`}
        />
      )}

      {advice.status === "refinement" && (
        <FlowchartQuestion
          question={advice.refinement.question}
          options={advice.refinement.options.map((option) => ({ value: option.value, label: option.label }))}
          onAnswer={(value): void => handleAnswer(advice.refinement.id, value)}
          progressLabel="One more question"
        />
      )}

      {advice.status === "outcome" && (
        <FlowchartResult outcome={advice.outcome} refinementGuidance={advice.refinementGuidance} />
      )}

      {answeredOrder.length > 0 && (
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={handleBack} className={secondaryButtonClassName}>
            Back
          </button>
          <button type="button" onClick={handleRestart} className={secondaryButtonClassName}>
            Start again
          </button>
        </div>
      )}

      <FlowchartRoadmap clearedSteps={clearedSteps} currentStep={currentStep} />

      <section
        aria-labelledby="attribution-heading"
        className="rounded-lg border border-gray-200 bg-white p-6 text-sm text-gray-700 shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
      >
        <h2 id="attribution-heading" className="text-base font-semibold text-gray-900 dark:text-gray-100">
          Source and licence
        </h2>
        <p className="mt-3">
          This tool follows the order of operations set out in the UK Personal Finance flowchart (version{" "}
          {FLOWCHART_VERSION}), maintained by the{" "}
          <a
            href={FLOWCHART_SOURCE_URL}
            className="text-primary-700 dark:text-primary-300 underline"
            rel="noopener noreferrer external"
            target="_blank"
          >
            ukpersonal.finance
          </a>{" "}
          community. The original is a diagram; this version asks you a question at each step instead, so you are told
          which step applies to you.
        </p>
        <p className="mt-3">
          The original flowchart is published under the{" "}
          <a
            href={FLOWCHART_LICENCE_URL}
            className="text-primary-700 dark:text-primary-300 underline"
            rel="noopener noreferrer external license"
            target="_blank"
          >
            Creative Commons Attribution-NonCommercial-ShareAlike 4.0 licence
          </a>
          , and this adaptation is shared under the same terms. Always check the original for the definitive version.
        </p>
      </section>

      <p className="rounded border border-amber-300 bg-amber-100 p-4 text-sm text-amber-900 dark:border-amber-600 dark:bg-amber-900 dark:text-amber-100">
        <strong>This is not financial advice.</strong> It is general guidance that suits most people most of the time,
        and it cannot account for your own circumstances. For free impartial help, contact MoneyHelper; for debt,
        contact StepChange, National Debtline or Citizens Advice, none of which charge. For advice on your own
        situation, speak to a regulated financial adviser.
      </p>
    </div>
  );
};
