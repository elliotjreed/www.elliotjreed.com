import { createBreadcrumbs, createTechArticle } from "../../../app/data/schemaData.js";
import { codeBlock } from "../../components/codeBlock.js";
import type { AmpPageData } from "../../layout.js";

const PAGE_URL = "https://www.elliotjreed.com/linux/update-bun-global-packages";

export function renderPage(): AmpPageData {
  return {
    title: "Update Global Bun Packages | EJR",
    description:
      "How to update globally-installed packages with Bun, which has no -g flag equivalent, using a one-line command or a shell alias.",
    canonicalPath: "/linux/update-bun-global-packages",
    type: "article",
    schemas: [
      createTechArticle({
        url: PAGE_URL,
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
      createBreadcrumbs([
        { name: "Home", url: "https://www.elliotjreed.com" },
        { name: "ZSH / Bash Shell Guides", url: "https://www.elliotjreed.com/linux" },
        { name: "Update Global Bun Packages", url: PAGE_URL },
      ]),
    ],
    body: `<section class="page-section">
  <div class="page-header">
    <h1 class="page-title">How to Update Global Packages with Bun</h1>
    <div class="page-meta">
      <span>By Elliot J. Reed</span>
      <span>&#8226;</span>
      <time datetime="2026-02-18">Published: 18th February 2026</time>
    </div>
    <p class="page-intro">
      Bun does not support a <code>-g</code> flag for updating globally-installed packages. To update them, navigate
      to Bun&#39;s global install directory and run <code>bun update</code> from there.
    </p>
  </div>
  <div class="prose">
    <h2>The Problem: No -g Flag in Bun</h2>
    <p>
      When using npm, updating global packages is straightforward: <code>npm update -g</code>. Bun does not support
      this flag. Running <code>bun update -g</code> will not update your globally-installed packages.
    </p>
    <p>
      Bun manages global packages differently. They are installed in a dedicated directory at
      <code>~/.bun/install/global</code>, and you update them by running <code>bun update</code> from within that
      directory.
    </p>

    <h2>How to Update Global Bun Packages</h2>
    <p>Navigate to Bun&#39;s global installation directory and run the update command:</p>
    ${codeBlock("cd ~/.bun/install/global && bun update", "Update global Bun packages", "bash")}

    <h2>Adding a Shell Alias</h2>
    <p>
      To avoid typing the full path each time, add an alias to your <code>.bashrc</code> or <code>.zshrc</code> file:
    </p>
    ${codeBlock("alias bunupdate='(cd ~/.bun/install/global && bun update)'", "Add alias to .bashrc or .zshrc", "bash")}
    <p>
      After saving the file, open a new terminal instance (or reload your shell configuration with
      <code>source ~/.bashrc</code> or <code>source ~/.zshrc</code>). You can then update all global Bun packages with:
    </p>
    ${codeBlock("bunupdate", "Run the alias", "bash")}

    <h2 id="faq">Frequently Asked Questions</h2>

    <h3>Why does Bun not support bun update -g?</h3>
    <p>
      Bun manages global packages in a self-contained directory (<code>~/.bun/install/global</code>) rather than
      through a global flag. This design means you update them by working directly inside that directory, the same
      way you would update dependencies in any other project.
    </p>

    <h3>How do I see which global packages are installed with Bun?</h3>
    <p>Navigate to the global install directory and run <code>bun pm ls</code>:</p>
    ${codeBlock("cd ~/.bun/install/global && bun pm ls", "List global Bun packages", "bash")}

    <h3>Does this work on Mac as well as Linux?</h3>
    <p>
      Yes. Bun uses the same <code>~/.bun/install/global</code> directory on both Linux and macOS, so the same
      command and alias work on either platform.
    </p>
  </div>
</section>`,
  };
}
