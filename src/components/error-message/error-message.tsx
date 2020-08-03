import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  text: PropTypes.string.isRequired
};

const ErrorMessage = ({text}) => <div className="error-message">{text}</div>;

ErrorMessage.propTypes = propTypes;

export default ErrorMessage;
