import type { ReactElement } from "react";
import { CodeSnippet } from "~/components/CodeSnippet/CodeSnippet";
import { createBreadcrumbs, createTechArticle } from "~/data/schemaData";

export const meta = () => [
  { title: "Backup and restore Docker database | EJR" },
  {
    name: "description",
    content: "A guide on how to backup and restore MySQL / MariaDB Docker database.",
  },
  { property: "og:title", content: "Backup and restore Docker database" },
  { property: "og:description", content: "A guide on how to backup and restore MySQL / MariaDB Docker database." },
  { property: "og:type", content: "article" },
  { property: "og:url", content: "https://www.elliotjreed.com/docker/backup-and-restore-docker-database" },
  { property: "og:site_name", content: "Elliot J. Reed" },
  { property: "og:locale", content: "en_GB" },
  { property: "og:image", content: "https://www.elliotjreed.com/og.png" },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: "Backup and restore Docker database" },
  { name: "twitter:description", content: "A guide on how to backup and restore MySQL / MariaDB Docker database." },
  { name: "twitter:image", content: "https://www.elliotjreed.com/twitter-card.png" },
  {
    "script:ld+json": createTechArticle({
      url: "https://www.elliotjreed.com/docker/backup-and-restore-docker-database",
      headline: "Backup and restore MySQL Docker database",
      description: "A guide on how to backup and restore MySQL / MariaDB Docker database.",
      datePublished: "2017-01-23T19:00:00+01:00",
      dateModified: "2026-01-30T00:00:00+00:00",
      articleSection: "Docker",
      keywords: ["Docker", "MySQL", "MariaDB", "database", "backup", "restore"],
      wordCount: 349,
      proficiencyLevel: "Intermediate",
    }),
  },
  {
    "script:ld+json": createBreadcrumbs([
      { name: "Home", url: "https://www.elliotjreed.com" },
      { name: "Guides", url: "https://www.elliotjreed.com" },
      { name: "Docker", url: "https://www.elliotjreed.com/docker/backup-and-restore-docker-database" },
      { name: "Backup Database", url: "https://www.elliotjreed.com/docker/backup-and-restore-docker-database" },
    ]),
  },
];

export default (): ReactElement => (
  <section className="divide-y divide-gray-200 dark:divide-gray-700">
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-700 dark:text-gray-200 sm:text-4xl sm:leading-10 md:text-6xl">
        Backup and restore MySQL Docker database
      </h1>

      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
        <span>By Elliot J. Reed</span>
        <span>•</span>
        <time dateTime="2017-01-23">
          Published: 23<sup>rd</sup> January 2017
        </time>
        <span>•</span>
        <time dateTime="2026-01-30">
          Last updated: 30<sup>th</sup> January 2026
        </time>
      </div>

      <p className="prose dark:prose-dark max-w-none text-lg leading-7 text-gray-600 dark:text-gray-300">
        How to backup and restore a MySQL or MariaDB database that's running via Docker or Docker Compose.
      </p>
    </div>

    <div className="prose max-w-none dark:prose-dark">
      <section>
        <p>
          Backing up Docker databases is straightforward using <code>docker exec</code> combined with{" "}
          <code>mysqldump</code> for backups and <code>mysql</code> for restores. You execute the standard MySQL
          commands inside the running container, redirecting output to or from your host filesystem.
        </p>

        <h2>Backup Command</h2>
        <p>To backup / make a dump of a MySQL or MariaDB database within a Docker container, just run:</p>
        <CodeSnippet
          language="bash"
          code="docker exec DATABASECONTAINER mysqldump -u DATABASEUSER --password=DATABASEPASSWORD DATABASE > backup.sql"
          title="Backup"
        />

        <h2>Restore Command</h2>
        <p>
          To restore a MySQL or MariaDB database from the <code>mysqldump</code>:
        </p>
        <CodeSnippet
          language="bash"
          code="cat backup.sql | docker exec -i DATABASECONTAINER mysql -u DATABASEUSER --password=DATABASEPASSWORD DATABASE"
          title="Restore"
        />

        <h2>Real-World Example</h2>
        <p>A complete backup and restore workflow might look like this:</p>
        <CodeSnippet
          language="bash"
          code="docker exec wordpress-mysql mysqldump -u root --password=correcthorsebatterystaple wordpressdb > backup.sql"
          title="Backup Example"
        />

        <p>And restoring:</p>
        <CodeSnippet
          language="bash"
          code="cat backup.sql | docker exec -i wordpress-mysql mysql -u root --password=correcthorsebatterystaple wordpressdb"
          title="Restore Example"
        />

        <h2>Frequently Asked Questions</h2>

        <h3>What if my container uses a different network?</h3>
        <p>
          The commands above work regardless of Docker network configuration because <code>docker exec</code> runs
          commands inside the container itself. The backup and restore operations don't require network access - they
          only need the container to be running. If you're having trouble accessing your database, ensure the container
          is running with <code>docker ps</code>.
        </p>

        <h3>How do I backup only specific tables?</h3>
        <p>
          To backup specific tables, add the table names after the database name in the mysqldump command. For example:{" "}
          <code>docker exec CONTAINER mysqldump -u USER --password=PASS DATABASE table1 table2 {">"} backup.sql</code>.
          This creates a dump containing only the specified tables rather than the entire database.
        </p>

        <h3>Can I automate this backup?</h3>
        <p>
          Yes, you can automate backups using cron jobs on Linux or Task Scheduler on Windows. Create a shell script
          with your backup command and schedule it to run daily or hourly. For example, add a line like{" "}
          <code>0 2 * * * /path/to/backup-script.sh</code> to your crontab to run backups daily at 2 AM. Remember to
          include timestamps in your backup filenames to prevent overwriting previous backups.
        </p>
      </section>
    </div>
  </section>
);
