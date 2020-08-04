import * as React from "react";

import {SortType} from "../../types";

import {upperCaseFirstLetter} from "../../utils";

interface Props {
  isActive: boolean;
  onActiveStateChange: () => void;
  activeType: SortType;
  onTypeChange: (sortType: SortType) => void;
}

const Sort: React.FC<Props> = ({isActive, onActiveStateChange, activeType, onTypeChange}: Props) => (
  <form className="places__sorting" action="#" method="get">
    <span className="places__sorting-caption">Sort by </span>
    <span className="places__sorting-type" tabIndex={0} onClick={onActiveStateChange}>
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
          tabIndex={0}
          onClick={() => onTypeChange(sortType)}>
          {upperCaseFirstLetter(sortType)}
        </li>
      ))}
    </ul>
  </form>
);

export default Sort;
