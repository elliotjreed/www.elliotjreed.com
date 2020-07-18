import { shallow } from "enzyme";
import * as React from "react";
import { Footer } from "../src/components/Footer";

describe("Footer", (): void => {
  it("should render with footer CSS class", (): void => {
    expect(shallow(<Footer />).exists(".footer")).toBe(true);
  });
});
