import {OfferType} from "../const.js";

export default [{
  id: `1`,
  type: OfferType.APARTMENT,
  name: `Wood and stone place`,
  description: `Lots of wood and stone`,
  photos: [{src: `img/room.jpg`, alt: `Place photo`}],
  isFavorite: false,
  isPremium: false,
  rating: 1,
  price: 100,
  bedroomAmount: 1,
  guestAmount: 1,
  features: [`wood`, `stone`],
  coordinates: [52.3909553943508, 4.85309666406198],
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
}, {
  id: `2`,
  type: OfferType.HOTEL,
  name: `Only wood place`,
  description: `Lots of wood`,
  photos: [{src: `img/room.jpg`, alt: `Place photo`}],
  isFavorite: true,
  isPremium: false,
  rating: 2,
  price: 200,
  bedroomAmount: 2,
  guestAmount: 2,
  features: [`wood`],
  coordinates: [52.369553943508, 4.85309666406198],
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
}, {
  id: `3`,
  type: OfferType.HOUSE,
  name: `Only stone place`,
  description: `Lots of stone`,
  photos: [{src: `img/room.jpg`, alt: `Place photo`}],
  isFavorite: false,
  isPremium: false,
  rating: 3,
  price: 300,
  bedroomAmount: 3,
  guestAmount: 3,
  features: [`stone`],
  coordinates: [52.3909553943508, 4.929309666406198],
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
}, {
  id: `4`,
  type: OfferType.ROOM,
  name: `Paper place`,
  description: `Lots of paper`,
  photos: [{src: `img/room.jpg`, alt: `Place photo`}],
  isFavorite: true,
  isPremium: true,
  rating: 4,
  price: 400,
  bedroomAmount: 4,
  guestAmount: 4,
  features: [`paper`, `coffee machine`],
  coordinates: [52.3809553943508, 4.939309666406198],
  host: {
    name: `Host`,
    photo: {src: `img/avatar-max.jpg`, alt: `Host photo`},
    isPro: true
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
}];
