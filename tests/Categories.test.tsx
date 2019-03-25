import { shallow } from "enzyme";
import * as React from "react";
import { Link, MemoryRouter } from "react-router-dom";

import Categories from "../src/components/Categories";

it("fetches data from server when server returns a successful response", done => {
  fetch.mockResponseOnce(JSON.stringify(["Test Category", "Another Test Category"]));

  const wrapper = shallow(<Categories/>);

  process.nextTick(() => {
    expect(wrapper.state()).toEqual({
      categories: ["Test Category", "Another Test Category"],
      loading: false
    });

    expect(wrapper.find(Link).at(0).props().to).toBe("/category/test-category");
    expect(wrapper.find(Link).at(1).props().to).toBe("/category/another-test category");

    global.fetch.mockClear();
    done();
  });
});
