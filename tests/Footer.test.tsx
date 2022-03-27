import { render, screen } from "@testing-library/react";

import { Footer } from "../src/components/Footer";

describe("Footer", (): void => {
  it("should display copyright name", (): void => {
    render(<Footer />);

    expect(screen.getByText("Elliot J. Reed")).toBeInTheDocument();
  });
});
