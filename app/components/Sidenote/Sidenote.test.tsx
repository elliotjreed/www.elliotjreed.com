import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Sidenote } from "./Sidenote";

describe("Sidenote", () => {
  it("renders a marker that is described by the note", () => {
    render(
      <p>
        Every environment changes
        <Sidenote id="sn-1" number={1}>
          Heraclitus never had to reproduce a bug.
        </Sidenote>
      </p>,
    );

    const marker = screen.getByRole("button", { name: "Sidenote 1" });
    expect(marker).toHaveClass("ejr-sn-ref");
    expect(marker).toHaveAttribute("aria-describedby", "sn-1");

    const note = screen.getByRole("note");
    expect(note).toHaveAttribute("id", "sn-1");
    expect(note).toHaveClass("ejr-sidenote");
    expect(note).toHaveTextContent("1Heraclitus never had to reproduce a bug.");
  });

  it("places following punctuation between the marker and the note", () => {
    const { container } = render(
      <p>
        between runs
        <Sidenote id="sn-2" number={2} punctuation=",">
          An aside.
        </Sidenote>{" "}
        and the second run
      </p>,
    );

    expect(container.querySelector("p")?.textContent).toBe("between runs,2An aside. and the second run");
  });
});
