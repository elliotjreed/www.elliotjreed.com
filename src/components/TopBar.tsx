import { faGithub, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { Categories } from "./Categories";

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
            <Link className="navbar-item" to="/cv" onClick={(): void => toggleMenu(false)}>
              CV
            </Link>
            <Link className="navbar-item" to="/travel" onClick={(): void => toggleMenu(false)}>
              Travelling
            </Link>
            <div className="navbar-item has-dropdown is-hoverable">
              <span className="navbar-link">Blog</span>
              <div className="navbar-dropdown" onClick={(): void => toggleMenu(false)}>
                <Categories />
              </div>
            </div>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a href="https://github.com/elliotjreed" className="button" title="GitHub Profile">
                  <span className="icon is-medium">
                    <FontAwesomeIcon className="fas fa-lg green" icon={faGithub} />
                  </span>
                </a>
                <a href="https://twitter.com/elliotjreed" className="button" title="Twitter Profile">
                  <span className="icon is-medium">
                    <FontAwesomeIcon className="fas fa-lg green" icon={faTwitter} />
                  </span>
                </a>
                <a href="https://www.linkedin.com/in/elliotjreed/" className="button" title="LinkedIn Profile">
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
