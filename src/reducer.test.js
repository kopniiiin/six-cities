import {ActionType, ActionCreator, reducer} from "./reducer.js";

import offers from "./mocks/offers.js";

describe(`ActionCreator`, () => {
  it(`should create "set active city" action`, () => {
    const city = `city`;

    expect(ActionCreator.setActiveCity(city)).toEqual({
      type: ActionType.SET_ACTIVE_CITY,
      payload: city
    });
  });
});

describe(`reducer`, () => {
  it(`should return initial state`, () => expect(reducer(undefined, {})).toEqual({
    activeCity: offers[0].city,
    offers
  }));

  it(`should set active city`, () => {
    const city = `city`;

    expect(reducer(undefined, {type: ActionType.SET_ACTIVE_CITY, payload: city})).toEqual({
      activeCity: city,
      offers
    });
  });
});
