import { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";
import { faTwitter } from "@fortawesome/free-brands-svg-icons/faTwitter";
import { faTelegram } from "@fortawesome/free-brands-svg-icons/faTelegram";

export const Footer: FC = (): ReactElement => {
  return (
    <footer className="print:hidden">
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
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
          <a href="https://t.me/elliotjreed" rel="noreferrer noopener" title="Telegram">
            <span className="icon">
              <FontAwesomeIcon className="fa-lg" icon={faTelegram} aria-label="Telegram" />
            </span>
          </a>
        </div>
        <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/sitemap">Sitemap</Link>
        </div>
        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/">
            © {new Date().getFullYear()} <strong>Elliot J. Reed</strong>
          </Link>
        </div>
      </div>
    </footer>
  );
};
