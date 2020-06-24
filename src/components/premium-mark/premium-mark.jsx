import React from "react";
import PropTypes from "prop-types";

const propTypes = {blockClassName: PropTypes.string.isRequired};

const PremiumMark = ({blockClassName}) => <div className={`${blockClassName}__mark`}><span>Premium</span></div>;

PremiumMark.propTypes = propTypes;

export default PremiumMark;
