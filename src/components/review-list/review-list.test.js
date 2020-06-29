import React from "react";
import {shallow} from "enzyme";

import ReviewList from "./review-list.jsx";

import testMocks from "../../test-mocks/review-list.js";

describe(`snapshot test: ReviewList component`, () => {
  it(`should render correctly`, () => expect(
      shallow(<ReviewList {...testMocks}/>)
  ).toMatchSnapshot());
});
