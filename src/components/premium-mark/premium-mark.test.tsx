import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

import PremiumMark from "./premium-mark";

configure({adapter: new Adapter()});

const testMocks = {blockClassName: `block`};

describe(`snapshot test: PremiumMark component`, () => {
  it(`should render correctly`, () => expect(
      toJson(shallow(<PremiumMark {...testMocks}/>))
  ).toMatchSnapshot());
});
