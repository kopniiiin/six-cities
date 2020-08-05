import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

import Header from "./header";

configure({adapter: new Adapter()});

describe(`snapshot test: Header component`, () => {
  it(`should render correctly`, () => expect(toJson(shallow(<Header/>))).toMatchSnapshot());

  it(`should render email`, () => expect(toJson(shallow(<Header email={`email`}/>))).toMatchSnapshot());

  it(`should render element`, () => expect(toJson(shallow(<Header><div/></Header>))).toMatchSnapshot());
});
