import type { FC, ReactElement } from "react";
import {
  ANNUAL_ALLOWANCE,
  LUMP_SUM_ALLOWANCE,
  PRIVATE_PENSION_ACCESS_AGE,
  STATE_PENSION_WEEKLY,
  TAX_YEAR,
} from "~/utils/pension/constants";
import { formatGBP } from "./formatting";

interface AssumptionsDisclosureProps {
  /** Label of the growth model the current results were produced with. */
  modelLabel: string;
}

export const AssumptionsDisclosure: FC<AssumptionsDisclosureProps> = ({ modelLabel }): ReactElement => (
  <section aria-labelledby="assumptions-heading" className="space-y-4">
    <h2 id="assumptions-heading" className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
      Assumptions used
    </h2>

    <div className="rounded-lg border border-gray-200 bg-white p-6 text-sm text-gray-700 shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
      <p className="mb-3">
        Figures use the <strong>{TAX_YEAR}</strong> tax year and the growth model <strong>{modelLabel}</strong>. All
        amounts are shown in today&rsquo;s money, so they already allow for inflation.
      </p>

      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong>Growth models.</strong> AS TM1 rates come from the Financial Reporting Council standard behind annual
          pension statements and the Pensions Dashboards, which assigns each fund a volatility group. FCA rates are the
          maximum projection rates for Key Features Illustrations. The Monte Carlo model samples returns randomly each
          year, so it shows sequence-of-returns risk that a single fixed rate hides.
        </li>
        <li>
          <strong>Income tax.</strong> England, Wales and Northern Ireland rates and bands only. Scottish rates,
          National Insurance and salary sacrifice are not modelled.
        </li>
        <li>
          <strong>Tax-free cash.</strong> A quarter of each withdrawal is treated as tax-free until the Lump Sum
          Allowance of {formatGBP(LUMP_SUM_ALLOWANCE)} is used, after which withdrawals are fully taxable.
        </li>
        <li>
          <strong>State pension.</strong> The full new State Pension of £{STATE_PENSION_WEEKLY.toFixed(2)} a week needs
          35 qualifying National Insurance years, with a minimum of 10 for any payment. Triple lock rises are assumed to
          keep pace with inflation, so its value stays flat in today&rsquo;s money. State pension age is a banded
          approximation, as the exact age depends on your date of birth.
        </li>
        <li>
          <strong>Pension access age.</strong> Private pensions are assumed accessible from age{" "}
          {PRIVATE_PENSION_ACCESS_AGE}, reflecting the rise from 55 in April 2028.
        </li>
        <li>
          <strong>Annual allowance.</strong> Contributions above {formatGBP(ANNUAL_ALLOWANCE)} a year trigger a warning
          only. Carry-forward, tapering for high earners and the money purchase annual allowance are not modelled.
        </li>
        <li>
          <strong>Bridge savings.</strong> Savings held outside a pension (such as ISAs) are treated as free of income
          tax on withdrawal. Capital gains tax on general investment accounts is not modelled.
        </li>
        <li>
          <strong>Salary and spending.</strong> Both are assumed to rise with inflation, so they stay constant in
          today&rsquo;s money. Contributions continue at the same rate until retirement.
        </li>
      </ul>
    </div>

    <p className="rounded border border-amber-300 bg-amber-100 p-4 text-sm text-amber-900 dark:border-amber-600 dark:bg-amber-900 dark:text-amber-100">
      <strong>This is not financial advice.</strong> This calculator is a guidance tool using simplified assumptions,
      and its projections are not a promise of what you will receive. Investment returns are not guaranteed and tax
      rules change. For advice on your own circumstances, speak to a regulated financial adviser. Free, impartial
      guidance is available from MoneyHelper and Pension Wise.
    </p>
  </section>
);
