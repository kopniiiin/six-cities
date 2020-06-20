import {OfferType} from "../const.js";

export default [{
  id: `1`,
  type: OfferType.APARTMENT,
  name: `Wood and stone place`,
  photo: {src: `img/room.jpg`, alt: `Place photo`},
  price: 1000,
  rating: 1,
  isFavorite: false,
  isPremium: false
}, {
  id: `2`,
  type: OfferType.HOTEL,
  name: `Only wood place`,
  photo: {src: `img/room.jpg`, alt: `Place photo`},
  price: 800,
  rating: 2,
  isFavorite: true,
  isPremium: false
}, {
  id: `3`,
  type: OfferType.HOUSE,
  name: `Only stone place`,
  photo: {src: `img/room.jpg`, alt: `Place photo`},
  price: 600,
  rating: 3,
  isFavorite: false,
  isPremium: false
}, {
  id: `4`,
  type: OfferType.ROOM,
  name: `Paper place`,
  photo: {src: `img/room.jpg`, alt: `Place photo`},
  price: 400,
  rating: 4,
  isFavorite: true,
  isPremium: true
}];
