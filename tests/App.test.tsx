import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { App } from "../src/components/App";

describe("App", (): void => {
  it("should contain skip links", async (): Promise<void> => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(await screen.findByText("Skip to content")).toBeInTheDocument();
  });
});
