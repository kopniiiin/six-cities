import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

import {doNothing, extend} from "../../utils";

import BookmarkButton from "./bookmark-button";

configure({adapter: new Adapter()});

const testMocks = {
  blockClassName: `block`,
  isActive: false,
  isBig: false,
  onClick: doNothing
};

describe(`e2e test: BookmarkButton component`, () => {
  it(`should call onClick`, () => {
    const onClick = jest.fn();

    shallow(<BookmarkButton {...extend(testMocks, {onClick})}/>)
      .find(`.button`).simulate(`click`);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
