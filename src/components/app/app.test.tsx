import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

import {OfferType, City, SortType, AuthorizationStatus} from "../../types";

import {doNothing} from "../../utils";

import {App} from "./app";

configure({adapter: new Adapter()});

const testMocks = {
  authorizationStatus: AuthorizationStatus.UNAUTHORIZED,
  activeCity: City.AMSTERDAM,
  activeSortType: SortType.POPULAR,
  offers: [{
    id: `4`,
    type: OfferType.ROOM,
    name: `Paper place`,
    mainPhoto: `photo`,
    isFavorite: false,
    isPremium: false,
    rating: 4,
    price: 4,
    location: {coordinates: [4, 4]},
    city: {location: {coordinates: [4, 4], zoom: 4}}
  }],
  onCityClick: doNothing,
  onSortTypeChange: doNothing,
  onLoginScreenSubmit: doNothing,
  onOfferFavoritenessChange: doNothing
};

describe(`snapshot test: App component`, () => {
  it(`should render correctly`, () => expect(
      toJson(shallow(<App {...testMocks}/>))
  ).toMatchSnapshot());
});
