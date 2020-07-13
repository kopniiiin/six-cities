import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  blockClassName: PropTypes.string.isRequired
};

const Map = ({blockClassName}) => <section className={`${blockClassName}__map map`} id="map"/>;

Map.propTypes = propTypes;

export default Map;
