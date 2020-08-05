import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

import Review from "./review";

configure({adapter: new Adapter()});

const testMocks = {
  date: `2020-04-04`,
  text: `Good`,
  rating: 4,
  user: {
    name: `User`,
    photo: `photo`
  }
};

describe(`snapshot test: Review component`, () => {
  it(`should render correctly`, () => expect(
      toJson(shallow(<Review {...testMocks}/>))
  ).toMatchSnapshot());
});
