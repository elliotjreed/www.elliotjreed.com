import { shallow } from "enzyme";
import * as React from "react";
import { PostContentSpinner } from "../src/components/PostContentSpinner";

describe("PostContentSpinner", (): void => {
  it("should render with card CSS class", (): void => {
    expect(shallow(<PostContentSpinner />).exists(".card")).toBe(true);
  });
});
