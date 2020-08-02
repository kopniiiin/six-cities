import {createSelector} from "reselect";

import {SortType} from "../../const.js";

import NameSpace from "../name-space.js";

import {getActiveCity, getActiveSortType} from "../app/selectors.js";

const sortOffers = (offers, sortType) => {
  const offersCopy = [...offers];

  switch (sortType) {
    case SortType.POPULAR:
      return offersCopy;
    case SortType.TO_HIGH_PRICE:
      return offersCopy.sort((a, b) => a.price - b.price);
    case SortType.TO_LOW_PRICE:
      return offersCopy.sort((a, b) => b.price - a.price);
    case SortType.TOP_RATED:
      return offersCopy.sort((a, b) => b.rating - a.rating);
  }

  return offersCopy;
};

export const getOffers = (state) => state[NameSpace.OFFERS].offers;

export const getNearOffers = (state) => state[NameSpace.OFFERS].nearOffers;

export const getFavoriteOffers = (state) => state[NameSpace.OFFERS].favoriteOffers;

export const getError = (state) => state[NameSpace.OFFERS].error;

export const getFilteredAndSortedOffers = createSelector(
    getOffers,
    getActiveCity,
    getActiveSortType,
    (offers, activeCity, activeSortType) => (
      sortOffers(offers.filter(({city: {name: city}}) => city === activeCity), activeSortType)
    )
);

export const getGroupedByCityFavoriteOffers = (state) => getFavoriteOffers(state).reduce((groups, offer) => {
  const {city: {name: city}} = offer;

  if (!groups[city]) {
    groups[city] = [];
  }

  groups[city].push(offer);

  return groups;
}, {});

export const getOfferWithId = (state, offerId) => getOffers(state).find(({id}) => id === offerId);
