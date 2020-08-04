import * as React from "react";

import {MAX_RATING} from "../../const";

interface Props {
  blockClassName: string;
  value: number;
  isValueShown: boolean;
}

const StarRating: React.FC<Props> = ({blockClassName, value, isValueShown}: Props) => {
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

export default StarRating;
