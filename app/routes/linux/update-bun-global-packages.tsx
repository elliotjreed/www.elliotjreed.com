import type { ReactElement } from "react";
import { CodeSnippet, type CodeSnippetInterface } from "~/components/CodeSnippet/CodeSnippet";
import { HeadingAnchor } from "~/components/HeadingAnchor/HeadingAnchor";
import { PageHeader } from "~/components/PageHeader/PageHeader";
import { createBreadcrumbs, createTechArticle } from "~/data/schemaData";
import { createMeta } from "~/utils/seo";

export const meta = () => [
  ...createMeta({
    title: "Update Global Bun Packages | EJR",
    description:
      "How to update globally-installed packages with Bun, which has no -g flag equivalent, using a one-line command or a shell alias.",
    url: "https://www.elliotjreed.com/linux/update-bun-global-packages",
    type: "article",
    ogImage: "https://www.elliotjreed.com/og.png",
    twitterImage: "https://www.elliotjreed.com/twitter-card.png",
  }),
  {
    "script:ld+json": createTechArticle({
      url: "https://www.elliotjreed.com/linux/update-bun-global-packages",
      headline: "How to Update Global Packages with Bun",
      description:
        "How to update globally-installed packages with Bun, which has no -g flag equivalent, using a one-line command or a shell alias.",
      datePublished: "2026-02-18T00:00:00+00:00",
      dateModified: "2026-02-18T00:00:00+00:00",
      articleSection: "Linux",
      keywords: ["bun", "npm", "global packages", "update", "shell", "alias", "Linux", "Mac", "terminal"],
      wordCount: 260,
      proficiencyLevel: "Beginner",
    }),
  },
  {
    "script:ld+json": createBreadcrumbs([
      { name: "Home", url: "https://www.elliotjreed.com" },
      { name: "ZSH / Bash Shell Guides", url: "https://www.elliotjreed.com/linux" },
      { name: "Update Global Bun Packages", url: "https://www.elliotjreed.com/linux/update-bun-global-packages" },
    ]),
  },
];

const updateCommand: CodeSnippetInterface = {
  title: "Update global Bun packages",
  code: "cd ~/.bun/install/global && bun update",
};

const aliasSnippet: CodeSnippetInterface = {
  title: "Add alias to .bashrc or .zshrc",
  code: "alias bunupdate='(cd ~/.bun/install/global && bun update)'",
};

const runAliasSnippet: CodeSnippetInterface = {
  title: "Run the alias",
  code: "bunupdate",
};

export default (): ReactElement => (
  <section className="divide-y divide-gray-200 dark:divide-gray-700">
    <PageHeader
      title="How to Update Global Packages with Bun"
      meta={
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span>By Elliot J. Reed</span>
          <span>•</span>
          <time dateTime="2026-02-18">
            Published: 18<sup>th</sup> February 2026
          </time>
        </div>
      }
    >
      <p className="prose dark:prose-dark max-w-none text-lg leading-7 text-gray-600 dark:text-gray-300">
        Bun does not support a <code>-g</code> flag for updating globally-installed packages. To update them, navigate
        to Bun's global install directory and run <code>bun update</code> from there.
      </p>
    </PageHeader>

    <div className="prose dark:prose-dark max-w-none">
      <section>
        <h2>The Problem: No -g Flag in Bun</h2>
        <p>
          When using npm, updating global packages is straightforward: <code>npm update -g</code>. Bun does not support
          this flag. Running <code>bun update -g</code> will not update your globally-installed packages.
        </p>
        <p>
          Bun manages global packages differently. They are installed in a dedicated directory at{" "}
          <code>~/.bun/install/global</code>, and you update them by running <code>bun update</code> from within that
          directory.
        </p>

        <h2>How to Update Global Bun Packages</h2>
        <p>Navigate to Bun's global installation directory and run the update command:</p>
        <CodeSnippet language="bash" code={updateCommand.code} title={updateCommand.title} />

        <h2>Adding a Shell Alias</h2>
        <p>
          To avoid typing the full path each time, add an alias to your <code>.bashrc</code> or <code>.zshrc</code>{" "}
          file:
        </p>
        <CodeSnippet language="bash" code={aliasSnippet.code} title={aliasSnippet.title} />
        <p>
          After saving the file, open a new terminal instance (or reload your shell configuration with{" "}
          <code>source ~/.bashrc</code> or <code>source ~/.zshrc</code>). You can then update all global Bun packages
          with:
        </p>
        <CodeSnippet language="bash" code={runAliasSnippet.code} title={runAliasSnippet.title} />

        <HeadingAnchor id="faq">Frequently Asked Questions</HeadingAnchor>

        <h3>Why does Bun not support bun update -g?</h3>
        <p>
          Bun manages global packages in a self-contained directory (<code>~/.bun/install/global</code>) rather than
          through a global flag. This design means you update them by working directly inside that directory, the same
          way you would update dependencies in any other project.
        </p>

        <h3>How do I see which global packages are installed with Bun?</h3>
        <p>
          Navigate to the global install directory and run <code>bun pm ls</code>:
        </p>
        <CodeSnippet language="bash" code="cd ~/.bun/install/global && bun pm ls" title="List global Bun packages" />

        <h3>Does this work on Mac as well as Linux?</h3>
        <p>
          Yes. Bun uses the same <code>~/.bun/install/global</code> directory on both Linux and macOS, so the same
          command and alias work on either platform.
        </p>
      </section>
    </div>
  </section>
);
