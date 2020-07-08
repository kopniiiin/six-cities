import {OfferType, SortType} from "../const.js";

export default {
  cities: [`city`],
  activeCity: `city`,
  activeSortType: SortType.POPULAR,
  offers: [{
    id: `4`,
    type: OfferType.ROOM,
    name: `Paper place`,
    photos: [{src: `img/room.jpg`, alt: `Place photo`}],
    isFavorite: false,
    isPremium: false,
    rating: 4,
    price: 4,
    coordinates: [4, 4]
  }],
  onCityClick: () => {},
  onSortTypeChange: () => {},
  onOfferCardNameClick: () => {}
};
