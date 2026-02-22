import { createBreadcrumbs, createTechArticle } from "../../../app/data/schemaData.js";
import { codeBlock } from "../../components/codeBlock.js";
import type { AmpPageData } from "../../layout.js";

const PAGE_URL = "https://www.elliotjreed.com/linux/copy-mysql-table-data-to-new-table";

export function renderPage(): AmpPageData {
  return {
    title: "Copy MySQL database table to new table | EJR",
    description: "How to copy MySQL / MariaDB database table data to a new table.",
    canonicalPath: "/linux/copy-mysql-table-data-to-new-table",
    type: "article",
    schemas: [
      createTechArticle({
        url: PAGE_URL,
        headline: "Copy MySQL / MariaDB database table data to a new table",
        description: "How to copy MySQL / MariaDB database table data to a new table",
        datePublished: "2022-04-30T19:00:00+01:00",
        dateModified: "2026-01-30T00:00:00+00:00",
        articleSection: "Linux",
        keywords: ["MySQL", "MariaDB", "database", "SQL", "Linux"],
        wordCount: 370,
        proficiencyLevel: "Beginner",
      }),
      createBreadcrumbs([
        { name: "Home", url: "https://www.elliotjreed.com" },
        { name: "ZSH / Bash Shell Guides", url: "https://www.elliotjreed.com/linux" },
        { name: "Copy MySQL Table", url: PAGE_URL },
      ]),
    ],
    body: `<section class="page-section">
  <div class="page-header">
    <h1 class="page-title">Copy MySQL / MariaDB database table data to a new table</h1>
    <div class="page-meta">
      <span>By Elliot J. Reed</span>
      <span>&#8226;</span>
      <time datetime="2022-04-30">Published: 30th April 2022</time>
      <span>&#8226;</span>
      <time datetime="2026-01-30">Last updated: 30th January 2026</time>
    </div>
    <p class="page-intro">
      Need to back up a MySQL or MariaDB table? Use <code>CREATE TABLE ... LIKE</code> followed by
      <code>INSERT INTO ... SELECT</code> for a complete copy with structure, or
      <code>CREATE TABLE ... AS SELECT</code> for a quick data-only snapshot.
    </p>
  </div>
  <div class="prose">
    <section>
      <h2>Table of Contents</h2>
      <ul>
        <li><a href="#simple-copy">Method 1: Simple data copy (fast, data only)</a></li>
        <li><a href="#full-copy">Method 2: Full copy with structure (complete backup)</a></li>
        <li><a href="#faq">Frequently Asked Questions</a></li>
      </ul>
    </section>

    <section>
      <aside class="warning-box">
        <p><strong>Warning:</strong></p>
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

      <h2 id="simple-copy">Method 1: Simple data copy (fast, data only)</h2>

      <p>
        This method is fastest and works well for quick data snapshots. However, it will not copy the AUTO_INCREMENT
        value, foreign key constraints, indexes, or triggers:
      </p>
      ${codeBlock("CREATE TABLE my_table_copy AS SELECT * FROM my_table;", "Values only", "sql")}

      <p>
        <strong>Use this when:</strong> You need a quick backup for testing, data analysis, or temporary storage, and
        you don&#39;t need the table structure preserved.
      </p>

      <h2 id="full-copy">Method 2: Full copy with structure (complete backup)</h2>

      <p>
        This method creates an exact replica of the table including indexes, triggers, and other structural elements:
      </p>
      ${codeBlock(
        "CREATE TABLE my_table_copy LIKE my_table;\nINSERT INTO my_table_copy SELECT * FROM my_table;",
        "Values, indexes, triggers, etc.",
        "sql",
      )}

      <p>
        <strong>Use this when:</strong> You need an exact copy for production backups, testing environments that
        mirror production, or when preserving table structure is important.
      </p>

      <h2 id="faq">Frequently Asked Questions</h2>

      <h3>Which method should I use?</h3>
      <p>
        Use Method 1 (CREATE TABLE AS SELECT) when you need a quick data snapshot for analysis or testing and don&#39;t
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
        name. For example: <code>CREATE TABLE new_db.my_table_copy LIKE old_db.my_table;</code> followed by
        <code>INSERT INTO new_db.my_table_copy SELECT * FROM old_db.my_table;</code>. Make sure you have appropriate
        permissions on both databases and that the target database exists before attempting the copy.
      </p>
    </section>
  </div>
</section>`,
  };
}
