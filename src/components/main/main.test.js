import React from "react";
import {shallow} from "enzyme";

import {OfferType} from "../../const.js";

import Main from "./main.jsx";

describe(`snapshot test: Main component`, () => {
  it(`should render correctly`, () => {
    const offers = [{
      id: `4`,
      type: OfferType.ROOM,
      name: `Paper place`,
      photo: {src: `img/room.jpg`, alt: `Place photo`},
      price: 400,
      rating: 4,
      isFavorite: false,
      isPremium: false
    }];

    expect(shallow(<Main offers={offers}/>)).toMatchSnapshot();
  });
});
