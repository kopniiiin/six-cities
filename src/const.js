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

export const MAX_RATING = 5;

export const Path = {
  MAIN: `/`,
  LOGIN: `/login`,
  OFFER: `/offer`,
  FAVORITES: `/favorites`
};

export const ServerURL = {
  LOGIN: `/login`,
  OFFERS: `/hotels`,
  FAVORITES: `/favorite`,
  REVIEWS: `/comments`
};

export const ServerResponseStatus = {
  OK: 200,
  UNAUTHORIZED: 401
};

export const AuthorizationStatus = {
  AUTHORIZED: `AUTHORIZED`,
  UNAUTHORIZED: `UNAUTHORIZED`
};
