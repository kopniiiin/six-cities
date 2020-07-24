import {ServerURL} from "../../const.js";

import {extend} from "../../utils.js";

import {convertReviewsFromServerFormat, convertReviewToServerFormat} from "../../adapters.js";

const initialState = {
  reviews: []
};

export const ActionType = {
  SET_REVIEWS: `SET_REVIEWS`
};

export const ActionCreator = {
  setReviews: (reviews) => ({type: ActionType.SET_REVIEWS, payload: reviews})
};

export const Operation = {
  loadReviews: (offerId) => (dispatch, getState, api) => api.get(`${ServerURL.REVIEWS}/${offerId}`)
    .then(({data}) => dispatch(ActionCreator.setReviews(convertReviewsFromServerFormat(data)))),

  sendReview: (offerId, review) => (dispatch, getState, api) => api.post(`${ServerURL.REVIEWS}/${offerId}`, convertReviewToServerFormat(review))
    .then(({data}) => dispatch(ActionCreator.setReviews(convertReviewsFromServerFormat(data))))
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_REVIEWS:
      return extend(state, {reviews: action.payload});
  }

  return state;
};
