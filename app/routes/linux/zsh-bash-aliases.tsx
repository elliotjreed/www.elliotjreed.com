import type { ReactElement } from "react";
import { CodeSnippet, type CodeSnippetInterface } from "~/components/CodeSnippet/CodeSnippet";
import { PageHeader } from "~/components/PageHeader/PageHeader";
import { createBreadcrumbs, createTechArticle } from "~/data/schemaData";
import { createMeta } from "~/utils/seo";

export const meta = () => [
  ...createMeta({
    title: "ZSH & Bash Aliases | EJR",
    description: "A collection of useful ZSH, Bash, and Shell aliases for use on Linux (or Mac or Windows).",
    url: "https://www.elliotjreed.com/linux/zsh-bash-aliases",
    type: "article",
    ogImage: "https://www.elliotjreed.com/og.png",
    twitterImage: "https://www.elliotjreed.com/twitter-card.png",
  }),
  {
    "script:ld+json": createTechArticle({
      url: "https://www.elliotjreed.com/linux/zsh-bash-aliases",
      headline: "ZSH & Bash Aliases",
      description: "A collection of useful ZSH, Bash, and Shell aliases for use on Linux (or Mac or Windows).",
      datePublished: "2025-04-20T16:51:56+01:00",
      dateModified: "2026-01-30T00:00:00+00:00",
      articleSection: "Linux",
      keywords: ["Linux", "ZSH", "Bash", "shell", "aliases", "command line"],
      wordCount: 468,
      proficiencyLevel: "Beginner",
    }),
  },
  {
    "script:ld+json": createBreadcrumbs([
      { name: "Home", url: "https://www.elliotjreed.com" },
      { name: "ZSH / Bash Shell Guides", url: "https://www.elliotjreed.com/linux" },
      { name: "ZSH & Bash Aliases", url: "https://www.elliotjreed.com/linux/zsh-bash-aliases" },
    ]),
  },
];

const snippets: CodeSnippetInterface[] = [
  {
    title: ".. ... ....",
    code: `# Make changing directory up easier
alias ..='cd ..'
alias ...='cd ../../'
alias ....='cd ../../../'`,
  },
  {
    title: "ls sl ll",
    code: `# Make ls show directory endings
alias ls='ls -FA --color'

# Make sl list files ('ls')
alias sl='ls'

# Make ls -l show in human-readable format
alias ll='ls -lhFA --color'`,
  },
  {
    title: "du",
    code: `# Show human readable file sizes in directory
alias du='du -ach | sort -h'`,
  },
  {
    title: "free",
    code: `# Show human-readable free memory
alias free='free -th'`,
  },
  {
    title: "diff",
    code: `# Make diff side-by-side
alias diff='diff -y --color'`,
  },
  {
    title: "clip",
    code: `# Copy file contents to clipboard (USAGE: clip [FILE])
alias clip='xclip -sel clip <'`,
  },
  {
    title: "perm",
    code: `# Get numerical file permissions of file
alias perm='stat -c "%a %n"'`,
  },
  {
    title: "ping",
    code: `# Ping 3 times rather than infinite
alias ping='ping -c 3'`,
  },
  {
    title: "mkdir",
    code: `# Make directory and parent directories, and output which directories have been created
alias mkdir="mkdir -pv"`,
  },
  {
    title: "flushdns",
    code: `# Flush DNS cache
alias flushdns='sudo resolvectl flush-caches'`,
  },
];

export default (): ReactElement => (
  <section className="divide-y divide-gray-200 dark:divide-gray-700">
    <PageHeader
      title="Shell Aliases"
      meta={
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span>By Elliot J. Reed</span>
          <span>•</span>
          <time dateTime="2025-04-20">
            Published: 20<sup>th</sup> April 2025
          </time>
          <span>•</span>
          <time dateTime="2026-01-30">
            Last updated: 30<sup>th</sup> January 2026
          </time>
        </div>
      }
    >
      <p className="prose dark:prose-dark max-w-none text-lg leading-7 text-gray-600 dark:text-gray-300">
        Here you'll find a few handy aliases to use in ZSH and Bash Shell. Tested on Linux - likely work on Mac!
      </p>
    </PageHeader>

    <div className="prose max-w-none dark:prose-dark">
      <section>
        {snippets.map(
          (snippet: CodeSnippetInterface): ReactElement => (
            <CodeSnippet key={snippet.title} language="bash" code={snippet.code} title={snippet.title} />
          ),
        )}

        <h2>Conclusion</h2>
        <p>
          These shell aliases demonstrate how small customizations can significantly improve your command-line
          productivity. By adding these to your ~/.bashrc or ~/.zshrc file, you'll have convenient shortcuts that make
          common tasks faster and safer. From easier directory navigation with .. and ... to human-readable output with
          modified ls, du, and free commands, each alias solves a specific friction point in daily terminal work.
        </p>
        <p>
          Start by adding the aliases that align with your most frequent tasks, then gradually expand your collection as
          you identify other repetitive commands. Remember to source your configuration file after making changes with
          source ~/.bashrc or source ~/.zshrc to load the new aliases. These simple productivity enhancements can save
          you countless keystrokes and help prevent common mistakes, making your command-line experience smoother and
          more efficient.
        </p>
      </section>
    </div>
  </section>
);
