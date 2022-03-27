import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { Routes } from "../src/components/Routes";

describe("Routes", (): void => {
  it("should display skip links link text", async (): Promise<void> => {
    render(
      <MemoryRouter>
        <Routes />
      </MemoryRouter>
    );

    expect(await screen.findByText("Skip to content")).toBeInTheDocument();
    expect(await screen.findAllByRole("link")).toHaveLength(11);
  });
});
