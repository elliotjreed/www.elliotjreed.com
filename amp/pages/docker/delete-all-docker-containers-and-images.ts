import { createBreadcrumbs, createTechArticle } from "../../../app/data/schemaData.js";
import { codeBlock } from "../../components/codeBlock.js";
import type { AmpPageData } from "../../layout.js";

const PAGE_URL = "https://www.elliotjreed.com/docker/delete-all-docker-containers-and-images";

export function renderPage(): AmpPageData {
  return {
    title: "Clean up Docker | EJR",
    description:
      "How to remove all Docker containers, images, networks and volumes in a handy Bash / ZSH Shell function",
    canonicalPath: "/docker/delete-all-docker-containers-and-images",
    type: "article",
    schemas: [
      createTechArticle({
        url: PAGE_URL,
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
      createBreadcrumbs([
        { name: "Home", url: "https://www.elliotjreed.com" },
        { name: "Docker Guides", url: "https://www.elliotjreed.com/docker" },
        { name: "Clean up Docker", url: PAGE_URL },
      ]),
    ],
    body: `<section class="page-section">
  <div class="page-header">
    <h1 class="page-title">Remove all Docker containers, images, networks and volumes</h1>
    <div class="page-meta">
      <span>By Elliot J. Reed</span>
      <span>&#8226;</span>
      <time datetime="2016-12-29">Published: 29th December 2016</time>
      <span>&#8226;</span>
      <time datetime="2026-01-30">Last updated: 30th January 2026</time>
    </div>
    <p class="page-intro">
      The modern way to clean up Docker resources is the <code>docker system prune</code> command. However, this guide
      also covers manual cleanup methods and provides a convenient Bash function for comprehensive Docker maintenance.
    </p>
  </div>
  <div class="prose">
    <section>
      <h2>Table of Contents</h2>
      <ul>
        <li><a href="#modern-approach">Modern Approach: docker system prune</a></li>
        <li><a href="#individual-cleanup">Cleaning up individually</a></li>
        <li><a href="#bash-function">Bash function for comprehensive cleanup</a></li>
        <li><a href="#faq">Frequently Asked Questions</a></li>
      </ul>
    </section>

    <section>
      <h2 id="modern-approach">Modern Approach: docker system prune</h2>

      <p>
        Docker provides a built-in command for cleaning up unused resources. The <code>docker system prune</code>
        command removes all stopped containers, unused networks, dangling images, and build cache:
      </p>
      ${codeBlock("docker system prune", "Basic cleanup", "bash")}

      <p>To also remove all unused images and volumes, add the <code>-a</code> and <code>--volumes</code> flags:</p>
      ${codeBlock("docker system prune -a --volumes", "Comprehensive cleanup", "bash")}

      <p>To skip the confirmation prompt, add the <code>-f</code> flag:</p>
      ${codeBlock("docker system prune -a --volumes -f", "Force cleanup", "bash")}

      <h2 id="individual-cleanup">Cleaning up individually</h2>

      <p>
        By using <code>xargs --no-run-if-empty</code> we can prevent Docker trying to stop or remove containers,
        images, networks, or volumes if there are none to remove.
      </p>

      <h3>Stop all Docker containers and remove / delete them</h3>
      ${codeBlock(
        "docker ps -a -q | xargs --no-run-if-empty docker stop && docker ps -a -q | xargs --no-run-if-empty docker rm",
        "Stop and remove containers",
        "bash",
      )}

      <h3>Remove / delete all Docker networks</h3>
      ${codeBlock("docker network ls -q | xargs --no-run-if-empty docker network rm", "Remove networks", "bash")}

      <h3>Remove / delete all Docker volumes</h3>
      ${codeBlock("docker volume ls -q | xargs --no-run-if-empty docker volume rm", "Remove volumes", "bash")}

      <h3>Remove / delete all Docker images</h3>
      ${codeBlock("docker images -q -a | xargs --no-run-if-empty docker rmi", "Remove images", "bash")}

      <h2 id="bash-function">Bash function to delete all Docker containers, volumes, networks, and images at once</h2>

      <p>
        This function will ask for confirmation before deleting the containers, volumes, and networks, and will ask
        again for the images (as you may want to keep these for development and not have to re-download them).
      </p>

      <aside class="warning-box">
        <p><strong>Warning:</strong></p>
        <p>
          This function will permanently delete Docker containers, networks, volumes, and images. Make sure you have
          backups of any important data stored in volumes, and ensure you won&#39;t need to quickly restore any
          containers. Image deletion can be time-consuming to reverse as images will need to be re-downloaded.
        </p>
      </aside>

      <p>
        You could add this to your .bashrc file (e.g. <code>nano ~/.bashrc</code>) and reload with
        <code>source ~/.bashrc</code>.
      </p>

      ${codeBlock(
        `rmdocker() {
  read -p $'\\e[31mAre you sure you want to delete ALL Docker containers, volumes, and networks? [y/n]\\e[0m\\n' -n 1 -r
  echo -e "\\n"
  if [[ $REPLY =~ ^[Yy]$ ]]
  then
    docker ps -a -q | xargs --no-run-if-empty docker stop
    docker ps -a -q | xargs --no-run-if-empty docker rm
    docker network ls -q | xargs --no-run-if-empty docker network rm
    docker volume ls -q | xargs --no-run-if-empty docker volume rm

    read -p $'\\e[31mAre you sure you want to delete ALL Docker images as well? [y/n]\\e[0m\\n' -n 1 -r
    echo -e "\\n"
    if [[ $REPLY =~ ^[Yy]$ ]]
    then
      docker images -q -a | xargs --no-run-if-empty docker rmi
    fi
  fi
}`,
        "rmdocker",
        "bash",
      )}

      <h2 id="faq">Frequently Asked Questions</h2>

      <h3>Is this reversible?</h3>
      <p>
        No, deleting Docker containers, volumes, and images is permanent. While you can recreate containers from
        images and re-download images from registries, any data stored in volumes or containers will be permanently
        lost unless you have backups.
      </p>

      <h3>Will this affect running containers?</h3>
      <p>
        Yes, the Bash function first stops all running containers before deleting them. If you have critical services
        running in Docker containers, this will cause downtime. The <code>docker system prune</code> command is safer
        as it only removes stopped containers by default.
      </p>

      <h3>What&#39;s the difference between this and docker system prune?</h3>
      <p>
        The <code>docker system prune</code> command is the modern, recommended approach and is safer because it only
        removes unused resources by default. It won&#39;t touch running containers or images that are in use. The manual
        methods and Bash function shown here are more aggressive and will delete everything, including images you
        might be actively using.
      </p>
    </section>
  </div>
</section>`,
  };
}
