import type { ReactElement } from "react";
import { StayAlert } from "~/components/StayAlert/StayAlert";

export const meta = () => [
  { title: "Stay alert poster generator | EJR" },
  {
    name: "description",
    content: "Generate your own 'Stay Alert' poster. A bit of a throwback to when I was bored over the COVID times...",
  },
];

export default (): ReactElement => (
  <section className="divide-y divide-gray-200 dark:divide-gray-700">
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-700 dark:text-gray-200 sm:text-4xl sm:leading-10 md:text-6xl">
        &ldquo;Stay alert&rdquo; poster generator
      </h1>

      <p className="text-lg leading-7 text-gray-600 dark:text-gray-300">
        Fill in the box below, and click the <strong>download</strong> button when you&apos;re done.
      </p>
    </div>

    <StayAlert />
  </section>
);
