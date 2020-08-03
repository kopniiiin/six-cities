import React from "react";
import {shallow} from "enzyme";

import {extend} from "../../utils";

import OfferCard from "./offer-card";

import testMocks from "../../test-mocks/offer-card";

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
