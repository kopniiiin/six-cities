import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

import {OfferType, City, SortType} from "../../types";

import {doNothing, extend} from "../../utils";

import Main from "./main";

configure({adapter: new Adapter()});

const testMocks = {
  activeItem: `4`,
  onActiveItemChange: doNothing,
  onActiveItemRemoval: doNothing,
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
  onOfferCardBookmarkButtonClick: doNothing
};

describe(`snapshot test: Main component`, () => {
  it(`should render correctly`, () => expect(
      toJson(shallow(<Main {...testMocks}><div/></Main>))
  ).toMatchSnapshot());

  it(`should render message without offers`, () => expect(
      toJson(shallow(<Main {...extend(testMocks, {offers: []})}><div/></Main>))
  ).toMatchSnapshot());
});
