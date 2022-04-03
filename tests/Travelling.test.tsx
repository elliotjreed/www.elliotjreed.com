import { render, screen } from "@testing-library/react";

import { Travelling } from "../src/components/Travelling";

describe("Travelling", (): void => {
  it("should display subtitle text", (): void => {
    render(<Travelling />);

    expect(
      screen.getByText("A few photographs from some of the places I've visited (and remembered to take a photo!).")
    ).toBeInTheDocument();
  });
});
