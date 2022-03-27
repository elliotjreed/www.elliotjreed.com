import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { TopBar } from "../src/components/TopBar";

describe("TopBar", (): void => {
  it("should display title text", async (): Promise<void> => {
    render(
      <MemoryRouter>
        <TopBar />
      </MemoryRouter>
    );

    expect(await screen.findByText("Elliot J. Reed")).toBeInTheDocument();
  });
});
