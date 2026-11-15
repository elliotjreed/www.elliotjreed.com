import type { ReactElement } from "react";
import type { FaqItem } from "~/data/schemaData";

interface FrequentlyAskedQuestionsProps {
  questions: FaqItem[];
}

export const FrequentlyAskedQuestions = ({ questions }: FrequentlyAskedQuestionsProps): ReactElement => (
  <section aria-labelledby="faq" className="prose ejr-prose mx-auto max-w-6xl p-4">
    <h2 id="faq">Frequently asked questions</h2>
    {questions.map(({ question, answer }) => (
      <div key={question}>
        <h3>{question}</h3>
        <p>{answer}</p>
      </div>
    ))}
  </section>
);
