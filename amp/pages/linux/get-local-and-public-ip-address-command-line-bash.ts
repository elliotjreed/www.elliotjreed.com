import { createBreadcrumbs, createTechArticle } from "../../../app/data/schemaData.js";
import { codeBlock } from "../../components/codeBlock.js";
import type { AmpPageData } from "../../layout.js";

const PAGE_URL = "https://www.elliotjreed.com/linux/get-local-and-public-ip-address-command-line-bash";

export function renderPage(): AmpPageData {
  return {
    title: "Get Local and Public IP Address | EJR",
    description:
      "Find your public IP address and local IP address on Linux or Mac via the command line using a Bash or ZSH shell function",
    canonicalPath: "/linux/get-local-and-public-ip-address-command-line-bash",
    type: "article",
    schemas: [
      createTechArticle({
        url: PAGE_URL,
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
      createBreadcrumbs([
        { name: "Home", url: "https://www.elliotjreed.com" },
        { name: "ZSH / Bash Shell Guides", url: "https://www.elliotjreed.com/linux" },
        { name: "Get IP Address", url: PAGE_URL },
      ]),
    ],
    body: `<section class="page-section">
  <div class="page-header">
    <h1 class="page-title">Get Local and Public IP Address</h1>
    <div class="page-meta">
      <span>By Elliot J. Reed</span>
      <span>&#8226;</span>
      <time datetime="2016-10-07">Published: 7th October 2016</time>
      <span>&#8226;</span>
      <time datetime="2026-01-30">Last updated: 30th January 2026</time>
    </div>
    <p class="page-intro">
      Quickly display both your public and local IP addresses on Linux using a simple Bash function. Perfect for
      network troubleshooting, server configuration, and SSH connections.
    </p>
  </div>
  <div class="prose">
    <p>
      This Bash function retrieves both your public (external) IP address and your local (internal) IP address on
      Linux. Your public IP is what the internet sees, while your local IP is your address on your internal network.
      This is useful when configuring firewalls, setting up SSH connections, or troubleshooting network issues.
    </p>

    ${codeBlock(
      `function myip() {
    publicip=$(curl -s https://ipecho.net/plain)
    localip=$(ip -o -4 addr show | awk -F '[ /]+' '/global/ {print $4}')
    echo "Public IP: " $publicip
    echo "Local IP:  " $localip
}`,
      "myip",
      "bash",
    )}

    <p>
      Then you just need to type <code>myip</code> into your terminal and it&#39;ll show you your public IP address
      and your local IP address.
    </p>

    <p>
      You could add this to your <code>.bashrc</code> file (e.g. <code>nano ~/.bashrc</code>) so you always have it
      to use. Remember after adding it to the .bashrc file to source it: <code>. ~/.bashrc</code> or
      <code>source ~/.bashrc</code>.
    </p>

    <h2>Alternative Methods</h2>

    <p>There are several other ways to find your IP addresses on Linux. Here are some common alternatives:</p>

    <h3>Using hostname command</h3>
    ${codeBlock("hostname -I", "Get local IP addresses", "bash")}
    <p>This displays all local IP addresses assigned to your system.</p>

    <h3>Using ip addr command</h3>
    ${codeBlock("ip addr show", "Show all network interfaces", "bash")}
    <p>
      This shows detailed information about all network interfaces. Look for the <code>inet</code> lines to find
      IPv4 addresses.
    </p>

    <h3>Using curl or wget for public IP</h3>
    ${codeBlock(
      "curl -s https://api.ipify.org\ncurl -s https://ifconfig.me\ncurl -s https://icanhazip.com",
      "Alternative public IP services",
      "bash",
    )}

    <h2 id="faq">Frequently Asked Questions</h2>

    <h3>Why does my public IP address change?</h3>
    <p>
      Most residential internet connections use dynamic IP addresses assigned by your ISP (Internet Service
      Provider). These addresses can change when you restart your router, after your DHCP lease expires, or when
      your ISP reassigns addresses. If you need a stable public IP address, you typically need to request a static
      IP from your ISP, which may come with an additional fee.
    </p>

    <h3>What&#39;s the difference between local and public IP?</h3>
    <p>
      Your local (private) IP address is used for communication within your home or office network and typically
      starts with 192.168.x.x, 10.x.x.x, or 172.16.x.x. It&#39;s assigned by your router and not visible to the
      internet. Your public IP address is assigned by your ISP and is what websites and external services see when
      you connect to them.
    </p>

    <h3>Are there other ways to find my IP address?</h3>
    <p>
      Yes, there are many methods. For local IP: <code>hostname -I</code>, <code>ip addr</code>, or checking your
      router&#39;s DHCP client list. For public IP: visiting websites like whatismyip.com, using
      <code>curl https://ifconfig.me</code>, or checking your router&#39;s WAN settings.
    </p>
  </div>
</section>`,
  };
}
