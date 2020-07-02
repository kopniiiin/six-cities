import React from "react";
import {shallow} from "enzyme";

import CityList from "./city-list.jsx";

import testMocks from "../../test-mocks/city-list.js";

describe(`snapshot test: CityList component`, () => {
  it(`should render correctly`, () => expect(
      shallow(<CityList {...testMocks}/>)
  ).toMatchSnapshot());
});
