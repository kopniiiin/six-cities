import {ServerURL, ERROR_TIMEOUT} from "../../const";

import {extend, pushElement, replaceElement, removeElement} from "../../utils";

import {getOffers, getNearOffers, getFavoriteOffers, getOfferWithId} from "./selectors";

import {convertOffersFromServerFormat} from "../../adapters";

let errorTimeout;

const temporarilySetError = (dispatch, error) => {
  clearTimeout(errorTimeout);
  dispatch(ActionCreator.setError(error));
  errorTimeout = setTimeout(() => dispatch(ActionCreator.removeError()), ERROR_TIMEOUT);
};

const initialState = {
  offers: [],
  nearOffers: [],
  favoriteOffers: [],
  error: null
};

export const ActionType = {
  SET_OFFERS: `SET_OFFERS`,
  SET_NEAR_OFFERS: `SET_NEAR_OFFERS`,
  SET_FAVORITE_OFFERS: `SET_FAVORITE_OFFERS`,
  SET_ERROR: `SET_ERROR`,
  REMOVE_ERROR: `REMOVE_ERROR`
};

export const ActionCreator = {
  setOffers: (offers) => ({type: ActionType.SET_OFFERS, payload: offers}),
  setNearOffers: (nearOffers) => ({type: ActionType.SET_NEAR_OFFERS, payload: nearOffers}),
  setFavoriteOffers: (favoriteOffers) => ({type: ActionType.SET_FAVORITE_OFFERS, payload: favoriteOffers}),
  setError: (error) => ({type: ActionType.SET_ERROR, payload: error}),
  removeError: () => ({type: ActionType.REMOVE_ERROR})
};

export const Operation = {
  loadOffers: () => (dispatch, getState, api) => api.get(ServerURL.OFFERS)
    .then(({data}) => dispatch(ActionCreator.setOffers(convertOffersFromServerFormat(data))))
    .catch(() => temporarilySetError(dispatch, `offers loading error`)),

  loadNearOffers: (offerId) => (dispatch, getState, api) => api.get(`${ServerURL.OFFERS}/${offerId}/nearby`)
    .then(({data}) => dispatch(ActionCreator.setNearOffers(convertOffersFromServerFormat(data))))
    .catch(() => temporarilySetError(dispatch, `near offers loading error`)),

  loadFavoriteOffers: () => (dispatch, getState, api) => api.get(ServerURL.FAVORITES)
    .then(({data}) => dispatch(ActionCreator.setFavoriteOffers(convertOffersFromServerFormat(data))))
    .catch(() => temporarilySetError(dispatch, `favorite offers loading error`)),

  toggleFavoriteness: (offerId) => (dispatch, getState, api) => {
    const oldOffer = getOfferWithId(getState(), offerId);
    const {isFavorite: oldFavoriteness} = oldOffer;
    const newFavoriteness = !oldFavoriteness;
    const newOffer = extend(oldOffer, {isFavorite: newFavoriteness});

    api.post(`${ServerURL.FAVORITES}/${offerId}/${Number(newFavoriteness)}`)
      .then(() => {
        const state = getState();
        const offers = getOffers(state);
        const nearOffers = getNearOffers(state);
        const favoriteOffers = getFavoriteOffers(state);

        const finder = ({id}) => id === offerId;
        const offersIndex = offers.findIndex(finder);
        const nearOffersIndex = nearOffers.findIndex(finder);
        const favoriteOffersIndex = favoriteOffers.findIndex(finder);

        dispatch(ActionCreator.setOffers(replaceElement(offers, newOffer, offersIndex)));

        if (nearOffersIndex >= 0) {
          dispatch(ActionCreator.setNearOffers(replaceElement(nearOffers, newOffer, nearOffersIndex)));
        }

        if (favoriteOffersIndex >= 0) {
          dispatch(ActionCreator.setFavoriteOffers(removeElement(favoriteOffers, favoriteOffersIndex)));
        } else {
          dispatch(ActionCreator.setFavoriteOffers(pushElement(favoriteOffers, newOffer)));
        }
      });
  }
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_OFFERS:
      return extend(state, {offers: action.payload});
    case ActionType.SET_NEAR_OFFERS:
      return extend(state, {nearOffers: action.payload});
    case ActionType.SET_FAVORITE_OFFERS:
      return extend(state, {favoriteOffers: action.payload});
    case ActionType.SET_ERROR:
      return extend(state, {error: action.payload});
    case ActionType.REMOVE_ERROR:
      return extend(state, {error: null});
  }

  return state;
};
