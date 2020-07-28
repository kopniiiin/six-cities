import MockAdapter from "axios-mock-adapter";

import {ServerURL, ServerResponseStatus} from "../../const.js";

import createAPI from "../../api.js";

import {ActionType, ActionCreator, Operation, reducer} from "./offers.js";

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
});

describe(`OffersOperation`, () => {
  const offerId = `4`;
  const offers = [];
  const nearOffers = [];
  const api = createAPI(() => {});

  new MockAdapter(api)
    .onGet(ServerURL.OFFERS).reply(ServerResponseStatus.OK, offers)
    .onGet(`${ServerURL.OFFERS}/${offerId}/nearby`).reply(ServerResponseStatus.OK, nearOffers);

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
});

describe.skip(`offersReducer`, () => {
  it(`should return initialState`, () => expect(reducer(undefined, {})).toEqual({
    offers: [],
    nearOffers: []
  }));

  it(`should set offers`, () => {
    const offers = [`offer`];

    expect(reducer(undefined, {type: ActionType.SET_OFFERS, payload: offers})).toEqual({
      offers,
      nearOffers: []
    });
  });

  it(`should set nearOffers`, () => {
    const nearOffers = [`offer`];

    expect(reducer(undefined, {type: ActionType.SET_NEAR_OFFERS, payload: nearOffers})).toEqual({
      offers: [],
      nearOffers
    });
  });
});
