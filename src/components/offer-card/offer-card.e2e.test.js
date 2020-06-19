import React from "react";
import {shallow} from "enzyme";

import {OfferType} from "../../const.js";

import OfferCard from "./offer-card.jsx";

describe(`e2e test: OfferCard component`, () => {
  it(`should call onMouseEnter with id`, () => {
    const id = `4`;
    const onMouseEnter = jest.fn();

    shallow(
        <OfferCard
          id={id}
          type={OfferType.ROOM}
          name={`Paper place`}
          photo={{src: `img/room.jpg`, alt: `Place photo`}}
          price={400}
          rating={4}
          isFavorite={false}
          isPremium={false}
          onMouseEnter={onMouseEnter}
          onNameClick={() => {}}/>
    ).find(`.place-card`).simulate(`mouseenter`);

    expect(onMouseEnter).toHaveBeenCalledTimes(1);
    expect(onMouseEnter.mock.calls[0][0]).toBe(id);
  });

  it(`should call onNameClick`, () => {
    const onNameClick = jest.fn();

    shallow(
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
          onNameClick={onNameClick}/>
    ).find(`.place-card__name a`).simulate(`click`);

    expect(onNameClick).toHaveBeenCalledTimes(1);
  });
});
