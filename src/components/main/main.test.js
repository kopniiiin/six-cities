import React from "react";
import {shallow} from "enzyme";

import Main from "./main.jsx";

import testMocks from "../../test-mocks/main.js";

describe(`snapshot test: Main component`, () => {
  it(`should render correctly`, () => expect(
      shallow(<Main {...testMocks}/>)
  ).toMatchSnapshot());
});
