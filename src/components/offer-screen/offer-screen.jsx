import React from "react";
import PropTypes from "prop-types";

import {OfferType} from "../../const.js";

import {upperCaseFirstLetter} from "../../utils.js";

import PremiumMark from "../premium-mark/premium-mark.jsx";
import BookmarkButton from "../bookmark-button/bookmark-button.jsx";
import StarRating from "../star-rating/star-rating.jsx";
import ReviewList from "../review-list/review-list.jsx";
import Map from "../map/map.jsx";
import OfferList from "../offer-list/offer-list.jsx";

const MAX_PHOTO_AMOUNT = 6;

const MAX_NEAR_OFFER_AMOUNT = 3;

const propTypes = {
  type: PropTypes.oneOf(Object.values(OfferType)).isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  photos: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  })).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  isPremium: PropTypes.bool.isRequired,
  rating: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  bedroomAmount: PropTypes.number.isRequired,
  guestAmount: PropTypes.number.isRequired,
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  host: PropTypes.shape({
    name: PropTypes.string.isRequired,
    photo: PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired
    }).isRequired,
    isPro: PropTypes.bool.isRequired
  }).isRequired,
  reviews: ReviewList.propTypes.reviews,
  nearOffers: PropTypes.arrayOf(PropTypes.shape({
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
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired
  })).isRequired
};

const OfferScreen = (props) => {
  const {
    type,
    name,
    description,
    photos,
    isFavorite,
    isPremium,
    rating,
    price,
    bedroomAmount,
    guestAmount,
    features,
    coordinates,
    host: {
      name: hostName,
      photo: {src: hostPhotoSrc, alt: hostPhotoAlt},
      isPro: isHostPro
    },
    reviews,
    nearOffers
  } = props;

  const gallery = (
    <div className="property__gallery">
      {photos.slice(0, MAX_PHOTO_AMOUNT).map(({src, alt}) => (
        <div key={src} className="property__image-wrapper">
          <img className="property__image" src={src} alt={alt}/>
        </div>
      ))}
    </div>
  );

  const premiumMark = <PremiumMark blockClassName={`property`}/>;
  const bookmarkButton = <BookmarkButton blockClassName={`property`} isActive={isFavorite} isBig={true}/>;
  const starRating = <StarRating blockClassName={`property`} value={rating} isValueShown={true}/>;
  const reviewList = <ReviewList reviews={reviews}/>;

  const featureList = (
    <div className="property__inside">
      <h2 className="property__inside-title">What&apos;s inside</h2>
      <ul className="property__inside-list">
        {features.map((feature) => <li key={feature} className="property__inside-item">{feature}</li>)}
      </ul>
    </div>
  );

  const slicedNearOffers = nearOffers.slice(0, MAX_NEAR_OFFER_AMOUNT);

  const map = (
    <Map
      blockClassName={`property`}
      markerCoordinates={slicedNearOffers.map(({coordinates: nearOfferCoordinates}) => nearOfferCoordinates)}
      activeMarkerCoordinates={[coordinates]}/>
  );

  const nearOfferList = (
    <OfferList
      blockClassName={`near-places`}
      offers={slicedNearOffers}
      onOfferCardMouseEnter={() => {}}
      onOfferCardMouseLeave={() => {}}
      onOfferCardNameClick={() => {}}/>
  );

  const hostPhotoClassName = `property__avatar-wrapper ${isHostPro ? `property__avatar-wrapper--pro` : ``} user__avatar-wrapper`;

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">{gallery}</div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium && premiumMark}
              <div className="property__name-wrapper">
                <h1 className="property__name">{name}</h1>
                {bookmarkButton}
              </div>
              {starRating}
              <ul className="property__features">
                <li className="property__feature property__feature--entire">{upperCaseFirstLetter(type)}</li>
                <li className="property__feature property__feature--bedrooms">{bedroomAmount} Bedrooms</li>
                <li className="property__feature property__feature--adults">Max {guestAmount} adults</li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              {featureList}
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={hostPhotoClassName}>
                    <img className="property__avatar user__avatar" src={hostPhotoSrc} alt={hostPhotoAlt} width="74" height="74"/>
                  </div>
                  <span className="property__user-name">{hostName}</span>
                </div>
                <div className="property__description"><p className="property__text">{description}</p></div>
              </div>
              {reviewList}
            </div>
          </div>
          {map}
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            {nearOfferList}
          </section>
        </div>
      </main>
    </div>
  );
};

OfferScreen.propTypes = propTypes;

export default OfferScreen;
