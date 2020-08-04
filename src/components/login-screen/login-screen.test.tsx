import React from "react";
import {shallow} from "enzyme";

import LoginScreen from "./login-screen";

import testMocks from "../../test-mocks/login-screen";

describe(`snapshot test: LoginScreen component`, () => {
  it(`should render correctly`, () => expect(
      shallow(<LoginScreen {...testMocks}><div/></LoginScreen>)
  ).toMatchSnapshot());
});
