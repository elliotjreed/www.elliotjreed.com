import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faSterlingSign } from "@fortawesome/free-solid-svg-icons/faSterlingSign";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type FC, type FormEvent, type ReactElement, useEffect, useState } from "react";
import type { PlannerInputs, PlannerResults } from "~/utils/pension/planner";
import { DEFAULT_PLANNER_INPUTS, calculatePlan } from "~/utils/pension/planner";
import { AssumptionsDisclosure } from "./AssumptionsDisclosure";
import { FireVerdict } from "./FireVerdict";
import { PensionPlannerForm } from "./PensionPlannerForm";
import { ProjectionChart } from "./ProjectionChart";
import { ResultsSummary } from "./ResultsSummary";
import { YearByYearTable } from "./YearByYearTable";

const STORAGE_KEY = "pension-planner-inputs";

export const PensionPlanner: FC = (): ReactElement => {
  // Inputs start at the defaults so the server-rendered markup matches the first
  // client render; anything saved previously is loaded immediately afterwards.
  const [inputs, setInputs] = useState<PlannerInputs>(DEFAULT_PLANNER_INPUTS);
  const [results, setResults] = useState<PlannerResults | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect((): void => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);

      if (saved !== null) {
        setInputs((current) => ({ ...current, ...JSON.parse(saved) }));
      }
    } catch (error: unknown) {
      console.warn(error, STORAGE_KEY);
    }
  }, []);

  const handleChange = (patch: Partial<PlannerInputs>): void => {
    setInputs((current) => {
      const updated = { ...current, ...patch };

      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (error: unknown) {
        console.warn(error, STORAGE_KEY);
      }

      return updated;
    });
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();

    const outcome = calculatePlan(inputs);

    if ("errors" in outcome) {
      setErrors(outcome.errors);
      setResults(null);
      return;
    }

    setErrors([]);
    setResults(outcome.results);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-4">
      <div className="text-center">
        <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-gray-100">
          <FontAwesomeIcon icon={faSterlingSign as IconProp} className="mr-3" />
          UK Pension Planner
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Forecast your pension using recognised UK models, factor in the state pension, and check whether early
          retirement adds up.
        </p>
      </div>

      <PensionPlannerForm
        inputs={inputs}
        onChange={handleChange}
        onSubmit={handleSubmit}
        errors={errors}
        isCalculating={false}
      />

      {results !== null && (
        <div className="space-y-8">
          <ResultsSummary results={results} />

          <section aria-labelledby="chart-heading" className="space-y-4">
            <h2 id="chart-heading" className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Projected pot over time
            </h2>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
              <ProjectionChart
                median={results.chartMedian}
                band={results.chartBand}
                retirementAge={results.retirementAge}
                statePensionAge={results.statePensionAge}
                depletionAge={results.depletionAge}
                ariaLabel="Projected pension pot value by age"
              />
            </div>
          </section>

          {results.fire !== undefined && (
            <FireVerdict
              retirementAge={results.retirementAge}
              assessment={results.fire.assessment}
              earliestAge={results.fire.earliestAge}
              targetPot={results.fire.targetPot}
              successProbability={results.fire.successProbability}
            />
          )}

          <YearByYearTable rows={results.rows} />

          <AssumptionsDisclosure modelLabel={results.modelLabel} />
        </div>
      )}

      {results === null && (
        <p className="rounded border border-amber-300 bg-amber-100 p-4 text-sm text-amber-900 dark:border-amber-600 dark:bg-amber-900 dark:text-amber-100">
          <strong>This is not financial advice.</strong> This calculator is a guidance tool using simplified
          assumptions. Investment returns are not guaranteed and tax rules change. For advice on your own circumstances,
          speak to a regulated financial adviser; free impartial guidance is available from MoneyHelper and Pension
          Wise.
        </p>
      )}
    </div>
  );
};
