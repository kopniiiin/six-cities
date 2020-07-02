import {OfferType} from "../const.js";

export default {
  cities: [`city`],
  activeCity: `city`,
  offers: [{
    id: `4`,
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
    coordinates: [4, 4],
    host: {
      name: `Host`,
      photo: {src: `img/avatar-max.jpg`, alt: `Host photo`},
      isPro: false
    },
    reviews: [{
      id: `4`,
      date: `2020-04-04`,
      text: `Good`,
      rating: 4,
      user: {
        name: `User`,
        photo: {src: `img/avatar-max.jpg`, alt: `User photo`}
      }
    }]
  }],
  onCityClick: () => {}
};
