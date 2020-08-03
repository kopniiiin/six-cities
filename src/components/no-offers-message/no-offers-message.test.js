import React from "react";
import {shallow} from "enzyme";

import NoOffersMessage from "./no-offers-message";

import testMocks from "../../test-mocks/no-offers-message";

describe(`snapshot test: NoOffersMessage component`, () => {
  it(`should render correctly`, () => expect(
      shallow(<NoOffersMessage {...testMocks}/>)
  ).toMatchSnapshot());
});
