import type { ReactElement } from "react";
import { CodeSnippet, type CodeSnippetInterface } from "~/components/CodeSnippet";

export const meta = () => [
  { title: "ZSH & Bash Aliases | EJR" },
  {
    name: "description",
    content: "A collection of useful ZSH, Bash, and Shell aliases for use on Linux (or Mac or Windows).",
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
alias ll='ls -lhFA  --color'`,
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
alias flushdns='sudo systemd-resolve --flush-caches'`,
  },
];

export default (): ReactElement => (
  <section className="divide-y divide-gray-200 dark:divide-gray-700">
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-700 dark:text-gray-200 sm:text-4xl sm:leading-10 md:text-6xl">
        Shell Aliases
      </h1>
      <p className="text-lg leading-7 text-gray-600 dark:text-gray-300">
        Here you'll find a few handy aliases to use in ZSH and Bash Shell. Tested on Linux - likely work on Mac!
      </p>
    </div>

    <div className="prose max-w-none dark:prose-dark">
      <section>
        {snippets.map(
          (snippet: CodeSnippetInterface): ReactElement => (
            <CodeSnippet key={snippet.title} code={snippet.code} title={snippet.title} />
          ),
        )}
      </section>
    </div>
  </section>
);
