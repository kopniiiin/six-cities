import {OfferType} from "../const.js";

export default {
  type: OfferType.ROOM,
  name: `Paper place`,
  description: `Lots of paper`,
  photos: [{src: `img/room.jpg`, alt: `Place photo`}],
  isFavorite: false,
  isPremium: false,
  rating: 4,
  price: 4,
  bedroomAmount: 4,
  guestAmount: 4,
  features: [`paper`, `coffee machine`],
  host: {
    name: `Host`,
    photo: {src: `img/avatar-max.jpg`, alt: `Host photo`},
    isPro: false
  }
};
