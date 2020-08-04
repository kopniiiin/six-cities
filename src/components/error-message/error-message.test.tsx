import React from "react";
import {shallow} from "enzyme";

import ErrorMessage from "./error-message";

import testMocks from "../../test-mocks/error-message";

describe(`snapshot test: ErrorMessage component`, () => {
  it(`should render correctly`, () => expect(
      shallow(<ErrorMessage {...testMocks}/>)
  ).toMatchSnapshot());
});
