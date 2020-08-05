import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

import {doNothing, extend} from "../../utils";

import BookmarkButton from "./bookmark-button";

configure({adapter: new Adapter()});

const testMocks = {
  blockClassName: `block`,
  isActive: false,
  isBig: false,
  onClick: doNothing
};

describe(`snapshot test: BookmarkButton component`, () => {
  it(`should render correctly`, () => expect(
      toJson(shallow(<BookmarkButton {...testMocks}/>))
  ).toMatchSnapshot());

  it(`should render active`, () => expect(
      toJson(shallow(<BookmarkButton {...extend(testMocks, {isActive: true})}/>))
  ).toMatchSnapshot());

  it(`should render big`, () => expect(
      toJson(shallow(<BookmarkButton {...extend(testMocks, {isBig: true})}/>))
  ).toMatchSnapshot());
});
