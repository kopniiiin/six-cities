import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

import {doNothing, extend} from "../../utils";

import ReviewForm from "./review-form";

configure({adapter: new Adapter()});

const testMocks = {
  disabled: false,
  text: `good`,
  rating: 4,
  onTextChange: doNothing,
  onRatingChange: doNothing,
  onSubmit: doNothing
};

describe(`snapshot test: ReviewForm component`, () => {
  it(`should render correctly`, () => expect(
      toJson(shallow(<ReviewForm {...testMocks}/>))
  ).toMatchSnapshot());

  it(`should render disabled`, () => expect(
      toJson(shallow(<ReviewForm {...extend(testMocks, {disabled: true})}/>))
  ).toMatchSnapshot());

  it(`should render error`, () => expect(
      toJson(shallow(<ReviewForm {...extend(testMocks, {error: `error`})}/>))
  ).toMatchSnapshot());
});
