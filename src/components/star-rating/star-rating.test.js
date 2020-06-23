import React from "react";
import {shallow} from "enzyme";

import StarRating, {testProps} from "./star-rating.jsx";

describe(`snapshot test: StarRating component`, () => {
  it(`should render correctly`, () => expect(
      shallow(<StarRating {...testProps}/>)
  ).toMatchSnapshot());

  it(`should render value`, () => expect(
      shallow(<StarRating {...Object.assign({}, testProps, {isValueShown: true})}/>)
  ).toMatchSnapshot());
});
