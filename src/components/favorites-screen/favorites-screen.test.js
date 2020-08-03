import React from "react";
import {shallow} from "enzyme";

import {extend} from "../../utils";

import {FavoritesScreen} from "./favorites-screen";

import testMocks from "../../test-mocks/favorites-screen";

describe(`snapshot test: FavoritesScreen component`, () => {
  it(`should render correctly`, () => expect(
      shallow(<FavoritesScreen {...testMocks}><div/></FavoritesScreen>)
  ).toMatchSnapshot());

  it(`should render message without offers`, () => expect(
      shallow(<FavoritesScreen {...extend(testMocks, {citiesToOffers: {}})}><div/></FavoritesScreen>)
  ).toMatchSnapshot());
});
