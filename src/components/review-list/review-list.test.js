import React from "react";
import {shallow} from "enzyme";

import {AuthorizationStatus} from "../../const.js";

import {extend} from "../../utils.js";

import ReviewList from "./review-list.jsx";

import testMocks from "../../test-mocks/review-list.js";

describe(`snapshot test: ReviewList component`, () => {
  it(`should render correctly`, () => expect(
      shallow(<ReviewList {...testMocks}/>)
  ).toMatchSnapshot());

  it(`should render ReviewForm`, () => expect(
      shallow(<ReviewList {...extend(testMocks, {authorizationStatus: AuthorizationStatus.AUTHORIZED})}/>)
  ).toMatchSnapshot());
});
