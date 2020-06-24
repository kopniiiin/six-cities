import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import {OfferType} from "../../const.js";

import OfferCard from "../offer-card/offer-card.jsx";

const offerCardPropTypesCopy = Object.assign({}, OfferCard.propTypes);
delete offerCardPropTypesCopy[`onMouseEnter`];
delete offerCardPropTypesCopy[`onNameClick`];

const propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(offerCardPropTypesCopy)).isRequired,
  onOfferCardNameClick: PropTypes.func.isRequired
};

class OfferList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {activeOfferId: null};
    this._handleOfferCardMouseEnter = this._handleOfferCardMouseEnter.bind(this);
  }

  render() {
    const {offers, onOfferCardNameClick} = this.props;

    const offerCards = offers.map((offer) => (
      <OfferCard
        key={offer.id}
        {...offer}
        onMouseEnter={this._handleOfferCardMouseEnter}
        onNameClick={onOfferCardNameClick}/>
    ));

    return <div className="cities__places-list places__list tabs__content">{offerCards}</div>;
  }

  _handleOfferCardMouseEnter(id) {
    this.setState({activeOfferId: id});
  }
}

OfferList.propTypes = propTypes;

export default OfferList;

export const testProps = {
  offers: [{
    id: `4`,
    type: OfferType.ROOM,
    name: `Paper place`,
    photos: [{src: `img/room.jpg`, alt: `Place photo`}],
    isFavorite: false,
    isPremium: false,
    rating: 4,
    price: 4
  }],
  onOfferCardNameClick: () => {}
};
