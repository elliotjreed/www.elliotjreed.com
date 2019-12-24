import { shallow } from "enzyme";
import * as React from "react";
import { Travelling } from "../src/components/Travelling";

describe("Travelling", (): void => {
  it("should render with home CSS class", (): void => {
    expect(shallow(<Travelling />).exists(".home")).toBe(true);
  });
});
