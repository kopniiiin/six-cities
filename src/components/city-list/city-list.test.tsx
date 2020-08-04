import React from "react";
import {shallow} from "enzyme";

import CityList from "./city-list";

import testMocks from "../../test-mocks/city-list";

describe(`snapshot test: CityList component`, () => {
  it(`should render correctly`, () => expect(
      shallow(<CityList {...testMocks}/>)
  ).toMatchSnapshot());
});
