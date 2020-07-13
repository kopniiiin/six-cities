import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCity: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

const CityList = ({cities, activeCity, onClick}) => (
  <div className="tabs">
    <section className="locations container">
      <ul className="tabs__list locations__list">
        {cities.map((city) => {
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

CityList.propTypes = propTypes;

export default CityList;
