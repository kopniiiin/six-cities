import * as React from "react";
import {Link} from "react-router-dom";

import {Path, Offer} from "../../types";

import {upperCaseFirstLetter} from "../../utils";

import PremiumMark from "../premium-mark/premium-mark";
import BookmarkButton from "../bookmark-button/bookmark-button";
import StarRating from "../star-rating/star-rating";

type Props = Offer & {
  blockClassName: string;
  onMouseEnter: (id: string) => void;
  onMouseLeave: (id: string) => void;
  onBookmarkButtonClick: (id: string) => void;
}

const OfferCard: React.FC<Props> = (props: Props) => {
  const {
    blockClassName,
    id,
    type,
    name,
    mainPhoto,
    isFavorite,
    isPremium,
    rating,
    price,
    onMouseEnter,
    onMouseLeave,
    onBookmarkButtonClick,
  } = props;

  const cardClassName = `${blockClassName}__place-card place-card`;
  const photoClassName = `${blockClassName}__image-wrapper place-card__image-wrapper`;

  const premiumMark = <PremiumMark blockClassName={`place-card`}/>;
  const starRating = <StarRating blockClassName={`place-card`} value={rating} isValueShown={false}/>;

  const bookmarkButton = (
    <BookmarkButton
      blockClassName={`place-card`}
      isActive={isFavorite}
      isBig={false}
      onClick={() => onBookmarkButtonClick(id)}/>
  );

  return (
    <article
      className={cardClassName}
      onMouseEnter={() => onMouseEnter(id)}
      onMouseLeave={() => onMouseLeave(id)}>
      {isPremium && premiumMark}
      <div className={photoClassName}>
        <a href="#">
          <img className="place-card__image" src={mainPhoto} alt="Place photo" width="260" height="200"/>
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
          <Link to={`${Path.OFFER}/${id}`}>{name}</Link>
        </h2>
        <p className="place-card__type">{upperCaseFirstLetter(type)}</p>
      </div>
    </article>
  );
};

export default OfferCard;
