export const meta = () => [{ title: "Privacy Policy" }, { name: "description", content: "Privacy Policy." }];

export default function Index() {
  return (
    <section className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Privacy Policy
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Welcome to my personal website. I am committed to protecting your privacy and handling any personal data I
          collect from you in a responsible, secure manner in accordance with the UK General Data Protection Regulation
          (UK GDPR), the Data Protection Act 2018, and other relevant privacy legislation. This Privacy Policy explains
          how I collect, use, share and protect your information when you visit my website.
        </p>
      </div>

      <div className="prose max-w-none dark:prose-dark">
        <section>
          <h2>Information I Collect</h2>

          <h3>Information You Directly Provide</h3>
          <p>
            This blog does not collect any information directly from you. There are no forms, comment sections,
            registration options, or other means for you to input personal information.
          </p>

          <h3>Information Collected Automatically</h3>

          <h4>Server Logs</h4>
          <p>
            When you visit my website, my hosting provider (Cloudflare) may automatically collect and store certain
            information in server logs. This information may include:
          </p>
          <ul>
            <li>Your IP address</li>
            <li>Browser type and settings</li>
            <li>Date and time of your visit</li>
            <li>The page you visited</li>
            <li>The website that referred you to my website (if applicable)</li>
          </ul>
          <p>
            This information is collected to ensure the security and proper functioning of the website. It is stored for
            a limited period and is not used for tracking or marketing purposes.
          </p>

          <h4>Cookies</h4>
          <p>
            This website does not use any tracking or analytics cookies. The only cookies that may be used are those
            essential for the website's functionality (such as those required by Cloudflare for security purposes).
            These cookies do not track you across different websites and do not store personal information beyond what
            is strictly necessary for the website to function properly.
          </p>
        </section>

        <section>
          <h2>How I Use This Information</h2>
          <p>The limited information collected is used solely for:</p>
          <ul>
            <li>Ensuring the security and proper technical functioning of the website</li>
            <li>Protecting against malicious activity</li>
            <li>Troubleshooting technical issues</li>
          </ul>
          <p>I do not:</p>
          <ul>
            <li>Sell your information to third parties</li>
            <li>Use your information for marketing purposes</li>
            <li>Track your browsing behaviour for analytics</li>
            <li>Create profiles about your interests or preferences</li>
          </ul>
        </section>

        <section>
          <h2>Information Sharing</h2>
          <p>I do not share your personal information with third parties except in the following circumstances:</p>
          <ul>
            <li>With my hosting provider (Cloudflare) as necessary for the operation and security of the website</li>
            <li>If required by law or to respond to legal process</li>
            <li>To protect my rights, property, or safety, or the rights, property, or safety of others</li>
          </ul>
        </section>

        <section>
          <h2>Data Security</h2>
          <p>
            I take reasonable measures to protect your information from unauthorised access, use, or disclosure.
            However, please be aware that no method of transmission over the internet or electronic storage is 100%
            secure.
          </p>
        </section>

        <section>
          <h2>Data Retention</h2>
          <p>
            Server logs and any other automatically collected information are retained for 90 days, after which they are
            deleted.
          </p>
        </section>

        <section>
          <h2>Your Rights Under GDPR</h2>
          <p>
            Under the UK GDPR and the Data Protection Act 2018, you have various rights regarding your personal data,
            including the right to:
          </p>
          <ul>
            <li>Access your personal data</li>
            <li>Rectify inaccurate personal data</li>
            <li>Erase your personal data in certain circumstances</li>
            <li>Restrict the processing of your data in certain circumstances</li>
            <li>Object to the processing of your data in certain circumstances</li>
            <li>Data portability (the right to receive your data in a structured, commonly used format)</li>
          </ul>
          <p>To exercise any of these rights, please contact me.</p>
        </section>

        <section>
          <h2>International Data Transfers</h2>
          <p>
            This website is hosted on Cloudflare, which operates globally. By using my website, your information may be
            transferred to and maintained on computers located outside of your state, province, country, or other
            governmental jurisdiction where the data protection laws may differ.
          </p>
          <p>
            Cloudflare provides appropriate safeguards for international data transfers through its certifications and
            contractual commitments.
          </p>
        </section>

        <section>
          <h2>Complaints</h2>
          <p>
            If you have concerns about how I handle your personal data, please contact me first so I can address your
            concerns. If you are not satisfied with my response, you have the right to complain to the Information
            Commissioner's Office (ICO), the UK supervisory authority for data protection issues (www.ico.org.uk).
          </p>
        </section>
      </div>
    </section>
  );
}
