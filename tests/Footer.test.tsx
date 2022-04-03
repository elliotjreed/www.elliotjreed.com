import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { Footer } from "../src/components/Footer";

describe("Footer", (): void => {
  it("should display copyright name", (): void => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByText("Elliot J. Reed")).toBeInTheDocument();
  });
});
