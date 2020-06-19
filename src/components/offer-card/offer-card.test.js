import React from "react";
import {shallow} from "enzyme";

import {OfferType} from "../../const.js";

import OfferCard from "./offer-card.jsx";

describe(`snapshot test: OfferCard component`, () => {
  it(`should render correctly`, () => expect(shallow(
      <OfferCard
        id={`4`}
        type={OfferType.ROOM}
        name={`Paper place`}
        photo={{src: `img/room.jpg`, alt: `Place photo`}}
        price={400}
        rating={4}
        isFavorite={false}
        isPremium={false}
        onMouseEnter={() => {}}
        onNameClick={() => {}}/>
  )).toMatchSnapshot());

  it(`should render premium mark`, () => expect(shallow(
      <OfferCard
        id={`4`}
        type={OfferType.ROOM}
        name={`Paper place`}
        photo={{src: `img/room.jpg`, alt: `Place photo`}}
        price={400}
        rating={4}
        isFavorite={false}
        isPremium={true}
        onMouseEnter={() => {}}
        onNameClick={() => {}}/>
  )).toMatchSnapshot());
});
