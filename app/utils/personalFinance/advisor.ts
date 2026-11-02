/**
 * Walks the flowchart gates in order to work out which step applies to someone.
 *
 * The flowchart is a priority order, so the first step that still needs work is
 * the one to act on. Gates below it are not reached, and any answers already
 * given to them are ignored until the earlier step is cleared.
 */

import type { FlowchartGate, FlowchartOutcome, Refinement } from "./flowchart";
import { FINAL_OUTCOME_ID, FLOWCHART_GATES, outcomeById } from "./flowchart";

export type Answers = Record<string, string>;

export type AdviceState =
  | { status: "question"; gate: FlowchartGate }
  | { status: "refinement"; outcome: FlowchartOutcome; refinement: Refinement }
  | { status: "outcome"; outcome: FlowchartOutcome; refinementGuidance?: string };

const isAnswered = (answers: Answers, gate: FlowchartGate): boolean =>
  answers[gate.id] === "yes" || answers[gate.id] === "no";

const guidanceFor = (refinement: Refinement, answer: string | undefined): string | undefined =>
  refinement.options.find((option) => option.value === answer)?.guidance;

/**
 * Resolves the next thing to show: another question, a refinement, or the outcome.
 *
 * @example
 * resolveAdvice({ "covers-essentials": "no" }) // outcome: urgent debt advice
 */
export function resolveAdvice(answers: Answers): AdviceState {
  for (const gate of FLOWCHART_GATES) {
    if (!isAnswered(answers, gate)) {
      return { status: "question", gate };
    }

    if (answers[gate.id] === gate.triggerAnswer) {
      return resolveOutcome(outcomeById(gate.outcomeId), answers);
    }
  }

  return resolveOutcome(outcomeById(FINAL_OUTCOME_ID), answers);
}

function resolveOutcome(outcome: FlowchartOutcome, answers: Answers): AdviceState {
  if (outcome.refinement !== undefined) {
    const guidance = guidanceFor(outcome.refinement, answers[outcome.refinement.id]);

    if (guidance === undefined) {
      return { status: "refinement", outcome, refinement: outcome.refinement };
    }

    return { status: "outcome", outcome, refinementGuidance: guidance };
  }

  return { status: "outcome", outcome };
}

/**
 * The step numbers already cleared, for showing progress along the roadmap.
 */
export function clearedStepNumbers(answers: Answers): number[] {
  const cleared: number[] = [];

  for (const gate of FLOWCHART_GATES) {
    if (!isAnswered(answers, gate) || answers[gate.id] === gate.triggerAnswer) {
      break;
    }

    const stepNumber = outcomeById(gate.outcomeId).stepNumber;

    if (!cleared.includes(stepNumber)) {
      cleared.push(stepNumber);
    }
  }

  return cleared;
}

/**
 * How many gate questions have been answered, for a progress indicator.
 */
export function progress(answers: Answers): { answered: number; total: number } {
  return {
    answered: FLOWCHART_GATES.filter((gate) => isAnswered(answers, gate)).length,
    total: FLOWCHART_GATES.length,
  };
}
