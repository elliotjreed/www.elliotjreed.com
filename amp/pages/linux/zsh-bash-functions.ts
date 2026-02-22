import { createBreadcrumbs, createTechArticle } from "../../../app/data/schemaData.js";
import { codeBlock } from "../../components/codeBlock.js";
import type { AmpPageData } from "../../layout.js";

const PAGE_URL = "https://www.elliotjreed.com/linux/zsh-bash-functions";

export function renderPage(): AmpPageData {
  return {
    title: "ZSH & Bash Functions | EJR",
    description: "A collection of useful ZSH, Bash, and Shell functions for use on Linux (or Mac or Windows).",
    canonicalPath: "/linux/zsh-bash-functions",
    type: "article",
    schemas: [
      createTechArticle({
        url: PAGE_URL,
        headline: "ZSH & Bash Functions",
        description: "A collection of useful ZSH, Bash, and Shell functions for use on Linux (or Mac or Windows).",
        datePublished: "2025-04-20T16:51:56+01:00",
        dateModified: "2026-01-30T00:00:00+00:00",
        articleSection: "Linux",
        keywords: ["Linux", "ZSH", "Bash", "shell", "functions", "command line"],
        wordCount: 786,
        proficiencyLevel: "Intermediate",
      }),
      createBreadcrumbs([
        { name: "Home", url: "https://www.elliotjreed.com" },
        { name: "ZSH / Bash Shell Guides", url: "https://www.elliotjreed.com/linux" },
        { name: "ZSH & Bash Functions", url: PAGE_URL },
      ]),
    ],
    body: `<section class="page-section">
  <div class="page-header">
    <h1 class="page-title">Shell Functions</h1>
    <div class="page-meta">
      <span>By Elliot J. Reed</span>
      <span>&#8226;</span>
      <time datetime="2025-04-20">Published: 20th April 2025</time>
      <span>&#8226;</span>
      <time datetime="2026-01-30">Last updated: 30th January 2026</time>
    </div>
    <p class="page-intro">
      Here you&#39;ll find a few handy functions to use in ZSH and Bash Shell. Tested on Linux - likely work on Mac!
    </p>
  </div>
  <div class="prose">
    ${codeBlock(
      `# Set all files in a directory to 644 permissions and directories to 775
function fixpermissions() {
  find ./ -type d -print0 | xargs -0 chmod 0775
  find ./ -type f -print0 | xargs -0 chmod 0644
}`,
      "fixpermissions",
      "bash",
    )}
    ${codeBlock(
      `# Set all files in the ~/.ssh to 644 permissions and directories to 775
function fixsshpermissions() {
  chmod -R 700 ~/.ssh/
  chmod 600 ~/.ssh/id_rsa
  chmod 600 ~/.ssh/config
  chmod 644 ~/.ssh/id_rsa.pub
  chmod 600 ~/.ssh/authorized_keys
}`,
      "fixsshpermissions",
      "bash",
    )}
    ${codeBlock(
      `# Return public and local IP address
function myip() {
  publicip=$(curl -s https://ipecho.net/plain)
  localip=$(ip -o -4 addr show | awk -F '[ /]+' '/global/ {print $4}')
  echo -e "Public IP: " $publicip
  echo -e "Local IP: " $localip
}`,
      "myip",
      "bash",
    )}
    ${codeBlock(
      `# Search processes containing a string or command (Usage: psg TERM)
psg() {
  if [[ $# -eq 0 ]] ; then
    echo -e "\\e[0;31mPlease provide a process name.\\e[0m"
  else
    ps aux | grep -v grep | grep -i -e VSZ -e "$@"
  fi
}`,
      "psg",
      "bash",
    )}
    ${codeBlock(
      `# Search current directory for files containing specified string (Usage: search "Search Term")
search() {
  if [[ $# -eq 0 ]] ; then
    echo -e "\\e[0;31mPlease provide a string / search term\\e[0m"
  else
    grep -rni "$@" .
  fi
}`,
      "search",
      "bash",
    )}
    ${codeBlock(
      `# Backup a file by copying the file and prepending .bak to it (Usage: backup file.txt)
backup() {
  cp -- "$1"{,.bak};
}`,
      "backup",
      "bash",
    )}
    ${codeBlock(
      `# Generate self-signed CA, intermediate, and server certificates and keys
function certgen() {
  openssl req -x509 \\
    -sha256 \\
    -newkey rsa:4096 \\
    -days 14600 \\
    -nodes \\
    -subj "/C=GB/ST=Localhost/L=Localhost/O=Localhost Certificate Authority/OU=Certificate Authority Certificate Issuer/CN=localhost" -out ca.crt -keyout ca.key

  openssl genrsa -out server.key 4096

  # ... (see full script for CSR and certificate signing config)

  openssl req -new -key server.key -out server.csr -config csr.conf
  openssl x509 -req \\
      -in server.csr \\
      -CA ca.crt -CAkey ca.key \\
      -CAcreateserial -out server.crt \\
      -days 14600 \\
      -sha256 -extfile cert.conf

  rm -f ./cert.conf ./csr.conf
}`,
      "certgen",
      "bash",
    )}

    <h2>Conclusion</h2>
    <p>
      These shell functions provide powerful automation for common system administration and development tasks. From
      fixing file permissions to generating SSL certificates, each function encapsulates complex command sequences
      into simple, memorable commands. By adding these to your ~/.bashrc or ~/.zshrc configuration, you&#39;ll have a
      robust toolkit available whenever you need it.
    </p>
    <p>
      Start by implementing the functions most relevant to your workflow, whether that&#39;s the myip function for
      network diagnostics, the search function for code exploration, or the certgen function for local development
      HTTPS. Remember to source your configuration file after adding new functions with
      <code>source ~/.bashrc</code> or <code>source ~/.zshrc</code>.
    </p>
  </div>
</section>`,
  };
}
