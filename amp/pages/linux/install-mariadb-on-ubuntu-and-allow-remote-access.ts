import { createBreadcrumbs, createTechArticle } from "../../../app/data/schemaData.js";
import { codeBlock } from "../../components/codeBlock.js";
import type { AmpPageData } from "../../layout.js";

const PAGE_URL = "https://www.elliotjreed.com/linux/install-mariadb-on-ubuntu-and-allow-remote-access";

export function renderPage(): AmpPageData {
  return {
    title: "Installing MariaDB on Ubuntu | EJR",
    description: "How to install MariaDB (MySQL) on Ubuntu 20.04+ and allow remote access",
    canonicalPath: "/linux/install-mariadb-on-ubuntu-and-allow-remote-access",
    type: "article",
    schemas: [
      createTechArticle({
        url: PAGE_URL,
        headline: "Installing MariaDB on Ubuntu",
        description: "How to install MariaDB (MySQL) on Ubuntu 20.04+ and allow remote access",
        datePublished: "2022-04-22T19:00:00+01:00",
        dateModified: "2026-01-30T00:00:00+00:00",
        articleSection: "Linux",
        keywords: ["MariaDB", "MySQL", "Ubuntu", "Linux", "database", "installation"],
        wordCount: 978,
        proficiencyLevel: "Intermediate",
      }),
      createBreadcrumbs([
        { name: "Home", url: "https://www.elliotjreed.com" },
        { name: "ZSH / Bash Shell Guides", url: "https://www.elliotjreed.com/linux" },
        { name: "Install MariaDB", url: PAGE_URL },
      ]),
    ],
    body: `<section class="page-section">
  <div class="page-header">
    <h1 class="page-title">Installing MariaDB on Ubuntu</h1>
    <div class="page-meta">
      <span>By Elliot J. Reed</span>
      <span>&#8226;</span>
      <time datetime="2022-04-22">Published: 22nd April 2022</time>
      <span>&#8226;</span>
      <time datetime="2026-01-30">Last updated: 30th January 2026</time>
    </div>
    <p class="page-intro">How to install MariaDB (MySQL) on Ubuntu 20.04+ and allow remote access</p>
  </div>
  <div class="prose">
    <section>
      <h2>Table of Contents</h2>
      <ul>
        <li><a href="#installation">Installation and Setup</a></li>
        <li><a href="#create-user">Creating a Database User</a></li>
        <li><a href="#remote-access">Enabling Remote Access</a></li>
        <li><a href="#faq">Frequently Asked Questions</a></li>
      </ul>
    </section>

    <section>
      <h2 id="installation">Installation and Setup</h2>

      <p>The following assumes you are logged in as the <code>root</code> user on your system.</p>

      <p>If you are logged in as another user then first run the following to get into an interactive <code>sudo</code> shell:</p>
      ${codeBlock("sudo -i", "", "bash")}

      <p>First ensure the system is up-to-date:</p>
      ${codeBlock("apt update && apt full-upgrade -y", "", "bash")}

      <p>To install MariaDB run:</p>
      ${codeBlock("apt install mariadb-server -y", "", "bash")}

      <p>The <code>mariadb</code> service should automatically start. Check with:</p>
      ${codeBlock("systemctl status mariadb", "", "bash")}

      <p>Next, run the secure installation script:</p>
      ${codeBlock("mysql_secure_installation", "", "bash")}

      <p>
        It will ask for the current root password — this will be empty by default, so just hit &#8220;enter&#8221;.
        Then enter &#8220;y&#8221; and set a strong password. Enter &#8220;y&#8221; again to remove anonymous users,
        disallow root login remotely, remove the test database, and reload privilege tables.
      </p>

      <p>Now you should be able to access MariaDB:</p>
      ${codeBlock("mysql -uroot -p", "", "bash")}

      <h2 id="create-user">Creating a Database User</h2>

      <p>Inside the <code>mysql</code> client, create a new user with a username and password:</p>
      ${codeBlock("CREATE USER 'elliot'@'%' IDENTIFIED BY 'averystrongpassword';", "", "sql")}

      <p>Grant permissions to the new user:</p>
      ${codeBlock(
        "GRANT CREATE, ALTER, DROP, INSERT, UPDATE, DELETE, SELECT, REFERENCES, RELOAD on *.* TO 'elliot'@'%' WITH GRANT OPTION;\nFLUSH PRIVILEGES;",
        "",
        "sql",
      )}

      <p>Now you should be able to access MariaDB using your new username and password:</p>
      ${codeBlock("mysql -uelliot -p", "", "bash")}

      <h2 id="remote-access">Enabling Remote Access</h2>

      <aside class="warning-box">
        <p><strong>Security Warning:</strong></p>
        <p>
          Allowing remote database access exposes your database to potential security risks. Only enable remote access
          if absolutely necessary, and always use strong passwords, firewall rules to restrict access to specific IP
          addresses, and consider setting up SSL/TLS encryption for database connections.
        </p>
      </aside>

      <p>
        To allow remote access, comment out the <code>bind-address</code> line in
        <code>/etc/mysql/mariadb.conf.d/50-server.cnf</code>:
      </p>
      ${codeBlock("nano /etc/mysql/mariadb.conf.d/50-server.cnf", "", "bash")}

      <p>Find and replace the bind-address line:</p>
      ${codeBlock("# bind-address            = 127.0.0.1", "", "bash")}

      <p>Then restart the <code>mariadb</code> service:</p>
      ${codeBlock("systemctl restart mariadb", "", "bash")}

      <p>Now you should be able to access your database remotely:</p>
      ${codeBlock("mysql -u elliot -h 123.45.67.89 -p", "", "bash")}

      <p>If you are using <code>ufw</code> to manage firewall rules, open port 3306:</p>
      ${codeBlock("ufw allow mysql", "", "bash")}

      <p>To create a database once connected:</p>
      ${codeBlock("CREATE DATABASE mydatabase;", "", "sql")}

      <h2 id="faq">Frequently Asked Questions</h2>

      <h3>What ports need to be opened for remote access?</h3>
      <p>
        MariaDB uses port 3306 by default. To allow remote access, use <code>ufw allow mysql</code> or
        <code>ufw allow 3306/tcp</code>. For better security, restrict access to specific IP addresses using
        <code>ufw allow from YOUR_IP_ADDRESS to any port 3306</code>.
      </p>

      <h3>Is it safe to allow remote database access?</h3>
      <p>
        Remote database access introduces security risks. Use strong passwords, enable SSL/TLS encryption, restrict
        access to specific IP addresses, use non-standard ports, and implement fail2ban. For production environments,
        consider using SSH tunneling or a VPN instead of direct database exposure.
      </p>

      <h2>Conclusion</h2>
      <p>
        You now have a fully functional MariaDB installation on your Ubuntu server with secure remote access
        configured. Remember to use strong passwords for all database users and consider implementing additional
        security measures for production environments.
      </p>
    </section>
  </div>
</section>`,
  };
}
