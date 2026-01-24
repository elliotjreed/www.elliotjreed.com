export interface StaticLink {
  href?: string;
  title: string;
  showInNavigation: boolean;
  children?: StaticLink[];
}

export const staticLinks: StaticLink[] = [
  { href: "/", title: "Home", showInNavigation: false },
  {
    title: "Guides",
    showInNavigation: true,
    children: [
      {
        title: "AI Guides",
        showInNavigation: true,
        children: [
          { href: "/ai/ai-prompt-engineering-guide", title: "AI Prompt Guide", showInNavigation: true },
          { href: "/ai/cafe-ai-prompt-framework", title: "CAFE Prompt Framework", showInNavigation: true },
          { href: "/ai/claude-code-guide-and-tips", title: "Claude Code Guide", showInNavigation: true },
          { href: "/ai/recommended-ai-learning-resources", title: "AI Links & Resources", showInNavigation: true },
        ],
      },
      {
        title: "ZSH / Bash Shell Guides",
        showInNavigation: true,
        children: [
          { href: "/linux/zsh-bash-aliases", title: "Useful Shell Aliases", showInNavigation: true },
          { href: "/linux/zsh-bash-functions", title: "Useful Shell Functions", showInNavigation: true },
          {
            href: "/linux/install-mariadb-on-ubuntu-and-allow-remote-access",
            title: "Install MariaDB on Ubuntu",
            showInNavigation: true,
          },
          { href: "/linux/copy-mysql-table-data-to-new-table", title: "Duplicate MySQL table", showInNavigation: true },
          {
            href: "/linux/get-local-and-public-ip-address-command-line-bash",
            title: "Find local and public IP address",
            showInNavigation: true,
          },
          {
            href: "/linux/search-a-directory-for-text-string-via-command-line",
            title: "Search directory for a string",
            showInNavigation: true,
          },
        ],
      },
      {
        title: "Docker Guides",
        showInNavigation: true,
        children: [
          {
            href: "/docker/get-docker-and-docker-compose-container-ip-addresses",
            title: "Find Docker IP address",
            showInNavigation: true,
          },
          { href: "/docker/delete-all-docker-containers-and-images", title: "Clean up Docker", showInNavigation: true },
          {
            href: "/docker/backup-and-restore-docker-database",
            title: "Backup / restore Docker database",
            showInNavigation: true,
          },
        ],
      },
      {
        title: "PHP Guides",
        showInNavigation: true,
        children: [
          {
            href: "/php/detect-disposable-or-temporary-email-addresses-in-php",
            title: "Detect disposable email addresses",
            showInNavigation: true,
          },
        ],
      },
    ],
  },
  {
    title: "Utils",
    showInNavigation: true,
    children: [{ href: "/utils/percentage-calculator", title: "Percentage Calculator", showInNavigation: true }],
  },
  { href: "/privacy", title: "Privacy Policy", showInNavigation: false },
  { href: "/stay-alert", title: "Stay Alert Generator", showInNavigation: false },
  { href: "/government-tweet", title: "Government Tweet Generator", showInNavigation: false },
  { href: "/travel", title: "Trips and Travels", showInNavigation: false },
  { href: "/the-vape", title: "TheVape.co.uk", showInNavigation: false },
];
