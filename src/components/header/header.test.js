import React from "react";
import {shallow} from "enzyme";

import Header from "./header";

describe(`snapshot test: Header component`, () => {
  it(`should render correctly`, () => expect(shallow(<Header/>)).toMatchSnapshot());

  it(`should render email`, () => expect(shallow(<Header email={`email`}/>)).toMatchSnapshot());

  it(`should render element`, () => expect(shallow(<Header><div/></Header>)).toMatchSnapshot());
});
