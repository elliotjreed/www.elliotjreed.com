import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { PageNotFound } from "../src/components/PageNotFound";

describe("Page Not Found", (): void => {
  it("should display Not Found text", (): void => {
    render(
      <MemoryRouter>
        <PageNotFound />
      </MemoryRouter>
    );

    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
  });
});
