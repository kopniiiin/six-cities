import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

import withActiveState from "./with-active-state";

configure({adapter: new Adapter()});

const MockComponent = () => <div/>;
const MockComponentWithActiveState = withActiveState(MockComponent);

describe(`e2e test: withActiveState HOC`, () => {
  it(`should pass activeState`, () => expect(
      shallow(<MockComponentWithActiveState/>).props().isActive
  ).toBe(false));

  it(`should change activeState`, () => {
    const wrapper = shallow(<MockComponentWithActiveState/>);
    const activeState = wrapper.props().isActive;
    wrapper.props().onActiveStateChange();
    expect(wrapper.props().isActive).toBe(!activeState);
  });
});
