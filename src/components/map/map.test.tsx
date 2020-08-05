import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

import Map from "./map";

configure({adapter: new Adapter()});

const testMocks = {blockClassName: `block`};

describe(`snapshot test: Map component`, () => {
  it(`should render correctly`, () => expect(
      toJson(shallow(<Map {...testMocks}/>))
  ).toMatchSnapshot());
});
