import React from "react";
import {shallow} from "enzyme";

import BookmarkButton from "./bookmark-button.jsx";

import testMocks from "../../test-mocks/bookmark-button.js";

describe(`snapshot test: BookmarkButton component`, () => {
  it(`should render correctly`, () => expect(
      shallow(<BookmarkButton {...testMocks}/>)
  ).toMatchSnapshot());

  it(`should render active`, () => expect(
      shallow(<BookmarkButton {...Object.assign({}, testMocks, {isActive: true})}/>)
  ).toMatchSnapshot());

  it(`should render big`, () => expect(
      shallow(<BookmarkButton {...Object.assign({}, testMocks, {isBig: true})}/>)
  ).toMatchSnapshot());
});
