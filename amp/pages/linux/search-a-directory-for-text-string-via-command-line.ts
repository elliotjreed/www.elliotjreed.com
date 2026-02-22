import { createBreadcrumbs, createTechArticle } from "../../../app/data/schemaData.js";
import { codeBlock } from "../../components/codeBlock.js";
import type { AmpPageData } from "../../layout.js";

const PAGE_URL = "https://www.elliotjreed.com/linux/search-a-directory-for-text-string-via-command-line";

export function renderPage(): AmpPageData {
  return {
    title: "Search directory for a word | EJR",
    description: "How to search directory for a word / text via the command line on Linux or Mac",
    canonicalPath: "/linux/search-a-directory-for-text-string-via-command-line",
    type: "article",
    schemas: [
      createTechArticle({
        url: PAGE_URL,
        headline: "Search directory for a word / text via the command line",
        description: "How to search directory for a word / text via the command line on Linux or Mac",
        datePublished: "2017-01-23T19:00:00+01:00",
        dateModified: "2026-01-30T00:00:00+00:00",
        articleSection: "Linux",
        keywords: ["Linux", "grep", "search", "command line", "text search"],
        wordCount: 417,
        proficiencyLevel: "Beginner",
      }),
      createBreadcrumbs([
        { name: "Home", url: "https://www.elliotjreed.com" },
        { name: "ZSH / Bash Shell Guides", url: "https://www.elliotjreed.com/linux" },
        { name: "Search Directory", url: PAGE_URL },
      ]),
    ],
    body: `<section class="page-section">
  <div class="page-header">
    <h1 class="page-title">Search directory for a word / text via the command line</h1>
    <div class="page-meta">
      <span>By Elliot J. Reed</span>
      <span>&#8226;</span>
      <time datetime="2017-01-23">Published: 23rd January 2017</time>
      <span>&#8226;</span>
      <time datetime="2026-01-30">Last updated: 30th January 2026</time>
    </div>
    <p class="page-intro">
      By using <code>grep</code> we can quickly search through files for a specific string of text.
    </p>
  </div>
  <div class="prose">
    <p>To list all occurrences of a particular string / text in your Bash (or ZSH or Shell) command line, run:</p>
    ${codeBlock('grep -ni "Text to search for" .', "grep -ni", "bash")}

    <p>You can also search recursively in subdirectories by adding the r flag, for example:</p>
    ${codeBlock('grep -rni "Text to search for" .', "grep -rni", "bash")}

    <p>
      If you use this sort of thing a lot, you could always add this to your <code>~/.profile</code>,
      <code>~/.bashrc</code>, or <code>~/.zshrc</code> in handy aliases like:
    </p>
    ${codeBlock(
      `# Search current directory for files containing specified string (Usage: searchdir "Search Term")
searchdir() {
  if [[ $# -eq 0 ]] ; then
    echo -e "\\e[0;31mPlease provide a string / search term\\e[0m"
  else
    grep -rni "$@" .
  fi
}`,
      "searchdir",
      "bash",
    )}
  </div>
</section>`,
  };
}
