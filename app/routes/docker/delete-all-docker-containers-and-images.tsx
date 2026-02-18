import type { ReactElement } from "react";
import { CodeSnippet, type CodeSnippetInterface } from "~/components/CodeSnippet/CodeSnippet";
import { HeadingAnchor } from "~/components/HeadingAnchor/HeadingAnchor";
import { PageHeader } from "~/components/PageHeader/PageHeader";
import { createBreadcrumbs, createTechArticle } from "~/data/schemaData";
import { createMeta } from "~/utils/seo";

export const meta = () => [
  ...createMeta({
    title: "Clean up Docker | EJR",
    description:
      "How to remove all Docker containers, images, networks and volumes in a handy Bash / ZSH Shell function",
    url: "https://www.elliotjreed.com/docker/delete-all-docker-containers-and-images",
    type: "article",
    ogImage: "https://www.elliotjreed.com/og.png",
    twitterImage: "https://www.elliotjreed.com/twitter-card.png",
  }),
  {
    "script:ld+json": createTechArticle({
      url: "https://www.elliotjreed.com/docker/delete-all-docker-containers-and-images",
      headline: "Remove all Docker containers, images, networks and volumes",
      description:
        "How to remove all Docker containers, images, networks and volumes in a handy Bash / ZSH Shell function",
      datePublished: "2016-12-29T19:00:00+01:00",
      dateModified: "2026-01-30T00:00:00+00:00",
      articleSection: "Docker",
      keywords: ["Docker", "containers", "cleanup", "DevOps"],
      wordCount: 646,
      proficiencyLevel: "Intermediate",
    }),
  },
  {
    "script:ld+json": createBreadcrumbs([
      { name: "Home", url: "https://www.elliotjreed.com" },
      { name: "Docker Guides", url: "https://www.elliotjreed.com/docker" },
      { name: "Clean up Docker", url: "https://www.elliotjreed.com/docker/delete-all-docker-containers-and-images" },
    ]),
  },
];

const snippet: CodeSnippetInterface = {
  title: "rmdocker",
  code: `rmdocker() {
  read -p $'\\e[31mAre you sure you want to delete ALL Docker containers, volumes, and networks? [y/n]\\e[0m\\n' -n 1 -r
  echo -e "\\n"
  if [[ $REPLY =~ ^[Yy]$ ]]
  then
    # Stop all containers
    docker ps -a -q | xargs --no-run-if-empty docker stop

    # Delete all containers
    docker ps -a -q | xargs --no-run-if-empty docker rm

    # Delete all networks
    docker network ls -q | xargs --no-run-if-empty docker network rm

    # Delete all volumes
    docker volume ls -q | xargs --no-run-if-empty docker volume rm

    read -p $'\\e[31mAre you sure you want to delete ALL Docker images as well? [y/n]\\e[0m\\n' -n 1 -r
    echo -e "\\n"
    if [[ $REPLY =~ ^[Yy]$ ]]
    then
      # Delete all images
      docker images -q -a | xargs --no-run-if-empty docker rmi
    fi
  fi
}`,
};

