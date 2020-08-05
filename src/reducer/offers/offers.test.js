import MockAdapter from "axios-mock-adapter";

import {ServerURL, ServerResponseStatus} from "../../types";

import createAPI from "../../api";

import {ActionType, ActionCreator, Operation, reducer} from "./offers";

describe(`OffersActionCreator`, () => {
  it(`should create SET_OFFERS action`, () => {
    const offers = [`offer`];

    expect(ActionCreator.setOffers(offers)).toEqual({
      type: ActionType.SET_OFFERS,
      payload: offers
    });
  });

  it(`should create SET_NEAR_OFFERS action`, () => {
    const nearOffers = [`offer`];

    expect(ActionCreator.setNearOffers(nearOffers)).toEqual({
      type: ActionType.SET_NEAR_OFFERS,
      payload: nearOffers
    });
  });

  it(`should create SET_FAVORITE_OFFERS action`, () => {
    const favoriteOffers = [`offer`];

    expect(ActionCreator.setFavoriteOffers(favoriteOffers)).toEqual({
      type: ActionType.SET_FAVORITE_OFFERS,
      payload: favoriteOffers
    });
  });

  it(`should create SET_ERROR action`, () => {
    const error = `error`;

    expect(ActionCreator.setError(error)).toEqual({
      type: ActionType.SET_ERROR,
      payload: error
    });
  });

  it(`should create REMOVE_ERROR action`, () => expect(ActionCreator.removeError()).toEqual({type: ActionType.REMOVE_ERROR}));
});

describe(`OffersOperation`, () => {
  const offerId = `4`;
  const offers = [];
  const nearOffers = [];
  const favoriteOffers = [];
  const api = createAPI(() => {});

  new MockAdapter(api)
    .onGet(ServerURL.OFFERS).reply(ServerResponseStatus.OK, offers)
    .onGet(`${ServerURL.OFFERS}/${offerId}/nearby`).reply(ServerResponseStatus.OK, nearOffers)
    .onGet(ServerURL.FAVORITES).reply(ServerResponseStatus.OK, favoriteOffers);

  it(`should load offers`, () => {
    const dispatch = jest.fn();

    Operation.loadOffers()(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {type: ActionType.SET_OFFERS, payload: offers});
      });
  });

  it(`should load nearOffers`, () => {
    const dispatch = jest.fn();

    Operation.loadNearOffers(offerId)(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {type: ActionType.SET_NEAR_OFFERS, payload: nearOffers});
      });
  });

  it(`should load favoriteOffers`, () => {
    const dispatch = jest.fn();

    Operation.loadFavoriteOffers()(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {type: ActionType.SET_FAVORITE_OFFERS, payload: favoriteOffers});
      });
  });
});

describe(`offersReducer`, () => {
  it(`should return initialState`, () => expect(reducer(undefined, {})).toEqual({
    offers: [],
    nearOffers: [],
    favoriteOffers: [],
    error: null
  }));

  it(`should set offers`, () => {
    const offers = [`offer`];

    expect(reducer(undefined, {type: ActionType.SET_OFFERS, payload: offers})).toEqual({
      offers,
      nearOffers: [],
      favoriteOffers: [],
      error: null
    });
  });

  it(`should set nearOffers`, () => {
    const nearOffers = [`offer`];

    expect(reducer(undefined, {type: ActionType.SET_NEAR_OFFERS, payload: nearOffers})).toEqual({
      offers: [],
      nearOffers,
      favoriteOffers: [],
      error: null
    });
  });

  it(`should set favoriteOffers`, () => {
    const favoriteOffers = [`offer`];

    expect(reducer(undefined, {type: ActionType.SET_FAVORITE_OFFERS, payload: favoriteOffers})).toEqual({
      offers: [],
      nearOffers: [],
      favoriteOffers,
      error: null
    });
  });

  it(`should set error`, () => {
    const error = `error`;

    expect(reducer(undefined, {type: ActionType.SET_ERROR, payload: error})).toEqual({
      offers: [],
      nearOffers: [],
      favoriteOffers: [],
      error
    });
  });

  it(`should remove error`, () => expect(reducer(undefined, {type: ActionType.REMOVE_ERROR})).toEqual({
    offers: [],
    nearOffers: [],
    favoriteOffers: [],
    error: null
  }));
});
