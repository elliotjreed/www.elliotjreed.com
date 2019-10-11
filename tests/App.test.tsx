import { shallow } from "enzyme";
import * as React from "react";
import App from "../src/components/App";
import Routes from "../src/components/Routes";

describe("App", (): void => {
  it("should render and contain routes", (): void => {
    expect(shallow(<App />).find(Routes)).toHaveLength(1);
  });
});
