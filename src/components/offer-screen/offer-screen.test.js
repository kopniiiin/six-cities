import React from "react";
import {shallow} from "enzyme";

import OfferScreen, {testProps} from "./offer-screen.jsx";

describe(`snapshot test: OfferScreen component`, () => {
  it(`should render correctly`, () => expect(
      shallow(<OfferScreen {...testProps}/>)
  ).toMatchSnapshot());

  it(`should render premium mark`, () => expect(
      shallow(<OfferScreen {...Object.assign({}, testProps, {isPremium: true})}/>)
  ).toMatchSnapshot());
});
