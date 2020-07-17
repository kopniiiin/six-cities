import {City, DEFAULT_CITY, SortType, DEFAULT_SORT_TYPE} from "../../const.js";

import {ActionType, ActionCreator, reducer} from "./app.js";

describe(`AppActionCreator`, () => {
  it(`should create SET_ACTIVE_CITY action`, () => {
    const city = City.AMSTERDAM;

    expect(ActionCreator.setActiveCity(city)).toEqual({
      type: ActionType.SET_ACTIVE_CITY,
      payload: city
    });
  });

  it(`should create SET_ACTIVE_SORT_TYPE action`, () => {
    const sortType = SortType.TOP_RATED;

    expect(ActionCreator.setActiveSortType(sortType)).toEqual({
      type: ActionType.SET_ACTIVE_SORT_TYPE,
      payload: sortType
    });
  });
});

describe(`appReducer`, () => {
  it(`should return initialState`, () => expect(reducer(undefined, {})).toEqual({
    activeCity: DEFAULT_CITY,
    activeSortType: DEFAULT_SORT_TYPE
  }));

  it(`should set activeCity`, () => {
    const city = City.AMSTERDAM;

    expect(reducer(undefined, {type: ActionType.SET_ACTIVE_CITY, payload: city})).toEqual({
      activeCity: city,
      activeSortType: DEFAULT_SORT_TYPE
    });
  });

  it(`should set activeSortType`, () => {
    const sortType = SortType.TOP_RATED;

    expect(reducer(undefined, {type: ActionType.SET_ACTIVE_SORT_TYPE, payload: sortType})).toEqual({
      activeCity: DEFAULT_CITY,
      activeSortType: sortType
    });
  });
});
