import React from "react";
import {shallow} from "enzyme";

import Main, {testProps} from "./main.jsx";

describe(`snapshot test: Main component`, () => {
  it(`should render correctly`, () => expect(
      shallow(<Main {...testProps}/>)
  ).toMatchSnapshot());
});
