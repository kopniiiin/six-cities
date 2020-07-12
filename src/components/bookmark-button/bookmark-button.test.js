import React from "react";
import {shallow} from "enzyme";

import {extend} from "../../utils.js";

import BookmarkButton from "./bookmark-button.jsx";

import testMocks from "../../test-mocks/bookmark-button.js";

describe(`snapshot test: BookmarkButton component`, () => {
  it(`should render correctly`, () => expect(
      shallow(<BookmarkButton {...testMocks}/>)
  ).toMatchSnapshot());

  it(`should render active`, () => expect(
      shallow(<BookmarkButton {...extend(testMocks, {isActive: true})}/>)
  ).toMatchSnapshot());

  it(`should render big`, () => expect(
      shallow(<BookmarkButton {...extend(testMocks, {isBig: true})}/>)
  ).toMatchSnapshot());
});
