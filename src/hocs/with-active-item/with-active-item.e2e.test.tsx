import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

import withActiveItem from "./with-active-item";

configure({adapter: new Adapter()});

const MockComponent = () => <div/>;
const MockComponentWithActiveItem = withActiveItem(MockComponent);

describe(`e2e test: withActiveItem HOC`, () => {
  it(`should pass activeItem`, () => expect(
      shallow(<MockComponentWithActiveItem/>).props().activeItem
  ).toBe(null));

  it(`should change activeItem`, () => {
    const activeItem = `4`;
    const wrapper = shallow(<MockComponentWithActiveItem/>);
    wrapper.props().onActiveItemChange(activeItem);
    expect(wrapper.props().activeItem).toBe(activeItem);
  });

  it(`should remove activeItem`, () => {
    const wrapper = shallow(<MockComponentWithActiveItem/>);
    wrapper.props().onActiveItemChange(`4`);
    wrapper.props().onActiveItemRemoval();
    expect(wrapper.props().activeItem).toBe(null);
  });
});
