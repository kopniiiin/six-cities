import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

import {doNothing, extend} from "../../utils";

import withReviewData from "./with-review-data";

configure({adapter: new Adapter()});

const MockComponent = () => <div/>;
const MockComponentWithReviewData = withReviewData(MockComponent);

const testMocks = {onSubmit: doNothing};

describe(`e2e test: withReviewData HOC`, () => {
  it(`should pass text`, () => expect(
      shallow(<MockComponentWithReviewData {...testMocks}/>).props().text
  ).toBe(``));

  it(`should pass rating`, () => expect(
      shallow(<MockComponentWithReviewData {...testMocks}/>).props().rating
  ).toBe(null));

  it(`should change text`, () => {
    const text = `good`;
    const wrapper = shallow(<MockComponentWithReviewData {...testMocks}/>);
    wrapper.props().onTextChange(text);
    expect(wrapper.props().text).toBe(text);
  });

  it(`should change rating`, () => {
    const rating = 4;
    const wrapper = shallow(<MockComponentWithReviewData {...testMocks}/>);
    wrapper.props().onRatingChange(rating);
    expect(wrapper.props().rating).toBe(rating);
  });

  it(`should call onSubmit with data`, () => {
    const text = `good`;
    const rating = 4;
    const onSubmit = jest.fn();
    const wrapper = shallow(<MockComponentWithReviewData {...extend(testMocks, {onSubmit})}/>);
    wrapper.props().onTextChange(text);
    wrapper.props().onRatingChange(rating);
    wrapper.props().onSubmit();

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenNthCalledWith(1, {text, rating});
  });
});
