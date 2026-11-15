import type { ReactElement } from "react";
import { Link } from "react-router";
import { CodeSnippet, type CodeSnippetInterface } from "~/components/CodeSnippet/CodeSnippet";
import { HeadingAnchor } from "~/components/HeadingAnchor/HeadingAnchor";
import { PageHeader } from "~/components/PageHeader/PageHeader";
import { createBreadcrumbs, createTechArticle } from "~/data/schemaData";
import { createMeta } from "~/utils/seo";

export const meta = () => [
  ...createMeta({
    title: "Useful ZSH and Bash Aliases | EJR",
    description:
      "Useful ZSH and Bash aliases for navigating directories, listing files, checking disk and memory use, and networking. Copy them into your .zshrc or .bashrc.",
    url: "https://www.elliotjreed.com/linux/zsh-bash-aliases",
    type: "article",
    ogImage: "https://www.elliotjreed.com/og.png",
    twitterImage: "https://www.elliotjreed.com/twitter-card.png",
  }),
  {
    "script:ld+json": createTechArticle({
      url: "https://www.elliotjreed.com/linux/zsh-bash-aliases",
      headline: "Useful ZSH and Bash Aliases",
      description:
        "Useful ZSH and Bash aliases for navigating directories, listing files, checking disk and memory use, and networking. Copy them into your .zshrc or .bashrc.",
      datePublished: "2025-04-20T16:51:56+01:00",
      dateModified: "2026-11-15T00:00:00+00:00",
      articleSection: "Linux",
      keywords: ["Linux", "ZSH", "Bash", "shell", "aliases", "command line"],
      proficiencyLevel: "Beginner",
    }),
  },
  {
    "script:ld+json": createBreadcrumbs([
      { name: "Home", url: "https://www.elliotjreed.com" },
      { name: "ZSH / Bash Shell Guides", url: "https://www.elliotjreed.com/linux" },
      { name: "Useful ZSH and Bash Aliases", url: "https://www.elliotjreed.com/linux/zsh-bash-aliases" },
    ]),
  },
];

interface AliasGroup {
  id: string;
  heading: string;
  snippets: CodeSnippetInterface[];
  macNote?: ReactElement;
}

const aliasGroups: AliasGroup[] = [
  {
    id: "navigation",
    heading: "Navigation",
    snippets: [
      {
        title: ".. ... ....",
        code: `# Make changing directory up easier
alias ..='cd ..'
alias ...='cd ../../'
alias ....='cd ../../../'`,
      },
    ],
  },
  {
    id: "listing-files",
    heading: "Listing files",
    snippets: [
      {
        title: "ls sl ll",
        code: `# Make ls show directory endings
alias ls='ls -FA --color'

# Make sl list files ('ls')
alias sl='ls'

# Make ls -l show in human-readable format
alias ll='ls -lhFA --color'`,
      },
    ],
    macNote: (
      <p>
        On macOS, the built-in <code>ls</code> uses <code>-G</code> instead of <code>--color</code>, so use{" "}
        <code>alias ls='ls -FAG'</code> and <code>alias ll='ls -lhFAG'</code>.
      </p>
    ),
  },
  {
    id: "files-disk-and-memory",
    heading: "Files, disk and memory",
    snippets: [
      {
        title: "du",
        code: `# Show human-readable sizes of everything in a directory, smallest first (USAGE: du [DIRECTORY])
du() { command du -ach "$@" | sort -h; }`,
      },
      {
        title: "free",
        code: `# Show human-readable free memory
alias free='free -th'`,
      },
      {
        title: "perm",
        code: `# Get numerical file permissions of file
alias perm='stat -c "%a %n"'`,
      },
      {
        title: "mkdir",
        code: `# Make directory and parent directories, and output which directories have been created
alias mkdir="mkdir -pv"`,
      },
      {
        title: "diff",
        code: `# Make diff side-by-side
alias diff='diff -y --color'`,
      },
    ],
    macNote: (
      <>
        <p>
          <code>du</code> is a function rather than an alias. An alias only swaps text at the start of the command, so{" "}
          <code>du ~/Downloads</code> would become <code>du -ach | sort -h ~/Downloads</code> and pass the directory to{" "}
          <code>sort</code>. The function passes any arguments to <code>du</code>, and <code>command</code> stops it
          calling itself.
        </p>
        <p>
          On macOS, <code>free</code> is not available (use Activity Monitor or <code>vm_stat</code>), and{" "}
          <code>stat</code> takes different options: use <code>alias perm='stat -f "%A %N"'</code>.
        </p>
      </>
    ),
  },
  {
    id: "clipboard",
    heading: "Clipboard",
    snippets: [
      {
        title: "clip",
        code: `# Copy file contents to clipboard (USAGE: clip [FILE])
alias clip='xclip -sel clip <'`,
      },
    ],
    macNote: (
      <p>
        This needs <code>xclip</code> installed on Linux. On macOS, use the built-in <code>pbcopy</code> instead:{" "}
        <code>alias clip='pbcopy &lt;'</code>.
      </p>
    ),
  },
  {
    id: "networking",
    heading: "Networking",
    snippets: [
      {
        title: "ping",
        code: `# Ping 3 times rather than infinite
alias ping='ping -c 3'`,
      },
      {
        title: "flushdns",
        code: `# Flush DNS cache
alias flushdns='sudo resolvectl flush-caches'`,
      },
    ],
    macNote: (
      <p>
        <code>resolvectl</code> is for Linux systems using systemd-resolved. On macOS, use{" "}
        <code>alias flushdns='sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder'</code>.
      </p>
    ),
  },
];

