import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { PlannerResults } from "~/utils/pension/planner";
import { ResultsSummary } from "./ResultsSummary";

const baseResults: PlannerResults = {
  modelLabel: "AS TM1 group 3 — medium volatility (5% growth)",
  potAtRetirement: 512_345,
  netRetirementIncome: 20_000,
  depletionAge: null,
  retirementAge: 65,
  planToAge: 95,
  chartMedian: [],
  rows: [],
  annualAllowanceWarning: null,
};

describe("ResultsSummary", () => {
  it("shows the projected pot at retirement in today's money", () => {
    render(<ResultsSummary results={baseResults} />);

    expect(screen.getByText("£512,345")).toBeInTheDocument();
    expect(screen.getByText(/pot at age 65/i)).toBeInTheDocument();
  });

  it("shows the net annual retirement income", () => {
    render(<ResultsSummary results={baseResults} />);

    expect(screen.getByText("£20,000")).toBeInTheDocument();
  });

  it("reports that the pot lasts when it is never depleted", () => {
    render(<ResultsSummary results={baseResults} />);

    expect(screen.getByText(/lasts beyond age 95/i)).toBeInTheDocument();
  });

  it("reports the depletion age when the pot runs out", () => {
    render(<ResultsSummary results={{ ...baseResults, depletionAge: 82 }} />);

    expect(screen.getByText(/runs out at age 82/i)).toBeInTheDocument();
  });

  it("shows the Monte Carlo success probability when present", () => {
    render(<ResultsSummary results={{ ...baseResults, successProbability: 0.87 }} />);

    expect(screen.getByText("87%")).toBeInTheDocument();
    expect(screen.getByText(/chance of lasting/i)).toBeInTheDocument();
  });

  it("omits the success probability card for deterministic models", () => {
    render(<ResultsSummary results={baseResults} />);

    expect(screen.queryByText(/chance of lasting/i)).not.toBeInTheDocument();
  });

  it("shows annuity income and lump sum when the annuity option was chosen", () => {
    render(<ResultsSummary results={{ ...baseResults, annuity: { grossAnnual: 24_500, lumpSum: 128_000 } }} />);

    expect(screen.getByText("£24,500")).toBeInTheDocument();
    expect(screen.getByText("£128,000")).toBeInTheDocument();
  });

  it("shows the annual allowance warning when contributions exceed the allowance", () => {
    render(
      <ResultsSummary results={{ ...baseResults, annualAllowanceWarning: "Contributions exceed the allowance" }} />,
    );

    expect(screen.getByText(/contributions exceed the allowance/i)).toBeInTheDocument();
  });
});
