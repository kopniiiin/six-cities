import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

import {extend} from "../../utils";

import StarRating from "./star-rating";

configure({adapter: new Adapter()});

const testMocks = {
  blockClassName: `block`,
  value: 4,
  isValueShown: false
};

describe(`snapshot test: StarRating component`, () => {
  it(`should render correctly`, () => expect(
      toJson(shallow(<StarRating {...testMocks}/>))
  ).toMatchSnapshot());

  it(`should render value`, () => expect(
      toJson(shallow(<StarRating {...extend(testMocks, {isValueShown: true})}/>))
  ).toMatchSnapshot());
});
