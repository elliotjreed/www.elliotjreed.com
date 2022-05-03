import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import nock from "nock";

import { Home } from "../src/components/Home";

describe("Home", (): void => {
  it("should display name and fetch data from API", async (): Promise<void> => {
    const scope: nock.Scope = nock("https://api.elliotjreed.com")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
        "access-control-allow-credentials": "true"
      })
      .get("/api/v1/website")
      .reply(200, {
        data: {
          additionalName: "MiddleName",
          alternateName: "TestName",
          familyName: "Surname",
          givenName: "FirstName",
          name: "FirstName Surname"
        },
        errors: []
      });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor((): void => expect(scope.isDone()).toBe(true));

    expect(await screen.findByText("Elliot Reed")).toBeInTheDocument();
  });
});
