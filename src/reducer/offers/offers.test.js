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
});

describe(`OffersOperation`, () => {
  it(`should load offers`, () => {
    const offers = [];
    const dispatch = jest.fn();

    const api = createAPI(() => {});
    new MockAdapter(api).onGet(ServerURL.OFFERS).reply(ServerResponseStatus.OK, offers);

    Operation.loadOffers()(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {type: ActionType.SET_OFFERS, payload: offers});
      });
  });
});

describe(`offersReducer`, () => {
  it(`should return initialState`, () => expect(reducer(undefined, {})).toEqual({offers: []}));

  it(`should set offers`, () => {
    const offers = [`offer`];

    expect(reducer(undefined, {type: ActionType.SET_OFFERS, payload: offers})).toEqual({offers});
  });
});
