import type { ReactElement } from "react";
import { CodeSnippet } from "~/components/CodeSnippet/CodeSnippet";

export const meta = () => [
  { title: "Copy MySQL database table to new table | EJR" },
  {
    name: "description",
    content: "How to copy MySQL / MariaDB database table data to a new table.",
  },
  {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "Copy MySQL / MariaDB database table data to a new table",
      name: "How to copy MySQL / MariaDB database table data to a new table",
      dateCreated: "2022-04-30T19:00:00+01:00",
      datePublished: "2022-04-30T19:00:00+01:00",
      inLanguage: "en-GB",
      author: {
        "@type": "Person",
        additionalName: "John",
        alternateName: "Elliot Reed",
        familyName: "Reed",
        givenName: "Elliot",
        name: "Elliot J. Reed",
        url: "https://www.elliotjreed.com",
      },
      copyrightHolder: {
        "@type": "Person",
        additionalName: "John",
        alternateName: "Elliot Reed",
        familyName: "Reed",
        givenName: "Elliot",
        name: "Elliot J. Reed",
        url: "https://www.elliotjreed.com",
      },
    },
  },
];

export default (): ReactElement => (
  <section className="divide-y divide-gray-200 dark:divide-gray-700">
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-700 dark:text-gray-200 sm:text-4xl sm:leading-10 md:text-6xl">
        Copy MySQL / MariaDB database table data to a new table
      </h1>
      <p className="text-lg leading-7 text-gray-600 dark:text-gray-300">
        There are two easy methods for backing up / copying a database table to a new table in MySQL or MariaDB.
      </p>
    </div>

    <div className="prose max-w-none dark:prose-dark">
      <section>
        <p>
          The first method will copy just the table data and not any indexes or triggers, whilst the second method will
          copy over the indexes and triggers as well as the data.
        </p>

        <p>
          Copy to new table without indexes and triggers (note: this will not copy the AUTO_INCREMENT value, will not
          carry over foreign key constraints, and will not copy indexes and triggers.):
        </p>
        <CodeSnippet code="CREATE TABLE my_table_copy AS SELECT * FROM my_table;" title="Values only" />

        <p>Copy to new table with indexes and triggers:</p>
        <CodeSnippet
          code="CREATE TABLE my_table_copy LIKE my_table; INSERT INTO my_table_copy SELECT * FROM my_table;"
          title="Values, indexes, triggers, etc."
        />
      </section>
    </div>
  </section>
);
