import { createBreadcrumbs, createTechArticle } from "../../../app/data/schemaData.js";
import { codeBlock } from "../../components/codeBlock.js";
import type { AmpPageData } from "../../layout.js";

const PAGE_URL = "https://www.elliotjreed.com/linux/fix-ssh-permissions-after-moving-directory";

export function renderPage(): AmpPageData {
  return {
    title: "Fix SSH Directory Permissions | EJR",
    description: "Learn how to correctly set SSH file permissions after moving your .ssh directory to a new computer.",
    canonicalPath: "/linux/fix-ssh-permissions-after-moving-directory",
    type: "article",
    schemas: [
      createTechArticle({
        url: PAGE_URL,
        headline: "Fix SSH Permissions After Moving .ssh Directory",
        description:
          "Learn how to correctly set SSH file permissions after moving your .ssh directory to a new computer.",
        datePublished: "2026-02-10T00:00:00+00:00",
        dateModified: "2026-02-10T00:00:00+00:00",
        articleSection: "Linux",
        keywords: ["SSH", "permissions", "security", "Linux", "Mac", "command line", "Bash", "file permissions"],
        wordCount: 782,
        proficiencyLevel: "Beginner",
      }),
      createBreadcrumbs([
        { name: "Home", url: "https://www.elliotjreed.com" },
        { name: "ZSH / Bash Shell Guides", url: "https://www.elliotjreed.com/linux" },
        { name: "Fix SSH Permissions", url: PAGE_URL },
      ]),
    ],
    body: `<section class="page-section">
  <div class="page-header">
    <h1 class="page-title">Fix SSH Directory Permissions</h1>
    <div class="page-meta">
      <span>By Elliot J. Reed</span>
      <span>&#8226;</span>
      <time datetime="2026-02-10">Published: 10th February 2026</time>
    </div>
    <p class="page-intro">
      When moving your .ssh directory to a new computer, incorrect file permissions can prevent SSH from working and
      create security vulnerabilities. This guide shows you how to correctly set SSH permissions on Linux and Mac.
    </p>
  </div>
  <div class="prose">
    <p>
      SSH is strict about file permissions for security reasons. If your SSH keys or config files have permissions
      that are too open, SSH will refuse to use them, displaying errors like
      <code>Permissions 0644 for '/home/user/.ssh/id_rsa' are too open</code> or simply refusing to connect. This
      commonly happens when copying your .ssh directory from another computer, extracting from a backup, or moving
      files between operating systems.
    </p>

    <h2>Understanding SSH Permission Requirements</h2>

    <p>SSH requires specific permissions to ensure your private keys remain secure:</p>

    <ul>
      <li><strong>Private keys</strong> must only be readable by you (owner)</li>
      <li><strong>The .ssh directory</strong> should only be accessible by you</li>
      <li><strong>Public keys</strong> can be more permissive as they&#39;re meant to be shared</li>
      <li><strong>Config and authorized_keys</strong> should only be readable/writable by you</li>
    </ul>

    <h2>Setting Correct SSH Permissions Step-by-Step</h2>

    <h3>1. Fix .ssh Directory Permissions</h3>
    ${codeBlock("chmod 700 ~/.ssh/", "Set .ssh directory permissions", "bash")}
    <p>
      This sets the .ssh directory to <code>700</code> (read, write, and execute for owner only). This prevents
      other users on the system from reading your SSH configuration or keys.
    </p>

    <h3>2. Fix Private Key Permissions</h3>
    ${codeBlock("chmod 600 ~/.ssh/id_rsa", "Set private key permissions", "bash")}
    <p>
      This sets your private key to <code>600</code> (read and write for owner only). Private keys must never be
      readable by other users. If you have multiple private keys, apply the same permissions to each one.
    </p>

    <h3>3. Fix Config File Permissions</h3>
    ${codeBlock("chmod 600 ~/.ssh/config", "Set config file permissions", "bash")}
    <p>
      This sets your SSH config file to <code>600</code>. The config file may contain sensitive information like
      hostnames, usernames, and key file locations.
    </p>

    <h3>4. Fix Public Key Permissions</h3>
    ${codeBlock("chmod 644 ~/.ssh/id_rsa.pub", "Set public key permissions", "bash")}
    <p>
      This sets your public key to <code>644</code> (read and write for owner, read-only for group and others).
      Public keys are meant to be shared, so they can be more permissive.
    </p>

    <h3>5. Fix authorized_keys Permissions</h3>
    ${codeBlock("chmod 600 ~/.ssh/authorized_keys", "Set authorized_keys permissions", "bash")}
    <p>
      This sets authorized_keys to <code>600</code>. This file contains public keys that are allowed to authenticate
      to your account.
    </p>

    <h2>Convenient Shell Function</h2>

    <p>
      Instead of running each command individually, you can create a shell function that fixes all SSH permissions
      at once. Add this function to your <code>.bashrc</code> or <code>.zshrc</code> file:
    </p>

    ${codeBlock(
      `function fixsshpermissions() {
  chmod -R 700 ~/.ssh/
  chmod 600 ~/.ssh/id_rsa
  chmod 600 ~/.ssh/config
  chmod 644 ~/.ssh/id_rsa.pub
  chmod 600 ~/.ssh/authorized_keys
}`,
      "fixsshpermissions",
      "bash",
    )}

    <p>
      After adding this to your shell configuration file, reload it with <code>source ~/.bashrc</code> or
      <code>source ~/.zshrc</code>. Then simply type <code>fixsshpermissions</code> to set all SSH permissions
      correctly in one go.
    </p>

    <h2 id="faq">Frequently Asked Questions</h2>

    <h3>Why is SSH so strict about file permissions?</h3>
    <p>
      SSH enforces strict file permissions to prevent security breaches. If your private key is readable by other
      users on the system, they could potentially copy it and impersonate you when connecting to remote servers. SSH
      refuses to use keys with overly permissive permissions as a safeguard against accidental exposure.
    </p>

    <h3>What if I have different key file names?</h3>
    <p>
      Common private key names include <code>id_rsa</code>, <code>id_ed25519</code>, <code>id_ecdsa</code>, and
      <code>id_dsa</code>. Apply <code>chmod 600</code> to all your private key files. The corresponding public
      keys (with <code>.pub</code> extension) should use <code>chmod 644</code>.
    </p>

    <h3>Do these permissions work on Windows?</h3>
    <p>
      Windows handles file permissions differently than Unix-like systems. If you&#39;re using Windows Subsystem for
      Linux (WSL) or Git Bash, these chmod commands will work. For native Windows SSH, you&#39;ll need to use
      Windows&#39; file property security settings or the icacls command.
    </p>

    <h3>What if I still get permission errors after fixing permissions?</h3>
    <p>
      Check the following: ensure your home directory itself isn&#39;t world-writable (<code>chmod 755 ~</code>),
      verify the ownership of files with <code>ls -la ~/.ssh</code> (they should be owned by your user), check for
      SELinux or AppArmor contexts on Linux systems (<code>restorecon -R -v ~/.ssh</code> on SELinux systems), and
      examine SSH client logs with <code>ssh -v</code> for detailed error messages.
    </p>
  </div>
</section>`,
  };
}
