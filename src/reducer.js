import {SortType} from "./const.js";

import {extend} from "./utils.js";

import offers from "./mocks/offers.js";

const initialState = {
  activeCity: offers[0].city,
  activeSortType: SortType.POPULAR,
  offers
};

export const ActionType = {
  SET_ACTIVE_CITY: `SET_ACTIVE_CITY`,
  SET_ACTIVE_SORT_TYPE: `SET_ACTIVE_SORT_TYPE`
};

export const ActionCreator = {
  setActiveCity: (city) => ({type: ActionType.SET_ACTIVE_CITY, payload: city}),
  setActiveSortType: (sortType) => ({type: ActionType.SET_ACTIVE_SORT_TYPE, payload: sortType})
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_ACTIVE_CITY:
      return extend(state, {activeCity: action.payload});
    case ActionType.SET_ACTIVE_SORT_TYPE:
      return extend(state, {activeSortType: action.payload});
  }

  return state;
};
