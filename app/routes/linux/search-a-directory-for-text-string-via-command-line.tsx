import type { ReactElement } from "react";
import { CodeSnippet, type CodeSnippetInterface } from "~/components/CodeSnippet";

export const meta = () => [
  { title: "Search directory for a word | EJR" },
  {
    name: "description",
    content: "How to search directory for a word / text via the command line on Linux or Mac",
  },
  {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "",
      name: "",
      dateCreated: "T19:00:00+01:00",
      datePublished: "T19:00:00+01:00",
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
  <section className="divide-y divide-gray-200 dark:divide-gray-700">
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-700 dark:text-gray-200 sm:text-4xl sm:leading-10 md:text-6xl">
        Search directory for a word / text via the command line
      </h1>
      <p className="text-lg leading-7 text-gray-600 dark:text-gray-300">
        By using <code>grep</code> we can quickly search through files for a specific string of text
      </p>
    </div>

    <div className="prose max-w-none dark:prose-dark">
      <section>
        <p>To list all occurrences of a particular string / text in your Bash (or ZSH or Shell) command line, run:</p>
        <CodeSnippet code={snippet.code} title={snippet.title} />
        <CodeSnippet code='grep -ni "Text to search for" .' title="grep -ni" />

        <p>You can also search recursively in subdirectories by adding the r flag, for example:</p>
        <CodeSnippet code={snippet.code} title={snippet.title} />
        <CodeSnippet code='grep -rni "Text to search for" .' title="grep -rni" />

        <p>
          If you use this sort of thing a lot, you could always add this to your <code>~/.profile</code>,{" "}
          <code>~/.bashrc</code>, or <code>~/.zshrc</code> in handy aliases like:
        </p>
        <CodeSnippet code={snippet.code} title={snippet.title} />
      </section>
    </div>
  </section>
);
