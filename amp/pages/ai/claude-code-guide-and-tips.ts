import { createBreadcrumbs, createTechArticle } from "../../../app/data/schemaData.js";
import { codeBlock } from "../../components/codeBlock.js";
import type { AmpPageData } from "../../layout.js";

const PAGE_URL = "https://www.elliotjreed.com/ai/claude-code-guide-and-tips";

export function renderPage(): AmpPageData {
  return {
    title: "Guide to Claude Code: Features and Best Practices | EJR",
    description:
      "Master Claude Code's installation, plan mode, Skills, subagents, and MCP servers. Learn prompting strategies and advanced features for AI-assisted development.",
    canonicalPath: "/ai/claude-code-guide-and-tips",
    type: "article",
    schemas: [
      createTechArticle({
        url: PAGE_URL,
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
      createBreadcrumbs([
        { name: "Home", url: "https://www.elliotjreed.com" },
        { name: "AI Guides", url: "https://www.elliotjreed.com/ai" },
        { name: "Claude Code Guide", url: PAGE_URL },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is the difference between Skills and Subagents?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Skills are reusable prompt templates that load specialised instructions when invoked, without consuming context until used. Subagents are independent Claude instances that can run in parallel or background, with their own context windows and tool access permissions.",
            },
          },
          {
            "@type": "Question",
            name: "How much does Claude Code cost?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Claude Code requires a paid Claude subscription: Pro (individual use), Max (higher usage limits), or Team (collaborative features).",
            },
          },
          {
            "@type": "Question",
            name: "Can I use Claude Code offline?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Claude Code requires an active internet connection as it communicates with Anthropic's API servers to process requests.",
            },
          },
          {
            "@type": "Question",
            name: "How do I prevent Claude Code from reading sensitive files like environment variable files?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Add deny rules to your ~/.claude/settings.json or .claude/settings.json file. For example: 'deny': ['Read(./.env)', 'Read(./.env.*)', 'Read(**/*.key)'].",
            },
          },
          {
            "@type": "Question",
            name: "What are MCP servers and why would I use them?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Model Context Protocol (MCP) servers extend Claude Code's capabilities by connecting it to external services like Gmail, Slack, databases, or design tools like Canva.",
            },
          },
        ],
      },
    ],
    body: `<section class="page-section">
  <div class="page-header">
    <h1 class="page-title">Claude Code Guide: Features and Best Practices</h1>
    <div class="page-meta">
      <span>By Elliot J. Reed</span>
      <span>&#8226;</span>
      <time datetime="2026-01-24">Published: 24th January 2026</time>
      <span>&#8226;</span>
      <time datetime="2026-01-30">Last updated: 30th January 2026</time>
    </div>
    <p class="page-intro">
      <strong>Claude Code is Anthropic&#39;s official command-line interface (CLI)</strong> that brings Claude AI
      directly into your terminal for AI-assisted software development. It enables developers to write, refactor,
      debug, and deploy code using natural language prompts whilst maintaining full control over file operations and
      command execution.
    </p>
  </div>
  <div class="prose">
    <section id="table-of-contents">
      <h2>Contents</h2>
      <ol>
        <li><a href="#cheatsheet">Quick Reference Cheatsheet</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#using-claude-code">Using Claude Code</a></li>
        <li><a href="#models">Models</a></li>
        <li><a href="#claudemd">CLAUDE.md - Providing Claude Code with Context</a></li>
        <li><a href="#prompting-planning">Prompting, Planning, and Execution</a></li>
        <li><a href="#checkpoints">Checkpoints: Undoing Code and Context</a></li>
        <li><a href="#git">Git and Version Control</a></li>
        <li><a href="#usage-context">Usage and Context Control</a></li>
        <li><a href="#settings">Settings and Permissions</a></li>
        <li><a href="#plugins">Claude Plugins and Plugin Marketplaces</a></li>
        <li><a href="#skills">Claude Skills</a></li>
        <li><a href="#subagents">Claude Subagents</a></li>
        <li><a href="#mcp">Claude MCP Servers</a></li>
        <li><a href="#statuslines">Custom Statuslines</a></li>
        <li><a href="#faq">Frequently Asked Questions</a></li>
        <li><a href="#conclusion">Conclusion</a></li>
      </ol>
    </section>

    <section id="cheatsheet">
      <h2>Quick Reference Cheatsheet</h2>

      <h3>Prefixes</h3>
      <ul>
        <li><code>!</code> - Bash mode prefix</li>
        <li><code>@</code> - Mention files/folders</li>
      </ul>

      <h3>Keyboard Shortcuts</h3>
      <ul>
        <li><kbd>Esc</kbd>+<kbd>Esc</kbd> - Open rewind menu (undo changes)</li>
        <li><kbd>Shift</kbd>+<kbd>Tab</kbd> - Auto accept edits mode</li>
        <li><kbd>Shift</kbd>+<kbd>Tab</kbd>+<kbd>Tab</kbd> - Plan mode</li>
      </ul>

      <h3>Slash Commands</h3>
      <ul>
        <li><code>/init</code> - Creates a CLAUDE.md file</li>
        <li><code>/login</code> - Switch Claude accounts</li>
        <li><code>/model [model]</code> - Sets model</li>
        <li><code>/usage</code> - Spent and remaining usage</li>
        <li><code>/rewind</code> - Open rewind menu (undo changes)</li>
        <li><code>/clear</code> - Clears all context window</li>
        <li><code>/compact [instructions]</code> - Compacts/summarises context</li>
        <li><code>/config</code> - Views current configuration settings</li>
        <li><code>/permissions</code> - Views current allowed commands</li>
        <li><code>/review</code> - Request code review</li>
        <li><code>/status</code> - Shows status, including MCP connections</li>
        <li><code>/memory</code> - Allows editing Claude&#39;s memory</li>
        <li><code>/plugin</code> - Lists available and installed plugins</li>
        <li><code>/mcp</code> - Lists connected and unconnected MCP servers</li>
        <li><code>/agents</code> - Lists user and built-in agents, option to create new agent</li>
        <li><code>/doctor</code> - Shows diagnostics and current Claude Code version</li>
        <li><code>/help</code> - Shows help menu</li>
      </ul>
    </section>

    <section>
      <h2 id="installation">Installation</h2>
      <p>
        To install Claude Code, refer to the official instructions at
        <a href="https://code.claude.com/docs/en/setup#installation" rel="noreferrer noopener">
          code.claude.com/docs/en/setup
        </a>.
      </p>
    </section>

    <section>
      <h2 id="using-claude-code">Using Claude Code</h2>

      <p>
        Claude Code operates within the directory where you launch it, typically your project&#39;s root folder.
        To start Claude Code in your terminal, run:
      </p>
      ${codeBlock("claude", "Start Claude Code", "bash")}

      <p>
        When first running Claude Code, you should be prompted to log in. You will need to be on a paid plan,
        either &#8220;Pro&#8221;, &#8220;Max&#8221;, or &#8220;Team&#8221;. If you are not prompted to log in,
        use the slash command:
      </p>
      ${codeBlock("/login", "Log In to Claude.ai")}

      <p>
        Prompts are typed in the input bar. You can paste text and screenshot images, and drag and drop files
        into the terminal.
      </p>

      <h3>Essential Commands and Shortcuts</h3>

      <h4>Shift+Tab</h4>
      <p>
        Using <kbd>Shift</kbd>+<kbd>Tab</kbd> will switch Claude Code between <code>accept edits</code> mode,
        <code>plan mode</code>, and back to default mode.
      </p>
      <p>
        <strong>Auto-Accept Edits</strong>: Using <kbd>Shift</kbd>+<kbd>Tab</kbd> with <code>accept edits on</code>
        will allow Claude Code to add and edit files without asking each time.
      </p>
      <p>
        <strong>Plan Mode</strong>: Using <kbd>Shift</kbd>+<kbd>Tab</kbd> with <code>plan mode on</code> will tell
        Claude to assess your requirements, ask any clarifying questions if necessary, and output the plan before
        adding and modifying files.
      </p>

      <h4>Bash Mode</h4>
      <p>You can switch into &#8220;Bash mode&#8221; to run terminal commands yourself:</p>
      ${codeBlock("!", "Switch to Bash Mode")}
      ${codeBlock("! ls", "List Directory Contents")}
    </section>

    <section>
      <h2 id="models">Models</h2>
      <p>Claude Code supports three models:</p>
      <ol>
        <li><strong>Opus</strong> - highest capability model, slower response times, higher usage costs</li>
        <li><strong>Sonnet</strong> - balanced performance and cost, suitable for most development tasks</li>
        <li><strong>Haiku</strong> - fastest responses, lowest usage costs, ideal for straightforward tasks</li>
      </ol>

      <p>You can switch between models using the slash command:</p>
      ${codeBlock("/model", "Switch Model")}

      <h3>Recommended Setup: Opus Plan Mode with Sonnet Execution</h3>
      <p>
        Using Opus in Plan Mode, then executing the plan using Sonnet is a great default. Use this slightly hidden
        feature to have this occur automatically:
      </p>
      ${codeBlock("/model opusplan", "Opus Plan Mode with Sonnet Execution")}
    </section>

    <section>
      <h2 id="claudemd">CLAUDE.md - Providing Claude Code with Context</h2>

      <p>
        The most effective way to optimise Claude Code performance is to provide a <code>CLAUDE.md</code> file in your
        project root. This file serves as project documentation for Claude, outlining common development commands,
        project architecture, directory structure, and essential development practices.
      </p>

      <p>You can have Claude Code create a <code>CLAUDE.md</code> file automatically:</p>
      ${codeBlock("/init", "Create CLAUDE.md File")}

      ${codeBlock(
        `# CLAUDE.md

