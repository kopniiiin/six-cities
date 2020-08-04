import * as React from "react";

import {City} from "../../types";

interface Props {
  activeCity: City;
  onClick: (city: City) => void;
}

const CityList: React.FC<Props> = ({activeCity, onClick}: Props) => (
  <div className="tabs">
    <section className="locations container">
      <ul className="tabs__list locations__list">
        {Object.values(City).map((city) => {
          const itemClassName = `tabs__item ${city === activeCity ? `tabs__item--active` : ``} locations__item-link`;

          return (
            <li key={city} className="locations__item">
              <a className={itemClassName} onClick={() => onClick(city)}>
                <span>{city}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  </div>
);

export default CityList;
