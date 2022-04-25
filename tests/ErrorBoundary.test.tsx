import { render, screen } from "@testing-library/react";
import { ReactElement } from "react";

import ErrorBoundary from "../src/components/ErrorBoundary";

const Child = (): ReactElement => {
  throw new Error("This error message show show");
};

describe("Error Boundary", (): void => {
  it("should display error text", (): void => {
    render(
      <ErrorBoundary>
        <Child />
      </ErrorBoundary>
    );

    expect(screen.getByText("Oh no! An error occurred!")).toBeInTheDocument();
    expect(screen.getByText("Error: This error message show show")).toBeInTheDocument();
  });
});
