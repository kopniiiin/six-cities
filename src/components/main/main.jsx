import React from "react";
import PropTypes from "prop-types";

import {OfferType, SortType} from "../../const.js";

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
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCity: PropTypes.string.isRequired,
  activeSortType: PropTypes.oneOf(Object.values(SortType)).isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape({
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
  })).isRequired,
  onCityClick: PropTypes.func.isRequired,
  onSortTypeChange: PropTypes.func.isRequired,
  onOfferCardNameClick: PropTypes.func.isRequired
};

const Main = (props) => {
  const {
    activeItem: activeOfferId,
    onActiveItemChange: onActiveOfferIdChange,
    onActiveItemRemoval: onActiveOfferIdRemoval,
    cities,
    activeCity,
    activeSortType,
    offers,
    onCityClick,
    onSortTypeChange,
    onOfferCardNameClick
  } = props;

  const cityList = <CityList cities={cities} activeCity={activeCity} onClick={onCityClick}/>;
  const sort = <SortWithActiveState activeType={activeSortType} onTypeChange={onSortTypeChange}/>;
  const noOffersMessage = <NoOffersMessage activeCity={activeCity}/>;

  const offerList = (
    <OfferList
      blockClassName={`cities`}
      offers={offers}
      onOfferCardMouseEnter={onActiveOfferIdChange}
      onOfferCardMouseLeave={onActiveOfferIdRemoval}
      onOfferCardNameClick={onOfferCardNameClick}/>
  );

  const map = (
    <MapWithMarkers
      blockClassName={`cities`}
      markerCoordinates={offers.filter(({id}) => id !== activeOfferId).map(({coordinates}) => coordinates)}
      activeMarkerCoordinates={offers.filter(({id}) => id === activeOfferId).map(({coordinates}) => coordinates)}/>
  );

  const mainClassName = `page__main page__main--index ${offers.length ? `` : `page__main--index-empty`}`;
  const containerClassName = `cities__places-container ${offers.length ? `` : `cities__places-container--empty`} container`;

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
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
            <div className="cities__right-section">
              {offers.length ? map : ``}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

Main.propTypes = propTypes;

export default Main;
