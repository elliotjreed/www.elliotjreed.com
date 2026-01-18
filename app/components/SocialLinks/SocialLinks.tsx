import { faBluesky } from "@fortawesome/free-brands-svg-icons/faBluesky";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";
import { faTelegram } from "@fortawesome/free-brands-svg-icons/faTelegram";
import { faTwitter } from "@fortawesome/free-brands-svg-icons/faTwitter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FC, ReactElement } from "react";

export const SocialLinks: FC = (): ReactElement => {
  return (
    <>
      <a
        href="https://github.com/elliotjreed"
        rel="noreferrer noopener"
        title="GitHub"
        className="text-primary-900 dark:text-primary-200"
      >
        <span className="icon">
          <FontAwesomeIcon className="fa-lg" icon={faGithub} aria-label="GitHub Profile" />
        </span>
      </a>
      <a
        href="https://www.linkedin.com/in/elliotjreed?utm_source=elliotjreed.com"
        rel="noreferrer noopener"
        title="LinkedIn"
        className="text-primary-900 dark:text-primary-200"
      >
        <span className="icon">
          <FontAwesomeIcon className="fa-lg" icon={faLinkedin} aria-label="LinkedIn Profile" />
        </span>
      </a>
      <a
        href="https://t.me/elliotjreed?utm_source=elliotjreed.com"
        rel="noreferrer noopener"
        title="Telegram"
        className="text-primary-900 dark:text-primary-200"
      >
        <span className="icon">
          <FontAwesomeIcon className="fa-lg" icon={faTelegram} aria-label="Telegram" />
        </span>
      </a>
      <a
        href="https://x.com/elliotjreed?utm_source=elliotjreed.com"
        rel="noreferrer noopener"
        title="Twitter / X"
        className="text-primary-900 dark:text-primary-200"
      >
        <span className="icon">
          <FontAwesomeIcon className="fa-lg" icon={faTwitter} aria-label="Twitter / X Profile" />
        </span>
      </a>
      <a
        href="https://bsky.app/profile/elliotjreed.com?utm_source=elliotjreed.com"
        rel="noreferrer noopener"
        title="BlueSky"
        className="text-primary-900 dark:text-primary-200"
      >
        <span className="icon">
          <FontAwesomeIcon className="fa-lg" icon={faBluesky} aria-label="BlueSky Profile" />
        </span>
      </a>
    </>
  );
};
