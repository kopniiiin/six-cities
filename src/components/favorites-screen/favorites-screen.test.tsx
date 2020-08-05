import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

import {OfferType, City} from "../../types";

import {doNothing, extend} from "../../utils";

import {FavoritesScreen} from "./favorites-screen";

configure({adapter: new Adapter()});

const testMocks = {
  citiesToOffers: {
    [City.AMSTERDAM]: [{
      id: `4`,
      type: OfferType.ROOM,
      name: `Paper place`,
      mainPhoto: `photo`,
      isFavorite: false,
      isPremium: false,
      rating: 4,
      price: 4
    }]
  },
  loadData: doNothing,
  onOfferCardBookmarkButtonClick: doNothing
};

describe(`snapshot test: FavoritesScreen component`, () => {
  it(`should render correctly`, () => expect(
      toJson(shallow(<FavoritesScreen {...testMocks}><div/></FavoritesScreen>))
  ).toMatchSnapshot());

  it(`should render message without offers`, () => expect(
      toJson(shallow(<FavoritesScreen {...extend(testMocks, {citiesToOffers: {}})}><div/></FavoritesScreen>))
  ).toMatchSnapshot());
});
