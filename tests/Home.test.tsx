import { shallow } from "enzyme";
import * as React from "react";
import { AllPosts } from "../src/components/AllPosts";
import { Home } from "../src/components/Home";

describe("Home", (): void => {
  it("should render with home CSS class and contain AllPosts component", (): void => {
    expect(shallow(<Home />).exists(".home")).toBe(true);
    expect(shallow(<Home />).find(AllPosts)).toHaveLength(1);
  });
});
