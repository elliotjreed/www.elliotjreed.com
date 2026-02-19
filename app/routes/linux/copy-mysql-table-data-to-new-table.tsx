import type { ReactElement } from "react";
import { CodeSnippet } from "~/components/CodeSnippet/CodeSnippet";
import { HeadingAnchor } from "~/components/HeadingAnchor/HeadingAnchor";
import { PageHeader } from "~/components/PageHeader/PageHeader";
import { createBreadcrumbs, createTechArticle } from "~/data/schemaData";
import { createAmpLink, createMeta } from "~/utils/seo";

export const meta = () => [
  ...createMeta({
    title: "Copy MySQL database table to new table | EJR",
    description: "How to copy MySQL / MariaDB database table data to a new table.",
    url: "https://www.elliotjreed.com/linux/copy-mysql-table-data-to-new-table",
    type: "article",
    ogImage: "https://www.elliotjreed.com/og.png",
    twitterImage: "https://www.elliotjreed.com/twitter-card.png",
  }),
  {
    "script:ld+json": createTechArticle({
      url: "https://www.elliotjreed.com/linux/copy-mysql-table-data-to-new-table",
      headline: "Copy MySQL / MariaDB database table data to a new table",
      description: "How to copy MySQL / MariaDB database table data to a new table",
      datePublished: "2022-04-30T19:00:00+01:00",
      dateModified: "2026-01-30T00:00:00+00:00",
      articleSection: "Linux",
      keywords: ["MySQL", "MariaDB", "database", "SQL", "Linux"],
      wordCount: 370,
      proficiencyLevel: "Beginner",
    }),
  },
  {
    "script:ld+json": createBreadcrumbs([
      { name: "Home", url: "https://www.elliotjreed.com" },
      { name: "ZSH / Bash Shell Guides", url: "https://www.elliotjreed.com/linux" },
      { name: "Copy MySQL Table", url: "https://www.elliotjreed.com/linux/copy-mysql-table-data-to-new-table" },
    ]),
  },
  createAmpLink("/linux/copy-mysql-table-data-to-new-table"),
];

export default (): ReactElement => (
  <section className="divide-y divide-gray-200 dark:divide-gray-700">
    <PageHeader
      title="Copy MySQL / MariaDB database table data to a new table"
      meta={
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span>By Elliot J. Reed</span>
          <span>•</span>
          <time dateTime="2022-04-30">
            Published: 30<sup>th</sup> April 2022
          </time>
          <span>•</span>
          <time dateTime="2026-01-30">
            Last updated: 30<sup>th</sup> January 2026
          </time>
        </div>
      }
    >
      <p className="prose dark:prose-dark max-w-none text-lg leading-7 text-gray-600 dark:text-gray-300">
        Need to back up a MySQL or MariaDB table? Use <code>CREATE TABLE ... LIKE</code> followed by{" "}
        <code>INSERT INTO ... SELECT</code> for a complete copy with structure, or{" "}
        <code>CREATE TABLE ... AS SELECT</code> for a quick data-only snapshot.
      </p>
    </PageHeader>

    <div className="prose dark:prose-dark max-w-none">
      <section>
        <h2>Table of Contents</h2>
        <ul>
          <li>
            <a href="#simple-copy" className="text-primary-700 dark:text-primary-500 hover:underline">
              Method 1: Simple data copy (fast, data only)
            </a>
          </li>
          <li>
            <a href="#full-copy" className="text-primary-700 dark:text-primary-500 hover:underline">
              Method 2: Full copy with structure (complete backup)
            </a>
          </li>
          <li>
            <a href="#faq" className="text-primary-700 dark:text-primary-500 hover:underline">
              Frequently Asked Questions
            </a>
          </li>
        </ul>
      </section>

      <section>
        <aside className="mb-6 border-l-4 border-yellow-500 bg-yellow-50 p-4 dark:bg-yellow-900/20">
          <p className="font-bold">Warning:</p>
          <p>
            Always back up your data before performing any copy operations, especially if you plan to modify the copied
            table. While copying data is generally safe, having a backup protects against accidental data loss or
            corruption during the process.
          </p>
        </aside>

        <p>
          There are two methods for copying a database table in MySQL or MariaDB. The first method creates a quick
          snapshot of the data only, while the second method creates a complete replica including all structural
          elements.
        </p>

        <HeadingAnchor id="simple-copy">Method 1: Simple data copy (fast, data only)</HeadingAnchor>

        <p>
          This method is fastest and works well for quick data snapshots. However, it will not copy the AUTO_INCREMENT
          value, foreign key constraints, indexes, or triggers:
        </p>
        <CodeSnippet language="sql" code="CREATE TABLE my_table_copy AS SELECT * FROM my_table;" title="Values only" />

        <p>
          <strong>Use this when:</strong> You need a quick backup for testing, data analysis, or temporary storage, and
          you don't need the table structure preserved.
        </p>

        <HeadingAnchor id="full-copy">Method 2: Full copy with structure (complete backup)</HeadingAnchor>

        <p>
          This method creates an exact replica of the table including indexes, triggers, and other structural elements:
        </p>
        <CodeSnippet
          language="sql"
          code="CREATE TABLE my_table_copy LIKE my_table; INSERT INTO my_table_copy SELECT * FROM my_table;"
          title="Values, indexes, triggers, etc."
        />

        <p>
          <strong>Use this when:</strong> You need an exact copy for production backups, testing environments that
          mirror production, or when preserving table structure is important.
        </p>

        <HeadingAnchor id="faq">Frequently Asked Questions</HeadingAnchor>

        <h3>Which method should I use?</h3>
        <p>
          Use Method 1 (CREATE TABLE AS SELECT) when you need a quick data snapshot for analysis or testing and don't
          care about indexes or constraints. Use Method 2 (CREATE TABLE LIKE + INSERT INTO SELECT) when you need an
          exact replica for production backups or when preserving the table structure is important. Method 2 is safer
          for most use cases as it maintains data integrity features like indexes and foreign keys.
        </p>

        <h3>Will this copy triggers and indexes?</h3>
        <p>
          Method 1 (CREATE TABLE AS SELECT) does NOT copy triggers, indexes, or AUTO_INCREMENT settings. Method 2
          (CREATE TABLE LIKE + INSERT INTO SELECT) DOES copy indexes and the AUTO_INCREMENT setting, but triggers are
          NOT copied by either method. If you need to copy triggers, you must recreate them manually using SHOW CREATE
          TRIGGER and then CREATE TRIGGER statements.
        </p>

        <h3>Can I copy to a different database?</h3>
        <p>
          Yes, both methods support copying to a different database. Simply prefix the table name with the database
          name. For example: <code>CREATE TABLE new_db.my_table_copy LIKE old_db.my_table;</code> followed by{" "}
          <code>INSERT INTO new_db.my_table_copy SELECT * FROM old_db.my_table;</code>. Make sure you have appropriate
          permissions on both databases and that the target database exists before attempting the copy.
        </p>
      </section>
    </div>
  </section>
);
