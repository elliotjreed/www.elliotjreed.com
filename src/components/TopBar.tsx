import { faGithub, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const TopBar = (): JSX.Element => {
  const [menuActive, toggleMenu] = useState(false);

  const toggleMobileMenu = (): void => {
    toggleMenu(!menuActive);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <p className="title green">Elliot J. Reed</p>
          </Link>
          <a
            role="button"
            className={"navbar-burger navbar" + (menuActive ? " is-active" : "")}
            aria-label="menu"
            aria-expanded="false"
            onClick={toggleMobileMenu}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>
        <div className={"navbar-menu" + (menuActive ? " is-active" : "")}>
          <div className="navbar-start">
            <div className="navbar-item has-dropdown is-hoverable">
              <span className="navbar-link">About</span>
              <div className="navbar-dropdown">
                <Link className="navbar-item" to="/cv" onClick={toggleMobileMenu}>
                  CV
                </Link>
                <Link className="navbar-item" to="/travel" onClick={toggleMobileMenu}>
                  Travelling
                </Link>
              </div>
            </div>
            <div className="navbar-item has-dropdown is-hoverable">
              <span className="navbar-link">Fun Experiments</span>
              <div className="navbar-dropdown">
                <Link className="navbar-item" to="/stay-alert" onClick={toggleMobileMenu}>
                  #StayAlert Generator
                </Link>
                <Link className="navbar-item" to="/government-tweet" onClick={toggleMobileMenu}>
                  @10DowningStreet Generator
                </Link>
              </div>
            </div>
            <Link className="navbar-item" to="/blog" onClick={toggleMobileMenu}>
              Blog
            </Link>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a
                  href="https://github.com/elliotjreed"
                  className="button"
                  title="GitHub Profile"
                  rel="noreferrer noopener"
                >
                  <span className="icon is-medium">
                    <FontAwesomeIcon className="fas fa-lg green" icon={faGithub} />
                  </span>
                </a>
                <a
                  href="https://twitter.com/elliotjreed"
                  className="button"
                  title="Twitter Profile"
                  rel="noreferrer noopener"
                >
                  <span className="icon is-medium">
                    <FontAwesomeIcon className="fas fa-lg green" icon={faTwitter} />
                  </span>
                </a>
                <a
                  href="https://www.linkedin.com/in/elliotjreed/"
                  className="button"
                  title="LinkedIn Profile"
                  rel="noreferrer noopener"
                >
                  <span className="icon is-medium">
                    <FontAwesomeIcon className="fas fa-lg green" icon={faLinkedin} />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
