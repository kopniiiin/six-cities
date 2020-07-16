import React from "react";
import {shallow} from "enzyme";

import {extend} from "../../utils.js";

import Main from "./main.jsx";

import testMocks from "../../test-mocks/main.js";

describe(`snapshot test: Main component`, () => {
  it(`should render correctly`, () => expect(
      shallow(<Main {...testMocks}/>)
  ).toMatchSnapshot());

  it(`should render message without offers`, () => expect(
      shallow(<Main {...extend(testMocks, {offers: []})}/>)
  ).toMatchSnapshot());
});
