import { index, type RouteConfig, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("ai/ai-prompt-engineering-guide", "routes/ai/ai-prompt-engineering-guide.tsx"),
  route("ai/cafe-ai-prompt-framework", "routes/ai/cafe-ai-prompt-framework.tsx"),
  route("ai/claude-code-guide-and-tips", "routes/ai/claude-code-guide-and-tips.tsx"),
  route("ai/recommended-ai-learning-resources", "routes/ai/recommended-ai-learning-resources.tsx"),
  route("linux/zsh-bash-aliases", "routes/linux/zsh-bash-aliases.tsx"),
  route("linux/zsh-bash-functions", "routes/linux/zsh-bash-functions.tsx"),
  route("linux/copy-mysql-table-data-to-new-table", "routes/linux/copy-mysql-table-data-to-new-table.tsx"),
  route(
    "linux/get-local-and-public-ip-address-command-line-bash",
    "routes/linux/get-local-and-public-ip-address-command-line-bash.tsx",
  ),
  route(
    "linux/install-mariadb-on-ubuntu-and-allow-remote-access",
    "routes/linux/install-mariadb-on-ubuntu-and-allow-remote-access.tsx",
  ),
  route(
    "linux/search-a-directory-for-text-string-via-command-line",
    "routes/linux/search-a-directory-for-text-string-via-command-line.tsx",
  ),
  route("docker/backup-and-restore-docker-database", "routes/docker/backup-and-restore-docker-database.tsx"),
  route(
    "docker/get-docker-and-docker-compose-container-ip-addresses",
    "routes/docker/get-docker-and-docker-compose-container-ip-addresses.tsx",
  ),
  route("docker/delete-all-docker-containers-and-images", "routes/docker/delete-all-docker-containers-and-images.tsx"),
  route(
    "php/detect-disposable-or-temporary-email-addresses-in-php",
    "routes/php/detect-disposable-or-temporary-email-addresses-in-php.tsx",
  ),
  route("utils/percentage-calculator", "routes/utils/percentage-calculator.tsx"),
  route("sitemap", "routes/sitemap.tsx"),
  route("sitemap.xml", "routes/sitemap[.]xml.tsx"),
  route("privacy", "routes/privacy.tsx"),
  route("travel", "routes/travel.tsx"),
  route("stay-alert", "routes/stay-alert.tsx"),
  route("government-tweet", "routes/government-tweet.tsx"),
  route("the-vape", "routes/the-vape.tsx"),
] satisfies RouteConfig;
