import React from "react";
import {shallow} from "enzyme";

import {extend} from "../../utils.js";

import {FavoritesScreen} from "./favorites-screen.jsx";

import testMocks from "../../test-mocks/favorites-screen.js";

describe(`snapshot test: FavoritesScreen component`, () => {
  it(`should render correctly`, () => expect(
      shallow(<FavoritesScreen {...testMocks}><div/></FavoritesScreen>)
  ).toMatchSnapshot());

  it(`should render message without offers`, () => expect(
      shallow(<FavoritesScreen {...extend(testMocks, {citiesToOffers: {}})}><div/></FavoritesScreen>)
  ).toMatchSnapshot());
});
