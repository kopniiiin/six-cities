import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import {OfferType} from "../../const.js";

import OfferCard from "../offer-card/offer-card.jsx";

const propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
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
    isPremium: PropTypes.bool.isRequired
  })).isRequired
};

class OfferList extends PureComponent {
  constructor(props) {
    super(props);
    this.handleOfferCardMouseEnter = this.handleOfferCardMouseEnter.bind(this);
    this.handleOfferCardNameClick = this.handleOfferCardNameClick.bind(this);
  }

  render() {
    const {offers} = this.props;

    const offerCards = offers.map((offer) => {
      const {id, type, name, photo, price, rating, isFavorite, isPremium} = offer;

      return (
        <OfferCard
          key={id}
          id={id}
          type={type}
          name={name}
          photo={photo}
          price={price}
          rating={rating}
          isFavorite={isFavorite}
          isPremium={isPremium}
          onMouseEnter={this.handleOfferCardMouseEnter}
          onNameClick={this.handleOfferCardNameClick}/>
      );
    });

    return <div className="cities__places-list places__list tabs__content">{offerCards}</div>;
  }

  handleOfferCardMouseEnter(id) {
    this.setState({activeOfferId: id});
  }

  handleOfferCardNameClick() {}
}

OfferList.propTypes = propTypes;

export default OfferList;
