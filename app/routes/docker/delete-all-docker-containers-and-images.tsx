import type { ReactElement } from "react";
import { CodeSnippet, type CodeSnippetInterface } from "~/components/CodeSnippet/CodeSnippet";

export const meta = () => [
  { title: "Clean up Docker | EJR" },
  {
    name: "description",
    content: "How to remove all Docker containers, images, networks and volumes in a handy Bash / ZSH Shell function",
  },
  { property: "og:title", content: "Clean up Docker" },
  {
    property: "og:description",
    content: "How to remove all Docker containers, images, networks and volumes in a handy Bash / ZSH Shell function",
  },
  { property: "og:type", content: "article" },
  { property: "og:url", content: "https://www.elliotjreed.com/docker/delete-all-docker-containers-and-images" },
  { property: "og:site_name", content: "Elliot J. Reed" },
  { property: "og:locale", content: "en_GB" },
  {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "Remove all Docker containers, images, networks and volumes",
      name: "How to remove all Docker containers, images, networks and volumes in a handy Bash / ZSH Shell function",
      dateCreated: "2016-12-29T19:00:00+01:00",
      datePublished: "2016-12-29T19:00:00+01:00",
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
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-700 dark:text-gray-200 sm:text-4xl sm:leading-10 md:text-6xl">
        Remove all Docker containers, images, networks and volumes
      </h1>
      <p className="prose dark:prose-dark max-w-none text-lg leading-7 text-gray-600 dark:text-gray-300">
        If you are like me and play around a lot with Docker, you will probably end up with a lot of containers,
        networks, volumes, and images in your system which you don't need. Here's a quick guide on how to remove these.
      </p>
    </div>

    <div className="prose max-w-none dark:prose-dark">
      <section>
        <h2>Cleaning up individually</h2>

        <p>
          By using <code>xargs --no-run-if-empty</code> we can prevent Docker trying to stop containers or remove
          containers, images, networks, or volumes if there are none to remove.
        </p>

        <h3>Stop all Docker containers and remove / delete them</h3>

        <pre>
          <code>
            docker ps -a -q | xargs --no-run-if-empty docker stop && docker ps -a -q | xargs --no-run-if-empty docker rm
          </code>
        </pre>

        <h3>Remove / delete all Docker networks</h3>

        <pre>
          <code>docker network ls -q | xargs --no-run-if-empty docker network rm</code>
        </pre>

        <h3>Remove / delete all Docker volumes</h3>

        <pre>
          <code>docker volume ls -q | xargs --no-run-if-empty docker volume rm</code>
        </pre>

        <h3>Remove / delete all Docker images</h3>

        <pre>
          <code>docker images -q -a | xargs --no-run-if-empty docker rmi</code>
        </pre>

        <h2>Bash function to delete all Docker containers, volumes, networks, and images at once</h2>

        <p>
          This function will ask for confirmation before deleting the containers, volumes, and networks, and will ask
          again for the images (as you may want to keep these for development and not have to re-download them).
        </p>

        <p>
          You could add this to your .bashrc file (eg. <code>nano ~/.bashrc</code>) so you always have it to use.
          Remember after adding it to the .bashrc file to source it to load in your changes:
        </p>

        <pre>
          <code>. ~/.bashrc</code>
        </pre>

        <p>or</p>

        <pre>
          <code>source ~/.bashrc</code>
        </pre>

        <p>Here's the Bash function:</p>

        <CodeSnippet language="bash" code={snippet.code} title={snippet.title} />
      </section>
    </div>
  </section>
);
