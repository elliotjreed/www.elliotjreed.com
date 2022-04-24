import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { Projects } from "../src/components/Projects";

describe("Projects", (): void => {
  it("should display projects", async (): Promise<void> => {
    render(
      <MemoryRouter>
        <Projects />
      </MemoryRouter>
    );

    expect(await screen.findByText("A selection of projects I've created or worked on.")).toBeInTheDocument();
  });
});
