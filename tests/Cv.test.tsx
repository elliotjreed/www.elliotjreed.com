import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import nock from "nock";

import { Cv } from "../src/components/Cv";

describe("CV", (): void => {
  it("should display title text", (): void => {
    render(
      <MemoryRouter>
        <Cv />
      </MemoryRouter>
    );

    expect(screen.getByText("Curriculum Vitae / Résumé")).toBeInTheDocument();
  });

  it("should display content from API", async (): Promise<void> => {
    const scope: nock.Scope = nock("https://api.elliotjreed.com")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
        "access-control-allow-credentials": "true"
      })
      .get("/cv")
      .reply(200, { data: "CV content from API.", errors: [] });

    render(
      <MemoryRouter>
        <Cv />
      </MemoryRouter>
    );

    await waitFor((): void => expect(scope.isDone()).toBe(true));

    expect(await screen.findByText("CV content from API.")).toBeInTheDocument();
  });
});
