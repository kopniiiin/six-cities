import {OfferType, AuthorizationStatus} from "../const";

export default {
  authorizationStatus: AuthorizationStatus.UNAUTHORIZED,
  id: `4`,
  offer: {
    type: OfferType.ROOM,
    name: `Paper place`,
    description: `Lots of paper`,
    photos: [`photo`],
    isFavorite: false,
    isPremium: false,
    rating: 4,
    price: 4,
    bedroomAmount: 4,
    guestAmount: 4,
    features: [`coffee machine`],
    location: {coordinates: [4, 4]},
    city: {location: {coordinates: [4, 4], zoom: 4}},
    host: {name: `Host`, photo: `photo`, isPro: false}
  },
  nearOffers: [{
    id: `4`,
    type: OfferType.ROOM,
    name: `Paper place`,
    mainPhoto: `photo`,
    isFavorite: false,
    isPremium: false,
    rating: 4,
    price: 4,
    location: {coordinates: [4, 4]}
  }],
  reviews: [{
    id: `4`,
    date: `2020-04-04`,
    text: `Good`,
    rating: 4,
    user: {name: `User`, photo: `photo`}
  }],
  loadData: () => {},
  isReviewFormDisabled: false,
  onReviewFormSubmit: () => {},
  onOfferCardBookmarkButtonClick: () => {}
};
