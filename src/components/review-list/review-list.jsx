import React from "react";
import PropTypes from "prop-types";

import {AuthorizationStatus} from "../../const.js";

import Review from "../review/review.jsx";
import ReviewForm from "../review-form/review-form.jsx";

import withReviewData from "../../hocs/with-review-data/with-review-data.jsx";

const ReviewFormWithReviewData = withReviewData(ReviewForm);

const MAX_REVIEW_AMOUNT = 10;

const reviewPropTypesCopy = Object.assign({}, Review.propTypes);
reviewPropTypesCopy.id = PropTypes.string.isRequired;

const propTypes = {
  authorizationStatus: PropTypes.oneOf(Object.values(AuthorizationStatus)).isRequired,
  reviews: PropTypes.arrayOf(PropTypes.shape(reviewPropTypesCopy)).isRequired,
  onReviewFormSubmit: PropTypes.func.isRequired
};

const ReviewList = ({authorizationStatus, reviews, onReviewFormSubmit}) => {
  const reviewForm = <ReviewFormWithReviewData onSubmit={onReviewFormSubmit}/>;

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
