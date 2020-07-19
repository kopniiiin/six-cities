const convertLocationFromServerFormat = ({latitude, longitude, zoom}) => ({coordinates: [latitude, longitude], zoom});

const convertCityFromServerFormat = ({name, location}) => ({name, location: convertLocationFromServerFormat(location)});

const convertHostFromServerFormat = ({id, name, avatar_url: photo, is_pro: isPro}) => ({id, name, photo, isPro});

const convertOfferFromServerFormat = (offer) => {
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
    host: convertHostFromServerFormat(host)
  };
};

export const convertOffersFromServerFormat = (offers) => offers.map(convertOfferFromServerFormat);
