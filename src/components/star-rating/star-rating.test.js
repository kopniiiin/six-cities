import React from "react";
import {shallow} from "enzyme";

import {extend} from "../../utils.js";

import StarRating from "./star-rating.jsx";

import testMocks from "../../test-mocks/star-rating.js";

describe(`snapshot test: StarRating component`, () => {
  it(`should render correctly`, () => expect(
      shallow(<StarRating {...testMocks}/>)
  ).toMatchSnapshot());

  it(`should render value`, () => expect(
      shallow(<StarRating {...extend(testMocks, {isValueShown: true})}/>)
  ).toMatchSnapshot());
});
