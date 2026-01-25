import type { ReactElement } from "react";
import { CodeSnippet } from "~/components/CodeSnippet/CodeSnippet";

export const meta = () => [
  { title: "Installing MariaBD on Ubuntu | EJR" },
  {
    name: "description",
    content: "How to install MariaBD (MySQL) on Ubuntu 20.04+ and allow remote access",
  },
  {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "Installing MariaBD on Ubuntu",
      name: "How to install MariaBD (MySQL) on Ubuntu 20.04+ and allow remote access",
      dateCreated: "2022-04-22T19:00:00+01:00",
      datePublished: "2022-04-22T19:00:00+01:00",
      inLanguage: "en-GB",
      author: {
        "@type": "Person",
        additionalName: "John",
        alternateName: "Elliot Reed",
        familyName: "Reed",
        givenName: "Elliot",
        name: "Elliot J. Reed",
        url: "https://www.elliotjreed.com",
      },
      copyrightHolder: {
        "@type": "Person",
        additionalName: "John",
        alternateName: "Elliot Reed",
        familyName: "Reed",
        givenName: "Elliot",
        name: "Elliot J. Reed",
        url: "https://www.elliotjreed.com",
      },
    },
  },
];

export default (): ReactElement => (
  <section className="divide-y divide-gray-200 dark:divide-gray-700">
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-700 dark:text-gray-200 sm:text-4xl sm:leading-10 md:text-6xl">
        Installing MariaBD on Ubuntu
      </h1>
      <p className="prose dark:prose-dark max-w-none text-lg leading-7 text-gray-600 dark:text-gray-300">
        How to install MariaBD (MySQL) on Ubuntu 20.04+ and allow remote access
      </p>
    </div>

    <div className="prose max-w-none dark:prose-dark">
      <section>
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

        <p>
          If you want to be able to access the database remotely you will need to comment-out the{" "}
          <code>bind-address</code> line in <code>/etc/mysql/mariadb.conf.d/50-server.cnf</code>:
        </p>

        <CodeSnippet language="bash" code="nano /etc/mysql/mariadb.conf.d/50-server.cnf" title="" />

        <p>
          Note: to save the file in the <code>nano</code> text editor it's "ctrl+w", then to exit it's "ctrl+x".
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
          in the Linux commend line:
        </p>

        <CodeSnippet language="bash" code="ufw allow mysql" title="" />
      </section>
    </div>
  </section>
);
