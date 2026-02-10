import type { ReactElement } from "react";
import { CodeSnippet } from "~/components/CodeSnippet/CodeSnippet";
import { HeadingAnchor } from "~/components/HeadingAnchor/HeadingAnchor";
import { PageHeader } from "~/components/PageHeader/PageHeader";
import { createBreadcrumbs, createTechArticle } from "~/data/schemaData";
import { createMeta } from "~/utils/seo";

export const meta = () => [
  ...createMeta({
    title: "How to Run Multiple Claude Code Instances | EJR",
    description:
      "Learn how to run multiple Claude Code instances simultaneously for different accounts using environment variables, custom configuration directories, and shell aliases.",
    url: "https://www.elliotjreed.com/ai/running-multiple-claude-code-instances",
    type: "article",
    ogImage: "https://www.elliotjreed.com/og.png",
    twitterImage: "https://www.elliotjreed.com/twitter-card.png",
  }),
  {
    "script:ld+json": createTechArticle({
      url: "https://www.elliotjreed.com/ai/running-multiple-claude-code-instances",
      headline: "How to Run Multiple Claude Code Instances Simultaneously",
      description:
        "Learn how to run multiple Claude Code instances simultaneously for different accounts using environment variables, custom configuration directories, and shell aliases.",
      datePublished: "2026-02-10T00:00:00+00:00",
      dateModified: "2026-02-10T00:00:00+00:00",
      articleSection: "AI",
      keywords: [
        "Claude Code",
        "CLI",
        "multiple instances",
        "configuration",
        "environment variables",
        "shell aliases",
        "Linux",
        "Mac",
        "symbolic links",
        "productivity",
      ],
      wordCount: 850,
      proficiencyLevel: "Beginner",
    }),
  },
  {
    "script:ld+json": createBreadcrumbs([
      { name: "Home", url: "https://www.elliotjreed.com" },
      { name: "AI Guides", url: "https://www.elliotjreed.com/ai" },
      {
        name: "Multiple Claude Code Instances",
        url: "https://www.elliotjreed.com/ai/running-multiple-claude-code-instances",
      },
    ]),
  },
  {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Can I run multiple Claude Code instances at the same time?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, you can run multiple Claude Code instances simultaneously by using separate configuration directories. Use the CLAUDE_CONFIG_DIR environment variable to specify an alternative settings directory for each instance.",
          },
        },
        {
          "@type": "Question",
          name: "Where is the default Claude Code settings directory located?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "On Linux and Mac, the default Claude Code settings directory is located at ~/.claude in your home directory. This directory contains your authentication tokens, settings, skills, and other configuration files.",
          },
        },
        {
          "@type": "Question",
          name: "How do I share configuration between multiple Claude Code instances?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can use symbolic links (symlinks) to share specific configuration files or directories between instances. For example, use 'ln -s ~/.claude/skills ~/.claude-secondary/skills' to share your Skills directory across both instances.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use the same Claude account for multiple instances?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, you can use the same Claude account for multiple instances. However, the more common use case is to run separate instances for different accounts (e.g., personal and work accounts) to keep projects and contexts separated.",
          },
        },
      ],
    },
  },
];

