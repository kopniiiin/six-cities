import React from "react";
import {shallow} from "enzyme";

import {App} from "./app.jsx";

import testMocks from "../../test-mocks/app.js";

describe.skip(`snapshot test: App component`, () => {
  it(`should render correctly`, () => expect(
      shallow(<App {...testMocks}/>)
  ).toMatchSnapshot());
});
