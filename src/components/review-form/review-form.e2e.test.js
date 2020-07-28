import React from "react";
import {shallow} from "enzyme";

import {extend} from "../../utils.js";

import ReviewForm from "./review-form.jsx";

import testMocks from "../../test-mocks/review-form.js";

describe(`e2e test: ReviewForm component`, () => {
  it(`should call onTextChange with text`, () => {
    const text = `good`;
    const onTextChange = jest.fn();

    shallow(<ReviewForm {...extend(testMocks, {onTextChange})}/>)
      .find(`.form__textarea`).simulate(`change`, {target: {value: text}});

    expect(onTextChange).toHaveBeenCalledTimes(1);
    expect(onTextChange).toHaveBeenNthCalledWith(1, text);
  });

  it(`should call onRatingChange with rating`, () => {
    const rating = 4;
    const onRatingChange = jest.fn();

    shallow(<ReviewForm {...extend(testMocks, {onRatingChange})}/>)
      .find(`.form__rating-input[value=${rating}]`).simulate(`change`);

    expect(onRatingChange).toHaveBeenCalledTimes(1);
    expect(onRatingChange).toHaveBeenNthCalledWith(1, rating);
  });

  it(`should call onSubmit with data`, () => {
    const text = `good`;
    const rating = 4;
    const preventDefault = jest.fn();
    const onSubmit = jest.fn();

    shallow(<ReviewForm {...extend(testMocks, {text, rating, onSubmit})}/>)
      .find(`.form`).simulate(`submit`, {preventDefault});

    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenNthCalledWith(1, {text, rating});
  });
});
