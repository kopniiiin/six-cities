import React from "react";
import {shallow} from "enzyme";

import OfferCard, {testProps} from "./offer-card.jsx";

describe(`snapshot test: OfferCard component`, () => {
  it(`should render correctly`, () => expect(
      shallow(<OfferCard {...testProps}/>)
  ).toMatchSnapshot());

  it(`should render premium mark`, () => expect(
      shallow(<OfferCard {...Object.assign({}, testProps, {isPremium: true})}/>)
  ).toMatchSnapshot());
});
