import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

import {City} from "../../types";

import {doNothing, extend} from "../../utils";

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

describe(`e2e test: LoginScreen component`, () => {
  it(`should call onEmailChange with email`, () => {
    const email = `email`;
    const onEmailChange = jest.fn();

    shallow(<LoginScreen {...extend(testMocks, {onEmailChange})}><div/></LoginScreen>)
      .find(`.login__input[type="email"]`).simulate(`change`, {target: {value: email}});

    expect(onEmailChange).toHaveBeenCalledTimes(1);
    expect(onEmailChange).toHaveBeenNthCalledWith(1, email);
  });

  it(`should call onPasswordChange with password`, () => {
    const password = `4444`;
    const onPasswordChange = jest.fn();

    shallow(<LoginScreen {...extend(testMocks, {onPasswordChange})}><div/></LoginScreen>)
      .find(`.login__input[type="password"]`).simulate(`change`, {target: {value: password}});

    expect(onPasswordChange).toHaveBeenCalledTimes(1);
    expect(onPasswordChange).toHaveBeenNthCalledWith(1, password);
  });

  it(`should call onSubmit with data`, () => {
    const email = `email`;
    const password = `4444`;
    const preventDefault = jest.fn();
    const onSubmit = jest.fn();

    shallow(<LoginScreen {...extend(testMocks, {email, password, onSubmit})}><div/></LoginScreen>)
      .find(`.login__form`).simulate(`submit`, {preventDefault});

    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenNthCalledWith(1, {email, password});
  });
});
