import type { ReactElement } from "react";
import { CodeSnippet } from "~/components/CodeSnippet/CodeSnippet";
import { HeadingAnchor } from "~/components/HeadingAnchor/HeadingAnchor";
import { PageHeader } from "~/components/PageHeader/PageHeader";
import { createBreadcrumbs, createTechArticle } from "~/data/schemaData";
import { createMeta } from "~/utils/seo";

export const meta = () => [
  ...createMeta({
    title: "Installing MariaDB on Ubuntu | EJR",
    description: "How to install MariaDB (MySQL) on Ubuntu 20.04+ and allow remote access",
    url: "https://www.elliotjreed.com/linux/install-mariadb-on-ubuntu-and-allow-remote-access",
    type: "article",
    ogImage: "https://www.elliotjreed.com/og.png",
    twitterImage: "https://www.elliotjreed.com/twitter-card.png",
  }),
  {
    "script:ld+json": createTechArticle({
      url: "https://www.elliotjreed.com/linux/install-mariadb-on-ubuntu-and-allow-remote-access",
      headline: "Installing MariaDB on Ubuntu",
      description: "How to install MariaDB (MySQL) on Ubuntu 20.04+ and allow remote access",
      datePublished: "2022-04-22T19:00:00+01:00",
      dateModified: "2026-01-30T00:00:00+00:00",
      articleSection: "Linux",
      keywords: ["MariaDB", "MySQL", "Ubuntu", "Linux", "database", "installation"],
      wordCount: 978,
      proficiencyLevel: "Intermediate",
    }),
  },
  {
    "script:ld+json": createBreadcrumbs([
      { name: "Home", url: "https://www.elliotjreed.com" },
      { name: "ZSH / Bash Shell Guides", url: "https://www.elliotjreed.com/linux" },
      {
        name: "Install MariaDB",
        url: "https://www.elliotjreed.com/linux/install-mariadb-on-ubuntu-and-allow-remote-access",
      },
    ]),
  },
];

