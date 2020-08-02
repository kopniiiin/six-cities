import {OfferType, City, SortType, AuthorizationStatus} from "../const.js";

export default {
  authorizationStatus: AuthorizationStatus.UNAUTHORIZED,
  activeCity: City.AMSTERDAM,
  activeSortType: SortType.POPULAR,
  offers: [{
    id: `4`,
    type: OfferType.ROOM,
    name: `Paper place`,
    mainPhoto: `photo`,
    isFavorite: false,
    isPremium: false,
    rating: 4,
    price: 4,
    location: {coordinates: [4, 4]},
    city: {location: {coordinates: [4, 4], zoom: 4}}
  }],
  onCityClick: () => {},
  onSortTypeChange: () => {},
  onLoginScreenSubmit: () => {},
  onOfferFavoritenessChange: () => {}
};
