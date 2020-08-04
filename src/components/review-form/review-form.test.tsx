import React from "react";
import {shallow} from "enzyme";

import {extend} from "../../utils";

import ReviewForm from "./review-form";

import testMocks from "../../test-mocks/review-form";

describe(`snapshot test: ReviewForm component`, () => {
  it(`should render correctly`, () => expect(
      shallow(<ReviewForm {...testMocks}/>)
  ).toMatchSnapshot());

  it(`should render disabled`, () => expect(
      shallow(<ReviewForm {...extend(testMocks, {disabled: true})}/>)
  ).toMatchSnapshot());

  it(`should render error`, () => expect(
      shallow(<ReviewForm {...extend(testMocks, {error: `error`})}/>)
  ).toMatchSnapshot());
});
