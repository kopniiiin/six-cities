import React from "react";
import {shallow} from "enzyme";

import {City} from "../../const";

import {extend} from "../../utils";

import CityList from "./city-list";

import testMocks from "../../test-mocks/city-list";

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
