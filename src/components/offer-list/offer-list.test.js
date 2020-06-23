import React from "react";
import {shallow} from "enzyme";

import OfferList, {testProps} from "./offer-list.jsx";

describe(`snapshot test: OfferList component`, () => {
  it(`should render correctly`, () => expect(
      shallow(<OfferList {...testProps}/>)
  ).toMatchSnapshot());
});
