import { FC, ReactElement } from "react";

export const Spinner: FC = (): ReactElement => {
  return (
    <aside className="has-text-centered" aria-label="Loading">
      <svg className="spinner" viewBox="0 0 50 50">
        <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
      </svg>
    </aside>
  );
};
