import * as React from "react";

import {Offer} from "../../types";

import OfferCard from "../offer-card/offer-card";

interface Props {
  blockClassName: string;
  offers: Offer[];
  onOfferCardMouseEnter: (id: string) => void;
  onOfferCardMouseLeave: (id: string) => void;
  onOfferCardBookmarkButtonClick: (id: string) => void;
}

const OfferList: React.FC<Props> = (props: Props) => {
  const {
    blockClassName,
    offers,
    onOfferCardMouseEnter,
    onOfferCardMouseLeave,
    onOfferCardBookmarkButtonClick
  } = props;

  const listClassName = `${blockClassName}__places-list places__list`;

  const offerCards = offers.map((offer) => (
    <OfferCard
      key={offer.id}
      blockClassName={blockClassName}
      {...offer}
      onMouseEnter={onOfferCardMouseEnter}
      onMouseLeave={onOfferCardMouseLeave}
      onBookmarkButtonClick={onOfferCardBookmarkButtonClick}/>
  ));

  return <div className={listClassName}>{offerCards}</div>;
};

export default OfferList;
