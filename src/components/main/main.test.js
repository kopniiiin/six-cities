import React from "react";
import renderer from "react-test-renderer";

import Main from "./main.jsx";

describe(`snapshot test: Main component`, () => {
  it(`should render correctly`, () => {
    const PLACES = [
      `Wood and stone place`,
      `Only wood place`,
      `Only stone place`,
      `Paper place`
    ];

    const placeNameClickHandler = () => {};

    const tree = renderer.create(<Main places={PLACES} placeNameClickHandler={placeNameClickHandler}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
