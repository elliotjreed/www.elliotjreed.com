import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { PensionPlanner } from "./PensionPlanner";

const submit = (): void => {
  fireEvent.click(screen.getByRole("button", { name: /calculate my pension/i }));
};

describe("PensionPlanner", () => {
  // Inputs persist to local storage, so each test needs a clean slate
  beforeEach((): void => {
    window.localStorage.clear();
  });

  it("renders the heading and the disclaimer before any calculation", () => {
    render(<PensionPlanner />);

    expect(screen.getByRole("heading", { level: 1, name: /pension planner/i })).toBeInTheDocument();
    expect(screen.getByText(/not financial advice/i)).toBeInTheDocument();
  });

  it("shows no results until the form is submitted", () => {
    render(<PensionPlanner />);

    expect(screen.queryByRole("heading", { name: /your projection/i })).not.toBeInTheDocument();
  });

  it("shows a projection after submitting the default inputs", () => {
    render(<PensionPlanner />);
    submit();

    expect(screen.getByRole("heading", { name: /your projection/i })).toBeInTheDocument();
    expect(screen.getByText(/projected pot at age/i)).toBeInTheDocument();
  });

  it("renders the projection chart and the year-by-year table after calculating", () => {
    render(<PensionPlanner />);
    submit();

    expect(screen.getByRole("img", { name: /projected pension pot/i })).toBeInTheDocument();
    expect(screen.getByRole("table", { name: /year-by-year/i })).toBeInTheDocument();
  });

  it("reports validation errors instead of results for impossible ages", () => {
    render(<PensionPlanner />);

    fireEvent.change(screen.getByLabelText(/current age/i), { target: { value: "70" } });
    fireEvent.change(screen.getByLabelText(/planned retirement age/i), { target: { value: "65" } });
    submit();

    expect(screen.getByText(/retirement age must be after your current age/i)).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /your projection/i })).not.toBeInTheDocument();
  });

  it("reveals the National Insurance field only when the state pension is included", () => {
    render(<PensionPlanner />);

    expect(screen.getByLabelText(/national insurance qualifying years/i)).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText(/include the state pension/i));

    expect(screen.queryByLabelText(/national insurance qualifying years/i)).not.toBeInTheDocument();
  });

  it("reveals the bridge savings fields only when early retirement is enabled", () => {
    render(<PensionPlanner />);

    expect(screen.queryByLabelText(/isa and other savings/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText(/check whether i can retire early/i));

    expect(screen.getByLabelText(/isa and other savings/i)).toBeInTheDocument();
  });

  it("shows the FIRE verdict when early retirement is enabled", () => {
    render(<PensionPlanner />);

    fireEvent.click(screen.getByLabelText(/check whether i can retire early/i));
    fireEvent.change(screen.getByLabelText(/isa and other savings/i), { target: { value: "250000" } });
    submit();

    expect(screen.getByRole("heading", { name: /early retirement \(fire\) viability/i })).toBeInTheDocument();
    expect(screen.getByText(/your fire number/i)).toBeInTheDocument();
  });

  it("offers monthly as well as yearly monetary contributions", () => {
    render(<PensionPlanner />);

    const options = Array.from(screen.getByLabelText(/your contribution type/i).querySelectorAll("option")).map(
      (option) => option.textContent,
    );

    expect(options).toEqual(["% of salary", "£ a month", "£ a year"]);
  });

  it("calculates a projection from monthly contributions", () => {
    render(<PensionPlanner />);

    fireEvent.change(screen.getByLabelText(/your contribution type/i), { target: { value: "monthlyAmount" } });
    fireEvent.change(screen.getByLabelText(/^your contribution$/i), { target: { value: "300" } });
    submit();

    expect(screen.getByRole("heading", { name: /your projection/i })).toBeInTheDocument();
  });

  it("treats a monthly contribution as twelve times the yearly equivalent", () => {
    const { unmount } = render(<PensionPlanner />);

    fireEvent.change(screen.getByLabelText(/your contribution type/i), { target: { value: "monthlyAmount" } });
    fireEvent.change(screen.getByLabelText(/^your contribution$/i), { target: { value: "300" } });
    submit();
    const monthlyPot = screen.getByText(/projected pot at age/i).parentElement?.textContent;

    unmount();
    window.localStorage.clear();
    render(<PensionPlanner />);

    fireEvent.change(screen.getByLabelText(/your contribution type/i), { target: { value: "annualAmount" } });
    fireEvent.change(screen.getByLabelText(/^your contribution$/i), { target: { value: "3600" } });
    submit();

    expect(screen.getByText(/projected pot at age/i).parentElement?.textContent).toBe(monthlyPot);
  });

  it("shows custom growth fields when the custom model is selected", () => {
    render(<PensionPlanner />);

    expect(screen.queryByLabelText(/growth rate/i)).not.toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/financial model/i), { target: { value: "custom" } });

    expect(screen.getByLabelText(/growth rate/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/inflation/i)).toBeInTheDocument();
  });

  it("shows the investment mix and a success probability for the Monte Carlo model", () => {
    render(<PensionPlanner />);

    fireEvent.change(screen.getByLabelText(/financial model/i), { target: { value: "monte-carlo" } });

    expect(screen.getByLabelText(/investment mix/i)).toBeInTheDocument();

    submit();

    expect(screen.getByText(/chance of lasting/i)).toBeInTheDocument();
  });

  it("swaps the withdrawal rate for an annuity rate when buying an annuity", () => {
    render(<PensionPlanner />);

    expect(screen.getByLabelText(/withdrawal rate/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/how you take your pension/i), { target: { value: "annuity" } });

    expect(screen.queryByLabelText(/withdrawal rate/i)).not.toBeInTheDocument();
    expect(screen.getByLabelText(/annuity rate/i)).toBeInTheDocument();

    submit();

    expect(screen.getByText(/annuity income a year/i)).toBeInTheDocument();
  });

  it("shows the target income field only for a custom target", () => {
    render(<PensionPlanner />);

    expect(screen.queryByLabelText(/net annual income needed/i)).not.toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/target income/i), { target: { value: "custom" } });

    expect(screen.getByLabelText(/net annual income needed/i)).toBeInTheDocument();
  });

  it("lists the assumptions used once results are shown", () => {
    render(<PensionPlanner />);
    submit();

    expect(screen.getByRole("heading", { name: /assumptions used/i })).toBeInTheDocument();
  });

  it("persists inputs to local storage", () => {
    render(<PensionPlanner />);

    fireEvent.change(screen.getByLabelText(/current pension pot/i), { target: { value: "123456" } });

    expect(window.localStorage.getItem("pension-planner-inputs")).toContain("123456");
  });

  it("restores persisted inputs on mount", () => {
    window.localStorage.setItem("pension-planner-inputs", JSON.stringify({ currentPot: "987654", currentAge: "45" }));

    render(<PensionPlanner />);

    expect(screen.getByLabelText(/current pension pot/i)).toHaveValue(987654);
    expect(screen.getByLabelText(/current age/i)).toHaveValue(45);
  });
});
