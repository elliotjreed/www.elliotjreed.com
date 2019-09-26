import { shallow } from "enzyme";
import * as React from "react";
import Cv from "../src/components/Cv";

describe("Cv", (): void => {
  it("should render with home CSS class", (): void => {
    expect(shallow(<Cv />).exists(".home")).toBe(true);
  });
});
