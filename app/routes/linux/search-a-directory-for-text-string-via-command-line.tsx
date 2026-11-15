import type { ReactElement } from "react";
import { CodeSnippet, type CodeSnippetInterface } from "~/components/CodeSnippet/CodeSnippet";
import { PageHeader } from "~/components/PageHeader/PageHeader";
import { createBreadcrumbs, createTechArticle } from "~/data/schemaData";
import { createMeta } from "~/utils/seo";

export const meta = () => [
  ...createMeta({
    title: "Search directory for a word | EJR",
    description: "How to search directory for a word / text via the command line on Linux or Mac",
    url: "https://www.elliotjreed.com/linux/search-a-directory-for-text-string-via-command-line",
    type: "article",
    ogImage: "https://www.elliotjreed.com/og.png",
    twitterImage: "https://www.elliotjreed.com/twitter-card.png",
  }),
  {
    "script:ld+json": createTechArticle({
      url: "https://www.elliotjreed.com/linux/search-a-directory-for-text-string-via-command-line",
      headline: "Search directory for a word / text via the command line",
      description: "How to search directory for a word / text via the command line on Linux or Mac",
      datePublished: "2017-01-23T19:00:00+01:00",
      dateModified: "2026-01-30T00:00:00+00:00",
      articleSection: "Linux",
      keywords: ["Linux", "grep", "search", "command line", "text search"],
      wordCount: 417,
      proficiencyLevel: "Beginner",
    }),
  },
  {
    "script:ld+json": createBreadcrumbs([
      { name: "Home", url: "https://www.elliotjreed.com" },
      { name: "ZSH / Bash Shell Guides", url: "https://www.elliotjreed.com/linux" },
      {
        name: "Search Directory",
        url: "https://www.elliotjreed.com/linux/search-a-directory-for-text-string-via-command-line",
      },
    ]),
  },
];

const snippet: CodeSnippetInterface = {
  title: "searchdir",
  code: `# Search current directory for files containing specified string (Usage: searchdir "Search Term")
searchdir() {
  if [[ $# -eq 0 ]] ; then
    echo -e "\\e[0;31mPlease provide a string / search term\\e[0m"
  else
    grep -rni "$@" .
  fi
}`,
};

export default (): ReactElement => (
  <section className="ejr-article divide-line divide-y">
    <PageHeader
      tone="tint"
      title="Search directory for a word / text via the command line"
      meta={
        <div className="text-caption text-ink-subtle flex flex-wrap items-center gap-x-6 gap-y-1">
          <span>By Elliot J. Reed</span>
          <time dateTime="2017-01-23">
            Published: 23<sup>rd</sup> January 2017
          </time>
          <time dateTime="2026-01-30">
            Last updated: 30<sup>th</sup> January 2026
          </time>
        </div>
      }
    >
      <p className="prose ejr-lead">
        By using <code>grep</code> we can quickly search through files for a specific string of text
      </p>
    </PageHeader>

    <div className="prose ejr-prose">
      <section>
        <p>To list all occurrences of a particular string / text in your Bash (or ZSH or Shell) command line, run:</p>
        <CodeSnippet language="bash" code='grep -ni "Text to search for" .' title="grep -ni" />

        <p>You can also search recursively in subdirectories by adding the r flag, for example:</p>
        <CodeSnippet language="bash" code='grep -rni "Text to search for" .' title="grep -rni" />

        <p>
          If you use this sort of thing a lot, you could always add this to your <code>~/.profile</code>,{" "}
          <code>~/.bashrc</code>, or <code>~/.zshrc</code> in handy aliases like:
        </p>
        <CodeSnippet language="bash" code={snippet.code} title={snippet.title} />
      </section>
    </div>
  </section>
);
