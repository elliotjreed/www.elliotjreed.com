import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { PageNotFound } from "../src/components/PageNotFound";

describe("Page Not Found", (): void => {
  it("should display Not Found text", (): void => {
    render(
      <BrowserRouter>
        <PageNotFound />
      </BrowserRouter>
    );

    expect(screen.getByText("Not Found")).toBeInTheDocument();
  });
});
