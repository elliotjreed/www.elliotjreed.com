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
  {
    "script:ld+json": createTechArticle({
      url: "https://www.elliotjreed.com/docker/backup-and-restore-docker-database",
      headline: "Backup and restore MySQL Docker database",
      description: "A guide on how to backup and restore MySQL / MariaDB Docker database.",
      datePublished: "2017-01-23T19:00:00+01:00",
      dateModified: "2017-01-23T19:00:00+01:00",
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
      <p className="prose dark:prose-dark max-w-none text-lg leading-7 text-gray-600 dark:text-gray-300">
        How to backup and restore a MySQL or MariaDB database that's running via Docker or Docker Compose.
      </p>
    </div>

    <div className="prose max-w-none dark:prose-dark">
      <section>
        <p>To backup / make a dump of a MySQL or MariaDB database within a Docker container, just run:</p>
        <CodeSnippet
          language="bash"
          code="docker exec DATABASECONTAINER mysqldump -u DATABASEUSER --password=DATABASEPASSWORD DATABASE > backup.sql"
          title="Backup"
        />

        <p>
          To restore a MySQL or MariaDB database from the <code>mysqldump</code>:
        </p>
        <CodeSnippet
          language="bash"
          code="cat backup.sql | docker exec -i DATABASECONTAINER mysql -u DATABASEUSER --password=DATABASEPASSWORD DATABASE"
          title="Restore"
        />

        <p>So a real-world example might look like this:</p>
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
      </section>
    </div>
  </section>
);
