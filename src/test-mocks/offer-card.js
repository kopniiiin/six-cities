import {OfferType} from "../const.js";

export default {
  blockClassName: `block`,
  id: `4`,
  type: OfferType.ROOM,
  name: `Paper place`,
  photos: [{src: `img/room.jpg`, alt: `Place photo`}],
  isFavorite: false,
  isPremium: false,
  rating: 4,
  price: 4,
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  onNameClick: () => {}
};