export default (): ReactElement => (
  <section className="divide-y divide-gray-200 dark:divide-gray-700">
    <PageHeader
      title="How to Run Multiple Claude Code Instances"
      meta={
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span>By Elliot J. Reed</span>
          <span>•</span>
          <time dateTime="2026-02-10">
            Published: 10<sup>th</sup> February 2026
          </time>
          <span>•</span>
          <time dateTime="2026-02-10">
            Last updated: 10<sup>th</sup> February 2026
          </time>
        </div>
      }
    >
      <p className="prose dark:prose-dark max-w-none text-lg leading-7 text-gray-600 dark:text-gray-300">
        Run multiple Claude Code instances simultaneously for different accounts using custom configuration directories.
        Perfect for separating personal and work projects or managing multiple Claude subscriptions.
      </p>
    </PageHeader>

    <div className="prose max-w-none dark:prose-dark">
      <section>
        <p>
          If you use two or more Claude accounts for Claude Code, for example a personal one and a work one, it is
          possible to run both at the same time, with optionally different configurations or the same configurations.
        </p>

        <h2>Running a Second Instance</h2>

        <p>
          On Linux and Mac, the default Claude Code settings directory is located in your home directory at{" "}
          <code>~/.claude</code>. It is possible to specify an alternative directory for the settings. This alternative
          one can be used for a second account.
        </p>

        <p>For example, to create a second directory for use with Claude Code, run:</p>

        <CodeSnippet
          language="bash"
          code="mkdir ~/.claude-secondary"
          title="Create secondary configuration directory"
        />

        <p>Then launch Claude Code specifying the directory:</p>

        <CodeSnippet
          language="bash"
          code="CLAUDE_CONFIG_DIR=~/.claude-secondary claude"
          title="Launch Claude Code with custom configuration directory"
        />

        <p>The first Claude account can be run as normal with:</p>

        <CodeSnippet language="bash" code="claude" title="Launch default Claude Code instance" />

        <h2>Creating Shell Aliases</h2>

        <p>
          You can also create aliases in Bash or ZSH, so running <code>cc</code> in your terminal will open your default
          instance, and <code>cc2</code> will open the secondary.
        </p>

        <p>
          Add the following to your <code>~/.bashrc</code> or <code>~/.zshrc</code> file in your home directory:
        </p>

        <CodeSnippet
          language="bash"
          code={`# Launch Claude Code default (personal) account
alias cc='claude'

# Launch Claude Code secondary account
alias cc2='CLAUDE_CONFIG_DIR=~/.claude-secondary claude'`}
          title="Add aliases to shell configuration"
        />

        <p>
          After adding these aliases, remember to reload your shell configuration by running{" "}
          <code>source ~/.bashrc</code> or <code>source ~/.zshrc</code>, or simply open a new terminal window. Then you
          can launch your default Claude Code instance with just <code>cc</code> and your secondary instance with{" "}
          <code>cc2</code>.
        </p>

        <h3>Alternative Alias Names</h3>

        <p>
          You might prefer more descriptive alias names based on your use case. Here are some alternative naming
          conventions:
        </p>

        <CodeSnippet
          language="bash"
          code={`# Work and personal accounts
alias claude-work='CLAUDE_CONFIG_DIR=~/.claude-work claude'
alias claude-personal='claude'

# Client-specific instances
alias claude-client-a='CLAUDE_CONFIG_DIR=~/.claude-client-a claude'
alias claude-client-b='CLAUDE_CONFIG_DIR=~/.claude-client-b claude'`}
          title="Alternative alias naming conventions"
        />

        <h2>Synchronising Configuration Files</h2>

        <p>
          You can also create symbolic links (symlinks) to keep one configuration across both instances. This is useful
          when you want to share certain settings or resources between your Claude Code instances while keeping accounts
          separate.
        </p>

        <p>
          For example, if you want to keep the Skills you have set up in the primary Claude Code instance, you can
          symlink the <code>skills</code> directory from the primary account to the secondary:
        </p>

        <CodeSnippet
          language="bash"
          code="ln -s ~/.claude/skills ~/.claude-secondary/skills"
          title="Create symbolic link to share Skills"
        />

        <h3>Other Configuration Files You Can Share</h3>

        <p>Beyond Skills, you might want to share other configuration files between instances:</p>

        <CodeSnippet
          language="bash"
          code={`# Share keybindings
ln -s ~/.claude/keybindings.json ~/.claude-secondary/keybindings.json

# Share MCP servers configuration
ln -s ~/.claude/mcp_servers.json ~/.claude-secondary/mcp_servers.json

# Share global settings (use with caution - authentication tokens are stored here)
ln -s ~/.claude/settings.json ~/.claude-secondary/settings.json`}
          title="Share additional configuration files"
        />

        <p>
          <strong>Important:</strong> Be cautious when sharing <code>settings.json</code> as it contains authentication
          tokens. Sharing this file between instances means both instances will use the same Claude account. Only share
          this file if you want multiple instances to use the same account credentials.
        </p>

        <HeadingAnchor id="faq">Frequently Asked Questions</HeadingAnchor>

        <h3>Do I need multiple Claude subscriptions to run multiple instances?</h3>
        <p>
          Not necessarily. You can run multiple instances with the same account by sharing the{" "}
          <code>settings.json</code> file (which contains your authentication tokens) between configuration directories.
          However, the more common use case is to use separate Claude accounts for different purposes, such as a
          personal account and a work account, each with its own subscription.
        </p>

        <h3>Will my conversations be shared between instances?</h3>
        <p>
          No. Each instance maintains its own conversation history and context within its respective configuration
          directory. The conversations are stored locally and are separate for each instance, even if you're using the
          same Claude account across instances.
        </p>

        <h3>Can I run more than two instances?</h3>
        <p>
          Yes, you can run as many instances as you need. Simply create additional configuration directories and use the{" "}
          <code>CLAUDE_CONFIG_DIR</code> environment variable to specify which configuration to use. For example, you
          could have <code>~/.claude-work</code>, <code>~/.claude-personal</code>, <code>~/.claude-client-a</code>, etc.
        </p>

        <h3>Do multiple instances count as separate usage?</h3>
        <p>
          Yes, if each instance is using a different Claude account. Each account has its own usage limits and token
          consumption. If multiple instances share the same account (via shared authentication tokens), they all count
          towards the same account's usage limits.
        </p>

        <h3>What happens if I delete a secondary configuration directory?</h3>
        <p>
          Deleting a secondary configuration directory will remove all settings, conversation history, and
          authentication tokens specific to that instance. If you've created symlinks to share configuration files from
          your primary instance, the original files in <code>~/.claude</code> will remain unaffected. However, you'll
          need to re-authenticate and reconfigure that instance if you create it again.
        </p>
      </section>
    </div>
  </section>
);
