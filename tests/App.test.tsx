import * as React from "react";
import * as ReactDOM from "react-dom";
import * as TestUtils from "react-dom/test-utils";

import App from "../src/components/App";

it("App is rendered", () => {
  const appElement: App = TestUtils.renderIntoDocument(
    <App/>
  );

  const appNode = ReactDOM.findDOMNode(appElement);

  expect(appNode.textContent).toContain("Elliot J. Reed");
});
