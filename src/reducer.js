import offers from "./mocks/offers.js";

const initialState = {
  activeCity: offers[0].city,
  offers
};

export const ActionType = {
  SET_ACTIVE_CITY: `set active city`
};

export const ActionCreator = {
  setActiveCity: (city) => ({type: ActionType.SET_ACTIVE_CITY, payload: city})
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_ACTIVE_CITY:
      return Object.assign({}, state, {activeCity: action.payload});
  }

  return state;
};
