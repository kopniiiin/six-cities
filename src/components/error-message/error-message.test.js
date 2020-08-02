import React from "react";
import {shallow} from "enzyme";

import ErrorMessage from "./error-message.jsx";

import testMocks from "../../test-mocks/error-message.js";

describe(`snapshot test: ErrorMessage component`, () => {
  it(`should render correctly`, () => expect(
      shallow(<ErrorMessage {...testMocks}/>)
  ).toMatchSnapshot());
});
