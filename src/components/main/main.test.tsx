import React from "react";
import {shallow} from "enzyme";

import {extend} from "../../utils";

import Main from "./main";

import testMocks from "../../test-mocks/main";

describe(`snapshot test: Main component`, () => {
  it(`should render correctly`, () => expect(
      shallow(<Main {...testMocks}><div/></Main>)
  ).toMatchSnapshot());

  it(`should render message without offers`, () => expect(
      shallow(<Main {...extend(testMocks, {offers: []})}><div/></Main>)
  ).toMatchSnapshot());
});
