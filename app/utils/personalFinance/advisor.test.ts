import { describe, expect, it } from "vitest";
import { type Answers, clearedStepNumbers, progress, resolveAdvice } from "./advisor";
import { FLOWCHART_GATES } from "./flowchart";

/** Answers that clear every gate, reaching the long-term investing outcome. */
const allClear: Answers = {
  "covers-essentials": "yes",
  "expensive-debt": "no",
  "starter-fund": "yes",
  "pension-match": "no",
  "other-debt": "no",
  "full-fund": "yes",
  "goals-written": "yes",
  "short-term-goal": "no",
};

describe("resolveAdvice", () => {
  it("asks the first gate when nothing has been answered", () => {
    const state = resolveAdvice({});

    expect(state.status).toBe("question");
    expect(state.status === "question" && state.gate.id).toBe("covers-essentials");
  });

  it("asks each gate in turn while they are cleared", () => {
    const state = resolveAdvice({ "covers-essentials": "yes" });

    expect(state.status === "question" && state.gate.id).toBe("expensive-debt");
  });

  it("stops at the first gate that is not cleared", () => {
    const state = resolveAdvice({ "covers-essentials": "yes", "expensive-debt": "yes" });

    expect(state.status).toBe("outcome");
    expect(state.status === "outcome" && state.outcome.id).toBe("expensive-debt");
    expect(state.status === "outcome" && state.outcome.stepNumber).toBe(1);
  });

  it("routes someone who cannot cover essentials to urgent debt advice", () => {
    const state = resolveAdvice({ "covers-essentials": "no" });

    expect(state.status === "outcome" && state.outcome.id).toBe("essentials");
    expect(state.status === "outcome" && state.outcome.urgent).toBe(true);
  });

  it("puts the employer match ahead of cheaper debt", () => {
    const state = resolveAdvice({
      "covers-essentials": "yes",
      "expensive-debt": "no",
      "starter-fund": "yes",
      "pension-match": "yes",
      "other-debt": "yes",
    });

    expect(state.status === "outcome" && state.outcome.id).toBe("pension-match");
  });

  it("puts the starter emergency fund ahead of the employer match", () => {
    const state = resolveAdvice({
      "covers-essentials": "yes",
      "expensive-debt": "no",
      "starter-fund": "no",
      "pension-match": "yes",
    });

    expect(state.status === "outcome" && state.outcome.id).toBe("starter-emergency-fund");
  });

  it("asks a refinement question before giving the emergency fund target", () => {
    const state = resolveAdvice({
      "covers-essentials": "yes",
      "expensive-debt": "no",
      "starter-fund": "yes",
      "pension-match": "no",
      "other-debt": "no",
      "full-fund": "no",
    });

    expect(state.status).toBe("refinement");
    expect(state.status === "refinement" && state.refinement.id).toBe("income-stability");
    expect(state.status === "refinement" && state.outcome.id).toBe("full-emergency-fund");
  });

  it("tailors the emergency fund target once the refinement is answered", () => {
    const base = {
      "covers-essentials": "yes",
      "expensive-debt": "no",
      "starter-fund": "yes",
      "pension-match": "no",
      "other-debt": "no",
      "full-fund": "no",
    };

    const variable = resolveAdvice({ ...base, "income-stability": "variable" });
    const stable = resolveAdvice({ ...base, "income-stability": "very-stable" });

    expect(variable.status === "outcome" && variable.refinementGuidance).toMatch(/nine to twelve months/i);
    expect(stable.status === "outcome" && stable.refinementGuidance).toMatch(/three months/i);
  });

  it("offers Lifetime ISA guidance to a first-time buyer with a short-term goal", () => {
    const state = resolveAdvice({ ...allClear, "short-term-goal": "yes", "first-home": "yes" });

    expect(state.status === "outcome" && state.outcome.id).toBe("short-term");
    expect(state.status === "outcome" && state.refinementGuidance).toMatch(/Lifetime ISA/i);
    expect(state.status === "outcome" && state.refinementGuidance).toMatch(/£450,000/);
  });

  it("reaches long-term investing when every gate is cleared", () => {
    const state = resolveAdvice(allClear);

    expect(state.status).toBe("outcome");
    expect(state.status === "outcome" && state.outcome.id).toBe("long-term");
    expect(state.status === "outcome" && state.outcome.stepNumber).toBe(8);
  });

  it("ignores answers to gates that come after the triggered one", () => {
    const state = resolveAdvice({ ...allClear, "expensive-debt": "yes" });

    expect(state.status === "outcome" && state.outcome.id).toBe("expensive-debt");
  });

  it("treats an unrecognised answer as unanswered", () => {
    const state = resolveAdvice({ "covers-essentials": "maybe" });

    expect(state.status).toBe("question");
    expect(state.status === "question" && state.gate.id).toBe("covers-essentials");
  });
});

describe("clearedStepNumbers", () => {
  it("reports nothing cleared before any answers", () => {
    expect(clearedStepNumbers({})).toEqual([]);
  });

  it("reports the steps cleared before the current one", () => {
    const cleared = clearedStepNumbers({
      "covers-essentials": "yes",
      "expensive-debt": "no",
      "starter-fund": "yes",
      "pension-match": "yes",
    });

    expect(cleared).toContain(1);
    expect(cleared).toContain(2);
    expect(cleared).not.toContain(3);
  });

  it("reports every step cleared when the flowchart is completed", () => {
    expect(clearedStepNumbers(allClear)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });
});

describe("progress", () => {
  it("counts answered gates against the total", () => {
    expect(progress({})).toEqual({ answered: 0, total: FLOWCHART_GATES.length });
    expect(progress({ "covers-essentials": "yes" })).toEqual({ answered: 1, total: FLOWCHART_GATES.length });
  });

  it("does not count refinement answers as gate progress", () => {
    expect(progress({ "covers-essentials": "yes", "income-stability": "typical" }).answered).toBe(1);
  });
});
