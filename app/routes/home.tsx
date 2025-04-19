import { faBluesky } from "@fortawesome/free-brands-svg-icons/faBluesky";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";
import { faTwitter } from "@fortawesome/free-brands-svg-icons/faTwitter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router";
import ProfileImage from "../images/me.jpg";
import type { Route } from "./+types/home";

const parts: string[] = ["moc", "deerjtoille", "tcatnoc"];
const email: string = `${parts[0]}.${parts[1]}@${parts[2]}`.split("").reverse().join("");

export function meta() {
  return [
    { title: "Elliot J. Reed" },
    {
      name: "description",
      content:
        "The personal website of Elliot J. Reed, whose interests include e-commerce and technology management, philosophy, AI, software development, DevOps, and Linux.",
    },
  ];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <section>
      <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
        <div className="flex flex-col items-center pt-8">
          <img
            src={ProfileImage}
            alt="Photograph of Elliot"
            width={192}
            height={192}
            className="h-48 w-48 rounded-full"
          />
          <h1 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">Elliot Reed</h1>
          {/*<div className="text-gray-500 dark:text-gray-400">Engineering Manager</div>*/}
          {/*<div className="text-gray-500 dark:text-gray-400">Nottingham, United Kingdom</div>*/}
          <div className="flex space-x-3 pt-2">
            <a href="https://github.com/elliotjreed" rel="noreferrer noopener" title="GitHub">
              <span className="icon">
                <FontAwesomeIcon className="fa-lg" icon={faGithub} aria-label="GitHub Profile" />
              </span>
            </a>
            <a href="https://www.linkedin.com/in/elliotjreed/" rel="noreferrer noopener" title="LinkedIn">
              <span className="icon">
                <FontAwesomeIcon className="fa-lg" icon={faLinkedin} aria-label="LinkedIn Profile" />
              </span>
            </a>
            <a href="https://x.com/elliotjreed" rel="noreferrer noopener" title="Twitter / X">
              <span className="icon">
                <FontAwesomeIcon className="fa-lg" icon={faTwitter} aria-label="Twitter / X Profile" />
              </span>
            </a>
            <a href="https://bsky.app/profile/elliotjreed.bsky.social" rel="noreferrer noopener" title="BlueSky">
              <span className="icon">
                <FontAwesomeIcon className="fa-lg" icon={faBluesky} aria-label="BlueSky Profile" />
              </span>
            </a>
          </div>
        </div>
        <div className="prose max-w-none pt-8 pb-8 xl:col-span-2">
          <p>
            Hi! I&apos;m Elliot, I work in e-commerce and software development. I'm based in Nottingham in the UK. My
            interests are generally in e-commerce, AI, Linux, PHP, Javascript, Docker, and general DevOps.
          </p>
          <p>
            If you work in the non-profit or charity sector and want to explore ways of using AI or software development
            in general, please do feel free to get in touch - I will be happy to volunteer my time and provide advice.
            You can react me at <a href={`mailto:${email}`}>{email}</a> or via any of my social media links.
          </p>
          <p>
            A good place to start if you want to effectively use AI Assistants such as ChatGPR, Claude, and Gemini is my
            brief guide on <Link to="ai-prompt-engineering-guide">AI Prompt Engineering Guide</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}
