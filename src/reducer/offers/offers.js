import {ServerURL} from "../../const.js";

import {extend} from "../../utils.js";

import {convertOffersFromServerFormat} from "../../adapters/offers.js";

const initialState = {
  offers: []
};

export const ActionType = {
  SET_OFFERS: `SET_OFFERS`
};

export const ActionCreator = {
  setOffers: (offers) => ({type: ActionType.SET_OFFERS, payload: offers})
};

export const Operation = {
  loadOffers: () => (dispatch, getState, api) => api.get(ServerURL.OFFERS)
    .then((response) => dispatch(ActionCreator.setOffers(convertOffersFromServerFormat(response.data))))
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_OFFERS:
      return extend(state, {offers: action.payload});
  }

  return state;
};
