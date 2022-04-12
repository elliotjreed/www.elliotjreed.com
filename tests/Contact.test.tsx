import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import nock from "nock";

import { Contact } from "../src/components/Contact";
import userEvent from "@testing-library/user-event";

describe("Contact", (): void => {
  it("should send message and show success text", async (): Promise<void> => {
    const scope: nock.Scope = nock("https://api.elliotjreed.com")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
        "access-control-allow-credentials": "true"
      })
      .post("/email/send")
      .reply(200, JSON.stringify(true));

    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>
    );

    expect(screen.getByRole("button")).not.toBeDisabled();

    await userEvent.type(screen.getByLabelText("Name"), "Test Name");
    await userEvent.type(screen.getByLabelText("Email address"), "email@example.com");
    await userEvent.type(screen.getByLabelText("Message"), "A test message");
    await userEvent.click(screen.getByRole("button"));

    expect(await screen.findByRole("button")).toBeDisabled();

    await waitFor((): void => expect(scope.isDone()).toBe(true));

    expect(await screen.findByText("Thank you for your enquiry. I'll get back to you shortly!")).toBeInTheDocument();
  });

  it("should show error when error returned from API", async (): Promise<void> => {
    const scope: nock.Scope = nock("https://api.elliotjreed.com")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
        "access-control-allow-credentials": "true"
      })
      .post("/email/send")
      .reply(200, { errors: "An error occurred" });

    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>
    );

    await userEvent.type(screen.getByLabelText("Name"), "Test Name");
    await userEvent.type(screen.getByLabelText("Email address"), "email@example.com");
    await userEvent.type(screen.getByLabelText("Message"), "A test message");
    await userEvent.click(screen.getByRole("button"));

    await waitFor((): void => expect(scope.isDone()).toBe(true));

    expect(await screen.findByText("An error occurred")).toBeInTheDocument();
  });

  it("should show error when message API has network error", async (): Promise<void> => {
    const scope: nock.Scope = nock("https://api.elliotjreed.com")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
        "access-control-allow-credentials": "true"
      })
      .post("/email/send")
      .reply(500);

    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>
    );

    await userEvent.type(screen.getByLabelText("Name"), "Test Name");
    await userEvent.type(screen.getByLabelText("Email address"), "email@example.com");
    await userEvent.type(screen.getByLabelText("Message"), "A test message");
    await userEvent.click(screen.getByRole("button"));

    await waitFor((): void => expect(scope.isDone()).toBe(true));

    expect(await screen.findByText("There was an error sending your email, please try again.")).toBeInTheDocument();
  });
});
