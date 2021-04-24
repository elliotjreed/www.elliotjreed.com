export const Footer = (): JSX.Element => {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          Copyright {new Date().getFullYear()} <strong>Elliot J. Reed</strong>.
        </p>
      </div>
    </footer>
  );
};
