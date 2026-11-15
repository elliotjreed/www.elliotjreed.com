import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FrequentlyAskedQuestions } from "./FrequentlyAskedQuestions";

const questions = [
  { question: "Is this financial advice?", answer: "No." },
  { question: "Is my data stored?", answer: "Only in your browser." },
];

describe("FrequentlyAskedQuestions", () => {
  it("renders a labelled section with a heading", () => {
    render(<FrequentlyAskedQuestions questions={questions} />);

    expect(screen.getByRole("region", { name: "Frequently asked questions" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Frequently asked questions" })).toBeInTheDocument();
  });

  it("shows every question as a heading followed by its answer", () => {
    render(<FrequentlyAskedQuestions questions={questions} />);

    expect(screen.getByRole("heading", { level: 3, name: "Is this financial advice?" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Is my data stored?" })).toBeInTheDocument();
    expect(screen.getByText("Only in your browser.")).toBeInTheDocument();
  });
});
