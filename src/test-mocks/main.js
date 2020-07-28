import {OfferType, City, SortType} from "../const.js";

export default {
  activeItem: `4`,
  onActiveItemChange: () => {},
  onActiveItemRemoval: () => {},
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
  onOfferCardBookmarkButtonClick: () => {},
  onOfferCardNameClick: () => {}
};
