import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Main from "./main.jsx";

Enzyme.configure({adapter: new Adapter()});

describe(`e2e test: Main component`, () => {
  it(`should call placeNameClickHandler`, () => {
    const PLACES = [
      `Wood and stone place`,
      `Only wood place`,
      `Only stone place`,
      `Paper place`
    ];

    const placeNameClickHandler = jest.fn();

    const wrapper = shallow(<Main places={PLACES} placeNameClickHandler={placeNameClickHandler}/>);

    const placeNames = wrapper.find(`.place-card__name a`);
    placeNames.forEach((placeName) => placeName.simulate(`click`));

    expect(placeNameClickHandler.mock.calls.length).toBe(placeNames.length);
  });
});
