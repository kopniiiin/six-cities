import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import OfferCard from "../offer-card/offer-card.jsx";

const offerCardPropTypesCopy = Object.assign({}, OfferCard.propTypes);
delete offerCardPropTypesCopy.blockClassName;
delete offerCardPropTypesCopy.onMouseEnter;
delete offerCardPropTypesCopy.onNameClick;

const propTypes = {
  blockClassName: PropTypes.string.isRequired,
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
    const {blockClassName, offers, onOfferCardNameClick} = this.props;

    const listClassName = `${blockClassName}__places-list places__list`;

    const offerCards = offers.map((offer) => (
      <OfferCard
        key={offer.id}
        blockClassName={blockClassName}
        {...offer}
        onMouseEnter={this._handleOfferCardMouseEnter}
        onNameClick={onOfferCardNameClick}/>
    ));

    return <div className={listClassName}>{offerCards}</div>;
  }

  _handleOfferCardMouseEnter(id) {
    this.setState({activeOfferId: id});
  }
}

OfferList.propTypes = propTypes;

export default OfferList;
