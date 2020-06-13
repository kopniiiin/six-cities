import React from "react";
import renderer from "react-test-renderer";

import App from "./app.jsx";

describe(`App component`, () => {
  it(`should render correctly`, () => {
    const PLACES = [
      `Wood and stone place`,
      `Only wood place`,
      `Only stone place`,
      `Paper place`
    ];

    const tree = renderer.create(<App places={PLACES}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
