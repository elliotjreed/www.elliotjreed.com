import * as React from "react";

interface EmptyProps {
}

interface EmptyState {
}

export default class Spinner extends React.Component<EmptyProps, EmptyState> {
  public render(): React.ReactNode {
    return (
      <svg className="spinner" viewBox="0 0 50 50">
        <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"/>
      </svg>
    );
  }
}
