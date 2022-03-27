import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { TheVapeDomain } from "../src/components/TheVapeDomain";

describe("The Vape Domain", (): void => {
  it("should display title text", async (): Promise<void> => {
    render(
      <MemoryRouter>
        <TheVapeDomain />
      </MemoryRouter>
    );

    expect(await screen.findByText("TheVape.co.uk")).toBeInTheDocument();
  });
});
