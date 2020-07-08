import React from "react";
import {shallow} from "enzyme";

import {extend} from "../../utils.js";

import Sort from "./sort.jsx";

import testMocks from "../../test-mocks/sort.js";

describe(`snapshot test: Sort component`, () => {
  it(`should render correctly`, () => expect(
      shallow(<Sort {...testMocks}/>)
  ).toMatchSnapshot());

  it(`should render active`, () => expect(
      shallow(<Sort {...extend(testMocks, {isActive: true})}/>)
  ).toMatchSnapshot());
});
