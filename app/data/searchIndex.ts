export interface SearchableItem {
  href: string;
  title: string;
  description: string;
  category: string;
  keywords: string[];
}

export const searchIndex: SearchableItem[] = [
  // AI Guides
  {
    href: "/ai/ai-prompt-engineering-guide",
    title: "AI Prompt Guide",
    description: "A guide and introduction to prompt engineering techniques for AI LLMs such as ChatGPT, Claude, Gemini, and DeepSeek.",
    category: "AI Guides",
    keywords: ["ai", "prompt", "engineering", "chatgpt", "claude", "gemini", "deepseek", "llm"],
  },
  {
    href: "/ai/cafe-ai-prompt-framework",
    title: "CAFE Prompt Framework",
    description: "A simple framework for creating effective AI prompts using Context, Action, Format, and Examples.",
    category: "AI Guides",
    keywords: ["ai", "prompt", "framework", "cafe", "context", "action", "format", "examples"],
  },
  {
    href: "/ai/recommended-ai-learning-resources",
    title: "AI Links & Resources",
    description: "Curated collection of learning resources, tools, and links for AI and machine learning.",
    category: "AI Guides",
    keywords: ["ai", "resources", "learning", "tools", "machine learning", "links"],
  },

  // ZSH / Bash Shell Guides
  {
    href: "/linux/zsh-bash-aliases",
    title: "Useful Shell Aliases",
    description: "Collection of useful shell aliases for ZSH and Bash to improve productivity.",
    category: "ZSH / Bash Shell Guides",
    keywords: ["zsh", "bash", "shell", "aliases", "linux", "terminal", "productivity"],
  },
  {
    href: "/linux/zsh-bash-functions",
    title: "Useful Shell Functions",
    description: "Helpful shell functions for ZSH and Bash to automate common tasks.",
    category: "ZSH / Bash Shell Guides",
    keywords: ["zsh", "bash", "shell", "functions", "linux", "terminal", "automation"],
  },
  {
    href: "/linux/install-mariadb-on-ubuntu-and-allow-remote-access",
    title: "Install MariaDB on Ubuntu",
    description: "Step-by-step guide to installing MariaDB on Ubuntu and configuring remote access.",
    category: "ZSH / Bash Shell Guides",
    keywords: ["mariadb", "mysql", "ubuntu", "linux", "database", "install", "remote", "access"],
  },
  {
    href: "/linux/copy-mysql-table-data-to-new-table",
    title: "Duplicate MySQL table",
    description: "How to copy MySQL or MariaDB table data and structure to a new table.",
    category: "ZSH / Bash Shell Guides",
    keywords: ["mysql", "mariadb", "table", "copy", "duplicate", "database", "sql"],
  },
  {
    href: "/linux/get-local-and-public-ip-address-command-line-bash",
    title: "Find local and public IP address",
    description: "Command line methods to find your local and public IP addresses using Bash.",
    category: "ZSH / Bash Shell Guides",
    keywords: ["ip", "address", "local", "public", "bash", "command", "line", "network"],
  },
  {
    href: "/linux/search-a-directory-for-text-string-via-command-line",
    title: "Search directory for a string",
    description: "How to search files in a directory for specific text strings using command line tools.",
    category: "ZSH / Bash Shell Guides",
    keywords: ["search", "grep", "find", "text", "string", "directory", "command", "line"],
  },

  // Docker Guides
  {
    href: "/docker/get-docker-and-docker-compose-container-ip-addresses",
    title: "Find Docker IP address",
    description: "Methods to find IP addresses of Docker containers and Docker Compose services.",
    category: "Docker Guides",
    keywords: ["docker", "compose", "ip", "address", "container", "network"],
  },
  {
    href: "/docker/delete-all-docker-containers-and-images",
    title: "Clean up Docker",
    description: "Commands to delete all Docker containers, images, volumes, and networks for cleanup.",
    category: "Docker Guides",
    keywords: ["docker", "delete", "clean", "remove", "container", "image", "volume", "prune"],
  },
  {
    href: "/docker/backup-and-restore-docker-database",
    title: "Backup / restore Docker database",
    description: "How to backup and restore databases running in Docker containers.",
    category: "Docker Guides",
    keywords: ["docker", "backup", "restore", "database", "mysql", "postgres", "dump"],
  },

  // PHP Guides
  {
    href: "/php/detect-disposable-or-temporary-email-addresses-in-php",
    title: "Detect disposable email addresses",
    description: "PHP methods to detect and block disposable or temporary email addresses.",
    category: "PHP Guides",
    keywords: ["php", "email", "disposable", "temporary", "validation", "detect", "block"],
  },

  // Utils
  {
    href: "/utils/percentage-calculator",
    title: "Percentage Calculator",
    description: "Online tool to calculate percentages, percentage increase, and percentage decrease.",
    category: "Utils",
    keywords: ["percentage", "calculator", "math", "calculate", "tool", "utility"],
  },
];
