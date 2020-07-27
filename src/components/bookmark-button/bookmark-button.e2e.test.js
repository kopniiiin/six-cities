import React from "react";
import {shallow} from "enzyme";

import {extend} from "../../utils.js";

import BookmarkButton from "./bookmark-button.jsx";

import testMocks from "../../test-mocks/bookmark-button.js";

describe(`e2e test: BookmarkButton component`, () => {
  it(`should call onClick`, () => {
    const onClick = jest.fn();

    shallow(<BookmarkButton {...extend(testMocks, {onClick})}/>)
      .find(`.button`).simulate(`click`);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
