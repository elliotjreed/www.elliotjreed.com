import * as React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTwitter, faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons'
import Categories from "./Categories";

interface EmptyProps {
}

interface TopBarState {
  menuActive: boolean;
}

export default class TopBar extends React.Component<EmptyProps, TopBarState> {
  constructor(props: EmptyProps) {
    super(props);

    this.state = {
      menuActive: false
    };

    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
  }

  private toggleMobileMenu(): void {
    const currentMenuActive = this.state.menuActive;
    this.setState({ menuActive: !currentMenuActive });
  }

  public render(): React.ReactNode {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <img src="https://elliotjreed.com/elliotjreed.jpg" width="32" height="32"/>
            </Link>
            <a role="button"
               className={"navbar-burger navbar" + (this.state.menuActive ? " is-active" : "")}
               aria-label="menu" aria-expanded="false"
               onClick={this.toggleMobileMenu}>
              <span aria-hidden="true"/>
              <span aria-hidden="true"/>
              <span aria-hidden="true"/>
            </a>
          </div>
          <div className={"navbar-menu" + (this.state.menuActive ? " is-active" : "")}>
            <div className="navbar-end">
              <Categories/>
              <div className="navbar-item">
                <div className="buttons">
                  <a href="https://github.com/elliotjreed" className="button">
                    <span className="icon is-medium">
                      <FontAwesomeIcon className="fas fa-lg" icon={faGithub} />
                    </span>
                  </a>
                  <a href="https://twitter.com/elliotjreed" className="button">
                    <span className="icon is-medium">
                      <FontAwesomeIcon className="fas fa-lg" icon={faTwitter} />
                    </span>
                  </a>
                  <a href="https://www.linkedin.com/in/elliotjreed/" className="button">
                    <span className="icon is-medium">
                      <FontAwesomeIcon className="fas fa-lg" icon={faLinkedin} />
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
}
