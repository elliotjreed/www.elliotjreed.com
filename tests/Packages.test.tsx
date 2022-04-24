import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { Packages } from "../src/components/Packages";

describe("Packages", (): void => {
  it("should display packages", async (): Promise<void> => {
    render(
      <MemoryRouter>
        <Packages />
      </MemoryRouter>
    );

    expect(await screen.findByText("Packages and Libraries")).toBeInTheDocument();
  });
});
