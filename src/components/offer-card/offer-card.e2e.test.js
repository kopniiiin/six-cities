import React from "react";
import {shallow} from "enzyme";

import OfferCard from "./offer-card.jsx";

import testMocks from "../../test-mocks/offer-card.js";

describe(`e2e test: OfferCard component`, () => {
  it(`should call onMouseEnter with id`, () => {
    const id = `4`;
    const onMouseEnter = jest.fn();

    shallow(<OfferCard {...Object.assign({}, testMocks, {id, onMouseEnter})}/>)
      .find(`.place-card`).simulate(`mouseenter`);

    expect(onMouseEnter).toHaveBeenCalledTimes(1);
    expect(onMouseEnter.mock.calls[0][0]).toBe(id);
  });

  it(`should call onMouseLeave with id`, () => {
    const id = `4`;
    const onMouseLeave = jest.fn();

    shallow(<OfferCard {...Object.assign({}, testMocks, {id, onMouseLeave})}/>)
      .find(`.place-card`).simulate(`mouseleave`);

    expect(onMouseLeave).toHaveBeenCalledTimes(1);
    expect(onMouseLeave.mock.calls[0][0]).toBe(id);
  });

  it(`should call onNameClick with id`, () => {
    const id = `4`;
    const onNameClick = jest.fn();

    shallow(<OfferCard {...Object.assign({}, testMocks, {id, onNameClick})}/>)
      .find(`.place-card__name a`).simulate(`click`);

    expect(onNameClick).toHaveBeenCalledTimes(1);
    expect(onNameClick.mock.calls[0][0]).toBe(id);
  });
});
