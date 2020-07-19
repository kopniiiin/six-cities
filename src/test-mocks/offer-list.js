import {OfferType} from "../const.js";

export default {
  blockClassName: `block`,
  offers: [{
    id: `4`,
    type: OfferType.ROOM,
    name: `Paper place`,
    mainPhoto: `photo`,
    isFavorite: false,
    isPremium: false,
    rating: 4,
    price: 4
  }],
  onOfferCardMouseEnter: () => {},
  onOfferCardMouseLeave: () => {},
  onOfferCardNameClick: () => {}
};
