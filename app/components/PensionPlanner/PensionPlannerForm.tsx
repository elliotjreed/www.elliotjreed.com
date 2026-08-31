import type { ChangeEvent, FC, FormEvent, ReactElement, ReactNode } from "react";
import { FCA_PRESETS, MONTE_CARLO_PRESETS, PLSA_STANDARDS, TM1_PRESETS } from "~/utils/pension/constants";
import type { ContributionKind, PlannerInputs } from "~/utils/pension/planner";

const CONTRIBUTION_KIND_OPTIONS: { value: ContributionKind; label: string }[] = [
  { value: "percent", label: "% of salary" },
  { value: "monthlyAmount", label: "£ a month" },
  { value: "annualAmount", label: "£ a year" },
];

interface PensionPlannerFormProps {
  inputs: PlannerInputs;
  onChange: (patch: Partial<PlannerInputs>) => void;
  onSubmit: (event: FormEvent) => void;
  errors: string[];
  isCalculating: boolean;
}

const inputClassName =
  "w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100";
const labelClassName = "mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300";
const fieldsetClassName =
  "rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800";
const legendClassName = "px-2 text-lg font-semibold text-gray-900 dark:text-gray-100";
const checkboxClassName = "h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500";

const Field: FC<{ id: string; label: string; children: ReactNode; hint?: string }> = ({
  id,
  label,
  children,
  hint,
}): ReactElement => (
  <div>
    <label htmlFor={id} className={labelClassName}>
      {label}
    </label>
    {children}
    {hint !== undefined && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{hint}</p>}
  </div>
);

