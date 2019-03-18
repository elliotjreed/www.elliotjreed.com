import * as React from "react";
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
  }

  public render(): React.ReactNode {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item" href="https://bulma.io">
              <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
            </a>

            <a role="button" className={"navbar-burger burger" + (this.state.menuActive && " is-active")} aria-label="menu" aria-expanded="false"
               onClick={this.toggleMobileMenu}>
              <span aria-hidden="true"/>
              <span aria-hidden="true"/>
              <span aria-hidden="true"/>
            </a>
          </div>
          <div className={"navbar-menu" + (this.state.menuActive && " is-active")}>
            <Categories/>
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <a className="button is-primary">
                    <strong>Sign up</strong>
                  </a>
                  <a className="button is-light">
                    Log in
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
    let current = this.state.menuActive;
    this.setState({ menuActive: !current });
  }
}
