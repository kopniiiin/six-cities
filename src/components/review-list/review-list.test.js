import React from "react";
import {shallow} from "enzyme";

import {AuthorizationStatus} from "../../const";

import {extend} from "../../utils";

import ReviewList from "./review-list";

import testMocks from "../../test-mocks/review-list";

describe(`snapshot test: ReviewList component`, () => {
  it(`should render correctly`, () => expect(
      shallow(<ReviewList {...testMocks}/>)
  ).toMatchSnapshot());

  it(`should render ReviewForm`, () => expect(
      shallow(<ReviewList {...extend(testMocks, {authorizationStatus: AuthorizationStatus.AUTHORIZED})}/>)
  ).toMatchSnapshot());
});
