import React from "react";
import {shallow} from "enzyme";

import {SortType} from "../../const";

import {extend} from "../../utils";

import Sort from "./sort";

import testMocks from "../../test-mocks/sort";

describe(`e2e test: Sort component`, () => {
  it(`should call onActiveStateChange`, () => {
    const onActiveStateChange = jest.fn();

    shallow(<Sort {...extend(testMocks, {onActiveStateChange})}/>)
      .find(`.places__sorting-type`).simulate(`click`);

    expect(onActiveStateChange).toHaveBeenCalledTimes(1);
  });

  it(`should call onTypeChange with type`, () => {
    const onTypeChange = jest.fn();

    shallow(<Sort {...extend(testMocks, {onTypeChange})}/>)
      .find(`.places__option`).at(0).simulate(`click`);

    expect(onTypeChange).toHaveBeenCalledTimes(1);
    expect(onTypeChange.mock.calls[0][0]).toBe(SortType.POPULAR);
  });
});
