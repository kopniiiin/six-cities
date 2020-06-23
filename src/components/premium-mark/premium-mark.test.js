import React from "react";
import {shallow} from "enzyme";

import PremiumMark from "./premium-mark.jsx";

describe(`snapshot test: PremiumMark component`, () => {
  it(`should render correctly`, () => expect(
      shallow(<PremiumMark blockClassName={`block`}/>)
  ).toMatchSnapshot());
});
