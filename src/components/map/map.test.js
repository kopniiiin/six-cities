import React from "react";
import {shallow} from "enzyme";

import Map from "./map";

import testMocks from "../../test-mocks/map";

describe(`snapshot test: Map component`, () => {
  it(`should render correctly`, () => expect(
      shallow(<Map {...testMocks}/>)
  ).toMatchSnapshot());
});
