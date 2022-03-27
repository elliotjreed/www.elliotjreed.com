import { render, screen } from "@testing-library/react";

import { RouteLoading } from "../src/components/RouteLoading";

describe("Routes Loading", (): void => {
  it("should display loading indicator", (): void => {
    render(<RouteLoading />);

    expect(screen.getByLabelText("Loading")).toBeInTheDocument();
  });
});
