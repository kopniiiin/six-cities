import React from "react";
import {shallow} from "enzyme";

import Map from "./map.jsx";

import testMocks from "../../test-mocks/map.js";

describe(`snapshot test: Map component`, () => {
  it(`should render correctly`, () => expect(
      shallow(<Map {...testMocks}/>)
  ).toMatchSnapshot());
});
