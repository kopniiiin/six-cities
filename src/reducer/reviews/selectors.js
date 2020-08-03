import NameSpace from "../name-space";

const sortReviewsByDate = (reviews) => [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date));

export const getReviews = (state) => state[NameSpace.REVIEWS].reviews;

export const getReviewSendingStatus = (state) => state[NameSpace.REVIEWS].isReviewSending;

export const getError = (state) => state[NameSpace.REVIEWS].error;

export const getSortedByDateReviews = (state) => sortReviewsByDate(getReviews(state));