## Development Commands

### Local Development
- \`bun run dev\` - Start development server at http://localhost:5173
- \`bun run build\` - Build for production
- \`bun run test\` - Run Vitest tests
- \`bun run format\` - Format code with Prettier

## Project Architecture

This is a personal website built with React Router v7, deployed on Cloudflare Workers.

### Key Architecture Components

**Framework**: React Router v7 with SSR enabled
**Styling**: Tailwind CSS v4 with custom animations

### Key Development Patterns

**SEO**: Comprehensive meta tags, Open Graph, Twitter Cards, and JSON-LD structured data`,
        "Example CLAUDE.md",
        "markdown",
      )}
    </section>

    <section>
      <h2 id="prompting-planning">Prompting, Planning, and Execution</h2>

      <h3>Prompting</h3>
      <p>
        Write prompts as you would brief a software developer: clearly state requirements, provide context about the
        existing codebase, and specify expected outcomes. Use natural language rather than attempting to write
        code-like commands.
      </p>
      <p>
        If your prompt will be quite long, you can write your prompt to a file then import that file into Claude Code
        using the <code>@</code> prefix:
      </p>
      ${codeBlock("@prompt.md", "Import Prompt from File")}

      <h3>Planning</h3>
      <p>
        Claude Code enters Plan Mode when your prompt explicitly requests planning (e.g., &#8220;Plan the
        implementation of...&#8221;) or when you enable it manually using <kbd>Shift</kbd>+<kbd>Tab</kbd>.
      </p>
      ${codeBlock(
        "Plan the implementation of a new search feature. There should be a search icon in the website header which expands to take a search term input. The search functionality should search through the articles, guides, and blog posts on the website.",
        "Example: Plan Mode Instructions",
      )}

      <h3>Parallel Agents for Brainstorming</h3>
      <p>
        You can have Claude Code run multiple instances in parallel to brainstorm implementation strategies. For
        example:
      </p>
      ${codeBlock(
        "Use parallel subagents to brainstorm 3 potential ways to implement a contact form that sends an email to my email address when someone uses the form. The solution should be able to be run on Cloudflare Workers.",
        "Example: Using Parallel Subagents",
      )}
    </section>

    <section>
      <h2 id="checkpoints">Checkpoints: Undoing Code and Context</h2>
      <p>
        When Claude Code takes an unintended direction, you can use checkpoints to restore previous states without
        starting a new session. Each prompt creates an automatic checkpoint. View checkpoints with:
      </p>
      ${codeBlock("/checkpoints", "View Checkpoints")}
      <p>
        Note: Checkpoints are session-specific and temporary. They are not a replacement for Git version control.
        Always commit important changes to Git for permanent version history.
      </p>
    </section>

    <section>
      <h2 id="usage-context">Usage and Context Control</h2>
      <p>Check your remaining usage with:</p>
      ${codeBlock("/usage", "View Usage")}

      <p>Clear all context to start fresh:</p>
      ${codeBlock("/clear", "Clear Context")}

      <p>Compact your message history to free up context space:</p>
      ${codeBlock("/compact", "Compact Context")}
    </section>

    <section>
      <h2 id="settings">Settings and Permissions</h2>
      <p>
        To avoid repetitive permission prompts, configure command permissions in a <code>.claude/settings.local.json</code>
        file. For shared settings that can be committed to a Git repository, use <code>.claude/settings.json</code>.
        The global settings file for all projects is at <code>~/.claude/settings.json</code>.
      </p>

      ${codeBlock(
        `{
  "permissions": {
    "allow": [
      "Bash(cat:*)",
      "Bash(ls:*)",
      "Bash(grep:*)",
      "Bash(npm run test:*)",
      "Bash(npm run build:*)"
    ],
    "ask": [
      "Bash(rm:*)",
      "Bash(curl:*)",
      "Bash(git:*)",
      "Bash(docker:*)"
    ],
    "deny": [
      "Bash(ssh:*)",
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(**/*.key)"
    ],
    "env": {
      "CLAUDE_CODE_ENABLE_TELEMETRY": "0",
      "ANTHROPIC_MODEL": "opusplan"
    }
  }
}`,
        "Example: ~/.claude/settings.json",
        "json",
      )}
    </section>

    <section>
      <h2 id="plugins">Claude Plugins and Plugin Marketplaces</h2>
      <p>
        Plugins provide a distribution mechanism for installing Claude Skills and MCP servers from official and
        community sources. View available plugins:
      </p>
      ${codeBlock("/plugin", "View Plugins")}
      <p>
        Exercise caution when installing plugins from external sources. The official Claude plugins marketplace has
        &#8220;code intelligence&#8221; plugins available. For example, to install the TypeScript code intelligence:
      </p>
      ${codeBlock("/plugin install typescript-lsp@claude-plugins-official", "Install TypeScript LSP Plugin")}
    </section>

    <section>
      <h2 id="skills">Claude Skills</h2>
      <p>
        Claude Skills are a way of loading specialised knowledge into Claude Code. Unlike the <code>CLAUDE.md</code>
        file, <code>SKILL.md</code> file contents are not loaded into the context until the Skill is invoked.
      </p>

      <h3>Example Custom Skill: React Component Optimiser</h3>
      <p>First create the directory for the Skill in your home directory:</p>
      ${codeBlock("mkdir -p ~/.claude/skills/react-optimiser", "Create Skill Directory", "bash")}

      <p>Then create a <code>SKILL.md</code> file inside the new directory:</p>
      ${codeBlock(
        `---
name: react-optimiser
description: Analyses React components for performance issues and implements optimisations. Use when reviewing component performance, addressing re-render issues, or when asked to optimise React code.
---

When optimising React components:

1. **Analyse first**: Examine the component for unnecessary re-renders, expensive computations, key prop issues
2. **Create optimisation plan**: List specific issues found with proposed solutions and potential side-effects
3. **Wait for approval**: Present the plan and ask which optimisations to implement
4. **Implement carefully**: Apply changes incrementally, preserve existing functionality`,
        "Example: SKILL.md",
        "markdown",
      )}

      <p>Use the Skill by asking Claude:</p>
      ${codeBlock("Use the React Optimiser skill to analyse the `Header.tsx` component", "Example: Using the Skill")}
      <p>Or by using the slash command:</p>
      ${codeBlock("/react-optimiser ./components/Header.tsx", "Example: Using the React Optimiser Skill")}
    </section>

    <section>
      <h2 id="subagents">Claude Subagents</h2>
      <p>
        Custom subagents can be created to handle specific tasks, such as a &#8220;Code Reviewer&#8221; subagent or a
        &#8220;Security Reviewer&#8221; subagent. To create a subagent:
      </p>
      ${codeBlock("/agents", "Manage Agents")}
      <p>
        Then select <code>Create new agent</code> and choose <code>Personal</code> to save the subagent in your home
        directory (<code>~/.claude/agents/</code>) so it can be used in multiple projects. Select
        <code>Generate with Claude</code> and describe your requirement when asked. For example:
      </p>
      ${codeBlock(
        "A security reviewer agent that explores the code to highlight any potential security risks, vulnerabilities, or oversights. It should explain the risk or vulnerability and provide solutions or mitigations.",
        "Example: Security Reviewer Agent Description",
      )}
      <p>You can then run the subagent by asking Claude to use it:</p>
      ${codeBlock(
        "Use the security-reviewer agent to explore the codebase and highlight any potential vulnerabilities",
        "Example: Security Reviewer Agent Invocation",
      )}
    </section>

    <section>
      <h2 id="mcp">Claude MCP Servers</h2>
      <p>
        Model Context Protocol (MCP) is a standardised protocol that enables Claude to interact with external services
        and tools. MCP servers provide integrations with email providers (Gmail), project management platforms
        (Asana), communication tools (Slack), design applications (Canva), databases, and web browsers.
      </p>

      <h3>Playwright MCP</h3>
      <p>Playwright MCP allows Claude Code to see a website or web application. To install:</p>
      ${codeBlock("/plugin install playwright@claude-plugins-official", "Install Playwright MCP")}
      <p>Then use Playwright by asking Claude something like:</p>
      ${codeBlock(
        "Use Playwright to inspect my homepage and suggest layout changes to reduce bounce rates",
        "Example: Calling Playwright MCP",
      )}

      <h3>Context7</h3>
      <p>
        Context7 provides Claude with access to current documentation and code examples for frameworks, libraries,
        and tools. This supplements Claude&#39;s training data with up-to-date information. To install:
      </p>
      ${codeBlock("/plugin install context7@claude-plugins-official", "Install Context7 MCP")}
    </section>

    <section>
      <h2 id="statuslines">Custom Statuslines</h2>
      <p>
        You can configure a custom statusline that appears below the input box in Claude Code to display session
        information such as the current Git branch, working directory, context window usage, and active model.
      </p>
      <p>
        Create a file at <code>~/.claude/statusline.sh</code> with your statusline script, make it executable
        (<code>chmod +x ~/.claude/statusline.sh</code>), and add to your <code>~/.claude/settings.json</code>:
      </p>
      ${codeBlock(
        `  "statusLine": {
    "type": "command",
    "command": "~/.claude/statusline.sh",
    "padding": 0
  }`,
        "Add to ~/.claude/settings.json",
        "json",
      )}
    </section>

    <section>
      <h2 id="faq">Frequently Asked Questions</h2>

      <h3>What is the difference between Skills and Subagents?</h3>
      <p>
        Skills are reusable prompt templates that load specialised instructions when invoked, without consuming
        context until used. They&#39;re ideal for specific workflows like code reviews or optimisation tasks. Subagents
        are independent Claude instances that can run in parallel or background, with their own context windows and
        tool access permissions.
      </p>

      <h3>How much does Claude Code cost?</h3>
      <p>
        Claude Code requires a paid Claude subscription: Pro (individual use), Max (higher usage limits), or Team
        (collaborative features). Usage counts against your plan&#39;s monthly limits based on the model used (Haiku
        consumes fewer tokens than Sonnet, which consumes fewer than Opus). Check your current usage with the
        <code>/usage</code> command.
      </p>

      <h3>Can I use Claude Code offline?</h3>
      <p>
        No. Claude Code requires an active internet connection as it communicates with Anthropic&#39;s API servers to
        process requests. All AI inference happens on Anthropic&#39;s infrastructure, not locally on your machine.
      </p>

      <h3>How do I prevent Claude Code from reading sensitive files?</h3>
      <p>
        Add deny rules to your <code>~/.claude/settings.json</code> or <code>.claude/settings.json</code> file. For
        example: <code>"deny": ["Read(./.env)", "Read(./.env.*)", "Read(**/*.key)"]</code>. This prevents Claude from
        accessing environment files, private keys, or other sensitive data.
      </p>

      <h3>What are MCP servers and why would I use them?</h3>
      <p>
        Model Context Protocol (MCP) servers extend Claude Code&#39;s capabilities by connecting it to external
        services like Gmail, Slack, databases, or design tools like Canva. For example, the Playwright MCP allows
        Claude to view and interact with websites, whilst Context7 provides access to up-to-date documentation for
        frameworks and libraries.
      </p>
    </section>

    <section>
      <h2 id="conclusion">Conclusion</h2>
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
        For the latest documentation and updates, refer to the official Claude Code documentation at
        <a href="https://code.claude.com/docs" rel="noreferrer noopener">code.claude.com/docs</a>.
      </p>
    </section>
  </div>
</section>`,
  };
}
