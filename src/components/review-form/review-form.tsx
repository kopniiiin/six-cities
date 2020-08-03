import React, {Fragment} from "react";
import PropTypes from "prop-types";

import {MAX_RATING} from "../../const.js";

import ErrorMessage from "../error-message/error-message.jsx";

const TextLengthLimit = {MIN: 50, MAX: 300};

const ratingsToTitles = {
  1: `terribly`,
  2: `badly`,
  3: `not bad`,
  4: `good`,
  5: `perfect`
};

const propTypes = {
  disabled: PropTypes.bool.isRequired,
  error: PropTypes.string,
  text: PropTypes.string,
  rating: PropTypes.number,
  onTextChange: PropTypes.func.isRequired,
  onRatingChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

const ReviewForm = (props) => {
  const {
    disabled,
    error,
    text,
    rating: activeRating,
    onTextChange,
    onRatingChange,
    onSubmit
  } = props;

  const stars = [];

  for (let rating = MAX_RATING; rating >= 1; rating--) {
    stars.push(
        <Fragment key={rating}>

          <input
            className="form__rating-input visually-hidden"
            type="radio"
            name="rating"
            value={rating}
            id={`${rating}-stars`}
            checked={rating === activeRating}
            required
            disabled={disabled}
            onChange={() => onRatingChange(rating)}/>

          <label
            className="reviews__rating-label form__rating-label"
            title={ratingsToTitles[rating]}
            htmlFor={`${rating}-stars`}>
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"/>
            </svg>
          </label>

        </Fragment>
    );
  }

  const isSubmitButtonDisabled = (
    disabled || !activeRating || !text || text.length < TextLengthLimit.MIN || text.length > TextLengthLimit.MAX
  );

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={(evt) => {
        evt.preventDefault();
        onSubmit({text, rating: activeRating});
      }}>

      {error && <ErrorMessage text={error}/>}

      <label className="reviews__label form__label" htmlFor="text">Your review</label>

      <div className="reviews__rating-form form__rating">{stars}</div>

      <textarea
        className="reviews__textarea form__textarea"
        name="text"
        value={text}
        minLength={TextLengthLimit.MIN}
        maxLength={TextLengthLimit.MAX}
        placeholder="Tell how was your stay, what you like and what can be improved"
        id="text"
        required
        disabled={disabled}
        onChange={(evt) => onTextChange(evt.target.value)}/>

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">{TextLengthLimit.MIN} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitButtonDisabled}>
          Submit
        </button>
      </div>

    </form>
  );
};

ReviewForm.propTypes = propTypes;

export default ReviewForm;
