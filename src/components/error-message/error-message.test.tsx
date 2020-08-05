import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

import ErrorMessage from "./error-message";

configure({adapter: new Adapter()});

const testMocks = {text: `error`};

describe(`snapshot test: ErrorMessage component`, () => {
  it(`should render correctly`, () => expect(
      toJson(shallow(<ErrorMessage {...testMocks}/>))
  ).toMatchSnapshot());
});
