import * as React from "react";
import * as ReactDOM from "react-dom";
import * as TestUtils from "react-dom/test-utils";
import Home from "../src/components/Home";

it("Renders home component", () => {
  // Render App in the document
  const appElement: Home = TestUtils.renderIntoDocument(
    <Home/>
  );

  const appNode = ReactDOM.findDOMNode(appElement);

  // Verify text content
  expect(appNode.textContent).toEqual("Elliot J. ReedAbout");
});
