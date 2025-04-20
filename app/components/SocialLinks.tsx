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
      <a href="https://t.me/elliotjreed" rel="noreferrer noopener" title="Telegram">
        <span className="icon">
          <FontAwesomeIcon className="fa-lg" icon={faTelegram} aria-label="Telegram" />
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
    </>
  );
};
