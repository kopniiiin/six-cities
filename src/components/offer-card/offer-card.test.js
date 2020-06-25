import React from "react";
import {shallow} from "enzyme";

import OfferCard from "./offer-card.jsx";

import testMocks from "../../test-mocks/offer-card.js";

describe(`snapshot test: OfferCard component`, () => {
  it(`should render correctly`, () => expect(
      shallow(<OfferCard {...testMocks}/>)
  ).toMatchSnapshot());

  it(`should render premium mark`, () => expect(
      shallow(<OfferCard {...Object.assign({}, testMocks, {isPremium: true})}/>)
  ).toMatchSnapshot());
});
