import type { Route } from "./+types/home";
import { StayAlert } from "~/components/StayAlert/StayAlert";

export const meta = ({}: Route.MetaArgs) => [
  { title: "Stay alert poster generator!" },
  { name: "description", content: "Generate your own 'Stay Alert' poster. A bit of a throwback to when I was bored over the COVID times..." }
];

export default function Index() {
  return (
    <section className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          &ldquo;Stay alert&rdquo; poster generator
        </h1>

        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Fill in the box below, and click the <strong>download</strong> button when you&apos;re done.
        </p>
      </div>
      <StayAlert />
    </section>
  );
}
