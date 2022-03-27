import { render, screen } from "@testing-library/react";

import { Spinner } from "../src/components/Spinner";

describe("Spinner", (): void => {
  it("should display loading indicator", (): void => {
    render(<Spinner />);

    expect(screen.getByLabelText("Loading")).toBeInTheDocument();
  });
});
