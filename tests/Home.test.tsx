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
  expect(appNode.textContent).toEqual("Elliot J. ReedHi! I'm Elliot, a software developer based in Nottingham. My interests are generally in PHP, Javascript, Python, Docker, and general DevOps.This website contains little mini-guides and snippets which may prove helpful, and if you're stuck on anything you think I may be able to help with give me a shout-out on Twitter or LinkedIn.This website is built with React JS on the frontend, and Python on the backend using the asynchronous Sanic webserver. The code is available on GitHub.");
});
