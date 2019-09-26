import { shallow } from "enzyme";
import * as React from "react";
import { Link } from "react-router-dom";
import Footer from "../src/components/Footer";

describe("Footer", (): void => {
  it("should render with footer CSS class and contain link", (): void => {
    expect(shallow(<Footer />).exists(".footer")).toBe(true);
    expect(shallow(<Footer />).find(Link)).toHaveLength(1);
  });
});
