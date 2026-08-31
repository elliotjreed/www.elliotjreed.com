import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { FireAssessment } from "~/utils/pension/fire";
import { FireVerdict } from "./FireVerdict";

const viableAssessment: FireAssessment = {
  viable: true,
  bridgeShortfall: 0,
  pensionShortfallAge: null,
  accumulationRows: [],
  rows: [],
};

const shortfallAssessment: FireAssessment = {
  viable: false,
  bridgeShortfall: 45_000,
  pensionShortfallAge: null,
  accumulationRows: [],
  rows: [],
};

describe("FireVerdict", () => {
  it("confirms viability when the plan works at the chosen age", () => {
    render(<FireVerdict retirementAge={55} assessment={viableAssessment} earliestAge={53} targetPot={625_000} />);

    expect(screen.getByText(/on track to retire at 55/i)).toBeInTheDocument();
  });

  it("shows the FIRE number", () => {
    render(<FireVerdict retirementAge={55} assessment={viableAssessment} earliestAge={53} targetPot={625_000} />);

    expect(screen.getByText("£625,000")).toBeInTheDocument();
  });

  it("reports the bridge shortfall when the bridge pot is too small", () => {
    render(<FireVerdict retirementAge={45} assessment={shortfallAssessment} earliestAge={58} targetPot={625_000} />);

    expect(screen.getByText(/£45,000/)).toBeInTheDocument();
    expect(screen.getByText(/bridge/i)).toBeInTheDocument();
  });

  it("reports the pension shortfall age when the pension runs out", () => {
    render(
      <FireVerdict
        retirementAge={55}
        assessment={{
          viable: false,
          bridgeShortfall: 0,
          pensionShortfallAge: 79,
          accumulationRows: [],
          rows: [],
        }}
        earliestAge={60}
        targetPot={625_000}
      />,
    );

    expect(screen.getByText(/age 79/i)).toBeInTheDocument();
  });

  it("shows the earliest viable retirement age", () => {
    render(<FireVerdict retirementAge={45} assessment={shortfallAssessment} earliestAge={58} targetPot={625_000} />);

    expect(screen.getByText(/58/)).toBeInTheDocument();
  });

  it("states when no retirement age is viable", () => {
    render(<FireVerdict retirementAge={45} assessment={shortfallAssessment} earliestAge={null} targetPot={625_000} />);

    expect(screen.getByText(/no retirement age in this plan is viable/i)).toBeInTheDocument();
  });

  it("shows the simulated success probability when supplied", () => {
    render(
      <FireVerdict
        retirementAge={55}
        assessment={viableAssessment}
        earliestAge={53}
        targetPot={625_000}
        successProbability={0.72}
      />,
    );

    expect(screen.getByText(/72%/)).toBeInTheDocument();
  });
});
