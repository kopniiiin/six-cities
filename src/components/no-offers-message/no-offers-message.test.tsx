import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

import {City} from "../../types";

import NoOffersMessage from "./no-offers-message";

configure({adapter: new Adapter()});

const testMocks = {activeCity: City.AMSTERDAM};

describe(`snapshot test: NoOffersMessage component`, () => {
  it(`should render correctly`, () => expect(
      toJson(shallow(<NoOffersMessage {...testMocks}/>))
  ).toMatchSnapshot());
});
