import type { ReactElement } from "react";
import { CodeSnippet, type CodeSnippetInterface } from "~/components/CodeSnippet/CodeSnippet";
import { HeadingAnchor } from "~/components/HeadingAnchor/HeadingAnchor";
import { PageHeader } from "~/components/PageHeader/PageHeader";
import { createBreadcrumbs, createTechArticle } from "~/data/schemaData";
import { createMeta } from "~/utils/seo";

export const meta = () => [
  ...createMeta({
    title: "Fix SSH Directory Permissions | EJR",
    description: "Learn how to correctly set SSH file permissions after moving your .ssh directory to a new computer.",
    url: "https://www.elliotjreed.com/linux/fix-ssh-permissions-after-moving-directory",
    type: "article",
    ogImage: "https://www.elliotjreed.com/og.png",
    twitterImage: "https://www.elliotjreed.com/twitter-card.png",
  }),
  {
    "script:ld+json": createTechArticle({
      url: "https://www.elliotjreed.com/linux/fix-ssh-permissions-after-moving-directory",
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
  },
  {
    "script:ld+json": createBreadcrumbs([
      { name: "Home", url: "https://www.elliotjreed.com" },
      { name: "ZSH / Bash Shell Guides", url: "https://www.elliotjreed.com/linux" },
      {
        name: "Fix SSH Permissions",
        url: "https://www.elliotjreed.com/linux/fix-ssh-permissions-after-moving-directory",
      },
    ]),
  },
];

const directoryPermission: CodeSnippetInterface = {
  title: "Set .ssh directory permissions",
  code: "chmod 700 ~/.ssh/",
};

const privateKeyPermission: CodeSnippetInterface = {
  title: "Set private key permissions",
  code: "chmod 600 ~/.ssh/id_rsa",
};

const configPermission: CodeSnippetInterface = {
  title: "Set config file permissions",
  code: "chmod 600 ~/.ssh/config",
};

const publicKeyPermission: CodeSnippetInterface = {
  title: "Set public key permissions",
  code: "chmod 644 ~/.ssh/id_rsa.pub",
};

const authorizedKeysPermission: CodeSnippetInterface = {
  title: "Set authorized_keys permissions",
  code: "chmod 600 ~/.ssh/authorized_keys",
};

const functionSnippet: CodeSnippetInterface = {
  title: "fixsshpermissions",
  code: `function fixsshpermissions() {
  chmod -R 700 ~/.ssh/
  chmod 600 ~/.ssh/id_rsa
  chmod 600 ~/.ssh/config
  chmod 644 ~/.ssh/id_rsa.pub
  chmod 600 ~/.ssh/authorized_keys
}`,
};

export default (): ReactElement => (
  <section className="divide-y divide-gray-200 dark:divide-gray-700">
    <PageHeader
      title="Fix SSH Directory Permissions"
      meta={
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span>By Elliot J. Reed</span>
          <span>•</span>
          <time dateTime="2026-02-10">
            Published: 10<sup>th</sup> February 2026
          </time>
        </div>
      }
    >
      <p className="prose dark:prose-dark max-w-none text-lg leading-7 text-gray-600 dark:text-gray-300">
        When moving your .ssh directory to a new computer, incorrect file permissions can prevent SSH from working and
        create security vulnerabilities. This guide shows you how to correctly set SSH permissions on Linux and Mac.
      </p>
    </PageHeader>

    <div className="prose max-w-none dark:prose-dark">
      <section>
        <p>
          SSH is strict about file permissions for security reasons. If your SSH keys or config files have permissions
          that are too open, SSH will refuse to use them, displaying errors like{" "}
          <code>Permissions 0644 for '/home/user/.ssh/id_rsa' are too open</code> or simply refusing to connect. This
          commonly happens when copying your .ssh directory from another computer, extracting from a backup, or moving
          files between operating systems.
        </p>

        <h2>Understanding SSH Permission Requirements</h2>

        <p>SSH requires specific permissions to ensure your private keys remain secure:</p>

        <ul>
          <li>
            <strong>Private keys</strong> must only be readable by you (owner)
          </li>
          <li>
            <strong>The .ssh directory</strong> should only be accessible by you
          </li>
          <li>
            <strong>Public keys</strong> can be more permissive as they're meant to be shared
          </li>
          <li>
            <strong>Config and authorized_keys</strong> should only be readable/writable by you
          </li>
        </ul>

        <h2>Setting Correct SSH Permissions Step-by-Step</h2>

        <p>
          Here's how to fix SSH permissions for each file type. These commands should be run from your home directory or
          use the full path to your .ssh directory.
        </p>

        <h3>1. Fix .ssh Directory Permissions</h3>
        <CodeSnippet language="bash" code={directoryPermission.code} title={directoryPermission.title} />
        <p>
          This sets the .ssh directory to <code>700</code> (read, write, and execute for owner only). The directory
          needs execute permissions so you can access files inside it. This prevents other users on the system from
          reading your SSH configuration or keys.
        </p>

        <h3>2. Fix Private Key Permissions</h3>
        <CodeSnippet language="bash" code={privateKeyPermission.code} title={privateKeyPermission.title} />
        <p>
          This sets your private key to <code>600</code> (read and write for owner only). Private keys must never be
          readable by other users. If you have multiple private keys (like <code>id_ed25519</code> or{" "}
          <code>id_ecdsa</code>), apply the same permissions to each one.
        </p>

        <h3>3. Fix Config File Permissions</h3>
        <CodeSnippet language="bash" code={configPermission.code} title={configPermission.title} />
        <p>
          This sets your SSH config file to <code>600</code>. The config file may contain sensitive information like
          hostnames, usernames, and key file locations, so it should only be accessible to you.
        </p>

        <h3>4. Fix Public Key Permissions</h3>
        <CodeSnippet language="bash" code={publicKeyPermission.code} title={publicKeyPermission.title} />
        <p>
          This sets your public key to <code>644</code> (read and write for owner, read-only for group and others).
          Public keys are meant to be shared, so they can be more permissive. However, only the owner should be able to
          modify them.
        </p>

        <h3>5. Fix authorized_keys Permissions</h3>
        <CodeSnippet language="bash" code={authorizedKeysPermission.code} title={authorizedKeysPermission.title} />
        <p>
          This sets authorized_keys to <code>600</code>. This file contains public keys that are allowed to authenticate
          to your account, so only you should be able to read or modify it.
        </p>

        <h2>Convenient Shell Function</h2>

        <p>
          Instead of running each command individually, you can create a shell function that fixes all SSH permissions
          at once. Add this function to your <code>.bashrc</code> or <code>.zshrc</code> file:
        </p>

        <CodeSnippet language="bash" code={functionSnippet.code} title={functionSnippet.title} />

        <p>
          After adding this to your shell configuration file (e.g., <code>nano ~/.bashrc</code> or{" "}
          <code>nano ~/.zshrc</code>), remember to reload your configuration with <code>source ~/.bashrc</code> or{" "}
          <code>source ~/.zshrc</code>. Then you can simply type <code>fixsshpermissions</code> in your terminal to set
          all SSH permissions correctly in one go.
        </p>

        <p>
          The function uses <code>chmod -R 700</code> first to recursively set all files and directories within .ssh to
          restrictive permissions, then applies the appropriate specific permissions to each file type. This ensures
          that even if you have additional key files or subdirectories, they'll start with secure permissions.
        </p>

        <HeadingAnchor id="faq">Frequently Asked Questions</HeadingAnchor>

        <h3>Why is SSH so strict about file permissions?</h3>
        <p>
          SSH enforces strict file permissions to prevent security breaches. If your private key is readable by other
          users on the system, they could potentially copy it and impersonate you when connecting to remote servers. SSH
          refuses to use keys with overly permissive permissions as a safeguard against accidental exposure. This is
          especially important on shared systems or multi-user computers where multiple people have accounts.
        </p>

        <h3>What if I have different key file names?</h3>
        <p>
          Modern SSH supports multiple key types with different naming conventions. Common private key names include{" "}
          <code>id_rsa</code>, <code>id_ed25519</code>, <code>id_ecdsa</code>, and <code>id_dsa</code>. Apply{" "}
          <code>chmod 600</code> to all your private key files. The corresponding public keys (with <code>.pub</code>{" "}
          extension) should use <code>chmod 644</code>. You can use a wildcard like{" "}
          <code>chmod 600 ~/.ssh/id_*[!.pub]</code> to set permissions on all private keys at once, or modify the
          function above to include your specific key files.
        </p>

        <h3>Do these permissions work on Windows?</h3>
        <p>
          Windows handles file permissions differently than Unix-like systems (Linux and Mac). If you're using Windows
          Subsystem for Linux (WSL) or Git Bash, these chmod commands will work. For native Windows SSH (in PowerShell
          or Command Prompt), you'll need to use Windows' file property security settings or the icacls command to
          ensure only your user account has access to the private keys. Windows SSH is generally more lenient about
          permissions, but it's still good practice to restrict access to your .ssh directory and private keys to your
          user account only.
        </p>

        <h3>What if I still get permission errors after fixing permissions?</h3>
        <p>
          If you're still experiencing issues after setting correct permissions, check the following: ensure your home
          directory itself isn't world-writable (<code>chmod 755 ~</code>), verify the ownership of files with{" "}
          <code>ls -la ~/.ssh</code> (they should be owned by your user), check for SELinux or AppArmor contexts on
          Linux systems (<code>restorecon -R -v ~/.ssh</code> on SELinux systems), and examine SSH client logs with{" "}
          <code>ssh -v</code> for detailed error messages. Sometimes server-side .ssh directory permissions can also
          cause issues, so verify those match the requirements above as well.
        </p>
      </section>
    </div>
  </section>
);
