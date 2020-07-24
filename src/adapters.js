const convertLocationFromServerFormat = ({latitude, longitude, zoom}) => ({coordinates: [latitude, longitude], zoom});

const convertCityFromServerFormat = ({name, location}) => ({name, location: convertLocationFromServerFormat(location)});

const convertUserFromServerFormat = ({id, name, avatar_url: photo, is_pro: isPro}) => ({id: String(id), name, photo, isPro});

export const convertOfferFromServerFormat = (offer) => {
  const {
    id,
    type,
    title: name,
    description,
    preview_image: mainPhoto,
    images: photos,
    is_favorite: isFavorite,
    is_premium: isPremium,
    rating,
    price,
    bedrooms: bedroomAmount,
    max_adults: guestAmount,
    goods: features,
    location,
    city,
    host
  } = offer;

  return {
    id: String(id),
    type,
    name,
    description,
    mainPhoto,
    photos,
    isFavorite,
    isPremium,
    rating,
    price,
    bedroomAmount,
    guestAmount,
    features,
    location: convertLocationFromServerFormat(location),
    city: convertCityFromServerFormat(city),
    host: convertUserFromServerFormat(host)
  };
};

export const convertOffersFromServerFormat = (offers) => offers.map(convertOfferFromServerFormat);

export const convertReviewFromServerFormat = ({id, date, comment: text, rating, user}) => ({
  id: String(id),
  date,
  text,
  rating,
  user: convertUserFromServerFormat(user)
});

export const convertReviewToServerFormat = ({text: comment, rating}) => ({comment, rating});

export const convertReviewsFromServerFormat = (reviews) => reviews.map(convertReviewFromServerFormat);
