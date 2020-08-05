import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

import {City} from "../../types";

import {doNothing} from "../../utils";

import LoginScreen from "./login-screen";

configure({adapter: new Adapter()});

const testMocks = {
  activeCity: City.AMSTERDAM,
  email: `email`,
  password: `4444`,
  onEmailChange: doNothing,
  onPasswordChange: doNothing,
  onSubmit: doNothing
};

describe(`snapshot test: LoginScreen component`, () => {
  it(`should render correctly`, () => expect(
      toJson(shallow(<LoginScreen {...testMocks}><div/></LoginScreen>))
  ).toMatchSnapshot());
});