export default (): ReactElement => (
  <section className="ejr-article divide-line divide-y">
    <PageHeader
      tone="tint"
      title="Useful ZSH and Bash aliases"
      meta={
        <div className="text-caption text-ink-subtle flex flex-wrap items-center gap-x-6 gap-y-1">
          <span>By Elliot J. Reed</span>
          <time dateTime="2025-04-20">
            Published: 20<sup>th</sup> April 2025
          </time>
          <time dateTime="2026-11-15">
            Last updated: 15<sup>th</sup> November 2026
          </time>
        </div>
      }
    >
      <p className="prose ejr-lead">
        A few handy aliases for ZSH and Bash, grouped by what they do. They are written for Linux; where a command
        differs on macOS, the macOS version is given underneath.
      </p>
    </PageHeader>

    <div className="prose ejr-prose">
      {aliasGroups.map((group: AliasGroup): ReactElement => (
        <section key={group.id}>
          <HeadingAnchor id={group.id}>{group.heading}</HeadingAnchor>
          {group.snippets.map((snippet: CodeSnippetInterface): ReactElement => (
            <CodeSnippet key={snippet.title} language="bash" code={snippet.code} title={snippet.title} />
          ))}
          {group.macNote}
        </section>
      ))}

      <section>
        <HeadingAnchor id="where-to-put-your-aliases">Where to put your aliases</HeadingAnchor>
        <p>
          Add the aliases you want to <code>~/.zshrc</code> if you use ZSH, or <code>~/.bashrc</code> if you use Bash.
          They take effect in new terminal windows; to load them in the current one, run <code>source ~/.zshrc</code> or{" "}
          <code>source ~/.bashrc</code>.
        </p>
        <p>
          To check what a command will actually run, use <code>type</code>, for example <code>type ll</code>. If you
          need to run the original command without an alias, put a backslash in front of it, such as <code>\ls</code>.
        </p>
        <p>
          For anything that needs arguments in the middle of a command, or more than one step, use a function instead.
          There are more examples in the{" "}
          <Link to="/linux/zsh-bash-functions" prefetch="render" className="text-custard-ink underline">
            useful ZSH and Bash functions
          </Link>{" "}
          guide.
        </p>
      </section>
    </div>
  </section>
);
