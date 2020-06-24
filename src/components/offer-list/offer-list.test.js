import React from "react";
import {shallow} from "enzyme";

import OfferList from "./offer-list.jsx";

import testMocks from "../../test-mocks/offer-list.js";

describe(`snapshot test: OfferList component`, () => {
  it(`should render correctly`, () => expect(
      shallow(<OfferList {...testMocks}/>)
  ).toMatchSnapshot());
});
