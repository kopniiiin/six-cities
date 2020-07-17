export const OfferType = {
  APARTMENT: `apartment`,
  HOTEL: `hotel`,
  HOUSE: `house`,
  ROOM: `room`
};

export const City = {
  PARIS: `Paris`,
  COLOGNE: `Cologne`,
  BRUSSELS: `Brussels`,
  AMSTERDAM: `Amsterdam`,
  HAMBURG: `Hamburg`,
  DUSSELDORF: `Dusseldorf`
};

export const DEFAULT_CITY = City.PARIS;

export const SortType = {
  POPULAR: `popular`,
  TO_HIGH_PRICE: `price: low to high`,
  TO_LOW_PRICE: `price: high to low`,
  TOP_RATED: `top rated first`
};

export const DEFAULT_SORT_TYPE = SortType.POPULAR;

export const ServerURL = {
  OFFERS: `/hotels`
};

export const ServerResponseStatus = {
  OK: 200,
};
