import {SortType} from "./const.js";

import {ActionType, ActionCreator, reducer} from "./reducer.js";

import offers from "./mocks/offers.js";

describe(`ActionCreator`, () => {
  it(`should create SET_ACTIVE_CITY action`, () => {
    const city = `city`;

    expect(ActionCreator.setActiveCity(city)).toEqual({
      type: ActionType.SET_ACTIVE_CITY,
      payload: city
    });
  });

  it(`should create SET_ACTIVE_SORT_TYPE action`, () => {
    const sortType = SortType.POPULAR;

    expect(ActionCreator.setActiveSortType(sortType)).toEqual({
      type: ActionType.SET_ACTIVE_SORT_TYPE,
      payload: sortType
    });
  });
});

describe(`reducer`, () => {
  it(`should return initial state`, () => expect(reducer(undefined, {})).toEqual({
    activeCity: offers[0].city,
    activeSortType: SortType.POPULAR,
    offers
  }));

  it(`should set active city`, () => {
    const city = `city`;

    expect(reducer(undefined, {type: ActionType.SET_ACTIVE_CITY, payload: city})).toEqual({
      activeCity: city,
      activeSortType: SortType.POPULAR,
      offers
    });
  });

  it(`should set active sortType`, () => {
    const sortType = SortType.TOP_RATED;

    expect(reducer(undefined, {type: ActionType.SET_ACTIVE_SORT_TYPE, payload: sortType})).toEqual({
      activeCity: offers[0].city,
      activeSortType: sortType,
      offers
    });
  });
});
