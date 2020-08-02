import React from "react";
import {shallow} from "enzyme";

import {OfferScreen} from "./offer-screen.jsx";

import testMocks from "../../test-mocks/offer-screen.js";

describe(`snapshot test: OfferScreen component`, () => {
  it(`should render correctly`, () => expect(
      shallow(<OfferScreen {...testMocks}><div/></OfferScreen>)
  ).toMatchSnapshot());
});
