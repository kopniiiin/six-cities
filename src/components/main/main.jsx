import React from "react";
import PropTypes from "prop-types";

import {OfferType, City, SortType} from "../../const.js";

import CityList from "../city-list/city-list.jsx";
import Sort from "../sort/sort.jsx";
import OfferList from "../offer-list/offer-list.jsx";
import NoOffersMessage from "../no-offers-message/no-offers-message.jsx";
import Map from "../map/map.jsx";

import withActiveState from "../../hocs/with-active-state/with-active-state.jsx";
import withMarkers from "../../hocs/with-markers/with-markers.jsx";

const SortWithActiveState = withActiveState(Sort);
const MapWithMarkers = withMarkers(Map);

const propTypes = {
  activeItem: PropTypes.string,
  onActiveItemChange: PropTypes.func.isRequired,
  onActiveItemRemoval: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  activeCity: PropTypes.oneOf(Object.values(City)).isRequired,
  activeSortType: PropTypes.oneOf(Object.values(SortType)).isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(Object.values(OfferType)).isRequired,
    name: PropTypes.string.isRequired,
    mainPhoto: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    isPremium: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    location: PropTypes.shape({
      coordinates: PropTypes.arrayOf(PropTypes.number).isRequired
    }).isRequired,
    city: PropTypes.shape({
      location: PropTypes.shape({
        coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
        zoom: PropTypes.number.isRequired
      }).isRequired
    }).isRequired
  })).isRequired,
  onCityClick: PropTypes.func.isRequired,
  onSortTypeChange: PropTypes.func.isRequired,
  onOfferCardBookmarkButtonClick: PropTypes.func.isRequired,
  onOfferCardNameClick: PropTypes.func.isRequired
};

const Main = (props) => {
  const {
    activeItem: activeOfferId,
    onActiveItemChange: onActiveOfferIdChange,
    onActiveItemRemoval: onActiveOfferIdRemoval,
    children,
    activeCity,
    activeSortType,
    offers,
    onCityClick,
    onSortTypeChange,
    onOfferCardBookmarkButtonClick,
    onOfferCardNameClick
  } = props;

  const cityList = <CityList activeCity={activeCity} onClick={onCityClick}/>;
  const sort = <SortWithActiveState activeType={activeSortType} onTypeChange={onSortTypeChange}/>;
  const noOffersMessage = <NoOffersMessage activeCity={activeCity}/>;

  const offerList = (
    <OfferList
      blockClassName={`cities`}
      offers={offers}
      onOfferCardMouseEnter={onActiveOfferIdChange}
      onOfferCardMouseLeave={onActiveOfferIdRemoval}
      onOfferCardBookmarkButtonClick={onOfferCardBookmarkButtonClick}
      onOfferCardNameClick={onOfferCardNameClick}/>
  );

  const map = offers.length ? (
    <MapWithMarkers
      blockClassName={`cities`}
      centerCoordinates={offers[0].city.location.coordinates}
      zoom={offers[0].city.location.zoom}
      markerCoordinates={offers.filter(({id}) => id !== activeOfferId).map(({location: {coordinates}}) => coordinates)}
      activeMarkerCoordinates={offers.filter(({id}) => id === activeOfferId).map(({location: {coordinates}}) => coordinates)}/>
  ) : null;

  const mainClassName = `page__main page__main--index ${offers.length ? `` : `page__main--index-empty`}`;
  const containerClassName = `cities__places-container ${offers.length ? `` : `cities__places-container--empty`} container`;

  return (
    <div className="page page--gray page--main">
      {children}

      <main className={mainClassName}>
        <h1 className="visually-hidden">Cities</h1>
        {cityList}
        <div className="cities">
          <div className={containerClassName}>
            {offers.length ? (
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offers.length} places to stay in {activeCity}</b>
                {sort}
                {offerList}
              </section>
            ) : noOffersMessage}
            <div className="cities__right-section">{map}</div>
          </div>
        </div>
      </main>
    </div>
  );
};

Main.propTypes = propTypes;

export default Main;
