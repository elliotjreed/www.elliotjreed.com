export interface SearchMeta {
  description: string;
  category: string;
  keywords: string[];
}

export interface SitemapMeta {
  lastModified?: string;
}

export interface SitePage {
  id: string;
  path: string;
  routeFile: string;
  title: string;
  index?: boolean;
  search?: SearchMeta;
  sitemap?: SitemapMeta;
}

export interface NavigationNode {
  title: string;
  pageId?: string;
  showInNavigation: boolean;
  children?: NavigationNode[];
}

export const sitePages: SitePage[] = [
  {
    id: "home",
    path: "/",
    routeFile: "routes/home.tsx",
    title: "Home",
    index: true,
  },
  {
    id: "ai-category",
    path: "/ai",
    routeFile: "routes/ai.tsx",
    title: "AI Guides",
    sitemap: { lastModified: "2026-02-10T00:00:00+00:00" },
  },
  {
    id: "ai-prompt-guide",
    path: "/ai/ai-prompt-engineering-guide",
    routeFile: "routes/ai/ai-prompt-engineering-guide.tsx",
    title: "AI Prompt Guide",
    search: {
      description:
        "A guide and introduction to prompt engineering techniques for AI LLMs such as ChatGPT, Claude, Gemini, and DeepSeek.",
      category: "AI Guides",
      keywords: ["ai", "prompt", "engineering", "chatgpt", "claude", "gemini", "deepseek", "llm"],
    },
    sitemap: { lastModified: "2026-01-30T00:00:00+00:00" },
  },
  {
    id: "ai-cafe-framework",
    path: "/ai/cafe-ai-prompt-framework",
    routeFile: "routes/ai/cafe-ai-prompt-framework.tsx",
    title: "CAFE Prompt Framework",
    search: {
      description: "A simple framework for creating effective AI prompts using Context, Action, Format, and Examples.",
      category: "AI Guides",
      keywords: ["ai", "prompt", "framework", "cafe", "context", "action", "format", "examples"],
    },
    sitemap: { lastModified: "2026-01-30T00:00:00+00:00" },
  },
  {
    id: "ai-claude-code-guide",
    path: "/ai/claude-code-guide-and-tips",
    routeFile: "routes/ai/claude-code-guide-and-tips.tsx",
    title: "Claude Code Guide",
    search: {
      description:
        "A comprehensive guide to using Claude Code for software development, covering installation, prompting strategies, planning, git integration, and advanced features like skills, subagents, and MCP servers.",
      category: "AI Guides",
      keywords: [
        "claude",
        "code",
        "cli",
        "terminal",
        "software development",
        "prompting",
        "planning",
        "skills",
        "subagents",
        "mcp",
        "git",
        "opus",
        "sonnet",
        "haiku",
        "agents",
        "programming",
        "development",
        "automation",
      ],
    },
    sitemap: { lastModified: "2026-01-30T00:00:00+00:00" },
  },
  {
    id: "ai-learning-resources",
    path: "/ai/recommended-ai-learning-resources",
    routeFile: "routes/ai/recommended-ai-learning-resources.tsx",
    title: "AI Links & Resources",
    search: {
      description: "Curated collection of learning resources, tools, and links for AI and machine learning.",
      category: "AI Guides",
      keywords: ["ai", "resources", "learning", "tools", "machine learning", "links"],
    },
    sitemap: { lastModified: "2026-01-30T00:00:00+00:00" },
  },
  {
    id: "ai-ethical-workplace",
    path: "/ai/ethical-considerations-for-ai-in-the-workplace",
    routeFile: "routes/ai/ethical-considerations-for-ai-in-the-workplace.tsx",
    title: "Ethical AI in the Workplace",
    sitemap: { lastModified: "2026-01-31T00:00:00+00:00" },
  },
  {
    id: "ai-multiple-claude-instances",
    path: "/ai/running-multiple-claude-code-instances",
    routeFile: "routes/ai/running-multiple-claude-code-instances.tsx",
    title: "Run Multiple Claude Code Instances",
    search: {
      description:
        "Learn how to run multiple Claude Code instances simultaneously for different accounts using environment variables, custom configuration directories, and shell aliases.",
      category: "AI Guides",
      keywords: [
        "claude",
        "code",
        "cli",
        "multiple instances",
        "configuration",
        "environment variables",
        "shell aliases",
        "symlinks",
        "productivity",
        "linux",
        "mac",
      ],
    },
    sitemap: { lastModified: "2026-02-10T00:00:00+00:00" },
  },
  {
    id: "linux-category",
    path: "/linux",
    routeFile: "routes/linux.tsx",
    title: "ZSH / Bash Shell Guides",
    sitemap: { lastModified: "2026-02-18T00:00:00+00:00" },
  },
  {
    id: "linux-zsh-aliases",
    path: "/linux/zsh-bash-aliases",
    routeFile: "routes/linux/zsh-bash-aliases.tsx",
    title: "Useful Shell Aliases",
    search: {
      description: "Collection of useful shell aliases for ZSH and Bash to improve productivity.",
      category: "ZSH / Bash Shell Guides",
      keywords: ["zsh", "bash", "shell", "aliases", "linux", "terminal", "productivity"],
    },
    sitemap: { lastModified: "2026-01-30T00:00:00+00:00" },
  },
  {
    id: "linux-zsh-functions",
    path: "/linux/zsh-bash-functions",
    routeFile: "routes/linux/zsh-bash-functions.tsx",
    title: "Useful Shell Functions",
    search: {
      description: "Helpful shell functions for ZSH and Bash to automate common tasks.",
      category: "ZSH / Bash Shell Guides",
      keywords: ["zsh", "bash", "shell", "functions", "linux", "terminal", "automation"],
    },
    sitemap: { lastModified: "2026-01-30T00:00:00+00:00" },
  },
  {
    id: "linux-copy-mysql-table",
    path: "/linux/copy-mysql-table-data-to-new-table",
    routeFile: "routes/linux/copy-mysql-table-data-to-new-table.tsx",
    title: "Duplicate MySQL table",
    search: {
      description: "How to copy MySQL or MariaDB table data and structure to a new table.",
      category: "ZSH / Bash Shell Guides",
      keywords: ["mysql", "mariadb", "table", "copy", "duplicate", "database", "sql"],
    },
    sitemap: { lastModified: "2026-01-30T00:00:00+00:00" },
  },
  {
    id: "linux-get-ip-address",
    path: "/linux/get-local-and-public-ip-address-command-line-bash",
    routeFile: "routes/linux/get-local-and-public-ip-address-command-line-bash.tsx",
    title: "Find local and public IP address",
    search: {
      description: "Command line methods to find your local and public IP addresses using Bash.",
      category: "ZSH / Bash Shell Guides",
      keywords: ["ip", "address", "local", "public", "bash", "command", "line", "network"],
    },
    sitemap: { lastModified: "2026-01-30T00:00:00+00:00" },
  },
  {
    id: "linux-fix-ssh-permissions",
    path: "/linux/fix-ssh-permissions-after-moving-directory",
    routeFile: "routes/linux/fix-ssh-permissions-after-moving-directory.tsx",
    title: "Fix SSH directory permissions",
    search: {
      description:
        "Learn how to correctly set SSH file permissions after moving your .ssh directory to a new computer.",
      category: "ZSH / Bash Shell Guides",
      keywords: ["ssh", "permissions", "security", "linux", "mac", "command", "line", "bash", "chmod", "file"],
    },
    sitemap: { lastModified: "2026-02-10T00:00:00+00:00" },
  },
  {
    id: "linux-update-bun-global-packages",
    path: "/linux/update-bun-global-packages",
    routeFile: "routes/linux/update-bun-global-packages.tsx",
    title: "Update global Bun packages",
    search: {
      description: "How to update globally-installed packages with Bun using a one-line command or a shell alias.",
      category: "ZSH / Bash Shell Guides",
      keywords: ["bun", "npm", "global", "packages", "update", "shell", "alias", "linux", "mac", "terminal"],
    },
    sitemap: { lastModified: "2026-02-18T00:00:00+00:00" },
  },
  {
    id: "linux-install-mariadb",
    path: "/linux/install-mariadb-on-ubuntu-and-allow-remote-access",
    routeFile: "routes/linux/install-mariadb-on-ubuntu-and-allow-remote-access.tsx",
    title: "Install MariaDB on Ubuntu",
    search: {
      description: "Step-by-step guide to installing MariaDB on Ubuntu and configuring remote access.",
      category: "ZSH / Bash Shell Guides",
      keywords: ["mariadb", "mysql", "ubuntu", "linux", "database", "install", "remote", "access"],
    },
    sitemap: { lastModified: "2026-01-30T00:00:00+00:00" },
  },
  {
    id: "linux-search-directory",
    path: "/linux/search-a-directory-for-text-string-via-command-line",
    routeFile: "routes/linux/search-a-directory-for-text-string-via-command-line.tsx",
    title: "Search directory for a string",
    search: {
      description: "How to search files in a directory for specific text strings using command line tools.",
      category: "ZSH / Bash Shell Guides",
      keywords: ["search", "grep", "find", "text", "string", "directory", "command", "line"],
    },
    sitemap: { lastModified: "2026-01-30T00:00:00+00:00" },
  },
  {
    id: "docker-category",
    path: "/docker",
    routeFile: "routes/docker.tsx",
    title: "Docker Guides",
    sitemap: { lastModified: "2026-02-05T00:00:00+00:00" },
  },
  {
    id: "docker-get-ip",
    path: "/docker/get-docker-and-docker-compose-container-ip-addresses",
    routeFile: "routes/docker/get-docker-and-docker-compose-container-ip-addresses.tsx",
    title: "Find Docker IP address",
    search: {
      description: "Methods to find IP addresses of Docker containers and Docker Compose services.",
      category: "Docker Guides",
      keywords: ["docker", "compose", "ip", "address", "container", "network"],
    },
    sitemap: { lastModified: "2026-01-30T00:00:00+00:00" },
  },
  {
    id: "docker-cleanup",
    path: "/docker/delete-all-docker-containers-and-images",
    routeFile: "routes/docker/delete-all-docker-containers-and-images.tsx",
    title: "Clean up Docker",
    search: {
      description: "Commands to delete all Docker containers, images, volumes, and networks for cleanup.",
      category: "Docker Guides",
      keywords: ["docker", "delete", "clean", "remove", "container", "image", "volume", "prune"],
    },
    sitemap: { lastModified: "2026-01-30T00:00:00+00:00" },
  },
  {
    id: "docker-backup-restore-db",
    path: "/docker/backup-and-restore-docker-database",
    routeFile: "routes/docker/backup-and-restore-docker-database.tsx",
    title: "Backup / restore Docker database",
    search: {
      description: "How to backup and restore databases running in Docker containers.",
      category: "Docker Guides",
      keywords: ["docker", "backup", "restore", "database", "mysql", "postgres", "dump"],
    },
    sitemap: { lastModified: "2026-01-30T00:00:00+00:00" },
  },
  {
    id: "php-category",
    path: "/php",
    routeFile: "routes/php.tsx",
    title: "PHP Guides",
    sitemap: { lastModified: "2026-02-05T00:00:00+00:00" },
  },
  {
    id: "php-disposable-email",
    path: "/php/detect-disposable-or-temporary-email-addresses-in-php",
    routeFile: "routes/php/detect-disposable-or-temporary-email-addresses-in-php.tsx",
    title: "Detect disposable email addresses",
    search: {
      description: "PHP methods to detect and block disposable or temporary email addresses.",
      category: "PHP Guides",
      keywords: ["php", "email", "disposable", "temporary", "validation", "detect", "block"],
    },
    sitemap: { lastModified: "2026-01-30T00:00:00+00:00" },
  },
  {
    id: "utils-percentage-calculator",
    path: "/utils/percentage-calculator",
    routeFile: "routes/utils/percentage-calculator.tsx",
    title: "Percentage Calculator",
    search: {
      description: "Online tool to calculate percentages, percentage increase, and percentage decrease.",
      category: "Utils",
      keywords: ["percentage", "calculator", "math", "calculate", "tool", "utility"],
    },
    sitemap: { lastModified: "2025-01-28" },
  },
  {
    id: "sitemap-page",
    path: "/sitemap",
    routeFile: "routes/sitemap.tsx",
    title: "Sitemap",
  },
  {
    id: "privacy",
    path: "/privacy",
    routeFile: "routes/privacy.tsx",
    title: "Privacy Policy",
  },
  {
    id: "impressum",
    path: "/impressum",
    routeFile: "routes/impressum.tsx",
    title: "Impressum",
  },
  {
    id: "travel",
    path: "/travel",
    routeFile: "routes/travel.tsx",
    title: "Trips and Travels",
  },
  {
    id: "the-vape",
    path: "/the-vape",
    routeFile: "routes/the-vape.tsx",
    title: "TheVape.co.uk",
  },
];

