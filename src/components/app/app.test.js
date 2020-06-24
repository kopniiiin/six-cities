import React from "react";
import {shallow} from "enzyme";

import App, {testProps} from "./app.jsx";

describe(`snapshot test: App component`, () => {
  it(`should render correctly`, () => expect(
      shallow(<App {...testProps}/>)
  ).toMatchSnapshot());
});
