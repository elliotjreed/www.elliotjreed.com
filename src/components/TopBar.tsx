import { faGithub, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { Link } from "react-router-dom";

import Categories from "./Categories";

interface IState {
  menuActive: boolean;
}

export default class TopBar extends React.Component<{}, IState> {
  constructor(props: null) {
    super(props);

    this.state = {
      menuActive: false
    };

    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
  }

  public render(): React.ReactNode {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <p className="title green">Elliot J. Reed</p>
            </Link>
            <a role="button" className={"navbar-burger navbar" + (this.state.menuActive ? " is-active" : "")} aria-label="menu" aria-expanded="false" onClick={this.toggleMobileMenu}>
              <span aria-hidden="true"/>
              <span aria-hidden="true"/>
              <span aria-hidden="true"/>
            </a>
          </div>
          <div className={"navbar-menu" + (this.state.menuActive ? " is-active" : "")}>
            <div className="navbar-start">
              <Link className="navbar-item" to="/cv">CV</Link>
              <Link className="navbar-item" to="/travel">Travelling</Link>
            </div>
            <div className="navbar-end">
              <Categories/>
              <div className="navbar-item">
                <div className="buttons">
                  <a href="https://github.com/elliotjreed" className="button">
                    <span className="icon is-medium">
                      <FontAwesomeIcon className="fas fa-lg green" icon={faGithub}/>
                    </span>
                  </a>
                  <a href="https://twitter.com/elliotjreed" className="button">
                    <span className="icon is-medium">
                      <FontAwesomeIcon className="fas fa-lg green" icon={faTwitter}/>
                    </span>
                  </a>
                  <a href="https://www.linkedin.com/in/elliotjreed/" className="button">
                    <span className="icon is-medium">
                      <FontAwesomeIcon className="fas fa-lg green" icon={faLinkedin}/>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  private toggleMobileMenu(): void {
    const currentMenuActive = this.state.menuActive;

    this.setState({ menuActive: !currentMenuActive });
  }
}
