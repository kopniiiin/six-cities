import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

import {AuthorizationStatus} from "../../types";

import {doNothing, extend} from "../../utils";

import ReviewList from "./review-list";

configure({adapter: new Adapter()});

const testMocks = {
  authorizationStatus: AuthorizationStatus.UNAUTHORIZED,
  reviews: [{
    id: `4`,
    date: `2020-04-04`,
    text: `Good`,
    rating: 4,
    user: {name: `User`, photo: `photo`}
  }],
  isReviewFormDisabled: false,
  onReviewFormSubmit: doNothing
};

describe(`snapshot test: ReviewList component`, () => {
  it(`should render correctly`, () => expect(
      toJson(shallow(<ReviewList {...testMocks}/>))
  ).toMatchSnapshot());

  it(`should render ReviewForm`, () => expect(
      toJson(shallow(<ReviewList {...extend(testMocks, {authorizationStatus: AuthorizationStatus.AUTHORIZED})}/>))
  ).toMatchSnapshot());
});
