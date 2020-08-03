import {ServerURL, ERROR_TIMEOUT} from "../../const";

import {extend} from "../../utils";

import {convertReviewsFromServerFormat, convertReviewToServerFormat} from "../../adapters";

let errorTimeout;

const temporarilySetError = (dispatch, error) => {
  clearTimeout(errorTimeout);
  dispatch(ActionCreator.setError(error));
  errorTimeout = setTimeout(() => dispatch(ActionCreator.removeError()), ERROR_TIMEOUT);
};

const initialState = {
  reviews: [],
  isReviewSending: false,
  error: null
};

export const ActionType = {
  SET_REVIEWS: `SET_REVIEWS`,
  SET_REVIEW_SENDING_STATUS: `SET_REVIEW_SENDING_STATUS`,
  SET_ERROR: `SET_ERROR`,
  REMOVE_ERROR: `REMOVE_ERROR`
};

export const ActionCreator = {
  setReviews: (reviews) => ({type: ActionType.SET_REVIEWS, payload: reviews}),
  setReviewSendingStatus: (isReviewSending) => ({type: ActionType.SET_REVIEW_SENDING_STATUS, payload: isReviewSending}),
  setError: (error) => ({type: ActionType.SET_ERROR, payload: error}),
  removeError: () => ({type: ActionType.REMOVE_ERROR})
};

export const Operation = {
  loadReviews: (offerId) => (dispatch, getState, api) => api.get(`${ServerURL.REVIEWS}/${offerId}`)
    .then(({data}) => dispatch(ActionCreator.setReviews(convertReviewsFromServerFormat(data))))
    .catch(() => temporarilySetError(dispatch, `reviews loading error`)),

  sendReview: (offerId, review) => (dispatch, getState, api) => {
    dispatch(ActionCreator.setReviewSendingStatus(true));

    return api.post(`${ServerURL.REVIEWS}/${offerId}`, convertReviewToServerFormat(review))
      .then(({data}) => dispatch(ActionCreator.setReviews(convertReviewsFromServerFormat(data))))
      .catch(() => temporarilySetError(dispatch, `review sending error`))
      .finally(() => dispatch(ActionCreator.setReviewSendingStatus(false)));
  }
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_REVIEWS:
      return extend(state, {reviews: action.payload});
    case ActionType.SET_REVIEW_SENDING_STATUS:
      return extend(state, {isReviewSending: action.payload});
    case ActionType.SET_ERROR:
      return extend(state, {error: action.payload});
    case ActionType.REMOVE_ERROR:
      return extend(state, {error: null});
  }

  return state;
};
