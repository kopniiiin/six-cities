import NameSpace from "../name-space.js";

export const getReviews = (state) => state[NameSpace.REVIEWS].reviews;

export const getReviewSendingStatus = (state) => state[NameSpace.REVIEWS].isReviewSending;

export const getError = (state) => state[NameSpace.REVIEWS].error;
