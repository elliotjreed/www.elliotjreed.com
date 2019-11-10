import * as React from "react";
import { Link } from "react-router-dom";

export class Footer extends React.Component<{}, {}> {
  public render(): React.ReactNode {
    return (
      <footer className="footer">
        <div className="content has-text-centered">
          <Link to="/sitemap">Sitemap</Link>
          <p>
            Copyright {new Date().getFullYear()} <strong>Elliot J. Reed</strong>. The source code is licensed under the{" "}
            <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer">
              MIT licence
            </a>
            .
          </p>
        </div>
      </footer>
    );
  }
}
