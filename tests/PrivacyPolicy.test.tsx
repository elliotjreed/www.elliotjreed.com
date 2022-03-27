import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { PrivacyPolicy } from "../src/components/PrivacyPolicy";

describe("Privacy Policy", (): void => {
  it("should display title text", async (): Promise<void> => {
    render(
      <MemoryRouter>
        <PrivacyPolicy />
      </MemoryRouter>
    );

    expect(await screen.findByText("Privacy Policy")).toBeInTheDocument();
  });
});
