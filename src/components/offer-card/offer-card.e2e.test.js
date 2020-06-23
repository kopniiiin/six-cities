import React from "react";
import {shallow} from "enzyme";

import OfferCard, {testProps} from "./offer-card.jsx";

describe(`e2e test: OfferCard component`, () => {
  it(`should call onMouseEnter with id`, () => {
    const id = `4`;
    const onMouseEnter = jest.fn();

    shallow(<OfferCard {...Object.assign({}, testProps, {id, onMouseEnter})}/>)
      .find(`.place-card`).simulate(`mouseenter`);

    expect(onMouseEnter).toHaveBeenCalledTimes(1);
    expect(onMouseEnter.mock.calls[0][0]).toBe(id);
  });

  it(`should call onNameClick with id`, () => {
    const id = `4`;
    const onNameClick = jest.fn();

    shallow(<OfferCard {...Object.assign({}, testProps, {id, onNameClick})}/>)
      .find(`.place-card__name a`).simulate(`click`);

    expect(onNameClick).toHaveBeenCalledTimes(1);
    expect(onNameClick.mock.calls[0][0]).toBe(id);
  });
});
