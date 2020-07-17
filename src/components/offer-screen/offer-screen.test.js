import React from "react";
import {shallow} from "enzyme";

import {extend} from "../../utils.js";

import OfferScreen from "./offer-screen.jsx";

import testMocks from "../../test-mocks/offer-screen.js";

describe.skip(`snapshot test: OfferScreen component`, () => {
  it(`should render correctly`, () => expect(
      shallow(<OfferScreen {...testMocks}/>)
  ).toMatchSnapshot());

  it(`should render premium mark`, () => expect(
      shallow(<OfferScreen {...extend(testMocks, {isPremium: true})}/>)
  ).toMatchSnapshot());
});
