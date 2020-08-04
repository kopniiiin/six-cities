import * as React from "react";

import {Review as Props} from "../../types";

import {formatDate} from "../../utils";

import StarRating from "../star-rating/star-rating";

const Review: React.FC<Props> = (props: Props) => {
  const {
    date,
    text,
    rating,
    user: {name, photo}
  } = props;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={photo} alt="User photo" width="54" height="54"/>
        </div>
        <span className="reviews__user-name">{name}</span>
      </div>
      <div className="reviews__info">
        <StarRating blockClassName={`reviews`} value={rating} isValueShown={false}/>
        <p className="reviews__text">{text}</p>
        <time className="reviews__time" dateTime={date}>{formatDate(date)}</time>
      </div>
    </li>
  );
};

export default Review;