export default (): ReactElement => (
  <section className="divide-y divide-gray-200 dark:divide-gray-700">
    <PageHeader
      title="Remove all Docker containers, images, networks and volumes"
      meta={
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span>By Elliot J. Reed</span>
          <span>•</span>
          <time dateTime="2016-12-29">
            Published: 29<sup>th</sup> December 2016
          </time>
          <span>•</span>
          <time dateTime="2026-01-30">
            Last updated: 30<sup>th</sup> January 2026
          </time>
        </div>
      }
    >
      <p className="prose dark:prose-dark max-w-none text-lg leading-7 text-gray-600 dark:text-gray-300">
        The modern way to clean up Docker resources is the <code>docker system prune</code> command. However, this guide
        also covers manual cleanup methods and provides a convenient Bash function for comprehensive Docker maintenance.
      </p>
    </PageHeader>

    <div className="prose dark:prose-dark max-w-none">
      <section>
        <h2>Table of Contents</h2>
        <ul>
          <li>
            <a href="#modern-approach" className="text-primary-700 dark:text-primary-500 hover:underline">
              Modern Approach: docker system prune
            </a>
          </li>
          <li>
            <a href="#individual-cleanup" className="text-primary-700 dark:text-primary-500 hover:underline">
              Cleaning up individually
            </a>
          </li>
          <li>
            <a href="#bash-function" className="text-primary-700 dark:text-primary-500 hover:underline">
              Bash function for comprehensive cleanup
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
        <HeadingAnchor id="modern-approach">Modern Approach: docker system prune</HeadingAnchor>

        <p>
          Docker provides a built-in command for cleaning up unused resources. The <code>docker system prune</code>{" "}
          command removes all stopped containers, unused networks, dangling images, and build cache:
        </p>

        <CodeSnippet language="bash" code="docker system prune" title="Basic cleanup" />

        <p>
          To also remove all unused images (not just dangling ones) and volumes, add the <code>-a</code> and{" "}
          <code>--volumes</code> flags:
        </p>

        <CodeSnippet language="bash" code="docker system prune -a --volumes" title="Comprehensive cleanup" />

        <p>
          To skip the confirmation prompt, add the <code>-f</code> flag:
        </p>

        <CodeSnippet language="bash" code="docker system prune -a --volumes -f" title="Force cleanup" />

        <HeadingAnchor id="individual-cleanup">Cleaning up individually</HeadingAnchor>

        <p>
          By using <code>xargs --no-run-if-empty</code> we can prevent Docker trying to stop containers or remove
          containers, images, networks, or volumes if there are none to remove.
        </p>

        <h3>Stop all Docker containers and remove / delete them</h3>

        <CodeSnippet
          language="bash"
          code="docker ps -a -q | xargs --no-run-if-empty docker stop && docker ps -a -q | xargs --no-run-if-empty docker rm"
          title="Stop and remove containers"
        />

        <h3>Remove / delete all Docker networks</h3>

        <CodeSnippet
          language="bash"
          code="docker network ls -q | xargs --no-run-if-empty docker network rm"
          title="Remove networks"
        />

        <h3>Remove / delete all Docker volumes</h3>

        <CodeSnippet
          language="bash"
          code="docker volume ls -q | xargs --no-run-if-empty docker volume rm"
          title="Remove volumes"
        />

        <h3>Remove / delete all Docker images</h3>

        <CodeSnippet
          language="bash"
          code="docker images -q -a | xargs --no-run-if-empty docker rmi"
          title="Remove images"
        />

        <HeadingAnchor id="bash-function">
          Bash function to delete all Docker containers, volumes, networks, and images at once
        </HeadingAnchor>

        <p>
          This function will ask for confirmation before deleting the containers, volumes, and networks, and will ask
          again for the images (as you may want to keep these for development and not have to re-download them).
        </p>

        <aside className="my-2 border-l-4 border-yellow-500 bg-yellow-50 p-4 dark:bg-yellow-900/20">
          <p className="font-bold">Warning:</p>
          <p>
            This function will permanently delete Docker containers, networks, volumes, and images. Make sure you have
            backups of any important data stored in volumes, and ensure you won't need to quickly restore any
            containers. Image deletion in particular can be time-consuming to reverse as images will need to be
            re-downloaded.
          </p>
        </aside>

        <p>
          You could add this to your .bashrc file (eg. <code>nano ~/.bashrc</code>) so you always have it to use.
          Remember after adding it to the .bashrc file to source it to load in your changes:
        </p>

        <CodeSnippet language="bash" code=". ~/.bashrc" title="Reload .bashrc" />

        <p>or</p>

        <CodeSnippet language="bash" code="source ~/.bashrc" title="Reload .bashrc (alternative)" />

        <p>Here's the Bash function:</p>

        <CodeSnippet language="bash" code={snippet.code} title={snippet.title} />

        <HeadingAnchor id="faq">Frequently Asked Questions</HeadingAnchor>

        <h3>Is this reversible?</h3>
        <p>
          No, deleting Docker containers, volumes, and images is permanent. While you can recreate containers from
          images and re-download images from registries, any data stored in volumes or containers will be permanently
          lost unless you have backups. Always ensure you have backups of important data before running cleanup
          commands.
        </p>

        <h3>Will this affect running containers?</h3>
        <p>
          Yes, the Bash function first stops all running containers before deleting them. If you have critical services
          running in Docker containers, this will cause downtime. The <code>docker system prune</code> command is safer
          as it only removes stopped containers by default. Use the <code>docker ps</code> command first to check what's
          running before proceeding with cleanup.
        </p>

        <h3>
          What's the difference between this and <code>docker system prune</code>?
        </h3>
        <p>
          The <code>docker system prune</code> command is the modern, recommended approach and is safer because it only
          removes unused resources by default. It won't touch running containers or images that are in use. The manual
          methods and Bash function shown here are more aggressive and will delete everything, including images you
          might be actively using. Use <code>docker system prune -a --volumes</code> for most cleanup needs, and only
          use the comprehensive Bash function when you want to completely reset your Docker environment.
        </p>
      </section>
    </div>
  </section>
);
