import React from "react";
import {shallow} from "enzyme";

import StarRating from "./star-rating.jsx";

import testMocks from "../../test-mocks/star-rating.js";

describe(`snapshot test: StarRating component`, () => {
  it(`should render correctly`, () => expect(
      shallow(<StarRating {...testMocks}/>)
  ).toMatchSnapshot());

  it(`should render value`, () => expect(
      shallow(<StarRating {...Object.assign({}, testMocks, {isValueShown: true})}/>)
  ).toMatchSnapshot());
});
