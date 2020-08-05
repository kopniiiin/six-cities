import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

import {SortType} from "../../types";

import {doNothing, extend} from "../../utils";

import Sort from "./sort";

configure({adapter: new Adapter()});

const testMocks = {
  isActive: false,
  onActiveStateChange: doNothing,
  activeType: SortType.POPULAR,
  onTypeChange: doNothing
};

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
