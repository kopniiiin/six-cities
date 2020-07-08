import {SortType} from "./const.js";

const MONTHS = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`
];

export const extend = (target, update) => Object.assign({}, target, update);

export const upperCaseFirstLetter = (string) => string[0].toUpperCase() + string.slice(1);

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

export const sortOffers = (offers, sortType) => {
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
