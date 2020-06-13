import React from "react";
import renderer from "react-test-renderer";

import Main from "./main.jsx";

describe(`Main component`, () => {
  it(`should render correctly`, () => {
    const PLACES = [
      `Wood and stone place`,
      `Only wood place`,
      `Only stone place`,
      `Paper place`
    ];

    const tree = renderer.create(<Main places={PLACES}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
