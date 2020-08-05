import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

import {OfferType} from "../../types";

import {doNothing, extend} from "../../utils";

import OfferCard from "./offer-card";

configure({adapter: new Adapter()});

const testMocks = {
  blockClassName: `block`,
  id: `4`,
  type: OfferType.ROOM,
  name: `Paper place`,
  mainPhoto: `photo`,
  isFavorite: false,
  isPremium: false,
  rating: 4,
  price: 4,
  onMouseEnter: doNothing,
  onMouseLeave: doNothing,
  onBookmarkButtonClick: doNothing
};

describe(`e2e test: OfferCard component`, () => {
  it(`should call onMouseEnter with id`, () => {
    const id = `4`;
    const onMouseEnter = jest.fn();

    shallow(<OfferCard {...extend(testMocks, {id, onMouseEnter})}/>)
      .find(`.place-card`).simulate(`mouseenter`);

    expect(onMouseEnter).toHaveBeenCalledTimes(1);
    expect(onMouseEnter.mock.calls[0][0]).toBe(id);
  });

  it(`should call onMouseLeave with id`, () => {
    const id = `4`;
    const onMouseLeave = jest.fn();

    shallow(<OfferCard {...extend(testMocks, {id, onMouseLeave})}/>)
      .find(`.place-card`).simulate(`mouseleave`);

    expect(onMouseLeave).toHaveBeenCalledTimes(1);
    expect(onMouseLeave.mock.calls[0][0]).toBe(id);
  });
});
