import React from "react";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";
import { faTwitter } from "@fortawesome/free-brands-svg-icons/faTwitter";
import { faBluesky } from "@fortawesome/free-brands-svg-icons/faBluesky";

import type { Route } from "./+types/home";
import ProfileImage from "../images/me.jpg"

export function meta({}: Route.MetaArgs) {
  return [{ title: "New React Router App" }, { name: "description", content: "Welcome to React Router!" }];
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
          <div className="text-gray-500 dark:text-gray-400">Engineering Manager</div>
          <div className="text-gray-500 dark:text-gray-400">Nottingham, United Kingdom</div>
          <div className="flex space-x-3 pt-6">
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
            <a href="https://twitter.com/elliotjreed" rel="noreferrer noopener" title="Twitter">
              <span className="icon">
                <FontAwesomeIcon className="fa-lg" icon={faTwitter} aria-label="Twitter Profile" />
              </span>
            </a>
            <a href="https://bsky.app/profile/elliotjreed.bsky.social" rel="noreferrer noopener" title="BlueSky">
              <span className="icon">
                <FontAwesomeIcon className="fa-lg" icon={faBluesky} aria-label="BlueSky Profile" />
              </span>
            </a>
          </div>
        </div>
        <div className="prose max-w-none pt-8 pb-8 dark:prose-dark xl:col-span-2">
          <p>
            Hi! I&apos;m Elliot, an Engineering Manager in software development, based in Nottingham. My interests are
            generally in e-commerce, AI, Linux, PHP, Javascript, Docker, and general DevOps.
          </p>
        </div>
      </div>
    </section>
  );
}
