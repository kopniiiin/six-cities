import React from "react";
import {shallow} from "enzyme";

import Header from "./header.jsx";

describe(`snapshot test: Header component`, () => {
  it(`should render correctly`, () => expect(shallow(<Header/>)).toMatchSnapshot());

  it(`should render email`, () => expect(shallow(<Header email={`email`}/>)).toMatchSnapshot());
});
