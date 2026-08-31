import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { YearRow } from "~/utils/pension/projection";
import { YearByYearTable } from "./YearByYearTable";

const rows: YearRow[] = [
  {
    age: 65,
    potStart: 500_000,
    contributions: 0,
    growth: 12_000,
    grossWithdrawal: 22_000,
    taxPaid: 2_000,
    statePension: 0,
    netIncome: 20_000,
    potEnd: 490_000,
  },
  {
    age: 66,
    potStart: 490_000,
    contributions: 0,
    growth: 11_500,
    grossWithdrawal: 22_000,
    taxPaid: 2_000,
    statePension: 12_548,
    netIncome: 20_000,
    potEnd: 479_500,
  },
];

describe("YearByYearTable", () => {
  it("renders a row for each projected year", () => {
    render(<YearByYearTable rows={rows} />);

    // One header row plus one row per year
    expect(screen.getAllByRole("row")).toHaveLength(rows.length + 1);
  });

  it("renders a caption describing the table", () => {
    render(<YearByYearTable rows={rows} />);

    expect(screen.getByRole("table", { name: /year-by-year/i })).toBeInTheDocument();
  });

  it("formats monetary values as pounds sterling", () => {
    render(<YearByYearTable rows={rows} />);

    expect(screen.getByText("£500,000")).toBeInTheDocument();
    expect(screen.getByText("£12,548")).toBeInTheDocument();
  });

  it("shows the age for each row", () => {
    render(<YearByYearTable rows={rows} />);

    expect(screen.getByText("65")).toBeInTheDocument();
    expect(screen.getByText("66")).toBeInTheDocument();
  });

  it("renders nothing when there are no rows", () => {
    const { container } = render(<YearByYearTable rows={[]} />);

    expect(container.querySelector("table")).toBeNull();
  });
});
