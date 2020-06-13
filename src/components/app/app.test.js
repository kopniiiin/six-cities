import React from "react";
import renderer from "react-test-renderer";

import App from "./app.jsx";

describe(`snapshot test: App component`, () => {
  it(`should render correctly`, () => {
    const PLACES = [
      `Wood and stone place`,
      `Only wood place`,
      `Only stone place`,
      `Paper place`
    ];

    const placeNameClickHandler = () => {};

    const tree = renderer.create(<App places={PLACES} placeNameClickHandler={placeNameClickHandler}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
