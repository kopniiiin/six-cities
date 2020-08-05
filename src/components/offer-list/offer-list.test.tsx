import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

import {OfferType} from "../../types";

import {doNothing} from "../../utils";

import OfferList from "./offer-list";

configure({adapter: new Adapter()});

const testMocks = {
  blockClassName: `block`,
  offers: [{
    id: `4`,
    type: OfferType.ROOM,
    name: `Paper place`,
    mainPhoto: `photo`,
    isFavorite: false,
    isPremium: false,
    rating: 4,
    price: 4
  }],
  onOfferCardMouseEnter: doNothing,
  onOfferCardMouseLeave: doNothing,
  onOfferCardBookmarkButtonClick: doNothing
};

describe(`snapshot test: OfferList component`, () => {
  it(`should render correctly`, () => expect(
      toJson(shallow(<OfferList {...testMocks}/>))
  ).toMatchSnapshot());
});
