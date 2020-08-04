import React from "react";
import {shallow} from "enzyme";

import {App} from "./app";

import testMocks from "../../test-mocks/app";

describe(`snapshot test: App component`, () => {
  it(`should render correctly`, () => expect(
      shallow(<App {...testMocks}/>)
  ).toMatchSnapshot());
});
