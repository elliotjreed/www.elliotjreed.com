import type { ReactElement } from "react";
import { CodeSnippet } from "~/components/CodeSnippet";

export const meta = () => [
  { title: "Backup and restore Docker database | EJR" },
  {
    name: "description",
    content: "A guide on how to backup and restore MySQL / MariaDB Docker database.",
  },
  {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "Backup and restore MySQL Docker database",
      name: "A guide on how to backup and restore MySQL / MariaDB Docker database.",
      dateCreated: "2017-01-23T19:00:00+01:00",
      datePublished: "2017-01-23T19:00:00+01:00",
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
        Backup and restore MySQL Docker database
      </h1>
      <p className="text-lg leading-7 text-gray-600 dark:text-gray-300">
        How to backup and restore a MySQL or MariaDB database that's running via Docker or Docker Compose.
      </p>
    </div>

    <div className="prose max-w-none dark:prose-dark">
      <p>To backup / make a dump of a MySQL or MariaDB database within a Docker container, just run:</p>
      <CodeSnippet
        code="docker exec DATABASECONTAINER mysqldump -u DATABASEUSER --password=DATABASEPASSWORD DATABASE > backup.sql"
        title="Backup"
      />

      <p>
        To restore a MySQL or MariaDB database from the <code>mysqldump</code>:
      </p>
      <CodeSnippet
        code="cat backup.sql | docker exec -i DATABASECONTAINER mysql -u DATABASEUSER --password=DATABASEPASSWORD DATABASE"
        title="Restore"
      />

      <p>So a real-world example might look like this:</p>
      <CodeSnippet
        code="docker exec wordpress-mysql mysqldump -u root --password=correcthorsebatterystaple wordpressdb > backup.sql"
        title="Backup Example"
      />

      <p>And restoring:</p>
      <CodeSnippet
        code="cat backup.sql | docker exec -i wordpress-mysql mysql -u root --password=correcthorsebatterystaple wordpressdb"
        title="Restore Example"
      />
    </div>
  </section>
);
