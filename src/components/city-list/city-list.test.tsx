import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

import {City} from "../../types";

import {doNothing} from "../../utils";

import CityList from "./city-list";

configure({adapter: new Adapter()});

const testMocks = {
  activeCity: City.AMSTERDAM,
  onClick: doNothing
};

describe(`snapshot test: CityList component`, () => {
  it(`should render correctly`, () => expect(
      toJson(shallow(<CityList {...testMocks}/>))
  ).toMatchSnapshot());
});
