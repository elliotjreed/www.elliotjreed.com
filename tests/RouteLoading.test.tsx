import { shallow } from "enzyme";
import * as React from "react";
import { RouteLoading } from "../src/components/RouteLoading";

describe("RouteLoading", (): void => {
  it("should render with articles CSS class", (): void => {
    expect(shallow(<RouteLoading />).exists(".articles")).toBe(true);
  });
});
