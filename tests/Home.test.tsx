import * as React from "react";
import * as ReactDOM from "react-dom";
import * as TestUtils from "react-dom/test-utils";

import Home from "../src/components/Home";

it("Renders home component", () => {
  const appElement: Home = TestUtils.renderIntoDocument(
    <Home/>
  );

  const appNode = ReactDOM.findDOMNode(appElement);

  expect(appNode.textContent).toContain("I'm Elliot, a software developer based in Nottingham.");
});
