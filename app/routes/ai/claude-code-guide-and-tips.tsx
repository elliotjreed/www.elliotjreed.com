import type { ReactElement } from "react";
import { CodeSnippet } from "~/components/CodeSnippet/CodeSnippet";
import { HeadingAnchor } from "~/components/HeadingAnchor/HeadingAnchor";
import { createBreadcrumbs, createTechArticle } from "~/data/schemaData";
import claudeCodeStatuslineImage from "~/images/articles/claude-code-custom-statusline.png";
import claudeCodeStatuslineImageWebp from "~/images/articles/claude-code-custom-statusline.webp";

export const meta = () => [
  { title: "Guide to Claude Code: Features and Best Practices | EJR" },
  {
    name: "description",
    content:
      "Master Claude Code's installation, plan mode, Skills, subagents, and MCP servers. Learn prompting strategies and advanced features for AI-assisted development.",
  },
  { property: "og:title", content: "Guide to Claude Code: Features and Best Practices" },
  {
    property: "og:description",
    content:
      "Master Claude Code's installation, plan mode, Skills, subagents, and MCP servers. Learn prompting strategies and advanced features for AI-assisted development.",
  },
  { property: "og:type", content: "article" },
  { property: "og:url", content: "https://www.elliotjreed.com/ai/claude-code-guide-and-tips" },
  { property: "og:image", content: "https://www.elliotjreed.com/og.png" },
  { property: "og:site_name", content: "Elliot J. Reed" },
  { property: "og:locale", content: "en_GB" },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: "Guide to Claude Code: Features and Best Practices" },
  {
    name: "twitter:description",
    content:
      "Master Claude Code's installation, plan mode, Skills, subagents, and MCP servers. Learn prompting strategies and advanced features for AI-assisted development.",
  },
  { name: "twitter:image", content: "https://www.elliotjreed.com/twitter-card.png" },
  {
    "script:ld+json": createTechArticle({
      url: "https://www.elliotjreed.com/ai/claude-code-guide-and-tips",
      headline: "Complete Guide to Claude Code: Setup, Features, and Best Practices",
      description:
        "Master Claude Code's installation, plan mode, Skills, subagents, and MCP servers. Learn prompting strategies and advanced features for AI-assisted development.",
      datePublished: "2026-01-24T20:20:18+00:00",
      dateModified: "2026-01-30T00:00:00+00:00",
      articleSection: "AI",
      keywords: [
        "Claude Code",
        "AI",
        "software development",
        "prompt engineering",
        "MCP servers",
        "git integration",
        "plan mode",
        "Claude Skills",
        "subagents",
      ],
      wordCount: 5200,
      proficiencyLevel: "Intermediate",
    }),
  },
  {
    "script:ld+json": createBreadcrumbs([
      { name: "Home", url: "https://www.elliotjreed.com" },
      { name: "Guides", url: "https://www.elliotjreed.com" },
      { name: "AI", url: "https://www.elliotjreed.com/ai/claude-code-guide-and-tips" },
      { name: "Claude Code Guide", url: "https://www.elliotjreed.com/ai/claude-code-guide-and-tips" },
    ]),
  },
];

