import * as React from "react";

import {City, SortType, Location, Offer} from "../../types";

import CityList from "../city-list/city-list";
import Sort from "../sort/sort";
import OfferList from "../offer-list/offer-list";
import NoOffersMessage from "../no-offers-message/no-offers-message";
import Map from "../map/map";

import withActiveState from "../../hocs/with-active-state/with-active-state";
import withMarkers from "../../hocs/with-markers/with-markers";

const SortWithActiveState = withActiveState(Sort);
const MapWithMarkers = withMarkers(Map);

interface Props {
  activeItem?: string;
  onActiveItemChange: (activeItem: string) => void;
  onActiveItemRemoval: () => void;
  children: React.ReactNode;
  activeCity: City;
  activeSortType: SortType;
  offers: (Offer & {
    location: Location;
    city: {location: Location & {zoom: number}};
  })[];
  onCityClick: (city: City) => void;
  onSortTypeChange: (sortType: SortType) => void;
  onOfferCardBookmarkButtonClick: (id: string) => void;
}

const Main: React.FC<Props> = (props: Props) => {
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
    onOfferCardBookmarkButtonClick
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
      onOfferCardBookmarkButtonClick={onOfferCardBookmarkButtonClick}/>
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

export default Main;
