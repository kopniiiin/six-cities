import React from "react";
import PropTypes from "prop-types";

import {AuthorizationStatus} from "../../const";

import Review from "../review/review";
import ReviewForm from "../review-form/review-form";

import withReviewData from "../../hocs/with-review-data/with-review-data";

const ReviewFormWithReviewData = withReviewData(ReviewForm);

const MAX_REVIEW_AMOUNT = 10;

const reviewPropTypesCopy = Object.assign({}, Review.propTypes);
reviewPropTypesCopy.id = PropTypes.string.isRequired;

const propTypes = {
  authorizationStatus: PropTypes.oneOf(Object.values(AuthorizationStatus)).isRequired,
  reviews: PropTypes.arrayOf(PropTypes.shape(reviewPropTypesCopy)).isRequired,
  isReviewFormDisabled: PropTypes.bool.isRequired,
  reviewFormError: PropTypes.string,
  onReviewFormSubmit: PropTypes.func.isRequired
};

const ReviewList = (props) => {
  const {
    authorizationStatus,
    reviews,
    isReviewFormDisabled,
    reviewFormError,
    onReviewFormSubmit
  } = props;

  const reviewForm = (
    <ReviewFormWithReviewData
      disabled={isReviewFormDisabled}
      error={reviewFormError}
      onSubmit={onReviewFormSubmit}/>
  );

  const slicedReviews = reviews.slice(0, MAX_REVIEW_AMOUNT);

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{slicedReviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {slicedReviews.map((review) => <Review key={review.id} {...review}/>)}
      </ul>
      {authorizationStatus === AuthorizationStatus.AUTHORIZED ? reviewForm : null}
    </section>
  );
};

ReviewList.propTypes = propTypes;

export default ReviewList;