export default (): ReactElement => (
  <section className="divide-y divide-gray-200 dark:divide-gray-700">
    <PageHeader
      title="Installing MariaDB on Ubuntu"
      meta={
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span>By Elliot J. Reed</span>
          <span>•</span>
          <time dateTime="2022-04-22">
            Published: 22<sup>nd</sup> April 2022
          </time>
          <span>•</span>
          <time dateTime="2026-01-30">
            Last updated: 30<sup>th</sup> January 2026
          </time>
        </div>
      }
    >
      <p className="prose dark:prose-dark max-w-none text-lg leading-7 text-gray-600 dark:text-gray-300">
        How to install MariaDB (MySQL) on Ubuntu 20.04+ and allow remote access
      </p>
    </PageHeader>

    <div className="prose dark:prose-dark max-w-none">
      <section>
        <h2>Table of Contents</h2>
        <ul className="list-none space-y-2 pl-0">
          <li>
            <a href="#installation" className="text-primary-700 dark:text-primary-500 hover:underline">
              Installation and Setup
            </a>
          </li>
          <li>
            <a href="#create-user" className="text-primary-700 dark:text-primary-500 hover:underline">
              Creating a Database User
            </a>
          </li>
          <li>
            <a href="#remote-access" className="text-primary-700 dark:text-primary-500 hover:underline">
              Enabling Remote Access
            </a>
          </li>
          <li>
            <a href="#faq" className="text-primary-700 dark:text-primary-500 hover:underline">
              Frequently Asked Questions
            </a>
          </li>
        </ul>
      </section>
      <section>
        <HeadingAnchor id="installation">Installation and Setup</HeadingAnchor>

        <p>
          The following assumes you are logged in as the <code>root</code> user on your system.
        </p>

        <p>
          If you are logged in as another user then first run the following to get into an interactive <code>sudo</code>{" "}
          shell:
        </p>

        <CodeSnippet language="bash" code="sudo -i" title="" />

        <p>First we should ensure the system is up-to-date by running:</p>

        <CodeSnippet language="bash" code="apt update && apt full-upgrade -y" title="" />

        <p>To install MariaDB run:</p>

        <CodeSnippet language="bash" code="apt install mariadb-server -y" title="" />

        <p>
          The <code>mariadb</code> service should automatically start in the background once the installation has
          completed, but you can check by running:
        </p>

        <CodeSnippet language="bash" code="systemctl status mariadb" title="" />

        <p>If all is well you should see the following at the beginning of the output:</p>

        <CodeSnippet
          code='● mariadb.service - MariaDB 10.3.34 database server
     Loaded: loaded (/lib/systemd/system/mariadb.service; enabled; vendor preset: enabled)
     Active: active (running) since Fri 2022-04-22 15:17:04 UTC; 17s ago
       Docs: man:mysqld(8)
             https://mariadb.com/kb/en/library/systemd/
   Main PID: 1664 (mysqld)
     Status: "Taking your SQL requests now..."
      Tasks: 31 (limit: 1131)
      Memory: 63.7M
      CGroup: /system.slice/mariadb.service
      └─1664 /usr/sbin/mysqld'
          title=""
        />

        <p>Note: "q" on the keyboard will exit that output.</p>

        <p>Next to run the secure installation script, run:</p>

        <CodeSnippet language="bash" code="mysql_secure_installation" title="" />

        <p>It will ask you for the current root password, this will be empty by default so just hit "enter".</p>

        <CodeSnippet code="Enter current password for root (enter for none): " title="" />

        <p>Now enter "y" and then enter a strong password. Then enter it again to confirm when it asks.</p>

        <CodeSnippet
          code="OK, successfully used password, moving on...

Setting the root password ensures that nobody can log into the MariaDB
root user without the proper authorisation.

Set root password? [Y/n]"
          title=""
        />

        <p>Enter "y" again to remove the anonymous users.</p>

        <CodeSnippet code="Remove anonymous users? [Y/n]" title="" />

        <p>
          Enter "y" here too to prevent remote login as the root user (we'll set up a separate user for logging in
          remotely shortly).
        </p>

        <CodeSnippet code="Disallow root login remotely? [Y/n] " title="" />

        <p>Again enter "y" here as you won't need the test database.</p>

        <CodeSnippet code="Remove test database and access to it? [Y/n] " title="" />

        <p>And again enter "y" to reload the privilege tables.</p>

        <CodeSnippet code="Reload privilege tables now? [Y/n] " title="" />

        <p>
          Now you should be able to access MariaDB by running the following and entering the password from earlier when
          prompted:
        </p>

        <CodeSnippet language="bash" code="mysql -uroot -p" title="" />

        <HeadingAnchor id="create-user">Creating a Database User</HeadingAnchor>

        <p>
          Inside the <code>mysql</code> client, create a new user by running the following with a username (instead of
          "elliot", unless that's your name too) and password:
        </p>

        <CodeSnippet language="sql" code="CREATE USER 'elliot'@'%' IDENTIFIED BY 'averystrongpassword';" title="" />

        <p>
          Now you can grant some permissions to the new user (replace the "elliot" username with the one you used in the
          previous step):
        </p>

        <CodeSnippet
          language="sql"
          code="GRANT CREATE, ALTER, DROP, INSERT, UPDATE, DELETE, SELECT, REFERENCES, RELOAD on *.* TO 'elliot'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;"
          title=""
        />

        <p>Now you should be able to access MariaDB using your new username and password:</p>

        <CodeSnippet language="bash" code="mysql -uelliot -p" title="" />

        <HeadingAnchor id="remote-access">Enabling Remote Access</HeadingAnchor>

        <aside className="my-4 border-l-4 border-yellow-500 bg-yellow-50 p-4 dark:bg-yellow-900/20">
          <p className="font-bold">Security Warning:</p>
          <p>
            Allowing remote database access exposes your database to potential security risks. Only enable remote access
            if absolutely necessary, and always use strong passwords, firewall rules to restrict access to specific IP
            addresses, and consider setting up SSL/TLS encryption for database connections. Never expose a database with
            weak passwords or default configurations to the internet.
          </p>
        </aside>

        <p>
          If you want to be able to access the database remotely you will need to comment-out the{" "}
          <code>bind-address</code> line in <code>/etc/mysql/mariadb.conf.d/50-server.cnf</code>:
        </p>

        <CodeSnippet language="bash" code="nano /etc/mysql/mariadb.conf.d/50-server.cnf" title="" />

        <p>
          Note: to save the file in the <code>nano</code> text editor it's "ctrl+o", then to exit it's "ctrl+x".
        </p>

        <p>Find the following line:</p>

        <CodeSnippet
          code="# Instead of skip-networking the default is now to listen only on
# localhost which is more compatible and is not less secure.
bind-address            = 127.0.0.1"
          title=""
        />

        <p>
          and replace the <code>bind-address</code> line with:
        </p>

        <CodeSnippet code="#bind-address            = 127.0.0.1" title="" />

        <p>
          Once you have saved the file, restart the <code>mariadb</code> service by running:
        </p>

        <CodeSnippet language="bash" code="systemctl restart mariadb" title="" />

        <p>Now you should be able to access your database remotely, for example:</p>

        <CodeSnippet language="bash" code="mysql -u elliot -h 123.45.67.89 -p" title="" />

        <p>
          Where the <code>-h</code> IP address is the IP address of the server you've created.
        </p>

        <p>
          One more thing to note if you are connecting via GUI client or programming script, the port number is{" "}
          <em>3306</em>.
        </p>

        <p>Once you are in the MariaDB server, you'll probably want to create a database, so log in again:</p>

        <CodeSnippet language="bash" code="mysql -u elliot -h 123.45.67.89 -p" title="" />

        <p>and run:</p>

        <CodeSnippet language="sql" code="CREATE DATABASE mydatabase;" title="" />

        <p>
          If you are using <code>ufw</code> to manage firewall rules, ensure port 3306 is open by running the following
          in the Linux command line:
        </p>

        <CodeSnippet language="bash" code="ufw allow mysql" title="" />

        <HeadingAnchor id="faq">Frequently Asked Questions</HeadingAnchor>

        <h3>How do I secure remote connections with SSL/TLS?</h3>
        <p>
          To enable SSL/TLS encryption for MariaDB connections, you need to generate SSL certificates and configure
          MariaDB to use them. First, generate certificates using OpenSSL or a certificate authority. Then edit{" "}
          <code>/etc/mysql/mariadb.conf.d/50-server.cnf</code> and add SSL certificate paths under the [mysqld] section:
          ssl-ca, ssl-cert, and ssl-key. Restart MariaDB and require SSL for users with{" "}
          <code>GRANT USAGE ON *.* TO 'user'@'%' REQUIRE SSL;</code>. This encrypts all data transmitted between the
          client and server, protecting credentials and query data from interception.
        </p>

        <h3>What ports need to be opened for remote access?</h3>
        <p>
          MariaDB uses port 3306 by default for both local and remote connections. To allow remote access, you need to
          open this port in your firewall using <code>ufw allow mysql</code> (which opens port 3306) or{" "}
          <code>ufw allow 3306/tcp</code>. For better security, restrict access to specific IP addresses using{" "}
          <code>ufw allow from YOUR_IP_ADDRESS to any port 3306</code>. If you're behind a router or cloud firewall, you
          may also need to configure port forwarding or security group rules to allow traffic on port 3306.
        </p>

        <h3>Is it safe to allow remote database access?</h3>
        <p>
          Remote database access introduces security risks and should only be enabled when necessary. The main risks
          include: exposure to brute-force password attacks, potential data interception without SSL/TLS, and increased
          attack surface for database vulnerabilities. To mitigate these risks: use strong passwords, enable SSL/TLS
          encryption, restrict access to specific IP addresses using firewall rules (not '%' in user hosts), use
          non-standard ports, implement fail2ban to block brute-force attempts, and regularly update MariaDB. For
          production environments, consider using SSH tunneling or a VPN instead of direct database exposure.
        </p>

        <h3>How do I restrict access to specific IP addresses?</h3>
        <p>
          There are two ways to restrict database access by IP: at the database user level and at the firewall level.
          For database users, replace '%' with specific IP addresses when creating users:{" "}
          <code>CREATE USER 'user'@'192.168.1.100'</code> instead of <code>'user'@'%'</code>. For firewall restrictions,
          use <code>ufw allow from 192.168.1.100 to any port 3306</code> to only allow connections from specific IPs.
          The most secure approach uses both methods together: database-level IP restrictions ensure users can only
          connect from approved addresses, while firewall rules provide an additional network-level security layer. You
          can also use CIDR notation for IP ranges: <code>'user'@'192.168.1.0/24'</code>.
        </p>

        <h2>Conclusion</h2>
        <p>
          You now have a fully functional MariaDB installation on your Ubuntu server with secure remote access
          configured. By following the mysql_secure_installation script and creating a dedicated user account instead of
          using root remotely, you've implemented fundamental security best practices. The configuration changes to
          allow remote connections give you the flexibility to manage your databases from development tools or remote
          applications while maintaining security.
        </p>
        <p>
          Remember to use strong passwords for all database users and consider implementing additional security measures
          for production environments, such as setting up SSL/TLS encryption for database connections or restricting
          access to specific IP addresses in your firewall rules. With your database server now operational, you can
          create databases and start building applications that require persistent data storage.
        </p>
      </section>
    </div>
  </section>
);
