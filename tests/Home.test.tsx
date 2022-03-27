import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import nock from "nock";

import { Home } from "../src/components/Home";

describe("Home", (): void => {
  it("should return name from the API", async (): Promise<void> => {
    const scope: nock.Scope = nock("https://api.elliotjreed.com")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
        "access-control-allow-credentials": "true"
      })
      .get("/blog/author")
      .reply(200, {
        additionalName: "MiddleName",
        alternateName: "TestName",
        familyName: "Surname",
        givenName: "FirstName",
        name: "FirstName Surname"
      });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor((): void => expect(scope.isDone()).toBe(true));

    expect(await screen.findByText("FirstName Surname")).toBeInTheDocument();
  });
});