export const navigationTree: NavigationNode[] = [
  { title: "Home", pageId: "home", showInNavigation: false },
  {
    title: "Guides",
    showInNavigation: true,
    children: [
      {
        title: "AI Guides",
        pageId: "ai-category",
        showInNavigation: true,
        children: [
          { title: "AI Prompt Guide", pageId: "ai-prompt-guide", showInNavigation: true },
          { title: "CAFE Prompt Framework", pageId: "ai-cafe-framework", showInNavigation: true },
          { title: "Claude Code Guide", pageId: "ai-claude-code-guide", showInNavigation: true },
          {
            title: "Run Multiple Claude Code Instances",
            pageId: "ai-multiple-claude-instances",
            showInNavigation: true,
          },
          { title: "AI Links & Resources", pageId: "ai-learning-resources", showInNavigation: true },
          { title: "Ethical AI in the Workplace", pageId: "ai-ethical-workplace", showInNavigation: true },
        ],
      },
      {
        title: "ZSH / Bash Shell Guides",
        pageId: "linux-category",
        showInNavigation: true,
        children: [
          { title: "Useful Shell Aliases", pageId: "linux-zsh-aliases", showInNavigation: true },
          { title: "Useful Shell Functions", pageId: "linux-zsh-functions", showInNavigation: true },
          { title: "Install MariaDB on Ubuntu", pageId: "linux-install-mariadb", showInNavigation: true },
          { title: "Duplicate MySQL table", pageId: "linux-copy-mysql-table", showInNavigation: true },
          { title: "Find local and public IP address", pageId: "linux-get-ip-address", showInNavigation: true },
          {
            title: "Fix SSH directory permissions",
            pageId: "linux-fix-ssh-permissions",
            showInNavigation: true,
          },
          { title: "Search directory for a string", pageId: "linux-search-directory", showInNavigation: true },
          { title: "Update global Bun packages", pageId: "linux-update-bun-global-packages", showInNavigation: true },
        ],
      },
      {
        title: "Docker Guides",
        pageId: "docker-category",
        showInNavigation: true,
        children: [
          { title: "Find Docker IP address", pageId: "docker-get-ip", showInNavigation: true },
          { title: "Clean up Docker", pageId: "docker-cleanup", showInNavigation: true },
          { title: "Backup / restore Docker database", pageId: "docker-backup-restore-db", showInNavigation: true },
        ],
      },
      {
        title: "PHP Guides",
        pageId: "php-category",
        showInNavigation: true,
        children: [
          { title: "Detect disposable email addresses", pageId: "php-disposable-email", showInNavigation: true },
        ],
      },
    ],
  },
  {
    title: "Utils",
    showInNavigation: true,
    children: [{ title: "Percentage Calculator", pageId: "utils-percentage-calculator", showInNavigation: true }],
  },
  { title: "Privacy Policy", pageId: "privacy", showInNavigation: false },
  { title: "Impressum", pageId: "impressum", showInNavigation: false },
  { title: "Trips and Travels", pageId: "travel", showInNavigation: false },
  { title: "TheVape.co.uk", pageId: "the-vape", showInNavigation: false },
];

export const pageById = Object.fromEntries(sitePages.map((page) => [page.id, page])) as Record<string, SitePage>;

export const lastModifiedByPath = sitePages.reduce<Record<string, string>>((acc, page) => {
  if (page.sitemap?.lastModified) {
    acc[page.path] = page.sitemap.lastModified;
  }
  return acc;
}, {});
