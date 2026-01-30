import type { ReactElement } from "react";
import { CodeSnippet, type CodeSnippetInterface } from "~/components/CodeSnippet/CodeSnippet";
import { createBreadcrumbs, createTechArticle } from "~/data/schemaData";

export const meta = () => [
  { title: "Docker container IP address | EJR" },
  {
    name: "description",
    content: "Get the IP addresses of Docker containers",
  },
  { property: "og:title", content: "Docker container IP address" },
  { property: "og:description", content: "Get the IP addresses of Docker containers" },
  { property: "og:type", content: "article" },
  {
    property: "og:url",
    content: "https://www.elliotjreed.com/docker/get-docker-and-docker-compose-container-ip-addresses",
  },
  { property: "og:site_name", content: "Elliot J. Reed" },
  { property: "og:locale", content: "en_GB" },
  {
    "script:ld+json": createTechArticle({
      url: "https://www.elliotjreed.com/docker/get-docker-and-docker-compose-container-ip-addresses",
      headline: "Get the IP addresses of Docker containers",
      description: "How to find the local IP addresses for running Docker containers",
      datePublished: "2020-09-02T19:00:00+01:00",
      dateModified: "2020-09-02T19:00:00+01:00",
      articleSection: "Docker",
      keywords: ["Docker", "IP address", "networking", "containers"],
      wordCount: 414,
      proficiencyLevel: "Beginner",
    }),
  },
  {
    "script:ld+json": createBreadcrumbs([
      { name: "Home", url: "https://www.elliotjreed.com" },
      { name: "Guides", url: "https://www.elliotjreed.com" },
      {
        name: "Docker",
        url: "https://www.elliotjreed.com/docker/get-docker-and-docker-compose-container-ip-addresses",
      },
      {
        name: "Docker IP Address",
        url: "https://www.elliotjreed.com/docker/get-docker-and-docker-compose-container-ip-addresses",
      },
    ]),
  },
];

const docker: CodeSnippetInterface = {
  title: "Docker: dip or dips",
  code: `# Get IP addresses of all Docker containers
alias dips='docker inspect -f "{{.Name}}: {{.NetworkSettings.IPAddress }}" $(docker ps -aq)'

# Get IP addess of specific Docker container. Usage: dip CONTAINER_NAME_OR_ID
alias dip='docker inspect -f "{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}"'`,
};

const dockerCompose: CodeSnippetInterface = {
  title: "Docker Compose: dcips",
  code: `# Get IP addresses of all Docker Compose containers
alias dcips='docker inspect -f "{{.Name}}: {{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}" $(docker ps -aq) | cut -c2-'`,
};

export default (): ReactElement => (
  <section className="divide-y divide-gray-200 dark:divide-gray-700">
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-700 dark:text-gray-200 sm:text-4xl sm:leading-10 md:text-6xl">
        Get the IP addresses of Docker containers
      </h1>
      <p className="prose dark:prose-dark max-w-none text-lg leading-7 text-gray-600 dark:text-gray-300">
        How to find the local IP addresses for running Docker containers.
      </p>
    </div>

    <div className="prose max-w-none dark:prose-dark">
      <section>
        <p>To list all Docker containers and their corresponding IP addresses, run:</p>
        <CodeSnippet
          language="bash"
          code='docker inspect -f "{{.Name}}: {{.NetworkSettings.IPAddress }}" $(docker ps -aq)'
          title="List all"
        />

        <p>To get the IP address for a specific Docker container, run:</p>
        <CodeSnippet
          language="bash"
          code='docker inspect -f "{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}" CONTAINER_ID'
          title="List by container"
        />

        <p>To list all Docker Compose containers and their corresponding IP addresses, run:</p>
        <CodeSnippet
          language="bash"
          code='docker inspect -f "{{.Name}}: {{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}" $(docker ps -aq) | cut -c2-'
          title="List all Docker Compose"
        />

        <p>
          You can add these to your <code>~/.profile</code>, <code>~/.bashrc</code>, or <code>~/.zshrc</code> in handy
          aliases like:
        </p>

        <CodeSnippet language="bash" code={docker.code} title={docker.title} />

        <CodeSnippet language="bash" code={dockerCompose.code} title={dockerCompose.title} />
      </section>
    </div>
  </section>
);
