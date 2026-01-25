import type { ReactElement } from "react";
import { CodeSnippet, type CodeSnippetInterface } from "~/components/CodeSnippet/CodeSnippet";

export const meta = () => [
  { title: "Get Local and Public IP Address | EJR" },
  {
    name: "description",
    content:
      "Find your public IP address and local IP address on Linux or Mac via the command line using a Bash or ZSH shell function",
  },
  {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "Get Local and Public IP Address on Linux Command Line",
      name: "Find your public IP address and local IP address on Linux or Mac via the command line using a Bash or ZSH shell function",
      dateCreated: "2016-10-07T19:00:00+01:00",
      datePublished: "2016-10-07T19:00:00+01:00",
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

const functionSnippet: CodeSnippetInterface = {
  title: "myip",
  code: `function myip() {
    publicip=$(curl -s http://ipecho.net/plain)
    localip=$(ip -o -4 addr show | awk -F '[ /]+' '/global/ {print $4}')
    echo "Public IP: " $publicip
    echo "Local IP:  " $localip
}`,
};

export default (): ReactElement => (
  <section className="divide-y divide-gray-200 dark:divide-gray-700">
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-700 dark:text-gray-200 sm:text-4xl sm:leading-10 md:text-6xl">
        Get Local and Public IP Address
      </h1>
      <p className="prose dark:prose-dark max-w-none text-lg leading-7 text-gray-600 dark:text-gray-300">
        Find your public IP address and local IP address on Linux via the command line
      </p>
    </div>

    <div className="prose max-w-none dark:prose-dark">
      <section>
        <p>Here's a useful Bash function to find your local and public IP addresses:</p>
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
      </section>
    </div>
  </section>
);
