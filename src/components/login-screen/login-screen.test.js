import React from "react";
import {shallow} from "enzyme";

import LoginScreen from "./login-screen.jsx";

import testMocks from "../../test-mocks/login-screen.js";

describe(`snapshot test: LoginScreen component`, () => {
  it(`should render correctly`, () => expect(
      shallow(<LoginScreen {...testMocks}><div/></LoginScreen>)
  ).toMatchSnapshot());
});
