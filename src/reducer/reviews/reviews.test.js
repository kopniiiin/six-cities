import MockAdapter from "axios-mock-adapter";

import {ServerURL, ServerResponseStatus} from "../../types";

import createAPI from "../../api";

import {ActionType, ActionCreator, Operation, reducer} from "./reviews";

describe(`ReviewsActionCreator`, () => {
  it(`should create SET_REVIEWS action`, () => {
    const reviews = [`review`];

    expect(ActionCreator.setReviews(reviews)).toEqual({
      type: ActionType.SET_REVIEWS,
      payload: reviews
    });
  });

  it(`should create SET_REVIEW_SENDING_STATUS action`, () => {
    const isReviewSending = true;

    expect(ActionCreator.setReviewSendingStatus(isReviewSending)).toEqual({
      type: ActionType.SET_REVIEW_SENDING_STATUS,
      payload: isReviewSending
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
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {type: ActionType.SET_REVIEW_SENDING_STATUS, payload: true});
        expect(dispatch).toHaveBeenNthCalledWith(2, {type: ActionType.SET_REVIEWS, payload: reviews});
        expect(dispatch).toHaveBeenNthCalledWith(3, {type: ActionType.SET_REVIEW_SENDING_STATUS, payload: false});
      });
  });
});

describe(`reviewsReducer`, () => {
  it(`should return initialState`, () => expect(reducer(undefined, {})).toEqual({
    reviews: [],
    isReviewSending: false,
    error: null
  }));

  it(`should set reviews`, () => {
    const reviews = [`review`];

    expect(reducer(undefined, {type: ActionType.SET_REVIEWS, payload: reviews})).toEqual({
      reviews,
      isReviewSending: false,
      error: null
    });
  });

  it(`should set reviewSendingStatus`, () => {
    const isReviewSending = true;

    expect(reducer(undefined, {type: ActionType.SET_REVIEW_SENDING_STATUS, payload: isReviewSending})).toEqual({
      reviews: [],
      isReviewSending,
      error: null
    });
  });

  it(`should set error`, () => {
    const error = `error`;

    expect(reducer(undefined, {type: ActionType.SET_ERROR, payload: error})).toEqual({
      reviews: [],
      isReviewSending: false,
      error
    });
  });

  it(`should remove error`, () => expect(reducer(undefined, {type: ActionType.REMOVE_ERROR})).toEqual({
    reviews: [],
    isReviewSending: false,
    error: null
  }));
});
