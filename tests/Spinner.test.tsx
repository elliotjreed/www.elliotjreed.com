import { shallow } from "enzyme";
import * as React from "react";
import Spinner from "../src/components/Spinner";

describe("Loading", (): void => {
  it("should render with spinner CSS class", (): void => {
    expect(shallow(<Spinner />).exists(".spinner")).toBe(true);
  });
});
