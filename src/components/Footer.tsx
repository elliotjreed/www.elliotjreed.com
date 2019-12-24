import * as React from "react";
import { Link } from "react-router-dom";

export const Footer = (): JSX.Element => {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <Link to="/sitemap">Sitemap</Link>
        <p>
          Copyright {new Date().getFullYear()} <strong>Elliot J. Reed</strong>.
        </p>
      </div>
    </footer>
  );
};
