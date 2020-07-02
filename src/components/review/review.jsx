import React from "react";
import PropTypes from "prop-types";

import {formatDate} from "../../utils.js";

import StarRating from "../star-rating/star-rating.jsx";

const propTypes = {
  date: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    photo: PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

const Review = (props) => {
  const {
    date,
    text,
    rating,
    user: {
      name: userName,
      photo: {src: userPhotoSrc, alt: userPhotoAlt}
    }
  } = props;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={userPhotoSrc} alt={userPhotoAlt} width="54" height="54"/>
        </div>
        <span className="reviews__user-name">{userName}</span>
      </div>
      <div className="reviews__info">
        <StarRating blockClassName={`reviews`} value={rating} isValueShown={false}/>
        <p className="reviews__text">{text}</p>
        <time className="reviews__time" dateTime={date}>{formatDate(date)}</time>
      </div>
    </li>
  );
};

Review.propTypes = propTypes;

export default Review;
