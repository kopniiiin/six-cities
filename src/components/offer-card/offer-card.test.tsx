import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

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

describe(`snapshot test: OfferCard component`, () => {
  it(`should render correctly`, () => expect(
      toJson(shallow(<OfferCard {...testMocks}/>))
  ).toMatchSnapshot());

  it(`should render premium mark`, () => expect(
      toJson(shallow(<OfferCard {...extend(testMocks, {isPremium: true})}/>))
  ).toMatchSnapshot());
});
