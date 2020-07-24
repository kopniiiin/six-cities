import {ServerURL} from "../../const.js";

import {extend} from "../../utils.js";

import {convertOffersFromServerFormat} from "../../adapters.js";

const initialState = {
  offers: [],
  nearOffers: []
};

export const ActionType = {
  SET_OFFERS: `SET_OFFERS`,
  SET_NEAR_OFFERS: `SET_NEAR_OFFERS`
};

export const ActionCreator = {
  setOffers: (offers) => ({type: ActionType.SET_OFFERS, payload: offers}),
  setNearOffers: (nearOffers) => ({type: ActionType.SET_NEAR_OFFERS, payload: nearOffers})
};

export const Operation = {
  loadOffers: () => (dispatch, getState, api) => api.get(ServerURL.OFFERS)
    .then(({data}) => dispatch(ActionCreator.setOffers(convertOffersFromServerFormat(data)))),

  loadNearOffers: (offerId) => (dispatch, getState, api) => api.get(`${ServerURL.OFFERS}/${offerId}/nearby`)
    .then(({data}) => dispatch(ActionCreator.setNearOffers(convertOffersFromServerFormat(data))))
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_OFFERS:
      return extend(state, {offers: action.payload});
    case ActionType.SET_NEAR_OFFERS:
      return extend(state, {nearOffers: action.payload});
  }

  return state;
};
