import * as React from "react";
import { Spinner } from "./Spinner";

export const PostContentSpinner = (): JSX.Element => {
  return (
    <div className="card">
      <div className="card-content has-text-centered">
        <div className="content">
          <Spinner />
        </div>
      </div>
    </div>
  );
};
