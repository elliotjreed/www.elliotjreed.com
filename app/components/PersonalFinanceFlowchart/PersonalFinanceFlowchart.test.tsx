import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { PersonalFinanceFlowchart } from "./PersonalFinanceFlowchart";

const answer = (label: RegExp | string): void => {
  fireEvent.click(screen.getByRole("button", { name: label }));
};

/** Clears every gate, arriving at the long-term investing outcome. */
const answerAllClear = (): void => {
  answer("Yes"); // covers essentials
  answer("No"); // expensive debt
  answer("Yes"); // starter fund
  answer("No"); // pension match
  answer("No"); // other debt
  answer("Yes"); // full fund
  answer("Yes"); // goals written
  answer("No"); // short-term goal
};

describe("PersonalFinanceFlowchart", () => {
  beforeEach((): void => {
    window.localStorage.clear();
  });

  it("renders the heading and attributes the source flowchart", () => {
    render(<PersonalFinanceFlowchart />);

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ukpersonal\.finance/i })).toHaveAttribute(
      "href",
      "https://ukpersonal.finance/flowchart/",
    );
    expect(screen.getByRole("link", { name: /creative commons/i })).toBeInTheDocument();
  });

  it("starts with the first question and a progress indicator", () => {
    render(<PersonalFinanceFlowchart />);

    expect(screen.getByRole("heading", { name: /cover your essential bills/i })).toBeInTheDocument();
    expect(screen.getByText(/question 1 of 8/i)).toBeInTheDocument();
  });

  it("advances through the questions as they are answered", () => {
    render(<PersonalFinanceFlowchart />);

    answer("Yes");

    expect(screen.getByRole("heading", { name: /10% APR/i })).toBeInTheDocument();
    expect(screen.getByText(/question 2 of 8/i)).toBeInTheDocument();
  });

  it("shows the matching step when a gate is not cleared", () => {
    render(<PersonalFinanceFlowchart />);

    answer("Yes");
    answer("Yes"); // has expensive debt

    expect(screen.getByRole("heading", { name: /clear your expensive debt/i })).toBeInTheDocument();
    expect(screen.getByText(/step 1 of 8/i)).toBeInTheDocument();
  });

  it("shows urgent debt advice when essentials are not covered", () => {
    render(<PersonalFinanceFlowchart />);

    answer("No");

    const result = within(screen.getByRole("region", { name: /support with essential costs/i }));

    expect(screen.getByRole("heading", { name: /support with essential costs/i })).toBeInTheDocument();
    expect(result.getByText(/stepchange/i)).toBeInTheDocument();
  });

  it("asks a follow-up before giving an emergency fund target", () => {
    render(<PersonalFinanceFlowchart />);

    answer("Yes");
    answer("No");
    answer("Yes");
    answer("No");
    answer("No");
    answer("No"); // no full emergency fund

    expect(screen.getByText(/how stable and predictable is your household income/i)).toBeInTheDocument();

    answer(/variable/i);

    expect(screen.getByText(/nine to twelve months/i)).toBeInTheDocument();
  });

  it("reaches long-term investing when every step is cleared", () => {
    render(<PersonalFinanceFlowchart />);
    answerAllClear();

    expect(screen.getByRole("heading", { name: /invest for your long-term goals/i })).toBeInTheDocument();
    expect(screen.getByText(/step 8 of 8/i)).toBeInTheDocument();
  });

  it("lets the reader go back and change an answer", () => {
    render(<PersonalFinanceFlowchart />);

    answer("Yes");
    answer("Yes"); // expensive debt, gives an outcome

    expect(screen.getByRole("heading", { name: /clear your expensive debt/i })).toBeInTheDocument();

    answer(/back/i);

    expect(screen.getByRole("heading", { name: /10% APR/i })).toBeInTheDocument();

    answer("No");

    expect(screen.queryByRole("heading", { name: /clear your expensive debt/i })).not.toBeInTheDocument();
  });

  it("starts again from the beginning", () => {
    render(<PersonalFinanceFlowchart />);

    answer("Yes");
    answer("Yes");
    answer(/start again/i);

    expect(screen.getByText(/question 1 of 8/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /cover your essential bills/i })).toBeInTheDocument();
  });

  it("shows the full roadmap with the current step marked", () => {
    render(<PersonalFinanceFlowchart />);
    answerAllClear();

    const roadmap = screen.getByRole("list", { name: /flowchart steps/i });

    expect(roadmap).toBeInTheDocument();
    expect(screen.getByText(/take the employer pension match/i)).toBeInTheDocument();
  });

  it("remembers progress between visits", () => {
    const { unmount } = render(<PersonalFinanceFlowchart />);

    answer("Yes");
    unmount();

    render(<PersonalFinanceFlowchart />);

    expect(screen.getByText(/question 2 of 8/i)).toBeInTheDocument();
  });

  it("states that it is not financial advice", () => {
    render(<PersonalFinanceFlowchart />);

    expect(screen.getByText(/not financial advice/i)).toBeInTheDocument();
  });
});
