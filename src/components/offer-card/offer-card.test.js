import React from "react";
import {shallow} from "enzyme";

import {extend} from "../../utils";

import OfferCard from "./offer-card";

import testMocks from "../../test-mocks/offer-card";

describe(`snapshot test: OfferCard component`, () => {
  it(`should render correctly`, () => expect(
      shallow(<OfferCard {...testMocks}/>)
  ).toMatchSnapshot());

  it(`should render premium mark`, () => expect(
      shallow(<OfferCard {...extend(testMocks, {isPremium: true})}/>)
  ).toMatchSnapshot());
});
