import React from "react";
import {shallow} from "enzyme";

import {extend} from "../../utils.js";

import CityList from "./city-list.jsx";

import testMocks from "../../test-mocks/city-list.js";

describe(`e2e test: CityList component`, () => {
  it(`should call onClick with city`, () => {
    const city = `city`;
    const onClick = jest.fn();

    shallow(<CityList {...extend(testMocks, {cities: [city], onClick})}/>)
      .find(`.tabs__item`).simulate(`click`);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick.mock.calls[0][0]).toBe(city);
  });
});
