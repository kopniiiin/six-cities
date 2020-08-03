import React from "react";
import {shallow} from "enzyme";

import Review from "./review";

import testMocks from "../../test-mocks/review";

describe(`snapshot test: Review component`, () => {
  it(`should render correctly`, () => expect(
      shallow(<Review {...testMocks}/>)
  ).toMatchSnapshot());
});
