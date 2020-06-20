import React from "react";
import PropTypes from "prop-types";

import {OfferType, MAX_RATING} from "../../const.js";

import {upperCaseFirstLetter} from "../../utils.js";

const propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.values(OfferType)).isRequired,
  name: PropTypes.string.isRequired,
  photo: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  isPremium: PropTypes.bool.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onNameClick: PropTypes.func.isRequired
};

const OfferCard = (props) => {
  const {id, type, name, photo: {src, alt}, price, rating, isFavorite, isPremium, onMouseEnter, onNameClick} = props;

  const premiumMark = <div className="place-card__mark"><span>Premium</span></div>;

  const bookmarkButtonClassName = `place-card__bookmark-button ${isFavorite ? `place-card__bookmark-button--active` : ``} button`;
  const bookmarkButtonText = isFavorite ? `In bookmarks` : `To bookmarks`;

  const ratingStyle = {width: `${100 / MAX_RATING * Math.round(rating)}%`};

  return (
    <article className="cities__place-card place-card" onMouseEnter={() => onMouseEnter(id)}>
      {isPremium && premiumMark}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={src} width="260" height="200" alt={alt}/>
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={bookmarkButtonClassName} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"/>
            </svg>
            <span className="visually-hidden">{bookmarkButtonText}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={ratingStyle}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#" onClick={onNameClick}>{name}</a>
        </h2>
        <p className="place-card__type">{upperCaseFirstLetter(type)}</p>
      </div>
    </article>
  );
};

OfferCard.propTypes = propTypes;

export default OfferCard;
