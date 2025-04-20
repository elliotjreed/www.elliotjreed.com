import { Link } from "react-router";
import { emailAddress } from "~/data/emailAddress";

export const meta = () => [
  { title: "TheVape.co.uk - Domain for Sale | EJR" },
  { name: "description", content: "Contact me to submit an offer for The Vape.co.uk domain." },
];

export default function Index() {
  return (
    <section className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-700 dark:text-gray-200 sm:text-4xl sm:leading-10 md:text-6xl">
          TheVape.co.uk
        </h1>
        <p className="text-lg leading-7 text-gray-600 dark:text-gray-300">
          The domain name &ldquo;TheVape.co.uk&rdquo; is available for purchase should you be interested. Email{" "}
          <a href={`mailto:${emailAddress}`}>{emailAddress}</a> to make an enquiry.
        </p>
      </div>
    </section>
  );
}
