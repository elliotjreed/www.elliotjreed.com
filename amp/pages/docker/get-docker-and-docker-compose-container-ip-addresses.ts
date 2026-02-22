import { createBreadcrumbs, createTechArticle } from "../../../app/data/schemaData.js";
import { codeBlock } from "../../components/codeBlock.js";
import type { AmpPageData } from "../../layout.js";

const PAGE_URL = "https://www.elliotjreed.com/docker/get-docker-and-docker-compose-container-ip-addresses";

export function renderPage(): AmpPageData {
  return {
    title: "Docker container IP address | EJR",
    description:
      "Learn how to find Docker container IP addresses using docker inspect commands with Go template syntax. Includes aliases for quick access and troubleshooting networking issues.",
    canonicalPath: "/docker/get-docker-and-docker-compose-container-ip-addresses",
    type: "article",
    schemas: [
      createTechArticle({
        url: PAGE_URL,
        headline: "Get the IP addresses of Docker containers",
        description: "How to find the local IP addresses for running Docker containers",
        datePublished: "2020-09-02T19:00:00+01:00",
        dateModified: "2026-01-30T00:00:00+00:00",
        articleSection: "Docker",
        keywords: ["Docker", "IP address", "networking", "containers"],
        wordCount: 414,
        proficiencyLevel: "Beginner",
      }),
      createBreadcrumbs([
        { name: "Home", url: "https://www.elliotjreed.com" },
        { name: "Docker Guides", url: "https://www.elliotjreed.com/docker" },
        { name: "Docker IP Address", url: PAGE_URL },
      ]),
    ],
    body: `<section class="page-section">
  <div class="page-header">
    <h1 class="page-title">Get the IP addresses of Docker containers</h1>
    <div class="page-meta">
      <span>By Elliot J. Reed</span>
      <span>&#8226;</span>
      <time datetime="2020-09-02">Published: 2nd September 2020</time>
      <span>&#8226;</span>
      <time datetime="2026-01-30">Last updated: 30th January 2026</time>
    </div>
    <p class="page-intro">
      Finding Docker container IP addresses is essential for debugging network connectivity, connecting services, and
      understanding how containers communicate. This guide shows you how to quickly retrieve IP addresses using
      Docker&#39;s inspect command with Go template formatting.
    </p>
  </div>
  <div class="prose">
    <p>
      When working with Docker containers, you often need to know their IP addresses for debugging network issues,
      connecting services together, or troubleshooting connectivity problems. Docker provides the
      <code>docker inspect</code> command which can extract this information using Go template syntax.
    </p>

    <h2>Understanding the Go Template Syntax</h2>

    <p>
      The commands below use Go template syntax (the <code>{{...}}</code> notation) to extract specific fields
      from Docker&#39;s internal JSON data:
    </p>

    <ul>
      <li><code>{{.Name}}</code> - Retrieves the container name</li>
      <li><code>{{.NetworkSettings.IPAddress}}</code> - Gets the IP address from the default network</li>
      <li><code>{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}</code> - Iterates through all networks the container is connected to</li>
    </ul>

    <h2>Getting Container IP Addresses</h2>

    <p>To list all Docker containers and their corresponding IP addresses, run:</p>
    ${codeBlock('docker inspect -f "{{.Name}}: {{.NetworkSettings.IPAddress }}" $(docker ps -aq)', "List all", "bash")}

    <p>To get the IP address for a specific Docker container, run:</p>
    ${codeBlock(
      'docker inspect -f "{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}" CONTAINER_ID',
      "List by container",
      "bash",
    )}

    <p>To list all Docker Compose containers and their corresponding IP addresses, run:</p>
    ${codeBlock(
      'docker inspect -f "{{.Name}}: {{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}" $(docker ps -aq) | cut -c2-',
      "List all Docker Compose",
      "bash",
    )}

    <p>
      You can add these to your <code>~/.profile</code>, <code>~/.bashrc</code>, or <code>~/.zshrc</code> as handy
      aliases:
    </p>

    ${codeBlock(
      `# Get IP addresses of all Docker containers
alias dips='docker inspect -f "{{.Name}}: {{.NetworkSettings.IPAddress }}" $(docker ps -aq)'

# Get IP address of specific Docker container. Usage: dip CONTAINER_NAME_OR_ID
alias dip='docker inspect -f "{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}"'`,
      "Docker: dip or dips",
      "bash",
    )}

    ${codeBlock(
      `# Get IP addresses of all Docker Compose containers
alias dcips='docker inspect -f "{{.Name}}: {{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}" $(docker ps -aq) | cut -c2-'`,
      "Docker Compose: dcips",
      "bash",
    )}

    <h2 id="faq">Frequently Asked Questions</h2>

    <h3>Why do I need Docker container IP addresses?</h3>
    <p>
      Container IP addresses are useful for: debugging network connectivity issues between containers, connecting to
      services running inside containers for testing, verifying that containers are on the correct network, and
      troubleshooting firewall or routing problems.
    </p>

    <h3>Do container IPs change when I restart them?</h3>
    <p>
      Yes, by default Docker assigns IP addresses dynamically from its network pools, so container IP addresses
      typically change when you restart containers. This is why Docker recommends using container names or service
      names for inter-container communication instead of hardcoding IP addresses. If you need stable IP addresses,
      you can configure static IPs using Docker networks with the <code>--ip</code> flag.
    </p>
  </div>
</section>`,
  };
}
