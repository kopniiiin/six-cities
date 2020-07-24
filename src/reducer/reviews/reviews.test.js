import MockAdapter from "axios-mock-adapter";

import {ServerURL, ServerResponseStatus} from "../../const.js";

import createAPI from "../../api.js";

import {ActionType, ActionCreator, Operation, reducer} from "./reviews.js";

describe(`ReviewsActionCreator`, () => {
  it(`should create SET_REVIEWS action`, () => {
    const reviews = [`review`];

    expect(ActionCreator.setReviews(reviews)).toEqual({
      type: ActionType.SET_REVIEWS,
      payload: reviews
    });
  });
});

describe(`ReviewsOperation`, () => {
  const offerId = `4`;
  const reviews = [];
  const api = createAPI(() => {});

  new MockAdapter(api)
    .onGet(`${ServerURL.REVIEWS}/${offerId}`).reply(ServerResponseStatus.OK, reviews)
    .onPost(`${ServerURL.REVIEWS}/${offerId}`).reply(ServerResponseStatus.OK, reviews);

  it(`should load reviews`, () => {
    const dispatch = jest.fn();

    Operation.loadReviews(offerId)(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {type: ActionType.SET_REVIEWS, payload: reviews});
      });
  });

  it(`should send review`, () => {
    const dispatch = jest.fn();

    Operation.sendReview(offerId, {})(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {type: ActionType.SET_REVIEWS, payload: reviews});
      });
  });
});

describe(`reviewsReducer`, () => {
  it(`should return initialState`, () => expect(reducer(undefined, {})).toEqual({reviews: []}));

  it(`should set reviews`, () => {
    const reviews = [`review`];

    expect(reducer(undefined, {type: ActionType.SET_REVIEWS, payload: reviews})).toEqual({reviews});
  });
});
