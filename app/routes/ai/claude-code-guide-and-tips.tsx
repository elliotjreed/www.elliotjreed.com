import type { ReactElement } from "react";
import { CodeSnippet } from "~/components/CodeSnippet/CodeSnippet";
import { HeadingAnchor } from "~/components/HeadingAnchor/HeadingAnchor";
import claudeCodeStatuslineImage from "~/images/articles/claude-code-custom-statusline.png";
import claudeCodeStatuslineImageWebp from "~/images/articles/claude-code-custom-statusline.webp";

export const meta = () => [
  { title: "Claude Code Guide and Tips | EJR" },
  {
    name: "description",
    content:
      "A comprehensive guide to using Claude Code for software development, covering installation, prompting strategies, planning, git integration, and advanced features like skills, subagents, and MCP servers.",
  },
];

export default (): ReactElement => (
  <section className="divide-y divide-gray-200 dark:divide-gray-700">
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-700 dark:text-gray-200 sm:text-4xl sm:leading-10 md:text-6xl">
        Claude Code: Guide &amp; Tips
      </h1>

      <p className="prose dark:prose-dark max-w-none text-lg leading-7 text-gray-600 dark:text-gray-300">
        This guide provides a broad overview on how to get the most from Claude Code.
      </p>
      <p className="prose dark:prose-dark max-w-none text-lg leading-7 text-gray-600 dark:text-gray-300">
        If you're already using Claude Code and want to go beyond the basics, this guide covers{" "}
        <a href="#models">model selection</a>, the{" "}
        <a href="#claudemd-providing-claude-code-with-context">CLAUDE.md context file</a>,{" "}
        <a href="#prompting-planning-and-execution">"plan mode"</a>,{" "}
        <a href="#checkpoints-undoing-code-and-context">undoing / rewinding</a>,{" "}
        <a href="#settings-and-permissions">settings and permissions</a>,{" "}
        <a href="#claude-plugins-and-plugin-marketplaces">plugins and marketplaces</a>,{" "}
        <a href="#claude-skills">Claude Skills</a>, <a href="#claude-subagents">Agents</a>,{" "}
        <a href="#claude-mcp-servers">MCP Servers</a>, and <a href="#custom-statuslines">custom status lines</a>.
      </p>
    </div>

    <div className="prose max-w-none dark:prose-dark">
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
        </ol>
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

        <p>
          Claude Code runs from the directory (folder) you open it in. This will likely be the directory of the
          application you are developing.
        </p>

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

        <p>Claude Code has access to the three main Claude LLM models:</p>
        <ol>
          <li>Opus - the biggest, most intelligent, slowest, and most costly model</li>
          <li>Sonnet - the mid-tier model, quicker and more cost-effective than Opus</li>
          <li>Haiku - the smallest model, very fast and very cost-effective</li>
        </ol>

        <p>You can switch between models in Claude Code by running the slash command:</p>

        <CodeSnippet code="/model" title="Switch Model" />

        <h3>Which Models to Use</h3>

        <h4>Opus</h4>

        <p>Opus is the most intelligent, but will use up your limits rather quickly.</p>

        <p>Opus is great for planning features, and implementing more challenging features.</p>

        <h4>Sonnet</h4>

        <p>Sonnet is faster than Opus and will not use up your limits as quickly.</p>

        <p>
          Sonnet is great for most use-cases. You will likely find that Sonnet is great as the default implementation
          model - the model writing the code.
        </p>

        <h4>Haiku</h4>

        <p>Haiku is the fastest model, and will not use up limits as quickly as either Opus or Sonnet.</p>

        <p>
          Haiku can be good for implementing standard features. For example, creating a website in React JS, or a data
          analysis project in Python.
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
          An absolutely essential way to get the most out of Claude Code is to have a <code>CLAUDE.md</code> file.
        </p>

        <p>
          The <code>CLAUDE.md</code> file is where you outline common development commands, explain the project layout
          and architecture, and describe essential development practices.
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

        <p>The key to having Claude Code perform well is in effective prompting and planning.</p>

        <section id="prompting">
          <h3>Prompting</h3>

          <p>When providing instructions to Claude Code, clarity and context are key.</p>

          <p>
            Imagine you are a Product Owner, instruct Claude as you would a Software Developer. Be clear about the
            requirements. Use natural language.
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
            As previously outlined, Claude Code has a "Plan Mode". You can enter Plan Mode by <kbd>Shift</kbd>+
            <kbd>Tab</kbd> where you will see <code>plan mode on</code> under the input bar.
          </p>

          <p>Claude Code can also enter Plan Mode automatically through instructions.</p>

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
            When Claude Code starts executing the plan, it may ask whether you want to allow certain commands to be
            allowed to run automatically each time, or have Claude Code ask you each time.
          </p>

          <p>
            Claude will proceed to write the code, and will ask for any further commands it wants to run. This guide
            will later outline how common commands can be configured to be allowed to run automatically, ask every time,
            or not be allowed to run at all.
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

        <p>Sometimes Claude can go down a path that is just not what you intended or expected.</p>

        <p>Fortunately you do not need to start a new session, or instruct Claude to undo what it has started.</p>

        <p>Checkpoints allow you to revert either the context, the code, or both, to a previous prompt stage.</p>

        <CodeSnippet code="/checkpoints" title="View Checkpoints" />

        <p>The checkpoints are not a replacement for version control via Git.</p>
      </section>

      <section>
        <HeadingAnchor id="git-and-version-control">Git and Version Control</HeadingAnchor>

        <section id="committing-and-branching">
          <h3>Committing and Branching</h3>

          <p>
            When a new feature or bug fix is implemented and you are reasonably happy with it, you can ask Claude to
            commit the changes to Git (or create a new Git branch then commit the changes).
          </p>
        </section>

        <section id="history-and-explanations">
          <h3>History and Explanations</h3>

          <p>
            Claude Code can access Git history. This can be useful for understanding why a feature or fix had previously
            been implemented.
          </p>

          <p>You can ask Claude something like:</p>

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

          <p>Claude Code can use a lot of "tokens", which heavily count towards the overall Claude limits.</p>

          <p>You can view your remaining usage with the following slash command:</p>

          <CodeSnippet code="/usage" title="View Usage" />
        </section>

        <section id="context-control">
          <h3>Context Control</h3>

          <p>
            The "context" (very basically) is the amount of "tokens" Claude Code is holding in your current session.
          </p>

          <h4>Viewing Context Use</h4>

          <p>You can view the current context use with the following slash command:</p>

          <CodeSnippet code="/context" title="Viewing Context Usage" />

          <h4>Clearing Context</h4>

          <p>
            For long-running sessions the context can fill up quite quickly. Claude Code will manage this itself
            largely. However, when beginning a new feature you can force a context reset with the slash command:
          </p>

          <CodeSnippet code="/clear" title="Clear Context" />

          <h4>Compacting Context</h4>

          <p>
            You can "compact" your message history context to free up context. This will basically summarise where you
            are currently at. This can be done with the slash command:
          </p>

          <CodeSnippet code="/compact" title="Compact Context" />
        </section>
      </section>

      <section>
        <HeadingAnchor id="settings-and-permissions">Settings and Permissions</HeadingAnchor>

        <p>
          Having Claude Code ask for permissions to run commands each time is not ideal. Fortunately, you can specify
          command permissions, along with other settings, in a <code>./claude/settings.local.json</code> file. This will
          be generated automatically by Claude, and can be edited and added to.
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
          Plugins and the plugin marketplaces are a way to install Claude Skills and MCP servers from external sources.
        </p>

        <p>
          Plugins which are available by default and where the marketplace for external plugins have been added can be
          viewed using the slash command:
        </p>

        <CodeSnippet code="/plugin" title="View Plugins" />

        <p>
          When installing from external sources, use caution - anyone can create a plugin and host it on GitHub, ensure
          you trust the source.
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
          <code>CLAUDE.md</code> file, full Skills file contents are not loaded into the context until used.
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
          Model Context Protocol (MCP) is a standardised way of allowing Claude (and others) to interact with external
          services. These could be email providers (eg. Gmail), project management tools (eg. Asana), communication
          applications (eg. Slack), and design applications (eg. Canva).
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
            Context7 is a really useful MCP. It allows Claude to look up up-to-date documentation and examples, rather
            than relying just on the training data (which quickly becomes outdated in the world of software
            development).
          </p>

          <p>To install the Context7 MCP:</p>

          <CodeSnippet code="/plugin install context7@claude-plugins-official" title="Install Context7 MCP" />
        </section>
      </section>

      <section>
        <HeadingAnchor id="custom-statuslines">Custom Statuslines</HeadingAnchor>

        <p>A custom statusline, an area below the main input box in Claude Code, can be added.</p>

        <p>
          This can be configured to display variables such as the current Git branch, current working directory, context
          window usage, and the current model Claude Code is using.
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
    "command": "~/.claude/statusline-command.sh",
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
    </div>
  </section>
);
