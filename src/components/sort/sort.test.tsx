import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

import {SortType} from "../../types";

import {doNothing, extend} from "../../utils";

import Sort from "./sort";

configure({adapter: new Adapter()});

const testMocks = {
  isActive: false,
  onActiveStateChange: doNothing,
  activeType: SortType.POPULAR,
  onTypeChange: doNothing
};

describe(`snapshot test: Sort component`, () => {
  it(`should render correctly`, () => expect(
      toJson(shallow(<Sort {...testMocks}/>))
  ).toMatchSnapshot());

  it(`should render active`, () => expect(
      toJson(shallow(<Sort {...extend(testMocks, {isActive: true})}/>))
  ).toMatchSnapshot());
});
