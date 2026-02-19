import { createBreadcrumbs, createTechArticle } from "../../../app/data/schemaData.js";
import { codeBlock } from "../../components/codeBlock.js";
import type { AmpPageData } from "../../layout.js";

const PAGE_URL = "https://www.elliotjreed.com/docker/backup-and-restore-docker-database";

export function renderPage(): AmpPageData {
  return {
    title: "Backup and restore Docker database | EJR",
    description: "A guide on how to backup and restore MySQL / MariaDB Docker database.",
    canonicalPath: "/docker/backup-and-restore-docker-database",
    type: "article",
    schemas: [
      createTechArticle({
        url: PAGE_URL,
        headline: "Backup and restore MySQL Docker database",
        description: "A guide on how to backup and restore MySQL / MariaDB Docker database.",
        datePublished: "2017-01-23T19:00:00+01:00",
        dateModified: "2026-01-30T00:00:00+00:00",
        articleSection: "Docker",
        keywords: ["Docker", "MySQL", "MariaDB", "database", "backup", "restore"],
        wordCount: 349,
        proficiencyLevel: "Intermediate",
      }),
      createBreadcrumbs([
        { name: "Home", url: "https://www.elliotjreed.com" },
        { name: "Docker Guides", url: "https://www.elliotjreed.com/docker" },
        { name: "Backup Database", url: PAGE_URL },
      ]),
    ],
    body: `<section class="page-section">
  <div class="page-header">
    <h1 class="page-title">Backup and restore MySQL Docker database</h1>
    <div class="page-meta">
      <span>By Elliot J. Reed</span>
      <span>&#8226;</span>
      <time datetime="2017-01-23">Published: 23rd January 2017</time>
      <span>&#8226;</span>
      <time datetime="2026-01-30">Last updated: 30th January 2026</time>
    </div>
    <p class="page-intro">
      How to backup and restore a MySQL or MariaDB database that&#39;s running via Docker or Docker Compose.
    </p>
  </div>
  <div class="prose">
    <p>
      Backing up Docker databases is straightforward using <code>docker exec</code> combined with
      <code>mysqldump</code> for backups and <code>mysql</code> for restores. You execute the standard MySQL
      commands inside the running container, redirecting output to or from your host filesystem.
    </p>

    <h2>Backup Command</h2>
    <p>To backup / make a dump of a MySQL or MariaDB database within a Docker container, just run:</p>
    ${codeBlock(
      "docker exec DATABASECONTAINER mysqldump -u DATABASEUSER --password=DATABASEPASSWORD DATABASE > backup.sql",
      "Backup",
      "bash",
    )}

    <h2>Restore Command</h2>
    <p>To restore a MySQL or MariaDB database from the <code>mysqldump</code>:</p>
    ${codeBlock(
      "cat backup.sql | docker exec -i DATABASECONTAINER mysql -u DATABASEUSER --password=DATABASEPASSWORD DATABASE",
      "Restore",
      "bash",
    )}

    <h2>Real-World Example</h2>
    <p>A complete backup and restore workflow might look like this:</p>
    ${codeBlock(
      "docker exec wordpress-mysql mysqldump -u root --password=correcthorsebatterystaple wordpressdb > backup.sql",
      "Backup Example",
      "bash",
    )}

    <p>And restoring:</p>
    ${codeBlock(
      "cat backup.sql | docker exec -i wordpress-mysql mysql -u root --password=correcthorsebatterystaple wordpressdb",
      "Restore Example",
      "bash",
    )}

    <h2>Frequently Asked Questions</h2>

    <h3>What if my container uses a different network?</h3>
    <p>
      The commands above work regardless of Docker network configuration because <code>docker exec</code> runs
      commands inside the container itself. The backup and restore operations don&#39;t require network access - they
      only need the container to be running. If you&#39;re having trouble accessing your database, ensure the
      container is running with <code>docker ps</code>.
    </p>

    <h3>How do I backup only specific tables?</h3>
    <p>
      To backup specific tables, add the table names after the database name in the mysqldump command. For example:
      <code>docker exec CONTAINER mysqldump -u USER --password=PASS DATABASE table1 table2 &gt; backup.sql</code>.
      This creates a dump containing only the specified tables rather than the entire database.
    </p>

    <h3>Can I automate this backup?</h3>
    <p>
      Yes, you can automate backups using cron jobs on Linux. Create a shell script with your backup command and
      schedule it to run daily or hourly. For example, add a line like
      <code>0 2 * * * /path/to/backup-script.sh</code> to your crontab to run backups daily at 2 AM. Remember to
      include timestamps in your backup filenames to prevent overwriting previous backups.
    </p>
  </div>
</section>`,
  };
}
