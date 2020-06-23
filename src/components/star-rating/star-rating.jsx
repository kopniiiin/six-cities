import React from "react";
import PropTypes from "prop-types";

const MAX_RATING = 5;

const propTypes = {
  blockClassName: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  isValueShown: PropTypes.bool.isRequired
};

const StarRating = ({blockClassName, value, isValueShown}) => {
  const ratingClassName = `${blockClassName}__rating rating`;
  const starsClassName = `${blockClassName}__stars rating__stars`;
  const valueClassName = `${blockClassName}__rating-value rating__value`;

  const starsStyle = {width: `${100 / MAX_RATING * Math.round(value)}%`};

  const valueElement = <span className={valueClassName}>{value}</span>;

  return (
    <div className={ratingClassName}>
      <div className={starsClassName}>
        <span style={starsStyle}/>
        <span className="visually-hidden">Rating</span>
      </div>
      {isValueShown && valueElement}
    </div>
  );
};

StarRating.propTypes = propTypes;

export default StarRating;

export const testProps = {
  blockClassName: `block`,
  value: 4,
  isValueShown: false
};
