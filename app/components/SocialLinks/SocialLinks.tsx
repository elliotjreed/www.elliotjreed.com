import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faBluesky } from "@fortawesome/free-brands-svg-icons/faBluesky";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";
import { faTelegram } from "@fortawesome/free-brands-svg-icons/faTelegram";
import { faTwitter } from "@fortawesome/free-brands-svg-icons/faTwitter";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FC, ReactElement } from "react";
import { emailAddress } from "~/data/emailAddress";

const LINK_LAYOUT = "inline-flex h-11 w-11 items-center justify-center rounded-md transition-colors";

export const SocialLinks: FC<{ accent?: boolean }> = ({ accent = false }): ReactElement => {
  const linkClassName = accent
    ? `${LINK_LAYOUT} text-on-rhubarb hover:bg-on-rhubarb/15`
    : `${LINK_LAYOUT} text-ink-muted hover:bg-surface-300 hover:text-ink`;

  return (
    <>
      <a href={`mailto:${emailAddress}`} title="Email" className={linkClassName}>
        <span className="icon">
          <FontAwesomeIcon className="fa-lg" icon={faEnvelope as IconProp} aria-label="Email Elliot" />
        </span>
      </a>
      <a href="https://github.com/elliotjreed" rel="noreferrer noopener" title="GitHub" className={linkClassName}>
        <span className="icon">
          <FontAwesomeIcon className="fa-lg" icon={faGithub} aria-label="GitHub Profile" />
        </span>
      </a>
      <a
        href="https://www.linkedin.com/in/elliotjreed?utm_source=elliotjreed.com"
        rel="noreferrer noopener"
        title="LinkedIn"
        className={linkClassName}
      >
        <span className="icon">
          <FontAwesomeIcon className="fa-lg" icon={faLinkedin} aria-label="LinkedIn Profile" />
        </span>
      </a>
      <a
        href="https://t.me/elliotjreed?utm_source=elliotjreed.com"
        rel="noreferrer noopener"
        title="Telegram"
        className={linkClassName}
      >
        <span className="icon">
          <FontAwesomeIcon className="fa-lg" icon={faTelegram} aria-label="Telegram" />
        </span>
      </a>
      <a
        href="https://x.com/elliotjreed?utm_source=elliotjreed.com"
        rel="noreferrer noopener"
        title="Twitter / X"
        className={linkClassName}
      >
        <span className="icon">
          <FontAwesomeIcon className="fa-lg" icon={faTwitter} aria-label="Twitter / X Profile" />
        </span>
      </a>
      <a
        href="https://bsky.app/profile/elliotjreed.com?utm_source=elliotjreed.com"
        rel="noreferrer noopener"
        title="BlueSky"
        className={linkClassName}
      >
        <span className="icon">
          <FontAwesomeIcon className="fa-lg" icon={faBluesky} aria-label="BlueSky Profile" />
        </span>
      </a>
    </>
  );
};
