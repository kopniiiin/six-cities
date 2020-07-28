import React from "react";
import {shallow} from "enzyme";

import ReviewForm from "./review-form.jsx";

import testMocks from "../../test-mocks/review-form.js";

describe(`snapshot test: ReviewForm component`, () => {
  it(`should render correctly`, () => expect(
      shallow(<ReviewForm {...testMocks}/>)
  ).toMatchSnapshot());
});
