import React from "react";
import PropTypes from "prop-types";

import {SortType} from "../../const.js";

import {upperCaseFirstLetter} from "../../utils";

const propTypes = {
  isActive: PropTypes.bool.isRequired,
  onActiveStateChange: PropTypes.func.isRequired,
  activeType: PropTypes.oneOf(Object.values(SortType)).isRequired,
  onTypeChange: PropTypes.func.isRequired
};

const Sort = ({isActive, onActiveStateChange, activeType, onTypeChange}) => (
  <form className="places__sorting" action="#" method="get">
    <span className="places__sorting-caption">Sort by </span>
    <span className="places__sorting-type" tabIndex="0" onClick={onActiveStateChange}>
      {activeType}
      <svg className="places__sorting-arrow" width="7" height="4">
        <use xlinkHref="#icon-arrow-select"/>
      </svg>
    </span>
    <ul className={`places__options places__options--custom ${isActive ? `places__options--opened` : ``}`}>
      {Object.values(SortType).map((sortType) => (
        <li
          key={sortType}
          className={`places__option ${sortType === activeType ? `places__option--active` : ``}`}
          tabIndex="0"
          onClick={() => onTypeChange(sortType)}>
          {upperCaseFirstLetter(sortType)}
        </li>
      ))}
    </ul>
  </form>
);

Sort.propTypes = propTypes;

export default Sort;
