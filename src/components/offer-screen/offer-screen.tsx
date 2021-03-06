import * as React from "react";
import {connect} from "react-redux";

import {OfferType, AuthorizationStatus, Location, User, Offer, ReviewWithId, ReviewData} from "../../types";

import {doNothing, upperCaseFirstLetter} from "../../utils";

import PremiumMark from "../premium-mark/premium-mark";
import BookmarkButton from "../bookmark-button/bookmark-button";
import StarRating from "../star-rating/star-rating";
import ReviewList from "../review-list/review-list";
import Map from "../map/map";
import OfferList from "../offer-list/offer-list";

import withMarkers from "../../hocs/with-markers/with-markers";

import {Operation as OffersOperation} from "../../reducer/offers/offers";
import {getNearOffers, getOfferWithId} from "../../reducer/offers/selectors";
import {Operation as ReviewsOperation} from "../../reducer/reviews/reviews";
import {getReviewSendingStatus, getError, getSortedByDateReviews} from "../../reducer/reviews/selectors";

const MapWithMarkers = withMarkers(Map);

const MAX_PHOTO_AMOUNT = 6;
const MAX_NEAR_OFFER_AMOUNT = 3;

interface Props {
  children: React.ReactNode;
  authorizationStatus: AuthorizationStatus;
  id: string;
  offer: {
    type: OfferType;
    name: string;
    description: string;
    photos: string[];
    isFavorite: boolean;
    isPremium: boolean;
    rating: number;
    price: number;
    bedroomAmount: number;
    guestAmount: number;
    features: string[];
    location: Location;
    city: {location: Location & {zoom: number}};
    host: User & {isPro: boolean};
  };
  nearOffers: (Offer & {location: Location})[];
  reviews: ReviewWithId[];
  loadData: () => void;
  isReviewFormDisabled: boolean;
  reviewFormError?: string;
  onReviewFormSubmit: (reviewData: ReviewData) => void;
  onOfferCardBookmarkButtonClick: (id: string) => void;
}

class OfferScreen extends React.PureComponent<Props> {
  props: Props;

  componentDidMount() {
    this._update();
  }

  componentDidUpdate({id: oldId}) {
    const {id: newId} = this.props;

    if (oldId !== newId) {
      this._update();
    }
  }

  _update() {
    const {loadData} = this.props;

    loadData();
  }

  render() {
    const {
      children,
      authorizationStatus,
      id,
      offer: {
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
        location: {coordinates},
        city: {location: {coordinates: cityCoordinates, zoom}},
        host: {name: hostName, photo: hostPhoto, isPro: isHostPro}
      },
      nearOffers,
      reviews,
      isReviewFormDisabled,
      reviewFormError,
      onReviewFormSubmit,
      onOfferCardBookmarkButtonClick
    } = this.props;

    const gallery = (
      <div className="property__gallery">
        {photos.slice(0, MAX_PHOTO_AMOUNT).map((photo) => (
          <div key={photo} className="property__image-wrapper">
            <img className="property__image" src={photo} alt="Place photo"/>
          </div>
        ))}
      </div>
    );

    const premiumMark = <PremiumMark blockClassName={`property`}/>;
    const starRating = <StarRating blockClassName={`property`} value={rating} isValueShown={true}/>;

    const reviewList = (
      <ReviewList
        authorizationStatus={authorizationStatus}
        reviews={reviews}
        isReviewFormDisabled={isReviewFormDisabled}
        reviewFormError={reviewFormError}
        onReviewFormSubmit={onReviewFormSubmit}/>
    );

    const bookmarkButton = (
      <BookmarkButton
        blockClassName={`property`}
        isActive={isFavorite}
        isBig={true}
        onClick={() => onOfferCardBookmarkButtonClick(id)}/>
    );

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
      <MapWithMarkers
        blockClassName={`property`}
        centerCoordinates={cityCoordinates}
        zoom={zoom}
        markerCoordinates={slicedNearOffers.map(({location: {coordinates: nearOfferCoordinates}}) => nearOfferCoordinates)}
        activeMarkerCoordinates={[coordinates]}/>
    );

    const nearOfferList = (
      <OfferList
        blockClassName={`near-places`}
        offers={slicedNearOffers}
        onOfferCardMouseEnter={doNothing}
        onOfferCardMouseLeave={doNothing}
        onOfferCardBookmarkButtonClick={onOfferCardBookmarkButtonClick}/>
    );

    const hostPhotoClassName = `property__avatar-wrapper ${isHostPro ? `property__avatar-wrapper--pro` : ``} user__avatar-wrapper`;

    return (
      <div className="page">
        {children}

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
                      <img className="property__avatar user__avatar" src={`/${hostPhoto}`} alt="Host photo" width="74" height="74"/>
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
  }
}

const mapStateToProps = (state, {id}) => ({
  offer: getOfferWithId(state, id),
  nearOffers: getNearOffers(state),
  reviews: getSortedByDateReviews(state),
  isReviewFormDisabled: getReviewSendingStatus(state),
  reviewFormError: getError(state)
});

const mapDispatchToProps = (dispatch, {id}) => ({
  loadData: () => {
    dispatch(OffersOperation.loadNearOffers(id));
    dispatch(ReviewsOperation.loadReviews(id));
  },
  onReviewFormSubmit: (review) => dispatch(ReviewsOperation.sendReview(id, review))
});

export {OfferScreen};
export default connect(mapStateToProps, mapDispatchToProps)(OfferScreen);
