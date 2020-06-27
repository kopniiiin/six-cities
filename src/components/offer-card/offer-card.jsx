import React from "react";
import PropTypes from "prop-types";

import {OfferType} from "../../const.js";

import {upperCaseFirstLetter} from "../../utils.js";

import PremiumMark from "../premium-mark/premium-mark.jsx";
import BookmarkButton from "../bookmark-button/bookmark-button.jsx";
import StarRating from "../star-rating/star-rating.jsx";

const propTypes = {
  blockClassName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.values(OfferType)).isRequired,
  name: PropTypes.string.isRequired,
  photos: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  })).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  isPremium: PropTypes.bool.isRequired,
  rating: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onNameClick: PropTypes.func.isRequired
};

const OfferCard = (props) => {
  const {
    blockClassName,
    id,
    type,
    name,
    photos: [{src: photoSrc, alt: photoAlt}],
    isFavorite,
    isPremium,
    rating,
    price,
    onMouseEnter,
    onNameClick
  } = props;

  const cardClassName = `${blockClassName}__place-card place-card`;
  const photoClassName = `${blockClassName}__image-wrapper place-card__image-wrapper`;

  const premiumMark = <PremiumMark blockClassName={`place-card`}/>;
  const bookmarkButton = <BookmarkButton blockClassName={`place-card`} isActive={isFavorite} isBig={false}/>;
  const starRating = <StarRating blockClassName={`place-card`} value={rating} isValueShown={false}/>;

  return (
    <article className={cardClassName} onMouseEnter={() => onMouseEnter(id)}>
      {isPremium && premiumMark}
      <div className={photoClassName}>
        <a href="#">
          <img className="place-card__image" src={photoSrc} alt={photoAlt} width="260" height="200"/>
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          {bookmarkButton}
        </div>
        {starRating}
        <h2 className="place-card__name">
          <a href="#" onClick={() => onNameClick(id)}>{name}</a>
        </h2>
        <p className="place-card__type">{upperCaseFirstLetter(type)}</p>
      </div>
    </article>
  );
};

OfferCard.propTypes = propTypes;

export default OfferCard;
