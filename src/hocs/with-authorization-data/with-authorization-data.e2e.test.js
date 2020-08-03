import React from "react";
import {shallow} from "enzyme";

import {extend} from "../../utils";

import withAuthorizationData from "./with-authorization-data";

import testMocks from "../../test-mocks/with-authorization-data";

const MockComponent = () => <div/>;
const MockComponentWithAuthorizationData = withAuthorizationData(MockComponent);

describe(`e2e test: withAuthorizationData HOC`, () => {
  it(`should pass email`, () => expect(
      shallow(<MockComponentWithAuthorizationData {...testMocks}/>).props().email
  ).toBe(``));

  it(`should pass password`, () => expect(
      shallow(<MockComponentWithAuthorizationData {...testMocks}/>).props().password
  ).toBe(``));

  it(`should change email`, () => {
    const email = `email`;
    const wrapper = shallow(<MockComponentWithAuthorizationData {...testMocks}/>);
    wrapper.props().onEmailChange(email);
    expect(wrapper.props().email).toBe(email);
  });

  it(`should change password`, () => {
    const password = `4444`;
    const wrapper = shallow(<MockComponentWithAuthorizationData {...testMocks}/>);
    wrapper.props().onPasswordChange(password);
    expect(wrapper.props().password).toBe(password);
  });

  it(`should call onSubmit with data`, () => {
    const email = `email`;
    const password = `4444`;
    const onSubmit = jest.fn();
    const wrapper = shallow(<MockComponentWithAuthorizationData {...extend(testMocks, {onSubmit})}/>);
    wrapper.props().onEmailChange(email);
    wrapper.props().onPasswordChange(password);
    wrapper.props().onSubmit();

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenNthCalledWith(1, {email, password});
  });
});
