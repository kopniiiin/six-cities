import * as React from "react";

import {AuthorizationStatus, ReviewWithId, ReviewData} from "../../types";

import Review from "../review/review";
import ReviewForm from "../review-form/review-form";

import withReviewData from "../../hocs/with-review-data/with-review-data";

const ReviewFormWithReviewData = withReviewData(ReviewForm);

const MAX_REVIEW_AMOUNT = 10;

interface Props {
  authorizationStatus: AuthorizationStatus;
  reviews: ReviewWithId[];
  isReviewFormDisabled: boolean;
  reviewFormError?: string;
  onReviewFormSubmit: (reviewData: ReviewData) => void;
}

const ReviewList: React.FC<Props> = (props: Props) => {
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

export default ReviewList;
