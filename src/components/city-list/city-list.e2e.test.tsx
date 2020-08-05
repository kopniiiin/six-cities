import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

import {City} from "../../types";

import {doNothing, extend} from "../../utils";

import CityList from "./city-list";

configure({adapter: new Adapter()});

const testMocks = {
  activeCity: City.AMSTERDAM,
  onClick: doNothing
};

describe(`e2e test: CityList component`, () => {
  it(`should call onClick with city`, () => {
    const city = City.PARIS;
    const onClick = jest.fn();

    shallow(<CityList {...extend(testMocks, {onClick})}/>)
      .find(`.tabs__item`).at(0).simulate(`click`);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick.mock.calls[0][0]).toBe(city);
  });
});
