import { createBreadcrumbs, createTechArticle } from "../../../app/data/schemaData.js";
import { codeBlock } from "../../components/codeBlock.js";
import type { AmpPageData } from "../../layout.js";

const PAGE_URL = "https://www.elliotjreed.com/linux/zsh-bash-aliases";

export function renderPage(): AmpPageData {
  return {
    title: "ZSH & Bash Aliases | EJR",
    description: "A collection of useful ZSH, Bash, and Shell aliases for use on Linux (or Mac or Windows).",
    canonicalPath: "/linux/zsh-bash-aliases",
    type: "article",
    schemas: [
      createTechArticle({
        url: PAGE_URL,
        headline: "ZSH & Bash Aliases",
        description: "A collection of useful ZSH, Bash, and Shell aliases for use on Linux (or Mac or Windows).",
        datePublished: "2025-04-20T16:51:56+01:00",
        dateModified: "2026-01-30T00:00:00+00:00",
        articleSection: "Linux",
        keywords: ["Linux", "ZSH", "Bash", "shell", "aliases", "command line"],
        wordCount: 468,
        proficiencyLevel: "Beginner",
      }),
      createBreadcrumbs([
        { name: "Home", url: "https://www.elliotjreed.com" },
        { name: "ZSH / Bash Shell Guides", url: "https://www.elliotjreed.com/linux" },
        { name: "ZSH & Bash Aliases", url: PAGE_URL },
      ]),
    ],
    body: `<section class="page-section">
  <div class="page-header">
    <h1 class="page-title">Shell Aliases</h1>
    <div class="page-meta">
      <span>By Elliot J. Reed</span>
      <span>&#8226;</span>
      <time datetime="2025-04-20">Published: 20th April 2025</time>
      <span>&#8226;</span>
      <time datetime="2026-01-30">Last updated: 30th January 2026</time>
    </div>
    <p class="page-intro">
      Here you&#39;ll find a few handy aliases to use in ZSH and Bash Shell. Tested on Linux - likely work on Mac!
    </p>
  </div>
  <div class="prose">
    ${codeBlock(
      "# Make changing directory up easier\nalias ..='cd ..'\nalias ...='cd ../../'\nalias ....='cd ../../../'",
      ".. ... ....",
      "bash",
    )}
    ${codeBlock(
      "# Make ls show directory endings\nalias ls='ls -FA --color'\n\n# Make sl list files ('ls')\nalias sl='ls'\n\n# Make ls -l show in human-readable format\nalias ll='ls -lhFA --color'",
      "ls sl ll",
      "bash",
    )}
    ${codeBlock("# Show human readable file sizes in directory\nalias du='du -ach | sort -h'", "du", "bash")}
    ${codeBlock("# Show human-readable free memory\nalias free='free -th'", "free", "bash")}
    ${codeBlock("# Make diff side-by-side\nalias diff='diff -y --color'", "diff", "bash")}
    ${codeBlock("# Copy file contents to clipboard (USAGE: clip [FILE])\nalias clip='xclip -sel clip <'", "clip", "bash")}
    ${codeBlock("# Get numerical file permissions of file\nalias perm='stat -c \"%a %n\"'", "perm", "bash")}
    ${codeBlock("# Ping 3 times rather than infinite\nalias ping='ping -c 3'", "ping", "bash")}
    ${codeBlock(
      '# Make directory and parent directories, and output which directories have been created\nalias mkdir="mkdir -pv"',
      "mkdir",
      "bash",
    )}
    ${codeBlock("# Flush DNS cache\nalias flushdns='sudo resolvectl flush-caches'", "flushdns", "bash")}

    <h2>Conclusion</h2>
    <p>
      These shell aliases demonstrate how small customisations can significantly improve your command-line
      productivity. By adding these to your ~/.bashrc or ~/.zshrc file, you&#39;ll have convenient shortcuts that
      make common tasks faster and safer.
    </p>
    <p>
      Start by adding the aliases that align with your most frequent tasks, then gradually expand your collection as
      you identify other repetitive commands. Remember to source your configuration file after making changes with
      <code>source ~/.bashrc</code> or <code>source ~/.zshrc</code> to load the new aliases.
    </p>
  </div>
</section>`,
  };
}