export const PensionPlannerForm: FC<PensionPlannerFormProps> = ({
  inputs,
  onChange,
  onSubmit,
  errors,
  isCalculating,
}): ReactElement => {
  const numberField = (
    id: string,
    label: string,
    key: keyof PlannerInputs,
    options: { step?: string; hint?: string; min?: string } = {},
  ): ReactElement => (
    <Field id={id} label={label} hint={options.hint}>
      <input
        id={id}
        type="number"
        step={options.step ?? "any"}
        min={options.min}
        value={inputs[key] as string}
        onChange={(event: ChangeEvent<HTMLInputElement>): void => onChange({ [key]: event.target.value })}
        className={inputClassName}
      />
    </Field>
  );

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <fieldset className={fieldsetClassName}>
        <legend className={legendClassName}>About you</legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {numberField("current-age", "Current age", "currentAge", { step: "1", min: "16" })}
          {numberField("retirement-age", "Planned retirement age", "retirementAge", { step: "1" })}
          {numberField("current-pot", "Current pension pot (£)", "currentPot", { min: "0" })}
          {numberField("plan-to-age", "Plan until age", "planToAge", {
            step: "1",
            hint: "How long the money needs to last.",
          })}
        </div>
      </fieldset>

      <fieldset className={fieldsetClassName}>
        <legend className={legendClassName}>Contributions</legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {numberField("annual-salary", "Gross annual salary (£)", "annualSalary", { min: "0" })}

          <Field id="employee-contribution" label="Your contribution">
            <div className="flex gap-2">
              <input
                id="employee-contribution"
                type="number"
                step="any"
                min="0"
                value={inputs.employeeContribution}
                onChange={(event: ChangeEvent<HTMLInputElement>): void =>
                  onChange({ employeeContribution: event.target.value })
                }
                className={inputClassName}
              />
              <select
                aria-label="Your contribution type"
                value={inputs.employeeContributionKind}
                onChange={(event: ChangeEvent<HTMLSelectElement>): void =>
                  onChange({ employeeContributionKind: event.target.value as ContributionKind })
                }
                className={inputClassName}
              >
                {CONTRIBUTION_KIND_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </Field>

          <Field id="employer-contribution" label="Employer contribution">
            <div className="flex gap-2">
              <input
                id="employer-contribution"
                type="number"
                step="any"
                min="0"
                value={inputs.employerContribution}
                onChange={(event: ChangeEvent<HTMLInputElement>): void =>
                  onChange({ employerContribution: event.target.value })
                }
                className={inputClassName}
              />
              <select
                aria-label="Employer contribution type"
                value={inputs.employerContributionKind}
                onChange={(event: ChangeEvent<HTMLSelectElement>): void =>
                  onChange({ employerContributionKind: event.target.value as ContributionKind })
                }
                className={inputClassName}
              >
                {CONTRIBUTION_KIND_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </Field>
        </div>
      </fieldset>

      <fieldset className={fieldsetClassName}>
        <legend className={legendClassName}>Growth model</legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field
            id="growth-model"
            label="Financial model"
            hint="AS TM1 is the standard used on annual pension statements."
          >
            <select
              id="growth-model"
              value={inputs.growthModel}
              onChange={(event: ChangeEvent<HTMLSelectElement>): void => onChange({ growthModel: event.target.value })}
              className={inputClassName}
            >
              <optgroup label="AS TM1 (pension statements and dashboards)">
                {TM1_PRESETS.map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.label}
                  </option>
                ))}
              </optgroup>
              <optgroup label="FCA Key Features Illustration rates">
                {FCA_PRESETS.map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.label}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Other">
                <option value="custom">Custom growth and inflation</option>
                <option value="monte-carlo">Monte Carlo simulation</option>
              </optgroup>
            </select>
          </Field>

          {numberField("annual-fee", "Annual charges (%)", "annualFee", {
            min: "0",
            hint: "Platform and fund fees deducted each year.",
          })}

          {inputs.growthModel === "custom" && (
            <>
              {numberField("custom-growth", "Growth rate (% a year)", "customGrowth")}
              {numberField("custom-inflation", "Inflation (% a year)", "customInflation")}
            </>
          )}

          {inputs.growthModel === "monte-carlo" && (
            <Field
              id="allocation-preset"
              label="Investment mix"
              hint="Sets the expected return and volatility used in the simulation."
            >
              <select
                id="allocation-preset"
                value={inputs.allocationPreset}
                onChange={(event: ChangeEvent<HTMLSelectElement>): void =>
                  onChange({ allocationPreset: event.target.value as PlannerInputs["allocationPreset"] })
                }
                className={inputClassName}
              >
                {MONTE_CARLO_PRESETS.map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.label}
                  </option>
                ))}
              </select>
            </Field>
          )}
        </div>
      </fieldset>

      <fieldset className={fieldsetClassName}>
        <legend className={legendClassName}>State pension</legend>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              id="include-state-pension"
              type="checkbox"
              checked={inputs.includeStatePension}
              onChange={(event: ChangeEvent<HTMLInputElement>): void =>
                onChange({ includeStatePension: event.target.checked })
              }
              className={checkboxClassName}
            />
            <label htmlFor="include-state-pension" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Include the state pension in my retirement income
            </label>
          </div>

          {inputs.includeStatePension && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {numberField("ni-qualifying-years", "National Insurance qualifying years", "niQualifyingYears", {
                step: "1",
                min: "0",
                hint: "35 years earns the full amount; check yours on the GOV.UK state pension forecast.",
              })}
            </div>
          )}
        </div>
      </fieldset>

      <fieldset className={fieldsetClassName}>
        <legend className={legendClassName}>Retirement income</legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field id="target-income-preset" label="Target income" hint="Based on the Retirement Living Standards.">
            <select
              id="target-income-preset"
              value={inputs.targetIncomePreset}
              onChange={(event: ChangeEvent<HTMLSelectElement>): void =>
                onChange({ targetIncomePreset: event.target.value as PlannerInputs["targetIncomePreset"] })
              }
              className={inputClassName}
            >
              <option value="minimum">Minimum (£{PLSA_STANDARDS.minimum.toLocaleString("en-GB")} a year)</option>
              <option value="moderate">Moderate (£{PLSA_STANDARDS.moderate.toLocaleString("en-GB")} a year)</option>
              <option value="comfortable">
                Comfortable (£{PLSA_STANDARDS.comfortable.toLocaleString("en-GB")} a year)
              </option>
              <option value="custom">Custom amount</option>
            </select>
          </Field>

          {inputs.targetIncomePreset === "custom" &&
            numberField("target-income", "Net annual income needed (£)", "targetIncome", {
              min: "0",
              hint: "After income tax, in today's money.",
            })}

          <Field id="decumulation-mode" label="How you take your pension">
            <select
              id="decumulation-mode"
              value={inputs.decumulationMode}
              onChange={(event: ChangeEvent<HTMLSelectElement>): void =>
                onChange({ decumulationMode: event.target.value as PlannerInputs["decumulationMode"] })
              }
              className={inputClassName}
            >
              <option value="drawdown">Flexi-access drawdown</option>
              <option value="annuity">Buy an annuity</option>
            </select>
          </Field>

          {inputs.decumulationMode === "drawdown"
            ? numberField("withdrawal-rate", "Withdrawal rate (%)", "withdrawalRate", {
                hint: "The 4% rule is a common starting point; 3.5% is more cautious.",
              })
            : numberField("annuity-rate", "Annuity rate (%)", "annuityRate", {
                hint: "Level single-life annuities pay around 6.5% at age 65.",
              })}
        </div>
      </fieldset>

      <fieldset className={fieldsetClassName}>
        <legend className={legendClassName}>Early retirement (FIRE)</legend>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              id="fire-enabled"
              type="checkbox"
              checked={inputs.fireEnabled}
              onChange={(event: ChangeEvent<HTMLInputElement>): void => onChange({ fireEnabled: event.target.checked })}
              className={checkboxClassName}
            />
            <label htmlFor="fire-enabled" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Check whether I can retire early
            </label>
          </div>

          {inputs.fireEnabled && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {numberField("bridge-pot", "ISA and other savings (£)", "bridgePot", {
                min: "0",
                hint: "Savings outside a pension, available before pension access age.",
              })}
              {numberField("annual-bridge-saving", "Annual saving into those (£)", "annualBridgeSaving", {
                min: "0",
              })}
            </div>
          )}
        </div>
      </fieldset>

      {errors.length > 0 && (
        <ul className="rounded bg-red-100 p-4 text-sm text-red-800 dark:bg-red-900 dark:text-red-100">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <button
        type="submit"
        disabled={isCalculating}
        className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 dark:bg-primary-700 dark:hover:bg-primary-800 w-full rounded px-4 py-3 font-semibold text-white focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-60"
      >
        {isCalculating ? "Calculating…" : "Calculate my pension"}
      </button>
    </form>
  );
};
