import type { ReactElement } from "react";
import { CodeSnippet, type CodeSnippetInterface } from "~/components/CodeSnippet/CodeSnippet";
import { HeadingAnchor } from "~/components/HeadingAnchor/HeadingAnchor";
import { PageHeader } from "~/components/PageHeader/PageHeader";
import { createBreadcrumbs, createTechArticle } from "~/data/schemaData";
import { createMeta } from "~/utils/seo";

export const meta = () => [
  ...createMeta({
    title: "Get Local and Public IP Address | EJR",
    description:
      "Find your public IP address and local IP address on Linux or Mac via the command line using a Bash or ZSH shell function",
    url: "https://www.elliotjreed.com/linux/get-local-and-public-ip-address-command-line-bash",
    type: "article",
    ogImage: "https://www.elliotjreed.com/og.png",
    twitterImage: "https://www.elliotjreed.com/twitter-card.png",
  }),
  {
    "script:ld+json": createTechArticle({
      url: "https://www.elliotjreed.com/linux/get-local-and-public-ip-address-command-line-bash",
      headline: "Get Local and Public IP Address on Linux Command Line",
      description:
        "Find your public IP address and local IP address on Linux or Mac via the command line using a Bash or ZSH shell function",
      datePublished: "2016-10-07T19:00:00+01:00",
      dateModified: "2026-01-30T00:00:00+00:00",
      articleSection: "Linux",
      keywords: ["Linux", "IP address", "command line", "Bash", "networking"],
      wordCount: 413,
      proficiencyLevel: "Beginner",
    }),
  },
  {
    "script:ld+json": createBreadcrumbs([
      { name: "Home", url: "https://www.elliotjreed.com" },
      { name: "ZSH / Bash Shell Guides", url: "https://www.elliotjreed.com/linux" },
      {
        name: "Get IP Address",
        url: "https://www.elliotjreed.com/linux/get-local-and-public-ip-address-command-line-bash",
      },
    ]),
  },
];

const functionSnippet: CodeSnippetInterface = {
  title: "myip",
  code: `function myip() {
    publicip=$(curl -s https://ipecho.net/plain)
    localip=$(ip -o -4 addr show | awk -F '[ /]+' '/global/ {print $4}')
    echo "Public IP: " $publicip
    echo "Local IP:  " $localip
}`,
};

export default (): ReactElement => (
  <section className="divide-y divide-gray-200 dark:divide-gray-700">
    <PageHeader
      title="Get Local and Public IP Address"
      meta={
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span>By Elliot J. Reed</span>
          <span>•</span>
          <time dateTime="2016-10-07">
            Published: 7<sup>th</sup> October 2016
          </time>
          <span>•</span>
          <time dateTime="2026-01-30">
            Last updated: 30<sup>th</sup> January 2026
          </time>
        </div>
      }
    >
      <p className="prose dark:prose-dark max-w-none text-lg leading-7 text-gray-600 dark:text-gray-300">
        Quickly display both your public and local IP addresses on Linux using a simple Bash function. Perfect for
        network troubleshooting, server configuration, and SSH connections.
      </p>
    </PageHeader>

    <div className="prose max-w-none dark:prose-dark">
      <section>
        <p>
          This Bash function retrieves both your public (external) IP address and your local (internal) IP address on
          Linux. Your public IP is what the internet sees, while your local IP is your address on your internal network.
          This is useful when configuring firewalls, setting up SSH connections, or troubleshooting network issues.
        </p>

        <CodeSnippet language="bash" code={functionSnippet.code} title={functionSnippet.title} />

        <p>
          Then you just need to type <code>myip</code> into your terminal / Bash shell and it'll show you your public IP
          address and your local IP address.
        </p>

        <p>
          You could add this to your <code>.bashrc</code> file (eg. <code>nano ~/.bashrc</code>) so you always have it
          to use. Remember after adding it to the .bashrc file to source it to load in your changes:{" "}
          <code>. ~/.bashrc</code> or <code>source ~/.bashrc</code>.
        </p>

        <h2>Alternative Methods</h2>

        <p>There are several other ways to find your IP addresses on Linux. Here are some common alternatives:</p>

        <h3>Using hostname command</h3>
        <CodeSnippet language="bash" code="hostname -I" title="Get local IP addresses" />
        <p>This displays all local IP addresses assigned to your system.</p>

        <h3>Using ip addr command</h3>
        <CodeSnippet language="bash" code="ip addr show" title="Show all network interfaces" />
        <p>
          This shows detailed information about all network interfaces. Look for the <code>inet</code> lines to find
          IPv4 addresses.
        </p>

        <h3>Using ifconfig (older systems)</h3>
        <CodeSnippet language="bash" code="ifconfig" title="Show network configuration (deprecated)" />
        <p>
          Note: <code>ifconfig</code> is deprecated on modern Linux systems. Use <code>ip addr</code> instead.
        </p>

        <h3>Using curl or wget for public IP</h3>
        <CodeSnippet
          language="bash"
          code="curl -s https://api.ipify.org\ncurl -s https://ifconfig.me\ncurl -s https://icanhazip.com"
          title="Alternative public IP services"
        />

        <HeadingAnchor id="faq">Frequently Asked Questions</HeadingAnchor>

        <h3>Why does my public IP address change?</h3>
        <p>
          Most residential internet connections use dynamic IP addresses assigned by your ISP (Internet Service
          Provider). These addresses can change when you restart your router, after your DHCP lease expires, or when
          your ISP reassigns addresses. If you need a stable public IP address, you typically need to request a static
          IP from your ISP, which may come with an additional fee. Business internet plans often include static IPs by
          default.
        </p>

        <h3>What's the difference between local and public IP?</h3>
        <p>
          Your local (private) IP address is used for communication within your home or office network and typically
          starts with 192.168.x.x, 10.x.x.x, or 172.16.x.x. It's assigned by your router and not visible to the
          internet. Your public IP address is assigned by your ISP and is what websites and external services see when
          you connect to them. All devices on your local network share the same public IP address when accessing the
          internet, with your router using NAT (Network Address Translation) to manage the connections.
        </p>

        <h3>Are there other ways to find my IP address?</h3>
        <p>
          Yes, there are many methods. For local IP: <code>hostname -I</code>, <code>ip addr</code>, or checking your
          router's DHCP client list. For public IP: visiting websites like whatismyip.com, using{" "}
          <code>curl https://ifconfig.me</code>, or checking your router's WAN settings. The method shown in this guide
          combines both in a convenient shell function. You can also use network tools like <code>nmcli</code> on
          systems with NetworkManager, or check <code>/sys/class/net/</code> for interface information.
        </p>
      </section>
    </div>
  </section>
);
