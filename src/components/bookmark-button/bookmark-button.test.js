import React from "react";
import {shallow} from "enzyme";

import BookmarkButton, {testProps} from "./bookmark-button.jsx";

describe(`snapshot test: BookmarkButton component`, () => {
  it(`should render correctly`, () => expect(
      shallow(<BookmarkButton {...testProps}/>)
  ).toMatchSnapshot());

  it(`should render active`, () => expect(
      shallow(<BookmarkButton {...Object.assign({}, testProps, {isActive: true})}/>)
  ).toMatchSnapshot());

  it(`should render big`, () => expect(
      shallow(<BookmarkButton {...Object.assign({}, testProps, {isBig: true})}/>)
  ).toMatchSnapshot());
});
