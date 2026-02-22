import type { ReactElement } from "react";
import { CodeSnippet, type CodeSnippetInterface } from "~/components/CodeSnippet/CodeSnippet";
import { HeadingAnchor } from "~/components/HeadingAnchor/HeadingAnchor";
import { PageHeader } from "~/components/PageHeader/PageHeader";
import { createBreadcrumbs, createTechArticle } from "~/data/schemaData";
import { createAmpLink, createMeta } from "~/utils/seo";

export const meta = () => [
  ...createMeta({
    title: "Docker container IP address | EJR",
    description:
      "Learn how to find Docker container IP addresses using docker inspect commands with Go template syntax. Includes aliases for quick access and troubleshooting networking issues.",
    url: "https://www.elliotjreed.com/docker/get-docker-and-docker-compose-container-ip-addresses",
    type: "article",
    ogImage: "https://www.elliotjreed.com/og.png",
    twitterImage: "https://www.elliotjreed.com/twitter-card.png",
  }),
  {
    "script:ld+json": createTechArticle({
      url: "https://www.elliotjreed.com/docker/get-docker-and-docker-compose-container-ip-addresses",
      headline: "Get the IP addresses of Docker containers",
      description: "How to find the local IP addresses for running Docker containers",
      datePublished: "2020-09-02T19:00:00+01:00",
      dateModified: "2026-01-30T00:00:00+00:00",
      articleSection: "Docker",
      keywords: ["Docker", "IP address", "networking", "containers"],
      wordCount: 414,
      proficiencyLevel: "Beginner",
    }),
  },
  {
    "script:ld+json": createBreadcrumbs([
      { name: "Home", url: "https://www.elliotjreed.com" },
      { name: "Docker Guides", url: "https://www.elliotjreed.com/docker" },
      {
        name: "Docker IP Address",
        url: "https://www.elliotjreed.com/docker/get-docker-and-docker-compose-container-ip-addresses",
      },
    ]),
  },
  createAmpLink("/docker/get-docker-and-docker-compose-container-ip-addresses"),
];

const docker: CodeSnippetInterface = {
  title: "Docker: dip or dips",
  code: `# Get IP addresses of all Docker containers
alias dips='docker inspect -f "{{.Name}}: {{.NetworkSettings.IPAddress }}" $(docker ps -aq)'

# Get IP address of specific Docker container. Usage: dip CONTAINER_NAME_OR_ID
alias dip='docker inspect -f "{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}"'`,
};

const dockerCompose: CodeSnippetInterface = {
  title: "Docker Compose: dcips",
  code: `# Get IP addresses of all Docker Compose containers
alias dcips='docker inspect -f "{{.Name}}: {{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}" $(docker ps -aq) | cut -c2-'`,
};

export default (): ReactElement => (
  <section className="divide-y divide-gray-200 dark:divide-gray-700">
    <PageHeader
      title="Get the IP addresses of Docker containers"
      meta={
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span>By Elliot J. Reed</span>
          <span>•</span>
          <time dateTime="2020-09-02">
            Published: 2<sup>nd</sup> September 2020
          </time>
          <span>•</span>
          <time dateTime="2026-01-30">
            Last updated: 30<sup>th</sup> January 2026
          </time>
        </div>
      }
    >
      <p className="prose dark:prose-dark max-w-none text-lg leading-7 text-gray-600 dark:text-gray-300">
        Finding Docker container IP addresses is essential for debugging network connectivity, connecting services, and
        understanding how containers communicate. This guide shows you how to quickly retrieve IP addresses using
        Docker's inspect command with Go template formatting.
      </p>
    </PageHeader>

    <div className="prose dark:prose-dark max-w-none">
      <section>
        <p>
          When working with Docker containers, you often need to know their IP addresses for debugging network issues,
          connecting services together, or troubleshooting connectivity problems. Docker provides the{" "}
          <code>docker inspect</code> command which can extract this information using Go template syntax.
        </p>

        <h2>Understanding the Go Template Syntax</h2>

        <p>
          The commands below use Go template syntax (the <code>{`{{...}}`}</code> notation) to extract specific fields
          from Docker's internal JSON data. Here's what each part means:
        </p>

        <ul>
          <li>
            <code>{`{{.Name}}`}</code> - Retrieves the container name
          </li>
          <li>
            <code>{`{{.NetworkSettings.IPAddress}}`}</code> - Gets the IP address from the default network
          </li>
          <li>
            <code>{`{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}`}</code> - Iterates through all networks
            the container is connected to and gets the IP address (useful for Docker Compose which creates custom
            networks)
          </li>
        </ul>

        <p>This template syntax allows you to extract exactly the data you need without parsing JSON manually.</p>

        <h2>Getting Container IP Addresses</h2>

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

        <HeadingAnchor id="faq">Frequently Asked Questions</HeadingAnchor>

        <h3>Why do I need Docker container IP addresses?</h3>
        <p>
          Container IP addresses are useful for several scenarios: debugging network connectivity issues between
          containers, connecting to services running inside containers for testing, verifying that containers are on the
          correct network, and troubleshooting firewall or routing problems. While Docker's DNS resolution usually
          handles container-to-container communication automatically, knowing the actual IP addresses helps when you
          need to diagnose low-level networking issues or connect from outside Docker's network.
        </p>

        <h3>What is the {`{{...}}`} syntax in these commands?</h3>
        <p>
          The double curly brace syntax is Go template formatting, which Docker's inspect command uses to extract
          specific data from its internal JSON structures. The <code>docker inspect</code> command outputs detailed JSON
          about containers, but Go templates let you extract just the fields you need without manually parsing the
          entire JSON output. The dot notation (like <code>.NetworkSettings.IPAddress</code>) navigates through nested
          JSON objects to reach the specific value you want.
        </p>

        <h3>Do container IPs change when I restart them?</h3>
        <p>
          Yes, by default Docker assigns IP addresses dynamically from its network pools, so container IP addresses
          typically change when you restart containers. This is why Docker recommends using container names or service
          names for inter-container communication instead of hardcoding IP addresses. If you need stable IP addresses,
          you can configure static IPs using Docker networks with the <code>--ip</code> flag, or use Docker Compose with
          fixed IP configurations. However, relying on Docker's DNS-based service discovery is generally a better
          practice than managing static IPs.
        </p>
      </section>
    </div>
  </section>
);
