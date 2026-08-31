import type { FC, ReactElement } from "react";
import type { YearRow } from "~/utils/pension/projection";
import { formatGBP } from "./formatting";

interface YearByYearTableProps {
  rows: YearRow[];
}

const cellClassName = "px-3 py-2 text-right whitespace-nowrap";
const headerClassName = "px-3 py-2 text-right font-semibold whitespace-nowrap";

export const YearByYearTable: FC<YearByYearTableProps> = ({ rows }): ReactElement | null => {
  if (rows.length === 0) {
    return null;
  }

  return (
    <details className="rounded-lg border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800">
      <summary className="cursor-pointer font-semibold text-gray-900 dark:text-gray-100">Year-by-year figures</summary>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm text-gray-700 dark:text-gray-300">
          <caption className="sr-only">
            Year-by-year pension projection showing pot value, contributions, growth, withdrawals, tax and income for
            each age
          </caption>
          <thead className="border-b border-gray-200 text-gray-900 dark:border-gray-700 dark:text-gray-100">
            <tr>
              <th scope="col" className="px-3 py-2 text-left font-semibold">
                Age
              </th>
              <th scope="col" className={headerClassName}>
                Pot at start
              </th>
              <th scope="col" className={headerClassName}>
                Contributions
              </th>
              <th scope="col" className={headerClassName}>
                Growth
              </th>
              <th scope="col" className={headerClassName}>
                Withdrawal
              </th>
              <th scope="col" className={headerClassName}>
                State pension
              </th>
              <th scope="col" className={headerClassName}>
                Tax
              </th>
              <th scope="col" className={headerClassName}>
                Net income
              </th>
              <th scope="col" className={headerClassName}>
                Pot at end
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.age} className="border-b border-gray-100 dark:border-gray-700">
                <th scope="row" className="px-3 py-2 text-left font-normal">
                  {row.age}
                </th>
                <td className={cellClassName}>{formatGBP(row.potStart)}</td>
                <td className={cellClassName}>{formatGBP(row.contributions)}</td>
                <td className={cellClassName}>{formatGBP(row.growth)}</td>
                <td className={cellClassName}>{formatGBP(row.grossWithdrawal)}</td>
                <td className={cellClassName}>{formatGBP(row.statePension)}</td>
                <td className={cellClassName}>{formatGBP(row.taxPaid)}</td>
                <td className={cellClassName}>{formatGBP(row.netIncome)}</td>
                <td className={cellClassName}>{formatGBP(row.potEnd)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
};
