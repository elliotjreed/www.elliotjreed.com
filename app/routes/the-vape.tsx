import { Link } from "react-router";

import type { Route } from "./+types/home";

export const meta = ({}: Route.MetaArgs) => [
  { title: "TheVape.co.uk - Domain for Sale!" },
  { name: "description", content: "Contact me to submit an offer for The Vape.co.uk domain." }
];

export default function Index() {
  return (
    <section className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          TheVape.co.uk
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          The domain name &ldquo;TheVape.co.uk&rdquo; is available for purchase should you be interested.{" "}
          <Link to="/contact">Contact me</Link> to make an enquiry.
        </p>
      </div>
    </section>
  );
}