export default (): ReactElement => (
  <section className="divide-y divide-gray-200 dark:divide-gray-700">
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-700 dark:text-gray-200 sm:text-4xl sm:leading-10 md:text-6xl">
        Claude Code Guide: Features and Best Practices
      </h1>

      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
        <span>By Elliot J. Reed</span>
        <span>•</span>
        <time dateTime="2026-01-24">
          Published: 24<sup>th</sup> January 2026
        </time>
        <span>•</span>
        <time dateTime="2026-01-30">
          Last updated: 30<sup>th</sup> January 2026
        </time>
      </div>

      <p className="prose dark:prose-dark max-w-none text-lg leading-7 text-gray-600 dark:text-gray-300">
        <strong>
          Claude Code is Anthropic's official command-line interface (CLI) that brings Claude AI directly into your
          terminal for AI-assisted software development.
        </strong>{" "}
        It enables developers to write, refactor, debug, and deploy code using natural language prompts whilst
        maintaining full control over file operations and command execution.
      </p>
      <p className="prose dark:prose-dark max-w-none text-lg leading-7 text-gray-600 dark:text-gray-300">
        This guide covers installation, model selection, the CLAUDE.md context file, plan mode for feature
        implementation, checkpoints for undoing changes, Git integration, settings configuration, and advanced features
        including Claude Skills, subagents, and MCP servers for extending functionality.
      </p>
    </div>

    <div className="prose max-w-none dark:prose-dark">
      <section id="table-of-contents">
        <h2>Contents</h2>
        <ol>
          <li>
            <a href="#cheatsheet">Quick Reference Cheatsheet</a>
          </li>
          <li>
            <a href="#installation">Installation</a>
          </li>
          <li>
            <a href="#starting-claude-code">Starting Claude Code</a>
          </li>
          <li>
            <a href="#using-claude-code">Using Claude Code</a>
          </li>
          <li>
            <a href="#models">Models</a>
          </li>
          <li>
            <a href="#claudemd-providing-claude-code-with-context">CLAUDE.md - Providing Claude Code with Context</a>
          </li>
          <li>
            <a href="#prompting-planning-and-execution">Prompting, Planning, and Execution</a>
          </li>
          <li>
            <a href="#checkpoints-undoing-code-and-context">Checkpoints: Undoing Code and Context</a>
          </li>
          <li>
            <a href="#git-and-version-control">Git and Version Control</a>
          </li>
          <li>
            <a href="#usage-limits-and-context-control">Usage and Context Control</a>
          </li>
          <li>
            <a href="#settings-and-permissions">Settings and Permissions</a>
          </li>
          <li>
            <a href="#claude-plugins-and-plugin-marketplaces">Claude Plugins and Plugin Marketplaces</a>
          </li>
          <li>
            <a href="#claude-commands">Claude Commands</a>
          </li>
          <li>
            <a href="#claude-skills">Claude Skills</a>
          </li>
          <li>
            <a href="#claude-subagents">Claude Subagents</a>
          </li>
          <li>
            <a href="#claude-mcp-servers">Claude MCP Servers</a>
          </li>
          <li>
            <a href="#custom-statuslines">Custom Statuslines</a>
          </li>
          <li>
            <a href="#faq">Frequently Asked Questions</a>
          </li>
          <li>
            <a href="#conclusion">Conclusion</a>
          </li>
        </ol>
      </section>

      <section id="cheatsheet">
        <h2>Quick Reference Cheatsheet</h2>

        <h3>Prefixes</h3>
        <ul>
          <li>
            <code>!</code> - Bash mode prefix
          </li>
          <li>
            <code>@</code> - Mention files/folders
          </li>
        </ul>

        <h3>Keyboard Shortcuts</h3>
        <ul>
          <li>
            <kbd>Esc</kbd>+<kbd>Esc</kbd> - Open rewind menu (undo changes)
          </li>
          <li>
            <kbd>Shift</kbd>+<kbd>Tab</kbd> - Auto accept edits mode
          </li>
          <li>
            <kbd>Shift</kbd>+<kbd>Tab</kbd>+<kbd>Tab</kbd> - Plan mode
          </li>
        </ul>

        <h3>Slash Commands</h3>
        <ul>
          <li>
            <code>/init</code> - Creates a CLAUDE.md file
          </li>
          <li>
            <code>/login</code> - Switch Claude accounts
          </li>
          <li>
            <code>/model [model]</code> - Sets model (optionally taking a model name)
          </li>
          <li>
            <code>/usage</code> - Spent and remaining usage
          </li>
          <li>
            <code>/rewind</code> - Open rewind menu (undo changes)
          </li>
          <li>
            <code>/clear</code> - Clears all context window
          </li>
          <li>
            <code>/compact [instructions]</code> - Compacts/summarises context (with optional compacting instructions)
          </li>
          <li>
            <code>/config</code> - Views current configuration settings
          </li>
          <li>
            <code>/permissions</code> - Views current allowed commands
          </li>
          <li>
            <code>/review</code> - Request code review
          </li>
          <li>
            <code>/status</code> - Shows status, including MCP connections
          </li>
          <li>
            <code>/memory</code> - Allows editing Claude's memory
          </li>
          <li>
            <code>/plugin</code> - Lists available and installed plugins
          </li>
          <li>
            <code>/mcp</code> - Lists connected and unconnected MCP servers
          </li>
          <li>
            <code>/agents</code> - Lists user and built-in agents, option to create new agent
          </li>
          <li>
            <code>/doctor</code> - Shows diagnostics and current Claude Code version
          </li>
          <li>
            <code>/help</code> - Shows help menu
          </li>
        </ul>
      </section>

      <section>
        <HeadingAnchor id="installation">Installation</HeadingAnchor>

        <p>
          To install Claude Code, refer to the official instructions at{" "}
          <a href="https://code.claude.com/docs/en/setup#installation" rel="noreferrer noopener">
            code.claude.com/docs/en/setup
          </a>
          .
        </p>
      </section>

      <section>
        <HeadingAnchor id="starting-claude-code">Starting Claude Code</HeadingAnchor>

        <p>Claude Code operates within the directory where you launch it, typically your project's root folder.</p>

        <p>To start Claude Code in your terminal, run:</p>

        <CodeSnippet language="bash" code="claude" title="Start Claude Code" />

        <h3>Logging In</h3>

        <p>
          When first running Claude Code, you should be prompted to log in. This will open up a web browser. You will
          need to be on a paid plan, either "Pro", "Max", or "Team".
        </p>

        <p>If you are not prompted to log in, you can type the following "slash" command:</p>

        <CodeSnippet code="/login" title="Log In to Claude.ai" />
      </section>

      <section>
        <HeadingAnchor id="using-claude-code">Using Claude Code</HeadingAnchor>

        <p>
          Prompts (instructions) for Claude Code are typed in the input bar. You can also paste into the terminal (
          <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>v</kbd> on Linux for example). You can paste in text and screenshot
          images. You can also drag and drop files and images into the terminal.
        </p>

        <p>
          For example, if you are developing a website and have a visual bug, you can screenshot the website element and
          paste it (or drag and drop the screenshot file) into Claude Code and ask Claude to fix it.
        </p>

        <section id="essential-commands-and-shortcuts">
          <h3>Essential Commands and Shortcuts</h3>

          <h4>"Slash" Commands</h4>

          <p>
            When typing a forward slash <code>/</code>, Claude Code will show available commands. This guide will go
            into some of these shortly, including how to add custom commands.
          </p>

          <h4>
            <kbd>Shift</kbd>+<kbd>Tab</kbd>
          </h4>

          <p>
            Using the <kbd>Shift</kbd>+<kbd>Tab</kbd> shortcut will switch Claude Code between <code>accept edits</code>{" "}
            mode, <code>plan mode</code>, and back to default mode.
          </p>

          <h5>Auto-Accept Edits</h5>

          <p>By default, Claude Code will ask each time to add or edit files.</p>

          <p>
            Using <kbd>Shift</kbd>+<kbd>Tab</kbd> and having <code>accept edits on</code> will allow Claude Code to add
            and edit files without asking each time.
          </p>

          <h5>Plan Mode</h5>

          <p>
            Using <kbd>Shift</kbd>+<kbd>Tab</kbd> and having <code>plan mode on</code> will tell Claude to enter "plan
            mode". This is where Claude will assess your requirements, ask any clarifying questions if necessary, and
            output the plan before adding and modifying files.
          </p>

          <p>
            This is a really useful feature, and should be used before getting Claude to implement features. This guide
            will go into more detail about this below.
          </p>

          <h4>Bash Mode</h4>

          <p>
            You can switch into "Bash mode" to run terminal commands yourself without having to exit Claude Code or have
            another terminal window open.
          </p>

          <p>To do this, simply type:</p>

          <CodeSnippet code="!" title="Switch to Bash Mode" />

          <p>For example, if you want to list the directory contents:</p>

          <CodeSnippet code="! ls" title="List Directory Contents" />
        </section>
      </section>

      <section>
        <HeadingAnchor id="models">Models</HeadingAnchor>

        <p>Claude Code supports three models:</p>
        <ol>
          <li>Opus - highest capability model, slower response times, higher usage costs</li>
          <li>Sonnet - balanced performance and cost, suitable for most development tasks</li>
          <li>Haiku - fastest responses, lowest usage costs, ideal for straightforward tasks</li>
        </ol>

        <p>You can switch between models in Claude Code by running the slash command:</p>

        <CodeSnippet code="/model" title="Switch Model" />

        <h3>Which Models to Use</h3>

        <h4>Opus</h4>

        <p>Opus offers the highest capability but consumes usage limits faster than other models.</p>

        <p>
          Use Opus for planning complex features and implementing challenging functionality that requires deep
          reasoning.
        </p>

        <h4>Sonnet</h4>

        <p>Sonnet provides faster responses than Opus whilst consuming fewer usage limits.</p>

        <p>
          Sonnet serves as an excellent default for most development tasks. Use it as your primary implementation model
          for writing and editing code.
        </p>

        <h4>Haiku</h4>

        <p>Haiku delivers the fastest responses and consumes the fewest usage limits of all three models.</p>

        <p>
          Haiku excels at implementing standard features such as creating React components, writing Python scripts, or
          building conventional applications following established patterns.
        </p>

        <h4>Hybrid: Recommended Setup</h4>

        <p>
          Using Opus in Plan Mode, then executing the plan using Sonnet is a great default. Fortunately, there is a
          slightly hidden feature to have this occur automatically:
        </p>

        <CodeSnippet code="/model opusplan" title="Opus Plan Mode with Sonnet Execution" />

        <p>This will automatically have Claude Code use Opus in Plan Mode, then implement the plan using Sonnet.</p>
      </section>

      <section>
        <HeadingAnchor id="claudemd-providing-claude-code-with-context">
          CLAUDE.md - Providing Claude Code with Context
        </HeadingAnchor>

        <p>
          The most effective way to optimise Claude Code performance is to provide a <code>CLAUDE.md</code> file in your
          project root.
        </p>

        <p>
          The <code>CLAUDE.md</code> file serves as project documentation for Claude, outlining common development
          commands, project architecture, directory structure, and essential development practices. This context enables
          Claude to make informed decisions about code changes and follow your project's conventions.
        </p>

        <section id="creating-a-claudemd-file">
          <h3>Creating a CLAUDE.md File</h3>

          <p>
            You can have Claude Code create a <code>CLAUDE.md</code> file automatically using a slash command:
          </p>

          <CodeSnippet code="/init" title="Create CLAUDE.md File" />

          <p>
            If the project directory is empty this won't contain much at all, if anything. If you already have existing
            files, Claude will explore your project files and create the <code>CLAUDE.md</code> file contents.
          </p>
        </section>

        <section id="claudemd-example">
          <h3>CLAUDE.md Example</h3>

          <p>
            Here is an example <code>CLAUDE.md</code> file for this website:
          </p>

          <CodeSnippet
            language="markdown"
            code={`# CLAUDE.md

## Development Commands

### Local Development
- \`bun run dev\` - Start development server at http://localhost:5173
- \`bun run build\` - Build for production
- \`bun run test\` - Run Vitest tests
- \`bun run format\` - Format code with Biome (includes linting and fixing)

### Deployment
- \`bun run deploy\` - Build and deploy to production (Cloudflare Workers)

## Project Architecture

This is a personal website built with React Router v7, deployed on Cloudflare Workers.
The architecture follows modern React patterns with server-side rendering support.

### Key Architecture Components

**Framework**: React Router v7 with SSR enabled

**Styling**: Tailwind CSS v4 with custom animations

**Content Structure**:
- Each route is a self-contained TSX file with meta() exports for SEO
- Structured data (JSON-LD) implemented for rich snippets

**Components**:
- \`NavBar\` - Main navigation with hamburger menu
- \`Footer\` - Site footer with links
- \`SocialLinks\` - Social media icon links

### Key Development Patterns

**SEO**: Comprehensive meta tags, Open Graph, Twitter Cards, and JSON-LD structured data

**Accessibility**: Skip links, semantic HTML, proper heading hierarchy, and keyboard navigation support`}
            title="Example CLAUDE.md"
          />
        </section>
      </section>

      <section>
        <HeadingAnchor id="prompting-planning-and-execution">Prompting, Planning, and Execution</HeadingAnchor>

        <p>Effective prompting and planning are key to Claude Code's performance.</p>

        <section id="prompting">
          <h3>Prompting</h3>

          <p>When providing instructions to Claude Code, clarity and context produce the best results.</p>

          <p>
            Write prompts as you would brief a software developer: clearly state requirements, provide context about the
            existing codebase, and specify expected outcomes. Use natural language rather than attempting to write
            code-like commands.
          </p>

          <p>
            If your prompt will be quite long, you can write your prompt to a file then import that file into Claude
            Code.
          </p>

          <p>
            For example, if you write a long prompt to a file called <code>prompt.md</code>, you can use this file in
            Claude Code as your prompt by prefixing the file location with the <code>@</code> character:
          </p>

          <CodeSnippet code="@prompt.md" title="Import Prompt from File" />
        </section>

        <section id="planning">
          <h3>Planning</h3>

          <p>
            Claude Code includes a dedicated Plan Mode feature. Enable it manually using <kbd>Shift</kbd>+<kbd>Tab</kbd>{" "}
            until you see <code>plan mode on</code> displayed below the input bar.
          </p>

          <p>
            Alternatively, Claude Code enters Plan Mode automatically when your prompt explicitly requests planning
            (e.g., "Plan the implementation of...").
          </p>

          <p>
            For example, you want to add a new search feature to a website built in React. You could instruct Claude
            Code as follows:
          </p>

          <CodeSnippet
            code="Plan the implementation of a new search feature. There should be a search icon in the website header which expands to take a search term input. The search functionality should search through the articles, guides, and blog posts on the website."
            title="Example: Plan Mode Instructions"
          />

          <p>
            If you have the <code>/model opusplan</code> model configuration enabled, Claude Code will switch to use the
            Opus model, and output:
          </p>

          <pre>● Entered plan mode</pre>

          <p>Claude Code may ask clarifying questions, and will present a plan for the implementation.</p>

          <p>
            If you are happy with the plan, you can instruct Claude to proceed with the implementation using the plan.
            If the plan requires amending, you can provide Claude with further instructions until you are happy with the
            plan.
          </p>
        </section>

        <section id="execution">
          <h3>Execution</h3>

          <p>
            During execution, Claude Code may request permission to run certain commands. You can grant one-time
            permission or configure persistent rules (allow always, ask every time, or deny).
          </p>

          <p>
            Claude proceeds to implement the plan by creating and modifying files. The{" "}
            <a href="#settings-and-permissions">Settings and Permissions</a> section below explains how to configure
            command permissions to streamline your workflow whilst maintaining security.
          </p>
        </section>

        <section id="parallel-agents-for-brainstorming-solutions">
          <h3>Parallel Agents for Brainstorming Solutions</h3>

          <p>Sometimes you may want to have Claude brainstorm potential implementation strategies or general ideas.</p>

          <p>
            You can have Claude Code run multiple instances in parallel to achieve this more efficiently. To have Claude
            Code do this, just specify it in your prompt. For example:
          </p>

          <CodeSnippet
            code="Use parallel subagents to brainstorm 3 potential ways to implement a contact form that send an email to my email address when someone uses the form. The solution should be able to be run on Cloudflare workers."
            title="Example: Using Parallel Subagents"
          />
        </section>
      </section>

      <section>
        <HeadingAnchor id="checkpoints-undoing-code-and-context">Checkpoints: Undoing Code and Context</HeadingAnchor>

        <p>
          When Claude Code takes an unintended direction or implements changes you want to reverse, you can use
          checkpoints to restore previous states without starting a new session.
        </p>

        <p>
          Checkpoints allow you to revert the conversation context, file changes, or both to any previous point in your
          session. Each prompt creates an automatic checkpoint.
        </p>

        <CodeSnippet code="/checkpoints" title="View Checkpoints" />

        <p>
          Note: Checkpoints are session-specific and temporary. They are not a replacement for Git version control.
          Always commit important changes to Git for permanent version history.
        </p>
      </section>

      <section>
        <HeadingAnchor id="git-and-version-control">Git and Version Control</HeadingAnchor>

        <section id="committing-and-branching">
          <h3>Committing and Branching</h3>

          <p>
            After Claude implements a feature or fix, you can request it to commit changes to Git. Claude can also
            create new branches before committing, following Git workflow best practices.
          </p>
        </section>

        <section id="history-and-explanations">
          <h3>History and Explanations</h3>

          <p>
            Claude Code can analyse Git history to understand the evolution of your codebase. This helps explain why
            particular implementations exist or how features developed over time.
          </p>

          <p>Example prompt:</p>

          <CodeSnippet
            language="markdown"
            code="Look at the Git history for the `Header.tsx` file and explain who implemented the search functionality and what changes were made at the time"
            title="Example: Git History"
          />
        </section>
      </section>

      <section>
        <HeadingAnchor id="usage-limits-and-context-control">Usage and Context Control</HeadingAnchor>

        <section id="usage-limits">
          <h3>Usage and Limits</h3>

          <p>
            Claude Code consumes tokens from your Claude subscription limits. Long sessions, large file reads, and
            frequent model interactions can consume significant portions of your monthly allocation.
          </p>

          <p>You can view your remaining usage with the following slash command:</p>

          <CodeSnippet code="/usage" title="View Usage" />
        </section>

        <section id="context-control">
          <h3>Context Control</h3>

          <p>
            Context refers to the conversation history, file contents, and other information Claude Code maintains in
            the current session. This consumes tokens from your available context window.
          </p>

          <h4>Viewing Context Use</h4>

          <p>You can view the current context use with the following slash command:</p>

          <CodeSnippet code="/context" title="Viewing Context Usage" />

          <h4>Clearing Context</h4>

          <p>
            For long-running sessions, context can accumulate rapidly. Whilst Claude Code manages this automatically,
            you can manually reset context when beginning a new feature or switching tasks using the slash command:
          </p>

          <CodeSnippet code="/clear" title="Clear Context" />

          <h4>Compacting Context</h4>

          <p>
            You can compact your message history to free up context space. This summarises previous conversations whilst
            preserving essential information. Use the slash command:
          </p>

          <CodeSnippet code="/compact" title="Compact Context" />
        </section>
      </section>

      <section>
        <HeadingAnchor id="settings-and-permissions">Settings and Permissions</HeadingAnchor>

        <p>
          To avoid repetitive permission prompts, you can configure command permissions and other settings in a{" "}
          <code>.claude/settings.local.json</code> file. Claude Code generates this file automatically, which you can
          then customise to control which commands run automatically, require confirmation, or are blocked entirely.
        </p>

        <p>
          The <code>.claude/settings.local.json</code> should not be committed to a Git repository, for shared settings
          that can be committed to a Git repository use the file <code>.claude/settings.json</code>.
        </p>

        <p>
          You can also have a "default" <code>settings.json</code> file which will be used by all Claude Code projects.
          On Linux and Mac this is located in your home directory, under <code>~/.claude/settings.json</code>.
        </p>

        <p>
          Here is an example <code>~/.claude/settings.json</code> file covering common Bash commands and development
          tools, with some being explicitly allowed to run, some requiring asking each time, and some denied altogether.
        </p>

        <CodeSnippet
          language="json"
          code={`{
  "permissions": {
    "allow": [
      "Bash(cat:*)",
      "Bash(pwd:*)",
      "Bash(head:*)",
      "Bash(tail:*)",
      "Bash(ls:*)",
      "Bash(touch:*)",
      "Bash(grep:*)",
      "Bash(awk:*)",
      "Bash(sed:*)",
      "Bash(find:*)",
      "Bash(type:*)",
      "Bash(which:*)",
      "Bash(locate:*)",
      "Bash(date:*)",
      "Bash(man:*)",
      "Bash(uname:*)",
      "Bash(du:*)",
      "Bash(make:*)",
      "Bash(mkdir:*)",
      "Bash(cd:*)",
      "Bash(npm run test:*)",
      "Bash(npm run build:*)",
      "Bash(npm run dev:*)",
      "Bash(npm run start:*)",
      "Bash(npm run lint:*)",
      "Bash(npm install:*)"
    ],
    "ask": [
      "Bash(rm:*)",
      "Bash(curl:*)",
      "Bash(wget:*)",
      "Bash(chmod:*)",
      "Bash(chown:*)",
      "Bash(git:*)",
      "Bash(docker:*)"
    ],
    "deny": [
      "Bash(ssh:*)",
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./.j2.*)"
    ],
    "env": {
      "CLAUDE_CODE_ENABLE_TELEMETRY": "0",
      "ANTHROPIC_MODEL": "opusplan"
    }
  }
}`}
          title="Example: ~/.claude/settings.json"
        />

        <p>
          The example above also sets the default model for new sessions, the <code>opusplan</code> model described
          earlier, as well as disabling telemetry.
        </p>

        <p>
          More information can be found in the Claude Code documentation:{" "}
          <a href="https://code.claude.com/docs/en/settings" target="_blank" rel="noopener noreferrer">
            code.claude.com/docs/en/settings
          </a>
          .
        </p>
      </section>

      <section>
        <HeadingAnchor id="claude-plugins-and-plugin-marketplaces">
          Claude Plugins and Plugin Marketplaces
        </HeadingAnchor>

        <p>
          Plugins provide a distribution mechanism for installing Claude Skills and MCP servers from official and
          community sources.
        </p>

        <p>
          View available plugins from default marketplaces and any external sources you've configured using the slash
          command:
        </p>

        <CodeSnippet code="/plugin" title="View Plugins" />

        <p>
          Exercise caution when installing plugins from external sources. Verify the publisher's identity and review the
          plugin's code before installation, as plugins have access to your development environment and files.
        </p>

        <p>
          The official Claude plugins marketplace has "code intelligence" plugins available (
          <a href="https://code.claude.com/docs/en/discover-plugins#code-intelligence" rel="noopener noreferrer">
            code.claude.com/docs/en/discover-plugins#code-intelligence
          </a>
          ). These allow Claude Code to find code references and see type errors.
        </p>

        <p>For example, to install the TypeScript code intelligence:</p>

        <CodeSnippet
          code="/plugin install typescript-lsp@claude-plugins-official"
          title="Install TypeScript LSP Plugin"
        />

        <p>
          Note: the TypeScript code intelligence needs the TypeScript language server to be installed, this can be done
          in your terminal outside of Claude Code, or by using the Bash mode prefix <code>!</code> in the Claude Code
          input:
        </p>

        <CodeSnippet
          language="bash"
          code="npm install -g typescript-language-server typescript"
          title="Install TypeScript Language Server"
        />

        <p>
          More information can be found at{" "}
          <a href="https://code.claude.com/docs/en/discover-plugins" rel="noreferrer noopener">
            code.claude.com/docs/en/discover-plugins
          </a>
          .
        </p>
      </section>

      <section>
        <HeadingAnchor id="claude-skills">Claude Skills</HeadingAnchor>

        <p>
          Claude Skills are a way of loading specialised knowledge into Claude Code. The main benefit is that unlike the{" "}
          <code>CLAUDE.md</code> file, <code>SKILL.md</code> file contents are not loaded into the context until the
          Skill is invoked.
        </p>

        <p>
          Skills can be run either by asking Claude to use the Skill, or with a custom slash command. More information
          can be found at{" "}
          <a href="https://code.claude.com/docs/en/skills" rel="noreferrer noopener">
            code.claude.com/docs/en/skills
          </a>
          .
        </p>

        <section id="example-custom-skill-react-component-optimiser">
          <h3>Example Custom Skill: React Component Optimiser</h3>

          <p>Here is how you could create your own Skill. This will be a Skill to help optimise React components.</p>

          <p>First create the directory for the Skill in your home directory so it can be used across projects:</p>

          <CodeSnippet
            language="bash"
            code="mkdir -p ~/.claude/skills/react-optimiser"
            title="Create Skill Directory"
          />

          <p>
            Then create a <code>SKILL.md</code> file inside the new directory (
            <code>~/.claude/skills/react-optimiser/SKILL.md</code>).
          </p>

          <p>
            In this file there will need to be a <code>name</code> and a <code>description</code> in the top block. Then
            the instructions afterwards. It must follow this format to work.
          </p>

          <CodeSnippet
            language="markdown"
            code={`---
name: react-optimiser
description: Analyses React components for performance issues and implements optimisations. Use when reviewing component performance, addressing re-render issues, or when asked to optimise React code.
---

When optimising React components:

1. **Analyse first**: Examine the component for:
   - Unnecessary re-renders (missing React.memo, useCallback, useMemo)
   - Expensive computations in render
   - Large inline objects/arrays in JSX
   - Props drilling and context overuse
   - Improper dependency arrays in hooks
   - Key prop issues in lists

2. **Create optimisation plan**: List specific issues found with:
   - Current problem and performance impact
   - Proposed solution
   - **Potential side-effects** (e.g., stale closures, reference equality assumptions)
   - Priority (critical/moderate/minor)

3. **Wait for approval**: Present the plan and ask which optimisations to implement.

4. **Implement carefully**: When requested:
   - Apply changes incrementally
   - Preserve existing functionality
   - Highlight any behavioural changes

Focus on React and TypeScript performance patterns only. Avoid project-wide configuration changes.`}
            title="Example: SKILL.md"
          />

          <p>Save the file, then restart (or start) Claude Code. You can then use the Skill by either asking Claude:</p>

          <CodeSnippet
            language="markdown"
            code="Use the React Optimiser skill to analyse the `Header.tsx` component"
            title="Example: Using the Skill by Prompting Claude"
          />

          <p>Or by using the slash command:</p>

          <CodeSnippet
            code="/react-optimiser ./components/Header.tsx"
            title="Example: Using the React Optimiser Skill with the Slash Command"
          />
        </section>
      </section>

      <section>
        <HeadingAnchor id="claude-subagents">Claude Subagents</HeadingAnchor>

        <p>Custom subagents can be created to handle specific tasks.</p>

        <p>
          For example, you might create a "Code Reviewer" subagent to review existing code, or a "Security Reviewer"
          subagent to specifically work on identifying potential security issues in your application.
        </p>

        <p>
          More information can be found at{" "}
          <a href="https://code.claude.com/docs/en/sub-agents" rel="noreferrer noopener">
            code.claude.com/docs/en/sub-agents
          </a>
          .
        </p>

        <p>
          To create a subagent, the simplest way to get started is to have Claude Code create one for you based on your
          instructions.
        </p>

        <p>First use the slash command:</p>

        <CodeSnippet code="/agents" title="Manage Agents" />

        <p>
          Then select <code>Create new agent</code> and choose <code>Personal</code> to save the subagent in your home
          directory (<code>~/.claude/agents/</code>) so it can be used in multiple projects. If you have a
          project-specific requirement, select <code>Project</code>.
        </p>

        <p>
          Select <code>Generate with Claude</code> and describe your requirement when asked. For example, for a Security
          Reviewer subagent:
        </p>

        <CodeSnippet
          code="A security reviewer agent that explores the code to highlight any potential security risks, vulnerabilities, or oversights. It should explain the risk or vulnerability and provide solutions or mitigations."
          title="Example: Security Reviewer Agent Description"
        />

        <p>
          You will then be asked to select the tool required. For the Security Reviewer we likely only need{" "}
          <code>Read-only tools</code>, so deselect everything else using the Enter key.
        </p>

        <p>
          You will then be asked to select a model. Unless your application is very specialised or unusual, Sonnet will
          be a good choice.
        </p>

        <p>
          You will then be asked to select a colour. This will highlight when this agent is running in the terminal.
        </p>

        <p>You can then run the subagent by asking Claude to use it:</p>

        <CodeSnippet
          code="Use the security-reviewer agent to explore the codebase and highlight any potential vulnerabilities"
          title="Example: Security Reviewer Agent Invocation"
        />
      </section>

      <section>
        <HeadingAnchor id="claude-mcp-servers">Claude MCP Servers</HeadingAnchor>

        <p>
          Model Context Protocol (MCP) is a standardised protocol that enables Claude to interact with external services
          and tools. MCP servers provide integrations with email providers (Gmail), project management platforms
          (Asana), communication tools (Slack), design applications (Canva), databases, and web browsers.
        </p>

        <p>
          More information can be found at{" "}
          <a href="https://code.claude.com/docs/en/mcp" rel="noreferrer noopener">
            code.claude.com/docs/en/mcp
          </a>
          .
        </p>

        <p>
          Below are two examples of two popular MCP tools available from the official Claude plugins: Playwright and
          Context7.
        </p>

        <section id="playwright-mcp">
          <h3>Playwright MCP</h3>

          <p>Playwright MCP allows Claude Code to see a website or web application.</p>

          <p>To install the Playwright MCP:</p>

          <CodeSnippet code="/plugin install playwright@claude-plugins-official" title="Install Playwright MCP" />

          <p>Restart Claude Code. Then you can use Playwright by asking Claude something like:</p>

          <CodeSnippet
            code="Use Playwright to inspect my homepage and suggest layout changes to reduce bounce rates"
            title="Example: Calling Playwright MCP"
          />

          <p>Claude will use a web browser to view the page.</p>
        </section>

        <section id="context7">
          <h3>Context7</h3>

          <p>
            Context7 provides Claude with access to current documentation and code examples for frameworks, libraries,
            and tools. This supplements Claude's training data with up-to-date information, particularly valuable given
            how rapidly software development practices and APIs evolve.
          </p>

          <p>To install the Context7 MCP:</p>

          <CodeSnippet code="/plugin install context7@claude-plugins-official" title="Install Context7 MCP" />
        </section>
      </section>

      <section>
        <HeadingAnchor id="custom-statuslines">Custom Statuslines</HeadingAnchor>

        <p>
          You can configure a custom statusline that appears below the input box in Claude Code to display session
          information.
        </p>

        <p>
          Statuslines can show the current Git branch, working directory, context window usage, active model, session
          ID, and other runtime information. This provides at-a-glance visibility into your Claude Code session state.
        </p>

        <h3>Example Custom Statusline</h3>

        <p>Here is how to add a custom statusline that looks like the following:</p>
        <picture className="block w-full max-w-4xl mx-auto">
          <source srcSet={claudeCodeStatuslineImageWebp} type="image/webp" />
          <img
            src={claudeCodeStatuslineImage}
            alt="Claude Code custom statusline showing session ID, directory, git branch, model, and context window"
            className="w-full border border-gray-300 dark:border-gray-700 rounded"
          />
        </picture>

        <p>
          First, create a file in the Claude Code user settings directory: <code>~/.claude/statusline.sh</code> with the
          following contents:
        </p>

        <CodeSnippet
          language="bash"
          code={`#!/bin/bash

# Read JSON input from stdin
input=$(cat)

# Extract values using jq
session_id=$(echo "$input" | jq -r '.session_id // "unknown"')
cwd=$(echo "$input" | jq -r '.workspace.current_dir // empty')
model_name=$(echo "$input" | jq -r '.model.display_name // "unknown"')
context_remaining=$(echo "$input" | jq -r '.context_window.remaining_percentage // empty')

# Truncate session ID to first 8 characters for brevity
session_short="\${session_id:0:8}"

# Get directory basename for display
if [ -n "$cwd" ]; then
  dir_name="\${cwd##*/}"
  [ -z "$dir_name" ] && dir_name="/"
else
  dir_name="~"
fi

# Change to working directory for git operations
cd "$cwd" 2>/dev/null || cd "$HOME"

# Get git branch (if in a git repository)
git_branch=""
git_status_icon=""
if git rev-parse --git-dir > /dev/null 2>&1; then
  branch=$(git branch --show-current 2>/dev/null)
  if [ -n "$branch" ]; then
    git_branch="$branch"
  else
    # Detached HEAD - show short commit hash
    git_branch=$(git rev-parse --short HEAD 2>/dev/null)
  fi

  # Check for uncommitted changes
  if [ -n "$(git status --porcelain 2>/dev/null)" ]; then
    git_status_icon=" ●"  # Indicates dirty working tree
  fi
fi

# Build progress bar for context remaining
build_progress_bar() {
  local percentage=$1
  local width=10
  local filled=$((percentage * width / 100))
  local empty=$((width - filled))
  local bar=""

  # Determine colour based on percentage
  if [ "$percentage" -gt 50 ]; then
    bar+="\\\\e[1;32m"  # Bright green
  elif [ "$percentage" -gt 25 ]; then
    bar+="\\\\e[1;33m"  # Bright yellow
  else
    bar+="\\\\e[1;31m"  # Bright red
  fi

  # Build the bar
  for ((i=0; i<filled; i++)); do bar+="█"; done
  bar+="\\\\e[0;90m"
  for ((i=0; i<empty; i++)); do bar+="░"; done
  bar+="\\\\e[0m"

  echo -e "$bar"
}

# Format context remaining with colour and progress bar
context_display=""
if [ -n "$context_remaining" ] && [ "$context_remaining" != "null" ]; then
  # Round to integer
  ctx_int=$(printf "%.0f" "$context_remaining")

  progress_bar=$(build_progress_bar "$ctx_int")

  # Colour for percentage text
  if [ "$ctx_int" -gt 50 ]; then
    ctx_colour="\\\\e[1;32m"  # Bright green
  elif [ "$ctx_int" -gt 25 ]; then
    ctx_colour="\\\\e[1;33m"  # Bright yellow
  else
    ctx_colour="\\\\e[1;31m"  # Bright red
  fi

  context_display="\${progress_bar} \${ctx_colour}\${ctx_int}%\\\\e[0m"
fi

C_RESET="\\\\e[0m"
C_DIM="\\\\e[0;90m"
C_WHITE="\\\\e[0;37m"
C_BLUE="\\\\e[1;34m"
C_MAGENTA="\\\\e[1;35m"
C_CYAN="\\\\e[1;36m"
C_ORANGE="\\\\e[38;5;208m"
C_PURPLE="\\\\e[38;5;141m"
C_PINK="\\\\e[38;5;213m"
C_GREEN="\\\\e[1;32m"
C_YELLOW="\\\\e[1;33m"

ICON_SESSION="💻"
ICON_FOLDER="📁"
ICON_GIT="🌳"
ICON_MODEL="🧠"
ICON_CONTEXT="🪟"
ICON_DIRTY="●"

output=""

# Session ID (abbreviated) with icon
output+="\${C_DIM}\${ICON_SESSION} \${C_PURPLE}\${session_short}\${C_RESET}"

# Separator
output+=" \${C_DIM}│\${C_RESET} "

# Current directory with icon
output+="\${C_ORANGE}\${ICON_FOLDER} \${C_BLUE}\${dir_name}\${C_RESET}"

# Git branch (if available) with icon
if [ -n "$git_branch" ]; then
  output+=" \${C_DIM}(\${C_PINK}\${ICON_GIT} \${git_branch}\${C_YELLOW}\${git_status_icon}\${C_DIM})\${C_RESET}"
fi

# Separator
output+=" \${C_DIM}│\${C_RESET} "

# Model name with icon
output+="\${C_CYAN}\${ICON_MODEL} \${model_name}\${C_RESET}"

# Context remaining (if available) with icon and progress bar
if [ -n "$context_display" ]; then
  output+=" \${C_DIM}│\${C_RESET} "
  output+="\${C_DIM}\${ICON_CONTEXT}\${C_RESET} \${context_display}"
fi

printf "%b" "$output"`}
          title="~/.claude/statusline.sh"
        />

        <p>Save the file, and grant it executable permissions with:</p>

        <CodeSnippet
          language="bash"
          code="chmod +x ~/.claude/statusline.sh"
          title="Make Statusline Script Executable"
        />

        <p>
          Then edit the user Claude Code settings JSON file <code>~/.claude/settings.json</code> and include the
          following:
        </p>

        <CodeSnippet
          language="json"
          code={`  "statusLine": {
    "type": "command",
    "command": "~/.claude/statusline.sh",
    "padding": 0
  }`}
          title="Add to ~/.claude/settings.json"
        />

        <p>
          The full <code>~/.claude/settings.json</code> file may now look something like this:
        </p>

        <CodeSnippet
          language="json"
          code={`{
  "permissions": {
    "allow": [
      "Bash(cat:*)",
      "Bash(grep:*)"
    ]
  },
  "statusLine": {
    "type": "command",
    "command": "~/.claude/statusline-command.sh",
    "padding": 0
  }
}`}
          title="Example: Full ~/.claude/settings.json"
        />

        <p>Exit Claude Code and go back into it, and you should see the new statusline below the input box.</p>
      </section>

      <section>
        <HeadingAnchor id="faq">Frequently Asked Questions</HeadingAnchor>

        <h3>What is the difference between Skills and Subagents?</h3>
        <p>
          Skills are reusable prompt templates that load specialised instructions when invoked, without consuming
          context until used. They're ideal for specific workflows like code reviews or optimisation tasks. Subagents
          are independent Claude instances that can run in parallel or background, with their own context windows and
          tool access permissions. Use Skills for repeatable workflows and Subagents for complex, multi-step tasks
          requiring isolation.
        </p>

        <h3>How much does Claude Code cost?</h3>
        <p>
          Claude Code requires a paid Claude subscription: Pro (individual use), Max (higher usage limits), or Team
          (collaborative features). Usage counts against your plan's monthly limits based on the model used (Haiku
          consumes fewer tokens than Sonnet, which consumes fewer than Opus). Check your current usage with the{" "}
          <code>/usage</code> command.
        </p>

        <h3>Can I use Claude Code offline?</h3>
        <p>
          No. Claude Code requires an active internet connection as it communicates with Anthropic's API servers to
          process requests. All AI inference happens on Anthropic's infrastructure, not locally on your machine.
        </p>

        <h3>How do I prevent Claude Code from reading sensitive files like environment variable files?</h3>
        <p>
          Add deny rules to your <code>~/.claude/settings.json</code> or <code>.claude/settings.json</code> file. For
          example:
          <code>"deny": ["Read(./.env)", "Read(./.env.*)", "Read(**/*.key)"]</code>. This prevents Claude from accessing
          environment files, private keys, or other sensitive data.
        </p>

        <h3>What are MCP servers and why would I use them?</h3>
        <p>
          Model Context Protocol (MCP) servers extend Claude Code's capabilities by connecting it to external services
          like Gmail, Slack, databases, or design tools like Canva. They enable Claude to interact with tools beyond
          your local filesystem. For example, the Playwright MCP allows Claude to view and interact with websites,
          whilst Context7 provides access to up-to-date documentation for frameworks and libraries.
        </p>
      </section>

      <section>
        <HeadingAnchor id="conclusion">Conclusion</HeadingAnchor>

        <p>
          Claude Code transforms software development by bringing AI assistance directly into your terminal whilst
          maintaining full control over your codebase. The key to maximising its effectiveness lies in proper
          configuration: create a comprehensive CLAUDE.md file, use plan mode for complex features, configure
          appropriate model selection (<code>opusplan</code> for most workflows), and leverage advanced features like
          Skills and MCP servers where appropriate.
        </p>

        <p>
          Start with the basics: installation, CLAUDE.md creation, and model selection. Then progressively adopt
          advanced features as your workflow matures. Use checkpoints to experiment safely, configure permissions to
          balance convenience with security, and create custom Skills for repetitive tasks in your domain.
        </p>

        <p>
          For the latest documentation and updates, refer to the official Claude Code documentation at{" "}
          <a href="https://code.claude.com/docs" rel="noreferrer noopener">
            code.claude.com/docs
          </a>
          .
        </p>
      </section>
    </div>
  </section>
);
