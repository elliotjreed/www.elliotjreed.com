import { shallow } from "enzyme";
import * as React from "react";
import { Home } from "../src/components/Home";

describe("Home", (): void => {
  it("should render with home CSS class", (): void => {
    expect(shallow(<Home />).exists(".home")).toBe(true);
  });
});
