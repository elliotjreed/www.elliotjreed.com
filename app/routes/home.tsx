import type { ReactElement } from "react";
import { Link } from "react-router";
import { SocialLinks } from "~/components/SocialLinks";
import { emailAddress } from "~/data/emailAddress";
import ProfileImage from "../images/me.jpg";

export function meta() {
  return [
    { title: "Elliot J. Reed | EJR" },
    {
      name: "description",
      content:
        "The personal website of Elliot J. Reed, whose interests include e-commerce and technology management, philosophy, AI, software development, DevOps, and Linux.",
    },
  ];
}

export default (): ReactElement => (
  <section>
    <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
      <div className="flex flex-col items-center pt-8 text-gray-700 dark:text-gray-200">
        <img
          src={ProfileImage}
          alt="Photograph of Elliot"
          width={192}
          height={192}
          className="h-48 w-48 rounded-full"
        />
        <h1 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">Elliot Reed</h1>
        {/*<div className="text-gray-600 dark:text-gray-300">Engineering Manager</div>*/}
        {/*<div className="text-gray-600 dark:text-gray-300">Nottingham, United Kingdom</div>*/}
        <div className="flex space-x-3 pt-2">
          <SocialLinks />
        </div>
      </div>
      <div className="prose max-w-none pt-8 pb-8 xl:col-span-2">
        <p>
          Hi! I&apos;m Elliot, I work in e-commerce and software development. I'm based in Nottingham in the UK. My
          interests are generally in e-commerce, AI, Linux, PHP, Javascript, Docker, and general DevOps.
        </p>
        <p>
          If you work in the non-profit or charity sector and want to explore ways of using AI or software development
          in general, please do feel free to get in touch - I will be happy to volunteer my time and provide advice. You
          can reach me at <a href={`mailto:${emailAddress}`}>{emailAddress}</a> or via any of my social media links.
        </p>
        <p>
          A good place to start if you want to effectively use AI Assistants such as ChatGPT, Claude, and Gemini is my
          brief guide on <Link to="/ai/ai-prompt-engineering-guide">AI Prompt Engineering Guide</Link>. For an
          easy-to-reference guide and downloadable poster, have a look at{" "}
          <Link to="/ai/cafe-ai-prompt-framework">CAFE Prompt Framework</Link>
        </p>
      </div>
    </div>
  </section>
);
