import React from "react";
import PropTypes from "prop-types";

import OfferCard from "../offer-card/offer-card.jsx";

const offerCardPropTypesCopy = Object.assign({}, OfferCard.propTypes);
delete offerCardPropTypesCopy.blockClassName;
delete offerCardPropTypesCopy.onMouseEnter;
delete offerCardPropTypesCopy.onMouseLeave;
delete offerCardPropTypesCopy.onNameClick;

const propTypes = {
  blockClassName: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape(offerCardPropTypesCopy)).isRequired,
  onOfferCardMouseEnter: PropTypes.func.isRequired,
  onOfferCardMouseLeave: PropTypes.func.isRequired,
  onOfferCardNameClick: PropTypes.func.isRequired
};

const OfferList = (props) => {
  const {
    blockClassName,
    offers,
    onOfferCardMouseEnter,
    onOfferCardMouseLeave,
    onOfferCardNameClick
  } = props;

  const listClassName = `${blockClassName}__places-list places__list`;

  const offerCards = offers.map((offer) => (
    <OfferCard
      key={offer.id}
      blockClassName={blockClassName}
      {...offer}
      onMouseEnter={onOfferCardMouseEnter}
      onMouseLeave={onOfferCardMouseLeave}
      onNameClick={onOfferCardNameClick}/>
  ));

  return <div className={listClassName}>{offerCards}</div>;
};

OfferList.propTypes = propTypes;

export default OfferList;
